import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';

const page = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const section = page.slice(page.indexOf('<section class="section" id="video-works">'), page.indexOf('<!-- ─── AUDIO WORKS ─── -->'));

test('代表项目顺序保持不变且使用秋招项目名', () => {
  const desserted = section.indexOf('Desserted! 爆牌甜心 · 游戏音频全流程');
  const guofeng = section.indexOf('国风游戏 PV · 个人音效与配乐练习');
  const fps = section.indexOf('FPS 原型 · Wwise 交互音频系统');

  assert.ok(desserted >= 0, '缺少 Desserted! 爆牌甜心卡片');
  assert.ok(guofeng > desserted, '国风游戏 PV 必须排在 Desserted! 爆牌甜心之后');
  assert.ok(fps > guofeng, '原有 FPS 项目必须排在两个新增项目之后');
  assert.doesNotMatch(section, /NEW/);
});

test('作品卡片使用封面图并按点击加载视频', () => {
  assert.equal((section.match(/data-video="video\//g) ?? []).length, 5);
  assert.equal((section.match(/<img /g) ?? []).length, 5);
  assert.doesNotMatch(section, /<video src=/);
  assert.match(page, /const videoSrc\s*=\s*btn\.closest\('\.vthumb'\)\.dataset\.video;/);
  assert.match(page, /<video id="vlightbox-video"[^>]*preload="metadata"[^>]*playsinline[^>]*><\/video>/);
});

test('求职入口和移动端播放提示清晰', () => {
  assert.equal((page.match(/下载实习版简历/g) ?? []).length, 2);
  assert.equal((page.match(/href="胡锦霖 星海音乐学院 游戏音频实习生 27届毕业生\.docx"/g) ?? []).length, 2);
  assert.doesNotMatch(page, /href="胡锦霖 星海音乐学院 音频实习生 27届毕业生\.docx"/);
  assert.doesNotMatch(page, /href="胡锦霖简历\.docx"/);
  assert.match(page, /点击封面播放。/);
  assert.match(page, /2027 届秋招/);
  assert.match(page, /@media \(hover: none\) \{\s*\.vplay \{ opacity:1; transform:scale\(1\); \}/);
});

test('Desserted 卡片提供音频设计文档下载', () => {
  const dessertedCard = section.slice(section.indexOf('<!-- V1: Desserted -->'), section.indexOf('<!-- V2: Chinese-style game PV -->'));

  assert.match(dessertedCard, /class="doc-dl" href="爆牌甜心_音频设计文档_v1\.0\.docx" download/);
  assert.match(dessertedCard, /音频设计文档/);
  assert.match(dessertedCard, />Music</);
  assert.match(dessertedCard, />SFX</);
  assert.doesNotMatch(dessertedCard, />Wwise</);
  assert.doesNotMatch(dessertedCard, />Profiler</);
});

test('声音重设计练习不冒充引擎接入项目', () => {
  const rainCard = section.slice(section.indexOf('<!-- V5: Rain city -->'));

  assert.match(rainCard, />Sound Design</);
  assert.match(rainCard, />Ambience</);
  assert.doesNotMatch(rainCard, />Wwise</);
});

test('全站经历、成果和职责边界与秋招简历一致', () => {
  assert.match(page, /腾讯光子工作室/);
  assert.match(page, /太合音乐—GVO 工作室/);
  assert.match(page, /11 首 BGM/);
  assert.match(page, /39 个 SFX/);
  assert.equal((page.match(/个人声音重设计练习 · 非官方项目/g) ?? []).length, 2);
  assert.doesNotMatch(page, /成都星线传媒/);
  assert.doesNotMatch(page, /目前正在寻找.*实习岗位/);
  assert.doesNotMatch(page, /独立负责编曲/);
  assert.match(page, /当前试听曲目为《All Money Back My Home》/);
});
