---
title: 用 Hexo 搭一个趁手的博客
date: 2026-11-05 20:10:00
categories:
  - 开发者工具
tags:
  - Hexo
  - GitHub Pages
  - 教程
description: 从零到自动部署：源码留在仓库，GitHub Actions 负责生成静态文件并发布，本地只管写 Markdown。
---

> 示例文章，用来演示代码块、表格、列表与标题层级在实际文章里的样子。

这套站点用的是 Hexo + 自定义主题，源码在 `main` 分支，静态页面由 GitHub Actions 构建后发布。

<!-- more -->

## 目录长什么样

```text
_config.yml            站点配置
package.json           依赖与命令
source/_posts/         所有文章（Markdown）
themes/aurora/         自研主题（EJS + CSS + JS）
.github/workflows/     自动构建与部署
```

## 发一篇文章

用脚手架创建，比手写文件名省心：

```bash
npm run new -- "我的新文章"
```

生成的 front matter 长这样：

```yaml
---
title: 我的新文章
date: 2026-11-05 20:10:00
categories:
  - 开发者工具
tags:
  - Hexo
description: 一句话摘要，会显示在首页卡片上
---
```

写完正文，在需要截断的位置插入 `<!-- more -->`，然后：

```bash
git add .
git commit -m "post: 我的新文章"
git push
```

## 发布链路

| 阶段 | 谁来做 | 产出 |
| --- | --- | --- |
| 写作 | 你 | `source/_posts/*.md` |
| 构建 | GitHub Actions | `public/` 静态文件 |
| 发布 | deploy-pages | 线上站点 |

> 关键前提：仓库 Settings → Pages 的 Source 要选 **GitHub Actions**，而不是「从分支部署」。否则 Actions 生成的产物不会被发布。

## 想换外观

- 文案、导航、Hero 文字：`themes/aurora/_config.yml`
- 颜色、间距、深色模式：`themes/aurora/source/css/style.css`
- 页面结构：`themes/aurora/layout/*.ejs`

没有外部字体、没有 CDN、没有第三方主题包，改起来不用先读懂别人的框架。
