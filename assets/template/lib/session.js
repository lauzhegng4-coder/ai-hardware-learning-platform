// 会话：飞书登录后签发 JWT，存于 HttpOnly Cookie
import jwt from "jsonwebtoken";

const COOKIE = "aihw_sid";
const MAX_AGE = 30 * 24 * 3600; // 30 天
const SECRET = process.env.SESSION_SECRET || "dev-only-insecure-secret";

export function signSession(payload) {
  return jwt.sign(payload, SECRET, { expiresIn: "30d" });
}

export function verifySession(token) {
  try {
    return jwt.verify(token, SECRET);
  } catch (e) {
    return null;
  }
}

export function getToken(req) {
  const h = req.headers.cookie || "";
  const m = h.match(new RegExp(COOKIE + "=([^;]+)"));
  return m ? m[1] : null;
}

export function setSessionCookie(res, token) {
  res.setHeader(
    "Set-Cookie",
    `${COOKIE}=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${MAX_AGE}`
  );
}

export function clearSessionCookie(res) {
  res.setHeader("Set-Cookie", `${COOKIE}=; Path=/; HttpOnly; Max-Age=0`);
}
