---
title: Nuxt3配置
published: 2019-10-25
description: Nuxt3配置
tags: [Vue, Nuxt]
category: Nuxt
draft: false
---
# Nuxt3配置

## 全局变量

```bash
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  runtimeConfig: {
    apiSecret: '123',//服务端可以,客户端访问不了
    count: 1,
    public: { //public是服务和客户端都可以访问
      apiBase: '/api',
      baseUrl: 'localhost:8080'
    }
  },
})
```

## css配置

全局样式

```typescript
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  // css: ['~/assets/css/base.scss'],//全局引用,变量不行,需要在vite中引用
  runtimeConfig: {
    apiSecret: '123',
    count: 1,
    public: {
      apiBase: '/api',
      baseUrl: 'localhost:8080'
    }
  },
})

```

全局变量和样式

```typescript
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  // css: ['~/assets/css/base.scss'],//全局引用,变量不行,需要在vite中引用
  runtimeConfig: {
    apiSecret: '123',
    count: 1,
    public: {
      apiBase: '/api',
      baseUrl: 'localhost:8080'
    }
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/css/base.scss" as *;'
        }
      }
    }
  },
})

```

## 配置Antdv

安装

将 `@ant-design-vue/nuxt` 依赖项添加到项目中

```bash
# Using pnpm
pnpm add -D @ant-design-vue/nuxt

# Using yarn
yarn add --dev @ant-design-vue/nuxt

# Using npm
npm install --save-dev @ant-design-vue/nuxt
```

将 `@ant-design-vue/nuxt` 添加到 `nuxt.config.ts` 的 `modules` 部分

```bash
export default defineNuxtConfig({
  modules: [
    '@ant-design-vue/nuxt'
  ],
  antd:{
    // Options
  }
})
```

正常使用

```vue
<script setup lang="ts">
import { ref, reactive } from "vue";
</script>
<template>
  <div>
    <a-button>按钮</a-button>
  </div>
</template>

<style scoped lang="scss"></style>
```

## 获取系统环境

```bash
<script setup lang="ts">
if (import.meta.server) {
  console.log("服务端");
} else {
  console.log("客户端");
}
</script>
<template>
  <div>
    <h1>home</h1>
    <p>我是一个p标签</p>
  </div>
</template>

<style scoped lang="scss">
p {
  color: $mycolor;
}
</style>
```

## scss和less

安装

```bash
 npm install sass
 npm install less
```

nuxt.config.ts

```bash
  vite: {
    css: {
      preprocessorOptions: {
      //scss配置
        scss: {
          additionalData: '@use "~/assets/style/globle.scss" as *;'
        },
        //less配置
        less: {
          additionalData: '@import "~/assets/style/globle.less";'
        }
      }
    }
  },
```

## 响应式

### 安装插件

```bash
npm install  postcss-px-to-viewport autoprefixer
```

#### 配置

Postcss-px-to-viewport 是另一个 postcss 插件，其作用与 postcss-pxtorem 类似，都旨在解决响应式布局中单位的灵活性问题。然而，它的侧重点与后者略有不同，主要用来将 CSS 中的 px 单位转换为视口单位 (vw, vh, vmin, vmax)，从而实现基于视口大小的响应式布局。

在 nuxt.config.ts 配置 postcss

```typescript
  postcss: {
    plugins: {
      // 这个工具可以实现自动添加CSS3前缀
      autoprefixer: {
        overrideBrowserslist: ['last 5 version', '>1%', 'ie >=8'],
      },
      'postcss-px-to-viewport': {
        unitToConvert: 'px', // 要转化的单位
        viewportWidth: 1920, // UI设计稿的宽度
        unitPrecision: 6, // 转换后的精度，即小数点位数
        propList: ['*'], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
        viewportUnit: 'vw', // 指定需要转换成的视窗单位，默认vw
        fontViewportUnit: 'vw', // 指定字体需要转换成的视窗单位，默认vw
        selectorBlackList: [], // 指定不转换为视窗单位的类名,例如van-（vantUI组件），
        minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
        mediaQuery: true, // 是否在媒体查询的css代码中也进行转换，默认false
        replace: true, // 是否转换后直接更换属性值
        exclude: [/node_modules/], // 设置忽略文件，用正则做目录名匹配，最好不要排除node_modules 文件，排除后在项目中会发现字体不能跟随页面放大
        landscape: false, // 是否处理横屏情况
      },
    },
  },

```

## 适配2K 4k屏幕

把px转为rem

安装

```bash
npm i postcss postcss-html postcss-scss px2rem-loader --save-dev
npm i postcss-plugin-px2rem lib-flexible --save
```

配置文件

```typescript
const px2remOptions = {
  rootValue: 14,  //换算基数， 默认100 ,也就是1440px ，这样的话把根标签的字体规定为1rem为50px,这样就可以从设计稿上量出多少个px直接在代码中写多少px了
  unitPrecision: 5, //允许REM单位增长到的十进制数字，其实就是精度控制
  propWhiteList: [], // 默认值是一个空数组，这意味着禁用白名单并启用所有属性。
  propBlackList: [], // 黑名单
  exclude: false,  //默认false，可以（reg）利用正则表达式排除某些文件夹的方法，例如/(node_module)/ 。如果想把前端UI框架内的px也转换成rem，请把此属性设为默认值
  selectorBlackList: [], //要忽略并保留为px的选择器
  ignoreIdentifier: false, //（boolean/string）忽略单个属性的方法，启用ignoreidentifier后，replace将自动设置为true。
  replace: true, // （布尔值）替换包含REM的规则，而不是添加回退。
  mediaQuery: false, //（布尔值）允许在媒体查询中转换px
  minPixelValue: 0, //设置要替换的最小像素值(3px会被转rem)。 默认 0
}
```

nuxt.config.ts

```typescript
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/style/globle.scss" as *;'
        },
        less: {
          additionalData: '@import "~/assets/style/globle.less";'
        }
      },
      postcss: {
        plugins: [
          // 配置响应式插件
          require('postcss-plugin-px2rem')(px2remOptions)
        ],
      },
    },
  },
```

## 全局获取移动pc

### middleware

device.global.ts

```typescript
export default defineNuxtRouteMiddleware((to, from) => {
    // 打印调试信息
    const nuxtApp = useNuxtApp();
    // 获取用户代理字符串
    const userAgent = typeof window === 'undefined'
        ? (useRequestHeaders()?.['user-agent'] || '')
        : navigator.userAgent;

    // 检测是否为移动端
    const isMobile = /AppleWebKit.*Mobile.*/.test(userAgent);
    const deviceType = isMobile ? 'mobile' : 'pc';

    // 在 Nuxt 应用中提供设备类型
    nuxtApp.provide('deviceType', deviceType);

    console.log('当前设备类型:', deviceType);
});

```

### plugins

device-check.ts注册全局变量,可以直接使用

```typescript
// plugins/device-check.ts
import { defineNuxtPlugin } from '#app';

export default defineNuxtPlugin(nuxtApp => {
    // 创建一个全局混入
    nuxtApp.vueApp.mixin({
        computed: {
            deviceType() {
                console.log('创建一个全局混入');
                return nuxtApp.$deviceType;
            }
        }
    });
});
```

### 使用

```vue
<div>
      <p>当前设备类型: {{ $deviceType }}</p>
</div>
```

## 配置代理 

nuxt.config.ts

```typescript
  nitro: {
    devProxy: {
      "/api": {
        target: "http://127.0.0.1:5000", // 这里是接口地址
        changeOrigin: true,
        prependPath: true,
      },
    },
  },
```

使用

```vue
onMounted(async () => {
  const res = await $fetch("/api/login/");
  console.log("res", res);
});
```

## 国际化

安装

```bash
npx nuxi@latest module add i18n
或
npm install -D @nuxtjs/i18n
```

i18n.config.ts

```typescript
// import defineI18nConfig from "@nuxtjs/i18n"
async function loadMessages() {

  const [zhModule, enModule, twModule] = [
    await import('@/locales/zh.json'),
    await import('@/locales/en.json'),
    await import('@/locales/tw.json'),
  ]
  const [globalZHModule, globalTWModule, globalENModule] = [
    await import('~/i18n/locales/zh'),
    await import('~/i18n/locales/tw'),
    await import('~/i18n/locales/en'),
  ]
  const zhMessages = { ...zhModule.default, ...globalZHModule.default }
  const twMessages = { ...twModule.default, ...globalTWModule.default }
  const enMessages = { ...enModule.default, ...globalENModule.default }
  return {
    zh: zhMessages,
    en: enMessages,
    tw: twMessages
  }
}

export default defineI18nConfig(async () => ({
  legacy: false,
  locale: 'zh',
  messages: await loadMessages()
}));
```

config.ts

```typescript
export default {
    defaultLocale: 'zh',
    locales: ['zh', 'en'],
    vueI18n: './src/i18n/i18n.config.ts',
}
```

nuxt.config.ts

```typescript
import i18nConfig from '../../src/i18n/config';
export default defineNuxtConfig({
  ...
      i18n: i18nConfig,
  ...
})
```

### json配置

Types/global.d.ts

```typescript
declare module '*.json' {
    const value: any;
    export default value;
}
```

### locales

新建en.ts/zh.json

```json
{
  "home": "首页",
  "news": "资讯",
  "tournament": "赛事",
  "events": "活动",
  "products": "产品",
  "athletes": "运动员",
  "coaches": "教练",
  "referees": "裁判",
  "venues": "场馆",
  "community": "社区",
  "login": "登录",
  "search": "搜索",
  "language": "语言"
}
```

```typescript
export default {
    test: '测试',
    contactus: "联系我们",
    address: "公司地址"
}
```

新建en.ts/en.json

```json
{
  "home": "Home",
  "news": "News",
  "tournament": "Tournament",
  "events": "Events",
  "products": "Products",
  "athletes": "Athletes",
  "coaches": "Roaches",
  "referees": "Referees",
  "venues": "Venues",
  "community": "Community",
  "login": "Login",
  "search": "Search",
  "language": "Language"
}
```

```typescript
export default {
    test: 'Welcome1',
    contactus: "ContactUs",
    address: "Address"
}
```

新建en.ts/tw.json

```json
{
  "home": "首頁",
  "news": "資訊",
  "tournament": "賽事",
  "events": "活動",
  "products": "產品",
  "athletes": "運動員",
  "coaches": "教練",
  "referees": "裁判",
  "venues": "場館",
  "community": "社區",
  "login": "登入",
  "search": "搜尋",
  "language": "語言"
}
```

```typescript
export default {
    test: "測試",
    contactus: "聯繫我們",
    address: "公司地址"
}
```

## SVG

安装

文档:https://nuxtjs.org.cn/modules/nuxt-svgo

```bash
npm install nuxt-svgo --save-dev
```

配置

nuxt.config.ts

```basic
export default defineNuxtConfig({
...
  modules: ['@vant/nuxt', '@ant-design-vue/nuxt', '@nuxtjs/i18n', "nuxt-svgo"],
  svgo: {
        componentPrefix: 'svg', //指定组件前缀
        autoImportPath: './assets/svg/',//批量导入路径
  },
      ....
})
```

使用

```vue
<script setup lang="ts"></script>
<template>
  <div class="home">
    <svg-allow class="text-xl" />
   <svg-address class="text-rose-400" style="font-size: 60px" />
  </div>
</template>
```

## Nuxt路由

### 基本路由

在根目录新建pages目录,下面的会自动生成路由

```bash
├── nuxt.config.ts
├── package-lock.json
├── package.json
├── pages
│   ├── about.vue
│   ├── antdv.vue
│   ├── index.vue
│   ├── style.vue
│   └── user.vue
├── plugins
├── public
│   └── favicon.ico
├── server
│   └── tsconfig.json
└── tsconfig.json
```

会生成about,antdv,index,style,user路由,

### 跳转

```vue
<NuxtLink to="/">index页面</NuxtLink>
```

### 路由容器

```vue
<NuxtPage />
```

### 命名路由

```vue
├── pages
│   ├── about.vue
│   ├── antdv.vue
│   ├── index.vue
│   ├── style.vue
│   ├── user
│   │   ├── [test].vue //命名路由,pages下不能有user.vue,否则优先显示user.vue 访问http://localhost:3000/user/111
│   │   ├── login.vue
│   │   └── register.vue
│   └── user1111.vue
```

获取参数

```typescript
//访问http://localhost:3000/user/aaa 获取到aaa
<template>
  <div>命名路由测试</div>
</template>

<script lang="ts" setup>
const route = useRoute();
console.log(route.params.test);
</script>

<style></style>
```

### 可选路由

文件夹是[[]]包裹,访问参数可以不传

```bash
├── pages
│   ├── [[test]] //可选路由
│   │   └── edit.vue
│   ├── about.vue
│   ├── antdv.vue
│   ├── index.vue
│   ├── style.vue
│   ├── user //命名路由
│   │   ├── [test].vue
│   │   ├── login.vue
│   │   └── register.vue
│   └── user1111.vue
```

访问地址

```bash
http://localhost:3000/test/edit
或
http://localhost:3000/edit
```

### 嵌套路由

在根目录外创建文件夹同名路由文件如user.vue

```vue
<template>
  <div>user主页</div>
  <NuxtPage />
</template>

<script lang="ts" setup></script>

<style></style>
```

user文件夹下路由创建index.vue为user路由的主页,如果没有也是可以,上级的user.vue必须有  <NuxtPage />

```bash
├── pages
│   ├── [[test]]
│   │   └── edit.vue
│   ├── about.vue
│   ├── antdv.vue
│   ├── index.vue
│   ├── style.vue
│   ├── user
│   │   ├── [id].vue
│   │   ├── index.vue
│   │   ├── login.vue
│   │   └── register.vue
│   └── user.vue
```

### 中间件

根目录新建middleware/myjs

```js
export default defineNuxtRouteMiddleware((to, from) => {
  console.log(to.path);
});
```

about页面使用

```vue
<template>
  <div>about页面</div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: ["my"],
});
</script>

<style></style>
```

全局中间件

在middleware下命名为xx.global.js,可以配置多个,越小先执行,会自动执行

```js
export default defineNuxtRouteMiddleware((to, from) => {
  console.log(to.path);
});
```
