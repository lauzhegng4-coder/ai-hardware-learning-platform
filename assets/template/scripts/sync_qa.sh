#!/bin/zsh
# AI 硬件学习台 · 在线答疑定时同步
# 拉取飞书 wiki 答疑文档 → 与本地比对 → 有变化才覆盖 + 记日志
# 用法: ./sync_qa.sh [--force]
# 依赖: lark-cli(已登录)

set -euo pipefail

DIR="$(cd "$(dirname "$0")/.." && pwd)"
DOCS="$DIR/public/docs"
LOG="$DIR/output/sync_qa.log"
TMP_RAW="$(mktemp)"
TMP_NEW="$(mktemp)"
trap 'rm -f "$TMP_RAW" "$TMP_NEW"' EXIT

# 答疑源(飞书 wiki)与本地目标
WIKI_URL="https://waytoagi.feishu.cn/wiki/Hnqcw8gY5iLBkskE0E5ci8mDnle"
LOCAL_MD="$DOCS/AI硬件_在线答疑文档_第2课.md"
TITLE="<title>AI硬件在线答疑(含第二课)</title>"

mkdir -p "$DIR/output"
log(){ echo "[$(date '+%F %T')] $*" >> "$LOG"; }

log "=== 同步开始 ==="

# 1) 拉取
if ! lark-cli docs +fetch --doc "$WIKI_URL" --doc-format markdown > "$TMP_RAW" 2>>"$LOG"; then
  log "FAIL lark-cli 拉取失败"
  exit 1
fi

# 2) 解析 content
node_bin="/Users/jack/.workbuddy/binaries/node/versions/22.22.2/bin/node"
"$node_bin" -e '
const fs=require("fs");
const j=JSON.parse(fs.readFileSync(process.argv[1],"utf8"));
if(!j.ok){console.error("API 返回 !ok");process.exit(1)}
const c=j.data.document.content;
let out=c;
if(!c.startsWith("<title>")) out="<title>AI硬件在线答疑(含第二课)</title>\n\n"+c;
fs.writeFileSync(process.argv[2],out);
' "$TMP_RAW" "$TMP_NEW" || { log "FAIL JSON 解析失败"; exit 1; }

# 3) 比对
if [[ "${1:-}" == "--force" ]] || ! diff -q "$LOCAL_MD" "$TMP_NEW" >/dev/null 2>&1; then
  SIZE=$(wc -c < "$TMP_NEW" | tr -d ' ')
  cp "$TMP_NEW" "$LOCAL_MD"
  log "UPDATE 已写入 ${SIZE}B → $LOCAL_MD"
  echo "updated"
else
  log "SKIP 无变化"
  echo "no-change"
fi
