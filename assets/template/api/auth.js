// 飞书登录入口：/api/auth?action=login 发起授权；回调自动完成；action=logout 退出
import { initDb, upsertUser } from "../lib/db.js";
import { authorizeUrl, exchangeToken, getUserInfo } from "../lib/feishu.js";
import { signSession, setSessionCookie, clearSessionCookie } from "../lib/session.js";

const REDIRECT = process.env.FEISHU_REDIRECT_URI;

export default async function handler(req, res) {
  const u = new URL(req.url, "http://localhost");
  const action = u.searchParams.get("action");
  const code = u.searchParams.get("code");

  // 退出
  if (action === "logout") {
    clearSessionCookie(res);
    res.writeHead(302, { Location: "/" });
    return res.end();
  }

  // 未配置飞书凭证 → 提示
  if (!process.env.FEISHU_APP_ID || !process.env.FEISHU_APP_SECRET || !REDIRECT) {
    res.writeHead(302, { Location: "/?auth_error=feishu_not_configured" });
    return res.end();
  }

  // 发起授权
  if (!code) {
    await initDb().catch(() => {});
    res.writeHead(302, { Location: authorizeUrl(REDIRECT, "aihw") });
    return res.end();
  }

  // 回调：用 code 换用户信息 → 落库 → 种 Cookie → 回首页
  try {
    const tok = await exchangeToken(code);
    const info = await getUserInfo(tok.access_token);
    const openId = tok.open_id || info.open_id;
    const user = {
      id: openId,
      name: info.name || "飞书用户",
      avatar: info.avatar || "",
    };
    await initDb();
    await upsertUser(user);
    setSessionCookie(res, signSession({ sub: openId, name: user.name, avatar: user.avatar }));
    res.writeHead(302, { Location: "/" });
    return res.end();
  } catch (e) {
    console.error("[auth] callback failed:", e);
    res.writeHead(302, { Location: "/?auth_error=1" });
    return res.end();
  }
}
