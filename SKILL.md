---
name: ai-hardware-learning-platform
description: This skill should be used when the user wants to build or scaffold an AI-hardware / training-camp learning platform — a mint-themed course web app with Feishu (Lark) login, a free Turso (libSQL/SQLite) database, and Vercel-ready serverless deployment. Trigger phrases include "搭建学习台", "AI 硬件学习台", "训练营学习平台", "薄荷风课程站", "飞书登录 + 免费数据库 + Vercel". It bundles a complete, deployable template (frontend + api + lib + package.json) plus a setup reference.
agent_created: true
---

# AI 硬件学习平台（模板 Skill）

把「AI 硬件训练营学习台」做成可复用脚手架：薄荷清新风前端 + 飞书登录 + 免费 Turso 数据库 + Vercel 部署。适合复用其结构搭任意课程/训练营/知识学习平台。

## 何时使用
- 用户要搭一个课程 / 训练营 / 知识学习平台，且点名要：薄荷清新风、飞书登录、免费数据库、Vercel 部署。
- 用户要复用「AI 硬件学习台」这套界面与功能（8 节大课、优秀作业、复习中心、今日任务动态生成、进度环仪表盘）。
- 用户要把内容源与学员数据分层（教材只读、学员层可写、千人千面引擎）。

## 如何使用
1. 把 `assets/template/` 整体复制到目标项目目录——它已是一个可部署的 Vercel 项目（静态前端 + serverless 函数）。
2. 课程内容写在 `assets/template/public/data.js`（`COURSES` 数组 + `materials`/`knowledge`）。**硬约束：`data.js` 是只读教材内核，个性化只通过引擎层实现，不改它的结构与数据。**
3. 前端 `public/index.html` 已内置：飞书登录顶部栏、登录后从 `/api/progress` 拉取并覆盖本地进度、勾选 / 标记完成时回写云端；**未配置任何环境变量时自动降级为 localStorage 本地模式，部署即可用**。
4. 后端三函数：`api/auth.js`（飞书 OAuth 登录 / 回调 / 退出）、`api/me.js`（当前用户）、`api/progress.js`（按飞书 `open_id` 隔离的进度 / 答题 / 画像读写）。
5. lib 三层：`lib/db.js`（Turso 免费 SQLite）、`lib/session.js`（JWT HttpOnly Cookie）、`lib/feishu.js`（飞书 OAuth）。
6. 部署与配置见 `references/deploy.md`（建飞书应用、建 Turso 库、Vercel 填 env、`vercel dev` / `vercel --prod`）。

## 关键约束 / 坑
- 飞书「网页应用」默认仅同组织成员或被显式添加的用户可登录；分享给外部学员需把学员加为应用「可见用户」或发布应用。
- 未配置 env 时站点仍可打开（本地模式），配置后自动联网同步。
- 教材内核 `data.js` 不可改结构；千人千面靠隐形标签 + 引擎层实现（内容 / 学员 / 引擎三层分离）。
- 技术栈：Vercel（静态 + 函数）+ 飞书登录 + Turso（libSQL，免费 9GB，HTTP 直连 Vercel）。CloudBase 方案已弃用。
