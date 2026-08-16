# Autumn Recruitment Portfolio Copy Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将现有作品集文字更新为与当前秋招简历一致的招聘证据型文案，同时保持布局、媒体与交互不变。

**Architecture:** 只修改单页 `index.html` 中的可见文字、无障碍标签和页面标题，并同步更新现有 Node 文本回归测试。沿用当前 HTML、CSS 和 JavaScript，不增加组件或页面。

**Tech Stack:** HTML、CSS、原生 JavaScript、Node.js `node:test`

---

### Task 1: 更新文案回归测试

**Files:**
- Modify: `test/video-works.test.mjs`

- [ ] **Step 1: 将旧项目名、旧求职口径和旧职责断言替换为秋招文案断言**

断言必须覆盖《Desserted! 爆牌甜心》、腾讯光子、太合音乐—GVO、2027届秋招、个人非官方练习标识，以及旧公司和旧实习口径不存在；现有简历下载文件保持不变。

- [ ] **Step 2: 运行测试，确认新断言先失败**

Run: `node --test test/video-works.test.mjs`

Expected: 文案相关测试失败，媒体数量与延迟加载测试继续通过。

### Task 2: 更新全站文字

**Files:**
- Modify: `index.html`

- [ ] **Step 1: 更新页面标题、导航、首屏、关于、技能和秋招状态**

保留全部元素、class、id、href和脚本，只替换可见文字。

- [ ] **Step 2: 更新五个视频项目和三个音频作品的标题、描述与无障碍文本**

所有描述使用“项目性质—个人动作—结果”的短句结构；非官方练习必须明确说明。

- [ ] **Step 3: 运行完整测试**

Run: `node --test test/video-works.test.mjs`

Expected: 6 tests pass, 0 tests fail.

- [ ] **Step 4: 启动本地静态服务器并检查页面**

Run: `python3 -m http.server 4173`

Expected: 页面可访问；首屏、关于、代表项目、音乐制作与联系区正常显示；五个视频、三个音频和两个文档入口仍存在。
