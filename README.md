# lion1314.github.io

个人博客 · **https://lion1314.github.io/**

基于 **Hexo 8 + 自研主题 `aurora` + GitHub Actions** 自动部署。界面包含渐变 Hero、文章卡片流、侧栏信息卡、时间线归档、分类/标签云、浅色/深色切换、代码一键复制、文章目录，全响应式，且**不依赖任何 CDN、外部字体、第三方主题包或图片资源**。

## 首次上线前必做一次

Hexo 需要构建，不能再用「从分支部署」。到 GitHub 仓库：

**Settings → Pages → Build and deployment → Source 选 `GitHub Actions`**

> 线上目前仍是旧的 `Hello GitHub Pages` 占位页 —— 因为 `main` 分支现在放的是 Hexo 源码，必须由 Actions 生成静态文件再发布。改成 GitHub Actions 并 push 后才会变成新博客。

之后每次 push 到 `main`，`.github/workflows/pages.yml` 会自动执行 `npm ci → hexo generate → deploy-pages`，约 1–2 分钟上线。

## 本地开发

```bash
npm ci                # 首次安装依赖（依赖锁定在 package-lock.json）
npm run server        # 本地预览 http://localhost:4000
npm run build         # 生成静态文件到 public/
npm run clean         # 清理缓存与 public/
```

`public/`、`node_modules/`、`db.json` 已在 `.gitignore` 中，不要提交。

## 发一篇新文章

```bash
npm run new -- "文章标题"
```

或者在 `source/_posts/` 里手动新建 `title.md`（建议用英文短横线 slug，它会成为文章 URL 的一部分）：

```markdown
---
title: 文章标题
date: 2026-11-12 09:00:00
categories:
  - 技术笔记
tags:
  - 标签A
description: 一句话摘要，会显示在首页卡片上
---

正文用 Markdown 写……

<!-- more -->
```

| 字段 | 说明 |
| --- | --- |
| `title` | 标题 |
| `date` | `YYYY-MM-DD HH:mm:ss`，决定排序与 URL 里的 `/年/月/日/` 层级 |
| `categories` | 分类，生成 `/categories/` 下的分类页 |
| `tags` | 标签，生成 `/tags/` 下的标签页 |
| `description` | 首页卡片摘要；不写则自动截取正文开头 |

写完提交即可：

```bash
git add .
git commit -m "post: 文章标题"
git push
```

> `source/_posts/` 里现有的 3 篇是**示例文章**，用来展示界面，可以直接删掉。

## 定制外观

| 想改什么 | 改哪里 |
| --- | --- |
| 站名 / 副标题 / 描述 / 作者 / 站点地址 | `_config.yml` |
| 导航菜单、Hero 文案、侧栏简介、外链 | `themes/aurora/_config.yml` |
| 配色、间距、深色模式、响应式 | `themes/aurora/source/css/style.css` |
| 页面结构（首页 / 文章 / 归档 / 404） | `themes/aurora/layout/*.ejs` |
| 深浅色切换、复制代码、目录高亮 | `themes/aurora/source/js/main.js` |

## 目录结构

```
_config.yml                     Hexo 站点配置
package.json / package-lock     依赖与脚本
scaffolds/post.md               新建文章的模板
source/
  _posts/                      所有文章
  about/index.md               关于页
  categories/index.md          分类索引页
  tags/index.md                标签索引页
  404.html                     404 页
themes/aurora/
  _config.yml                  主题配置（文案 / 菜单 / 链接）
  layout/                      EJS 模板 + _partial/ 组件
  source/css/style.css         样式
  source/js/main.js            交互
  source/favicon.svg           站点图标
.github/workflows/pages.yml    自动构建与部署
```

## 生成物

站点会自动产出首页、文章页、归档、分类、标签、分页、`atom.xml`（订阅）、`sitemap.xml`（站点地图）与 `404.html`。
