#!/bin/zsh
# 一键安装定时同步(在用户自己的终端里跑,沙箱无权操作 launchd)
set -e
PLIST_SRC="/Users/jack/Desktop/日常专用/AI 硬件学习台/scripts/cn.aihw.sync-qa.plist"
PLIST_DST="$HOME/Library/LaunchAgents/cn.aihw.sync-qa.plist"

mkdir -p "$HOME/Library/LaunchAgents"
cp "$PLIST_SRC" "$PLIST_DST"

# 已存在先卸载(幂等)
launchctl bootout gui/$(id -u)/cn.aihw.sync-qa 2>/dev/null || true
launchctl bootstrap gui/$(id -u) "$PLIST_DST"
launchctl enable gui/$(id -u)/cn.aihw.sync-qa

echo "✅ 定时任务已安装:每天 09:00 / 21:30 各同步一次答疑"
echo "   手动触发一次: launchctl kickstart gui/$(id -u)/cn.aihw.sync-qa"
echo "   查看日志:     tail -f ~/Desktop/日常专用/AI\ 硬件学习台/output/sync_qa.log"
echo "   卸载:         launchctl bootout gui/$(id -u)/cn.aihw.sync-qa && rm $PLIST_DST"
