// 学员进度/答题/画像：GET 拉取，POST 覆盖式保存（按飞书 open_id 隔离）
import { getToken, verifySession } from "../lib/session.js";
import { initDb, getProgress, saveProgress, dbConfigured } from "../lib/db.js";

export default async function handler(req, res) {
  const s = verifySession(getToken(req));
  if (!s) {
    res.writeHead(401, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ error: "unauthorized" }));
  }

  // 数据库未配置 → 503，前端自动保持本地模式
  if (!dbConfigured()) {
    res.writeHead(503, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ error: "db_not_configured" }));
  }

  if (req.method === "GET") {
    await initDb();
    const p = await getProgress(s.sub);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        done: p ? p.done : "{}",
        tasks: p ? p.tasks : "{}",
        answers: p ? p.answers : "{}",
        profile: p ? p.profile : "{}",
      })
    );
    return;
  }

  if (req.method === "POST") {
    let body = "";
    for await (const ch of req) body += ch;
    let d = {};
    try {
      d = JSON.parse(body || "{}");
    } catch (e) {
      res.writeHead(400, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ error: "bad_json" }));
    }
    await initDb();
    await saveProgress(s.sub, {
      done: d.done != null ? JSON.stringify(d.done) : "{}",
      tasks: d.tasks != null ? JSON.stringify(d.tasks) : "{}",
      answers: d.answers != null ? JSON.stringify(d.answers) : "{}",
      profile: d.profile != null ? JSON.stringify(d.profile) : "{}",
    });
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ ok: true }));
  }

  res.writeHead(405);
  res.end();
}
