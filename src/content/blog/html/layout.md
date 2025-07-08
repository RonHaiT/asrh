---
title: HTML之页面结构
published: 2019-02-03
description: "HTML之页面结构"
tags: ["html"]
category: HTML
draft: false
---

# 页面结构

## 语义标签

HTML 标签都有具体语义，非然技术上块级元素可以使用 div 标签和行内元素 span 标签表示大部分内容，但选择清晰的语义标签更容易让人看明白。比如 `h1`表示标题、`p`标签表示内容、强调内容使用`em`标签。

## 嵌套关系

元素可以互相嵌套包裹，即元素存在父子级关系,祖级关系,程序也是人发明的可以使用人的关系来理解

如:兄弟关系,父子关系,祖孙关系,祖辈关系等

```html
<main>
  <header>
    <label>
      <div class="icon"></div>
      <input type="checkbox" hidden />
    </label>
  </header>
  <menu>
    <ul>
      <li><i class="fa fa-regular fa-user"></i>user</li>
      <li><i class="fa fa-solid fa-list"></i>list</li>
      <li><i class="fa fa-brands fa-stack-overflow"></i>stack-overflow</li>
      <li><i class="fa fa-regular fa-heart"></i>paper plane</li>
      <li><i class="fa fa-solid fa-sliders"></i> sliders</li>
    </ul>
  </menu>
</main>
```

## 基本结构

下面是 HTML 文档的基本组成部分

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>隆海</title>
  </head>
  <body></body>
</html>
```

| 标签        | 说明                                              |
| ----------- | ------------------------------------------------- |
| DOCTYPE     | 声明为 HTML 文档                                  |
| html        | lang:网页的语言，如 en/zh 等，非必选项目          |
| head        | 文档说明部分，对搜索引擎提供信息或加载 CSS、JS 等 |
| title       | 网页标题                                          |
| keyword     | 向搜索引擎说明你的网页的关键词                    |
| description | 向搜索引擎描述网页内容的摘要信息                  |
| body        | 页面主体内容                                      |

## 内容标题

标题使用 `h1 ~ h6` 来定义，用于突出显示文档内容。

- 从 h1 到 h6 对搜索引擎来说权重会越来越小
- 页面中最好只有一个 h1 标签
- 标题最好不要嵌套如 h1 内部包含 h2

## 页眉页脚

### Header

header 标签用于定义文档的页眉，下图中的红色区域都可以使用`header`标签构建。

### footer

footer 标签定义文档或节的页脚，页脚通常包含文档的作者、版权信息、使用条款链接、联系信息等等。

## 导航元素

在 HTML 中使用`nav`设置导航链接。

## 主要区域

HTML5 中使用 `main` 标签表示页面主要区域，一个页面中`main`元素最好只出现一次。

## 内容区域

使用 `article` 标签规定独立的自包含内容区域。不要被单词的表面意义所局限，`article` 标签表示一个独立的内容容器。

## 区块定义

使用 `section` 定义一个区块，一般是一组相似内容的排列组合。

## 附加区域

使用 `aside` 用于设置与主要区域无关的内容，比如侧面栏的广告等。

## 通用容器

`div` 通用容器标签是较早出现的，也是被大多数程序员使用最多的容器。不过我们应该更倾向于使用有语义的标签如`article/section/aside/nav` 等。

有些区域这些有语义的容器不好表达，这时可以采用`div`容器，比如轮播图效果中的内容