# AI 硬件学习平台 Skill（ai-hardware-learning-platform）

一个可复用的 WorkBuddy Skill：把「AI 硬件训练营学习台」脚手架打包为模板 —— 薄荷清新风课程前端 + 飞书登录 + 免费 Turso (libSQL) 数据库 + Vercel 一键部署。

## 它能干什么
- 复刻一套课程学习台：8 节大课课程计划、课程详情(课件/作业/知识点)、今日任务动态生成、复习中心、优秀作业、进度环仪表盘。
- 学员数据分层：教材内核 `data.js` 只读，学员进度/答题/画像走后端按 `open_id` 隔离，预留千人千面引擎层。
- **部署即可用**：未配置任何环境变量时自动降级 localStorage 本地模式；配置后启用飞书登录 + 云端同步。

## 快速开始
1. 把 `assets/template/` 整体复制到目标目录。
2. 课程内容写 `public/data.js`（结构见文件头注释）。
3. 部署：`npx vercel`，环境变量见 `assets/template/.env.example` 与 `references/deploy.md`。

## 目录
```
ai-hardware-learning-platform/
├── SKILL.md            # Skill 说明（触发条件与使用方法）
├── references/deploy.md    # 部署参考（飞书应用/Turso/Vercel/坑）
└── assets/template/    # 完整可部署模板
    ├── public/         # index.html + data.js + docs/（课件缓存）
    ├── api/            # auth.js / me.js / progress.js（Vercel Functions）
    ├── lib/            # db.js(Turso) / session.js(JWT) / feishu.js(OAuth)
    ├── package.json
    └── .env.example
```

## 技术栈
Vercel (静态托管 + Serverless Functions) · 飞书开放平台 OAuth · Turso libSQL (SQLite, 免费 9GB) · 纯原生 HTML/CSS/JS，零框架依赖

## License
MIT
