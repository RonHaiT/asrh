---
title: Astro博客系统搭建
published: 2025-04-20
description: Astro博客系统搭建
tags: [SSG,Astro]
category: Tools
draft: false
---
# 安装Astro

```bash
pnpm create astro@latest astro-preline
```

安装依赖

```bash
pnpm i
```

# 集成 Vue

```bash
pnpm astro add vue
```

全部选择同意，如下图：

![image-20250418223754571](https://cdn.jsdelivr.net/gh/RonHaiT/Image-hosting/image-20250418223754571.png)

# 集成 Tailwind CSS

[官方集成文档](https://tailwindcss.com/docs/installation/framework-guides/astro)

## 安装依赖

```bash
pnpm install tailwindcss @tailwindcss/vite
```

## astro.config.mjs

```bash
// @ts-check
import { defineConfig } from "astro/config";
+ import tailwindcss from "@tailwindcss/vite";
// https://astro.build/config
export default defineConfig({
+ vite: {
+    plugins: [tailwindcss()],
+  },
});
```

## 导入 Tailwind CSS

创建一个`./src/styles/global.css`文件并添加`@import`Tailwind CSS。

```bash
@import "tailwindcss";
```

## 开始在你的项目中使用 Tailwind

```bash
---
import "../styles/global.css";
---
<h1 class="text-3xl font-bold underline">
  Hello world!
</h1>
```

## 运行测试

在 index.astro 中加入以下代码

```bash
<h1 class="text-3xl font-bold text-blue-600">Hello Tailwind + Astro + Naive UI!</h1>
```

```bash
pnpm dev
```

# preline UI

## 安装preline

```bash
pnpm install preline
```

> [!tip]
>
> 请注意，Preline UI 在所有表单组件中都使用了[Tailwind CSS Forms](https://github.com/tailwindlabs/tailwindcss-forms)插件。如果您还没有安装，请不要忘记安装：`pnpm install -D @tailwindcss/forms`

## 增加Preline CSS

在您的文件中包括 Preline `global.css`，例如`projects_root_directory/src/styles/global.css`。

```css
@import "tailwindcss";

@import "preline/variants.css";
@source "../../node_modules/preline/dist/*.js";

/* Optional Preline UI Datepicker Plugin */
/* @import "preline/src/plugins/datepicker/styles.css"; */

/* Plugins */
/* @plugin "@tailwindcss/forms"; */
```

## 添加 Preline UI JavaScript

将 Preline UI JavaScript 包含到文件中。 `projects_root_directory/src/layouts/Layout.astro`

```html
---
import "../styles/global.css";
---

<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width" />
    <meta name="generator" content={Astro.generator} />
    <title>Astro</title>
  </head>
  <body>
    <h1>Astro</h1>
    <h1 class="text-3xl font-bold underline">Hello world!</h1>
    <h1 class="text-3xl font-bold text-blue-600">
      Hello Tailwind + Astro + Naive UI!
    </h1>
    <div class="hs-accordion-group">
      <div class="hs-accordion active" id="hs-basic-heading-one">
        <button
          class="hs-accordion-toggle hs-accordion-active:text-blue-600 py-3 inline-flex items-center gap-x-3 w-full font-semibold text-start text-gray-800 hover:text-gray-500 focus:outline-hidden focus:text-gray-500 rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:hs-accordion-active:text-blue-500 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400"
          aria-expanded="true"
          aria-controls="hs-basic-collapse-one"
        >
          <svg
            class="hs-accordion-active:hidden block size-3.5"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M5 12h14"></path>
            <path d="M12 5v14"></path>
          </svg>
          <svg
            class="hs-accordion-active:block hidden size-3.5"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M5 12h14"></path>
          </svg>
          Accordion #1
        </button>
        <div
          id="hs-basic-collapse-one"
          class="hs-accordion-content w-full overflow-hidden transition-[height] duration-300"
          role="region"
          aria-labelledby="hs-basic-heading-one"
        >
          <p class="text-gray-800 dark:text-neutral-200">
            <em>This is the third item's accordion body.</em> It is hidden by default,
            until the collapse plugin adds the appropriate classes that we use to
            style each element. These classes control the overall appearance, as
            well as the showing and hiding via CSS transitions.
          </p>
        </div>
      </div>

      <div class="hs-accordion" id="hs-basic-heading-two">
        <button
          class="hs-accordion-toggle hs-accordion-active:text-blue-600 py-3 inline-flex items-center gap-x-3 w-full font-semibold text-start text-gray-800 hover:text-gray-500 focus:outline-hidden focus:text-gray-500 rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:hs-accordion-active:text-blue-500 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400"
          aria-expanded="false"
          aria-controls="hs-basic-collapse-two"
        >
          <svg
            class="hs-accordion-active:hidden block size-3.5"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M5 12h14"></path>
            <path d="M12 5v14"></path>
          </svg>
          <svg
            class="hs-accordion-active:block hidden size-3.5"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M5 12h14"></path>
          </svg>
          Accordion #2
        </button>
        <div
          id="hs-basic-collapse-two"
          class="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
          role="region"
          aria-labelledby="hs-basic-heading-two"
        >
          <p class="text-gray-800 dark:text-neutral-200">
            <em>This is the third item's accordion body.</em> It is hidden by default,
            until the collapse plugin adds the appropriate classes that we use to
            style each element. These classes control the overall appearance, as
            well as the showing and hiding via CSS transitions.
          </p>
        </div>
      </div>

      <div class="hs-accordion" id="hs-basic-heading-three">
        <button
          class="hs-accordion-toggle hs-accordion-active:text-blue-600 py-3 inline-flex items-center gap-x-3 w-full font-semibold text-start text-gray-800 hover:text-gray-500 focus:outline-hidden focus:text-gray-500 rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:hs-accordion-active:text-blue-500 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400"
          aria-expanded="false"
          aria-controls="hs-basic-collapse-three"
        >
          <svg
            class="hs-accordion-active:hidden block size-3.5"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M5 12h14"></path>
            <path d="M12 5v14"></path>
          </svg>
          <svg
            class="hs-accordion-active:block hidden size-3.5"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M5 12h14"></path>
          </svg>
          Accordion #3
        </button>
        <div
          id="hs-basic-collapse-three"
          class="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
          role="region"
          aria-labelledby="hs-basic-heading-three"
        >
          <p class="text-gray-800 dark:text-neutral-200">
            <em>This is the third item's accordion body.</em> It is hidden by default,
            until the collapse plugin adds the appropriate classes that we use to
            style each element. These classes control the overall appearance, as
            well as the showing and hiding via CSS transitions.
          </p>
        </div>
      </div>
    </div>
    <!-- Optional plugins通过 Preline UI 引入的方式，官方的这个不行 -->
  <script is:inline src="./assets/vendor/jquery/dist/jquery.min.js"></script>
  <script is:inline src="./assets/vendor/lodash/lodash.js"></script>
  <script is:inline src="./assets/vendor/datatables.net/js/dataTables.min.js"
  ></script>
  <script is:inline src="./assets/vendor/dropzone/dist/dropzone-min.js"></script>
  <script is:inline src="./assets/vendor/nouislider/dist/nouislider.min.js"
  ></script>
  <script is:inline src="./assets/vendor/vanilla-calendar-pro/index.js"></script>
    <!-- Preline UI -->
    <script>
      import "preline/dist/preline.js";
    </script>
  </body>
</html>
```

# daisyUI

## 安装 daisyUI

```bash
pnpm add tailwindcss@latest @tailwindcss/vite@latest daisyui@latest
```

## astro.config.mjs

```bash
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
});
```

## src/assets/css/app.css

```bash
@import "tailwindcss";
@plugin "daisyui";
```

## src/layouts/Layout.astro

```bash
---
import "../assets/app.css";
---
```

## 暗黑模式

```html
---
// ThemeToggle.astro
---

<label class="swap swap-rotate">
  <!-- this hidden checkbox controls the state -->
  <input type="checkbox" class="theme-controller" value="synthwave" />

  <!-- sun icon -->
  <svg
    class="swap-off h-6 w6 fill-current"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
  >
    <path
      d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"
    ></path>
  </svg>

  <!-- moon icon -->
  <svg
    class="swap-on h-6 w-6 fill-current"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
  >
    <path
      d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"
    ></path>
  </svg>
</label>
<!-- @ts-ignore -->
<script is:global>
  document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.querySelector(".theme-controller");
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme) {
      document.documentElement.setAttribute("data-theme", savedTheme);
      toggle.checked = savedTheme === "dark";
    }

    toggle.addEventListener("change", () => {
      const newTheme = toggle.checked ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);
    });
  });
</script>
```

# Giscus 评论

- 首先，你需要创建一个新的GitHub库用来“装下”博客的那些评论，你需要确保该仓库是[公开的](https://docs.github.com/en/github/administering-a-repository/managing-repository-settings/setting-repository-visibility#making-a-repository-public),否则访客将无法查看 discussion。
- 然后，你需要给你的这个仓库repo安装[giscus app](https://github.com/apps/giscus),否则访客将无法评论和回应
- 最后，你需要确保 Discussions 功能[已在你的仓库中启用](https://docs.github.com/en/github/administering-a-repository/managing-repository-settings/enabling-or-disabling-github-discussions-for-a-repository)。[官方说明](https://docs.github.com/zh/discussions/quickstart)



打开giscus官方网站[https://giscus.app/](https://giscus.app/zh-CN)，进行配置：

- 语言：选择你目前正在使用的语言（一般应该都是简中吧？）
- 仓库：填写你刚刚创建的仓库（格式为`你的用户名/仓库名`）
- 页面 ↔️ discussion 映射关系(默认即可)
- Discussion 分类（默认即可）
- 特性（默认即可）
- 主题（默认即可）



按照顺序配置好之后，下方会自动生成

```js
<script src="https://giscus.app/client.js"
        data-repo="用户名/仓库名"
        data-repo-id="[在此输入仓库 ID]"
        data-category="[在此输入分类名]"
        data-category-id="[在此输入分类 ID]"
        data-mapping="pathname"
        data-strict="0"
        data-reactions-enabled="1"
        data-emit-metadata="0"
        data-input-position="top"
        data-theme="light_tritanopia"
        data-lang="zh-CN"
        data-loading="lazy"
        crossorigin="anonymous"
        async>
</script>
```

> 关于页面，归档页面同理，修改对应的如`about.astro，posts.astro，archive.astro，index.astro，`即可



 
