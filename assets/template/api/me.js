// 当前登录用户：从 Cookie 中的 JWT 解析，无需查库（信息已写入 token）
import { getToken, verifySession } from "../lib/session.js";

export default async function handler(req, res) {
  const s = verifySession(getToken(req));
  if (!s) {
    res.writeHead(401, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ error: "unauthorized" }));
  }
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ id: s.sub, name: s.name, avatar: s.avatar || "" }));
}
