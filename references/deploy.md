# 部署参考（Vercel + 飞书登录 + Turso）

## 1. 建飞书应用
1. https://open.feishu.cn/app → 创建「**网页应用**」(展示形态选"网页")。
2. 记下 `App ID` / `App Secret`。
3. 「安全设置 → 重定向 URL」填 `https://<你的域名>/api/auth`(预览和生产两个域名都加)。
4. 权限:无需额外申请,登录用的是 authen 基础接口。

## 2. 建 Turso 库(免费)
```bash
# https://turso.tech 用 GitHub 登录后:
turso db create aihw-learn
turso db show aihw-learn --url          # → TURSO_URL
turso db tokens create aihw-learn       # → TURSO_AUTH_TOKEN
```
免费档:9GB 存储、500 个库、HTTP 直连 Vercel 无冷启动问题。

## 3. Vercel 部署
```bash
npm i -g vercel   # 或 npx
vercel            # 首次登录,选目录,其他默认
# 在 Dashboard → Settings → Environment Variables 填 .env.example 的 4 项:
#   FEISHU_APP_ID / FEISHU_APP_SECRET / FEISHU_REDIRECT_URI / SESSION_SECRET
#   + TURSO_URL / TURSO_AUTH_TOKEN (共 6 个)
vercel --prod
```
填完后把生产域名拼出的 `https://<域名>/api/auth` 回填到飞书重定向 URL 与 `FEISHU_REDIRECT_URI`。

## 4. 本地开发
```bash
npm install
npx vercel dev    # 或任意静态服务器开 public/,未配 env 自动走本地模式
```

## 5. 已知坑
- **飞书可见性**:网页应用默认仅同组织成员/被添加用户可登录。外部学员要么加入组织,要么在飞书后台把学员逐个加为「可用用户」,或走应用发布。
- **Cookie**:Vercel 函数默认 HTTPS,HttpOnly+SameSite=Lax 正常工作;不要加 Secure 之外的特殊配置。
- **降级**:未配 env → `/api/me` 返回 `{configured:false}`,前端显示「离线版」,数据存 localStorage,部署即可用,不阻塞演示。
- **个人身份**:Turso 免费档需 GitHub 账号;Vercel Hobby 免费档需个人邮箱注册,商用需 Pro。
