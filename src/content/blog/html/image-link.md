---
title: HTML之图片与链接
published: 2019-01-15
description: "HTML之图片与链接"
tags: ["html"]
category: HTML
draft: false
---

# 图片与链接

## 图片处理

### 图像格式

- 网络带宽成本很高，图片处理在保证用户体验好的前提下，文件尺寸也要尽可能小
- 图片属性静态文件，不要放在 WEB 服务器上，而放在云储存服务器上并使用 CDN 加速
- 以 JPEG 类型优先使用，文件尺寸更小
- 小图片使用 PNG，清晰度更高，因为文件尺寸小，文件也不会太大
- 网页图标建议使用 css 字体构建如 [iconfont](https://www.iconfont.cn/) [iconpark](https://iconpark.oceanengine.com/home)或 [fontawesome](https://fontawesome.com/icons?d=gallery)等

|      |                                                              |      |
| ---- | ------------------------------------------------------------ | ---- |
| 格式 | 说明                                                         | 透明 |
| PNG  | 无损压缩格式，适合图标、验证码等。有些小图标建议使用 css 字体构建。<br />对于无损压缩静态图像而言是不错的选择（质量略好于 JPEG）。 | 支持 |
| GIF  | 256 色，可以产生动画效果（即 GIF 动图）                      | 支持 |
| JPEG | 有损压缩的类型，如商品、文章的图片展示                       |      |
| Webp | 同时提供了有损压缩与无损压缩的图片文件格式<br />由[谷歌](https://baike.baidu.com/item/谷歌/117920?fromModule=lemma_inlink)于 2010 年推出的新一代[图片格式](https://baike.baidu.com/item/图片格式/381122?fromModule=lemma_inlink)，在压缩方面比当前[JPEG 格式](https://baike.baidu.com/item/JPEG格式/3462770?fromModule=lemma_inlink)更优越。支持图像和动画 | 支持 |
| Svg  | 矢量图像格式。用于必须以不同尺寸准确描绘的图像。             | 支持 |

### 使用图片

在网页中使用 `img` 标签展示图片，图片的大小、边框、倒角效果使用 css 处理。

```html
<img src="wslh.png" alt="大竹子" />
```

| 属性   | 说明                                                         |
| ------ | ------------------------------------------------------------ |
| src    | 属性是**必须的**，它包含了你想嵌入的图片的路径               |
| alt    | 属性包含一条对图像的文本描述，这不是强制性的，但对无障碍而言，它**难以置信地有用** |
| width  | 图像的宽度，以像素为单位。必须是没有单位的整数。             |
| height | 图像的固有高度，以像素为单位。必须是没有单位的整数值         |

## 网页链接

不能通过一个页面展示网站的所有功能，需要在不同页面中跳转，这就是链接所起到的功能。

```html
<a href="http://www.dazhuzi.com" target="_blank" title="大竹子"
  >大竹子个人站点</a
>
```

| 项     | 说明                                                         |
| ------ | ------------------------------------------------------------ |
| href   | 超链接所指向的 URL。                                         |
| target | 该属性指定在何处显示链接的 URL，作为*浏览上下文*的名称<br />`_self`：当前页面加载。（默认）<br />`_blank`：通常在新标签页打开，但用户可以通过配置选择在新窗口打开。<br />`parent`：当前浏览环境的父级浏览上下文。如果没有父级框架，行为与 `_self` 相同。<br />`_top`：最顶级的浏览上下文（当前浏览上下文中最“高”的祖先）。如果没有祖先，行为与 `_self` 相同。 |
| title  | 链接提示文本                                                 |

### 打开窗口

下面设置 target 属性在指定窗口打开。

```html
<a href="https://www.dazhuzi.com" target="wslh"> 在新窗口中打开 </a>
<script>
  window.open("https://www.dazhuzi.com", "wslh");
</script>
```

### 锚点链接

锚点可以设置跳转到页面中的某个部分。

1. 为元素添加`id` 属性来设置锚点

2. 设置 `a` 标签的 `href` 属性(#属性名)

   ```html
   <!DOCTYPE html>
   <html lang="z">
     <head>
       <meta charset="UTF-8" />
       <meta name="viewport" content="width=device-width, initial-scale=1.0" />
       <title>dazhuzi</title>
       <style>
         .d1 {
           height: 800px;
         }
         .d2 {
           height: 300px;
         }
       </style>
     </head>
     <body>
       <div class="d1">
         <a id="d1" href="#d3">D1</a>
       </div>
       <div class="d2">
         <a id="d2" href="#d1">D2</a>
       </div>
       <div>
         <a id="d3" href="#d1">D3</a>
       </div>
     </body>
   </html>
   ```

### 邮箱链接

除了页面跳转外可以指定其他链接。使用以下方式也有缺点，邮箱可能会被恶意用户采集到，所以有些用户使用 `pythl#foxmail.com` 然后提示用户 `请将#改为@后发邮件`的提示形式。

```html
<a href="mailto:282484351@qq.com">给dazhuzi发送邮件</a>
```

### 拨打电话

点击以下链接后，手机会询问用户是否拨打电话。

```html
<a href="tel:13888888888">联系客服</a>
```

### 下载文件

默认情况下使用链接可以下载浏览器无法处理的文件，如果下载图片需要后台语言告之浏览器`mime`类型