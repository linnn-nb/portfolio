import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';

const page = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const section = page.slice(page.indexOf('<section class="section" id="video-works">'), page.indexOf('<!-- ─── AUDIO WORKS ─── -->'));

test('新增视频置顶且卡片不显示 NEW', () => {
  const desserted = section.indexOf('爆牌魔女 · 实机音频系统');
  const guofeng = section.indexOf('国风游戏 PV · 音效与配乐');
  const fps = section.indexOf('FPS 游戏完整音频系统');

  assert.ok(desserted >= 0, '缺少爆牌魔女卡片');
  assert.ok(guofeng > desserted, '国风游戏 PV 必须排在爆牌魔女之后');
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
  assert.equal((page.match(/下载游戏音频简历/g) ?? []).length, 2);
  assert.equal((page.match(/href="胡锦霖 星海音乐学院 游戏音频实习生 27届毕业生\.docx"/g) ?? []).length, 2);
  assert.doesNotMatch(page, /href="胡锦霖 星海音乐学院 音频实习生 27届毕业生\.docx"/);
  assert.doesNotMatch(page, /href="胡锦霖简历\.docx"/);
  assert.match(page, /点击封面播放。/);
  assert.match(page, /@media \(hover: none\) \{\s*\.vplay \{ opacity:1; transform:scale\(1\); \}/);
});

test('爆牌魔女卡片提供音频设计文档下载', () => {
  const dessertedCard = section.slice(section.indexOf('<!-- V1: Desserted -->'), section.indexOf('<!-- V2: Chinese-style game PV -->'));

  assert.match(dessertedCard, /class="doc-dl" href="爆牌甜心_音频设计文档_v1\.0\.docx" download/);
  assert.match(dessertedCard, /音频设计文档/);
});
