// 飞书 OAuth（网页应用授权码模式）
// 文档：https://open.feishu.cn/document/server-docs/authentication-management
const BASE = "https://open.feishu.cn";

export function authorizeUrl(redirectUri, state) {
  const appId = process.env.FEISHU_APP_ID;
  return `${BASE}/open-apis/authen/v1/authorize?app_id=${appId}&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&state=${state}`;
}

export async function exchangeToken(code) {
  const r = await fetch(`${BASE}/open-apis/authen/v1/access_token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      grant_type: "authorization_code",
      code,
      app_id: process.env.FEISHU_APP_ID,
      app_secret: process.env.FEISHU_APP_SECRET,
    }),
  });
  const j = await r.json();
  if (j.code !== 0) throw new Error("feishu token: " + JSON.stringify(j));
  return j.data; // { access_token, open_id, ... }
}

export async function getUserInfo(accessToken) {
  const r = await fetch(`${BASE}/open-apis/authen/v1/user_info?access_token=${accessToken}`);
  const j = await r.json();
  if (j.code !== 0) throw new Error("feishu userinfo: " + JSON.stringify(j));
  return j.data; // { name, avatar, open_id, ... }
}
