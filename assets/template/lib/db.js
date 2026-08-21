// 免费数据库层：Turso（libSQL，SQLite 兼容，免费 9GB）
// 未配置 TURSO_URL 时返回 null，调用方应降级为本地模式。
import { createClient } from "@libsql/client";

let _client = null;
function client() {
  if (_client) return _client;
  if (!process.env.TURSO_URL || !process.env.TURSO_AUTH_TOKEN) return null;
  _client = createClient({
    url: process.env.TURSO_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
  });
  return _client;
}

export function dbConfigured() {
  return !!(process.env.TURSO_URL && process.env.TURSO_AUTH_TOKEN);
}

export async function initDb() {
  const c = client();
  if (!c) return false;
  await c.batch(
    [
      `CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        name TEXT,
        avatar TEXT,
        created_at INTEGER
      )`,
      `CREATE TABLE IF NOT EXISTS progress (
        user_id TEXT PRIMARY KEY,
        done TEXT,
        tasks TEXT,
        answers TEXT,
        profile TEXT,
        updated_at INTEGER
      )`,
    ],
    "write"
  );
  return true;
}

export async function upsertUser(u) {
  const c = client();
  if (!c) return;
  await c.execute({
    sql: `INSERT INTO users (id, name, avatar, created_at) VALUES (?, ?, ?, ?)
          ON CONFLICT(id) DO UPDATE SET name=excluded.name, avatar=excluded.avatar`,
    args: [u.id, u.name, u.avatar, Date.now()],
  });
}

export async function getProgress(userId) {
  const c = client();
  if (!c) return null;
  const r = await c.execute({
    sql: "SELECT * FROM progress WHERE user_id=?",
    args: [userId],
  });
  return r.rows[0] || null;
}

export async function saveProgress(userId, data) {
  const c = client();
  if (!c) return;
  const cur = await getProgress(userId);
  const merged = {
    done: data.done ?? (cur ? cur.done : "{}"),
    tasks: data.tasks ?? (cur ? cur.tasks : "{}"),
    answers: data.answers ?? (cur ? cur.answers : "{}"),
    profile: data.profile ?? (cur ? cur.profile : "{}"),
  };
  await c.execute({
    sql: `INSERT INTO progress (user_id, done, tasks, answers, profile, updated_at)
          VALUES (?, ?, ?, ?, ?, ?)
          ON CONFLICT(user_id) DO UPDATE SET
            done=excluded.done, tasks=excluded.tasks,
            answers=excluded.answers, profile=excluded.profile,
            updated_at=excluded.updated_at`,
    args: [userId, merged.done, merged.tasks, merged.answers, merged.profile, Date.now()],
  });
}
