// AI 硬件学习台 - 结构化课程数据
// 资料随课程推进持续补充：用户会发送课件 / 资料，按课号挂接即可。
// 字段说明：
//   materials: 课件/笔记/答疑/参考，file 指向 docs/ 下真实文件
//   knowledge: 提炼的核心知识点，帮助学员理解
//   homework : 课后作业要求

const COURSES = [
  {
    no: 1,
    title: "第 1 课 · 从想法到开工：AI 硬件起步指南",
    date: "08.18（周二）晚8点",
    teacher: "CY-CHENYUE",
    hw: "我的 AI 硬件参与计划：选择角色、AI 硬件理解、人与 AI 分工、配合开发流程",
    status: "done",
    materials: [
      { name: "第 1 课课件（知识库整理版）", file: "docs/第1课_AI硬件起步指南.md", type: "课件" },
      { name: "第 1 课逐字精编版", file: "docs/1_AI硬件训练营第一课_文本.md", type: "笔记" },
      { name: "AI 硬件在线答疑文档", file: "docs/AI硬件_在线答疑文档.md", type: "答疑" },
      { name: "EasyInput V2 开发板上手指南", file: "docs/开箱手册_EasyInput_V2开发板上手指南.md", type: "参考" }
    ],
    knowledge: [
      { t: "硬件成立的 7 个判断维度", d: "真实频率 / 操作摩擦 / 场景占用 / 现场反馈 / 替代方案 / 持续负担 / 外部影响。任一积极信号成立，硬件才值得做。" },
      { t: "最小闭环四步法", d: "①定义最小任务（一输入一判断一输出）②跑通现成基线 ③一次只改一处 ④观察物理反馈。验收不依赖软件日志。" },
      { t: "AI 的两种角色", d: "做进产品（感知/判断/反馈）+ 作为工程协作者（读手册/分析原理图/改固件/解释日志），压缩试错时间。" },
      { t: "三类常见误区", d: "技术陷阱（为技术找场景）、复杂度崇拜（越难越值钱）、手机替代盲区（重包装已有功能成独立设备）。" },
      { t: "产品判断原则", d: "用户不愿意为设备增加购买、携带、充电、学习、维护成本，则「多一个硬件」本身就是负价值。" },
      { t: "知识地图优先级", d: "P0 需求验证与最小闭环、开发板固件烧录；P1 原理图/PCB/GPIO、日志与回归；P2 结构/功耗/云边端、量产与供应链。" }
    ]
  },
  {
    no: 2,
    title: "第 2 课 · 跑通第一条链路，搭建 AI 硬件完整开发流程",
    date: "08.22（周六）晚8点",
    teacher: "CY-CHENYUE",
    hw: "独立走完一次开发流程，提交复刻结果与过程记录",
    status: "now",
    materials: [
      { name: "第 2 课课件：跑通第一条 AI 硬件开发链路", file: "docs/第2课_跑通第一条AI硬件开发链路.md", type: "课件" },
      { name: "AI 硬件在线答疑（含第二课）", file: "docs/AI硬件_在线答疑文档_第2课.md", type: "答疑" },
      { name: "EasyInput V2 开发板上手指南", file: "docs/开箱手册_EasyInput_V2开发板上手指南.md", type: "参考" }
    ],
    knowledge: [
      { t: "Host Action v1 固定协议", d: "App 生成 UUID 并在电脑本地保留「UUID→应用」；固件按键按下发送一次 UUID；两端按约好的编号/长度/时机交换，AI 不得临时改写法。" },
      { t: "第一次设置 vs 每次按键", d: "首次：App 设置按键+动作+目标应用，UUID 分别存在 App（对应关系）与固件（按键配置）。之后每次按键：固件读 UUID → 发电脑 → App 查表 → 打开应用。" },
      { t: "四段开发路径", d: "01-03 读懂与基线（不改代码先证正常）→ 04-06 协议与实现（冻结的 v1 接入八键）→ 07-09 通道与构建（USB/BLE 不双发）→ 10-12 写入与验证（查 diff 再真机）。" },
      { t: "先基线后改动", d: "任何修改前先证明原项目能通过检查。后面再出错，才知道问题是这次改动引入的，不是环境本来就坏的。" },
      { t: "改动清单核对", d: "AI 交付 diff：增加/删除/修改了哪些文件。确认只改该改的，未动冻结协议，未破坏旧功能。" },
      { t: "七项真机检查矩阵", d: "USB-only 触发 / BLE-only 触发 / 双连接不双发 / 一次按下一次动作 / 松开不重复 / 旧功能仍正常 / App 真打开目标应用。逐项记录，不许一项代全部。" }
    ]
  },
  { no:3, title:"第 3 课 · 让硬件跟着节拍跑：EasyInput 上的实时鼓机", date:"08.26（周三）晚8点", teacher:"王熙涵 / CY-CHENYUE", hw:"复刻实时鼓机，并尝试修改一种节奏或交互方式", status:"todo", materials:[], knowledge:[] },
  { no:4, title:"第 4 课 · 按一下就开工，图文内容流水线", date:"08.29（周六）晚8点", teacher:"银海", hw:"复刻图文生产流程，并完成一次自定义内容输出", status:"todo", materials:[], knowledge:[] },
  { no:5, title:"第 5 课 · ai 时代不可被取代的技能：软硬件结合的英语学习", date:"09.04（周五）晚8点", teacher:"解博", hw:"复刻核心功能，并为自己的学习场景设计一种用法", status:"todo", materials:[], knowledge:[] },
  { no:6, title:"第 6 课 · 给世界换一种颜色，StyleCam 风格调色盘", date:"09.07（周一）晚8点", teacher:"ZHO", hw:"完成 StyleCam 复刻，并制作一组个人风格效果", status:"todo", materials:[], knowledge:[] },
  { no:7, title:"第 7 课 · 一把键盘，远程开发，Codex 任务电台", date:"09.13（周日）晚8点", teacher:"lark", hw:"复刻远程开发流程，并完成一次真实任务操作", status:"todo", materials:[], knowledge:[] },
  { no:8, title:"第 8 课 · 用同一套方法，开始下一个 AI 硬件项目", date:"09.16（周三）晚8点", teacher:"CY-CHENYUE", hw:"毕业大作业：提出并完成一个属于自己的项目", status:"todo", materials:[], knowledge:[] }
];

// 本地存储键
const LS_DONE = "aihw_course_done";   // 已完成课程 {"1":true,...}
const LS_TASK = "aihw_tasks";          // 今日任务勾选 {"r1":true,...}

function getDone(){ try{return JSON.parse(localStorage.getItem(LS_DONE)||"{}")}catch(e){return{}} }
function setDone(o){ localStorage.setItem(LS_DONE, JSON.stringify(o)); }
function getTasks(){ try{return JSON.parse(localStorage.getItem(LS_TASK)||"{}")}catch(e){return{}} }
function setTasks(o){ localStorage.setItem(LS_TASK, JSON.stringify(o)); }

// 首页粗粒度任务摘要：跟随真实进度生成（细粒度小节看「今日学习」）
function buildTasks(){
  const done = getDone();
  const tasks = [];
  // 最近的未完成课 = 当前学习课
  const current = COURSES.find(c=>!done[c.no]) || null;
  if(current){
    tasks.push({id:"l"+current.no, txt:`学习第 ${current.no} 课：${current.title.split("·")[1].trim().slice(0,18)}（课件已挂接，可打开查看）`, meta:`学习 · 第 ${current.no} 课`});
    tasks.push({id:"h"+current.no, txt:`提交第 ${current.no} 课作业：${current.hw.slice(0,24)}`, meta:"作业 · 完成度影响结营"});
  }else{
    tasks.push({id:"rall", txt:"全部课程已完成，复习薄弱知识点", meta:"复习 · 结营准备"});
  }
  // 已完成课的复习提示(最多 1 条)
  const lastDone = [...COURSES].reverse().find(c=>done[c.no]);
  if(lastDone && current) tasks.push({id:"r"+lastDone.no, txt:`复习第 ${lastDone.no} 课核心知识点`, meta:`复习 · 第 ${lastDone.no} 课`});
  return tasks;
}

/* ============================================================
 * 小节级学习计划（独立配置，不属于 COURSES 教材内核）
 * day: 计划日期；secs: 小节（id 勾选键 / dur 时长分钟 / hw 挂载作业题）
 * 预习任务已移除：下一课内容不提前释放，直播日以直播收尾。
 * ============================================================ */
const LESSON1_PLAN = [
  { day:"2026-08-21", label:"周五 · 约 48 分钟", secs:[
    { id:"s101", no:"01-01", t:"起点为什么变了", dur:15, point:"AI 两种角色 + 真机验证顺序", hw:"作业② 我的理解（约 5 分钟，学完即写）", link:"docs/第1课_AI硬件起步指南.md" },
    { id:"s102", no:"01-02", t:"真的需要做成硬件吗", dur:15, point:"五方向检查 + 使用者/拥有者/未使用者三方影响", link:"docs/第1课_AI硬件起步指南.md" },
    { id:"s103", no:"01-04", t:"量产路线与 9 角色（速览）", dur:8, point:"7 阶段一句话理解 + 9 角色清单", hw:"作业① 选角色（约 5 分钟）", link:"docs/第1课_AI硬件起步指南.md" }
  ]},
  { day:"2026-08-22", label:"周六 · 直播日 · 约 45 分钟", secs:[
    { id:"s104", no:"01-03", t:"开发板解剖", dur:20, point:"PCB/元器件/PCBA/开发板 + 正反面部件", link:"docs/第1课_AI硬件起步指南.md" },
    { id:"s105", no:"01-05", t:"开工四步", dur:15, point:"整理资料 → 搭环境 → 对齐上下文 → 最小开发", hw:"作业③ 流程箭头（约 10 分钟）", link:"docs/第1课_AI硬件起步指南.md" },
    { id:"live2", no:"📺", t:"20:00 第 2 课直播", dur:0, point:"跑通第一条链路，搭建 AI 硬件完整开发流程", link:"" }
  ]}
];

/* 第 2 课 12 小节 · 两天消化（直播当晚速览主线，次日分四段精读） */
const LESSON2_PLAN = [
  { day:"2026-08-22", label:"周六 · 直播日 · 约 30 分钟", secs:[
    { id:"s201", no:"主线", t:"链路全景 + UUID 协同", dur:15, point:"第一次设置 vs 每次按键；App 与固件共用一个 UUID", link:"docs/第2课_跑通第一条AI硬件开发链路.md" },
    { id:"s202", no:"02-01~03", t:"读懂与基线（速览）", dur:10, point:"只读项目 → 先证原工程正常 → 找到按键到电脑的路径", link:"docs/第2课_跑通第一条AI硬件开发链路.md" },
    { id:"live2b", no:"📺", t:"20:00 第 2 课直播", dur:0, point:"跟直播走一遍 12 节点，重点听真机验证环节", link:"" }
  ]},
  { day:"2026-08-23", label:"周日 · 约 55 分钟", secs:[
    { id:"s203", no:"02-04~06", t:"协议与实现", dur:20, point:"冻结的 Host Action v1 交给 AI → 电脑先过检查 → 接入八个实体键", hw:"作业：记录你复刻流程的卡点", link:"docs/第2课_跑通第一条AI硬件开发链路.md" },
    { id:"s204", no:"02-07~09", t:"通道与构建", dur:15, point:"USB/BLE 同一动作不双发 → 能力声明 → 测试全过再生成固件", link:"docs/第2课_跑通第一条AI硬件开发链路.md" },
    { id:"s205", no:"02-10~12", t:"写入与真机验证", dur:20, point:"核 diff → 确认目标板写入 → 按键七项矩阵逐项打勾", hw:"作业：提交复刻结果与过程记录", link:"docs/第2课_跑通第一条AI硬件开发链路.md" }
  ]}
];

const DAY_PLANS = [...LESSON1_PLAN, ...LESSON2_PLAN];

// 生成某一天的小节卡数据；不传则取当前日期
function buildDayPlan(dateStr){
  const today = dateStr || new Date().toISOString().slice(0,10);
  const plans = DAY_PLANS.filter(p=>p.day===today);
  return plans.length ? plans[0] : null;
}

// 小节勾选状态存 LS_TASK（复用 tasks 存储键，id 即小节 id）
function isSecDone(id){ const st=getTasks(); return !!st[id]; }
