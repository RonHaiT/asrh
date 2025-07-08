---
title: Uniapp搭建脚手架
published: 2025-03-21
description: "Uniapp搭建脚手架"
tags: ["Uniapp","小程序"]
category: Uniapp
draft: false
---
# Uniapp搭建脚手架

记得是四年前用Vue2搭建了一个脚手架用来开发小程序，使用到现在还是很稳定。这个脚手架开发了不下10个项目。但是技术是进步的，Vue2也不再更新，还是得跟上时代，所以PC端的项目都换了Vue3。

公司现在有个需求要兼容H5和小程序，因为之前的脚手架node版本很低，很多库已经不好兼容了，开发一个项目经常要切换node的版本才能运行也行麻烦。才有了今天的搭建兼容H5和小程序的vue3版本的uniapp

# 技术选型

- [Uniapp](https://uniapp.dcloud.net.cn/)
- [Vue3](https://cn.vuejs.org/)
- [uvui](https://www.uvui.cn/)

我不喜欢`HBuilderX`的体验，使用Uniapp都是用Cli的方式搭建运行，用Vscode来开发，之前老项目使用的是vue2版+uview来实现

vue3版本想着使用tdesign，但是H5和小程序是两个组件库，使用方式也不一样，网上找了办法说可以用小程序版来开发，地址https://northes.io/posts/uni-app/wx-components/，但是有的组件能用，一些有莫名的bug决定还是找一个ui组件就兼容小程序和H5的才好，找到uvui组件，算是uview的升级和延续

# Uniapp官方cli

官方地址：https://uniapp.dcloud.net.cn/quickstart-cli.html

# 安装uv-ui

```bash
npm i @climblee/uv-ui
```

- 在项目根目录pages.json中配置easycom：

  ```json
  // pages.json
  {
      "easycom": {
  		"autoscan": true,
  		"custom": {
  			"^uv-(.*)": "@climblee/uv-ui/components/uv-$1/uv-$1.vue"
  		}
  	},
      // 其他内容
      pages:[
          // ...
      ]
  }
  ```

# 安装sass

```bash
 npm i -D sass sass-loader
```

安装的时候我的node版本是 20.18.2，安装的sass版本太新报错，ui组件的语法不支持了

![image-20250321165952356](https://cdn.jsdelivr.net/gh/RonHaiT/Image-hosting/image-20250321165952356.png)

```bash
 # 指定版本
npm install sass@1.55.0 --save-dev
```

# 运行效果图

## H5

![image-20250321170126438](https://cdn.jsdelivr.net/gh/RonHaiT/Image-hosting/image-20250321170126438.png)

## 小程序

![image-20250321170148358](https://cdn.jsdelivr.net/gh/RonHaiT/Image-hosting/image-20250321170148358.png)

## web集成流播放

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script src="https://cdn.jsdelivr.net/npm/hls.js@1"></script>
  </head>
  <body>
    <video id="video" style="width: 100%; height: 800px"></video>
    <script>
      if (Hls.isSupported()) {
        var video = document.getElementById("video");
        var hls = new Hls();
        hls.on(Hls.Events.MEDIA_ATTACHED, function () {
          console.log("video and hls.js are now bound together !");
        });
        hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
          console.log(
            "manifest loaded, found " + data.levels.length + " quality level"
          );
        });
        hls.loadSource(
          "http://dbliveplay.xxx.cn/DaobaSportLiveAli/100_A0001_2025-03-28.m3u8?auth_key=xxx-100A0001-0-37032952ec51656ca09f5dc967a90fe3"
        );

        hls.attachMedia(video);
      }
    </script>
  </body>
</html>
```

## bug出现 

使用` ni.getImageInfo`怎么都获取不到图片的地址，打包后H5也不能访问

```js
const loadImage1 = async () => {
  try {
    uni.getImageInfo({
      src: "/static/img/animator/1.png",
      success: function (res) {
        console.log("success", res);
      },
      fail: function (err) {
        console.log("fail", err);
      },
      complete: function (err) {
        console.log("complete", err);
      },
    });
  } catch (error) {
    console.log(error);
  }
};
```

为了不在出现其它不可控制的bug，决定用`HBuilder X`来搭建一个，后期如果`app`开发也可以直接使用

# HBuilder X

下载最新的`HBuilder X`我的版本是4.57

![image-20250409142432681](https://cdn.jsdelivr.net/gh/RonHaiT/Image-hosting/image-20250409142432681.png)

## 基于uni-ui生成一个项目

![image-20250409142515201](https://cdn.jsdelivr.net/gh/RonHaiT/Image-hosting/image-20250409142515201.png)

## 安装uv-ui组件库

官方地址：https://www.uvui.cn/components/install.html，使用插件市场的下载插件并导入`HBuilderX`
引入样式

```css
/* APP.vue */
<style lang="scss">
	@import '@/uni_modules/uv-ui-tools/index.scss';
</style>
```

## 配置环境变量

三个文件在根目录：`.env.development`，`.env.production`，`.env`

```bash
#env.development
VITE_BASE_URL="http://192.168.2.131:100"
```

```bash
#.env.production
VITE_BASE_URL="https://2025.xxx.com/api"
```

## `Pinia`使用

[uni-app](https://uniapp.dcloud.net.cn/tutorial/vue3-pinia.html#%E7%8A%B6%E6%80%81%E7%AE%A1%E7%90%86-pinia) 内置了 [Pinia](https://pinia.vuejs.org/zh/index.html)

### 项目结构

```bash
├── pages
├── static
└── stores
    └── counter.js
├── App.vue
├── main.js
├── manifest.json
├── pages.json
└── uni.scss
```

在 `main.js` 中编写以下代码：

```js
// #ifdef VUE3
import { createSSRApp } from 'vue'
import * as Pinia from 'pinia';
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  app.use(Pinia.createPinia());
  return {
    app,
	Pinia
  }
}
// #endif
```

在项目根中运行命令

```bash
npm init -y
```

`HbuilderX`运行内置终端

![上传图片](https://cdn.jsdelivr.net/gh/RonHaiT/Image-hosting/image-20250409152210143.png)

### pinia-plugin-persistedstate

pinia持久化插件安装

```bash
npm i pinia-plugin-persistedstate
```

## luch-request

luch-request 是一个基于Promise 开发的uni-app跨平台、项目级别的请求库，它有更小的体积，易用的api，方便简单的自定义能力

官方文档https://www.quanzhan.co/luch-request/

### 安装

```bash
npm i luch-request -S
```

### 请求封装

`baseUrl.js`

```js
const getBaseUrl = () => {
  let isDev = import.meta.env.MODE === "development";
  let baseUrlObj = {
    baseUrl: import.meta.env.VITE_BASE_URL,
  };
  if (isDev) {
    // baseUrlObj.baseUrl = "/apilocal";
    //本地切换线上
    // baseUrlObj.baseUrl = "/apiline";
  }
  // console.log("baseUrl", baseUrlObj);

  return baseUrlObj;
};
const baseUrl = getBaseUrl();
export default baseUrl;

```

`config.js`

```js
import baseUrl from './baseUrl';
import mutual from '@/utils/util/mutual';
let header = {
    //   Authorization: authorize,
    'Content-Type': 'application/json; charset=UTF-8',
    // 'content-type': method === 'POST' ? 'application/json' : 'application/x-www-form-urlencoded', // 默认值,
};
export default {
    baseURL: baseUrl.baseUrl,
    header: header,
    method: 'GET',
    dataType: 'json',

    // #ifndef MP-ALIPAY
    responseType: 'text',
    // #endif

    // 注：如果局部custom与全局custom有同名属性，则后面的属性会覆盖前面的属性，相当于Object.assign(全局，局部)
    custom: { auth: false }, // 全局自定义参数默认值

    // #ifdef H5 || APP-PLUS || MP-ALIPAY || MP-WEIXIN
    timeout: 20000,
    // #endif

    // #ifdef APP-PLUS
    sslVerify: true,
    // #endif

    // #ifdef H5
    // 跨域请求时是否携带凭证（cookies）仅H5支持（HBuilderX 2.6.15+）
    withCredentials: false,
    // #endif

    // #ifdef APP-PLUS
    firstIpv4: false, // DNS解析时优先使用ipv4 仅 App-Android 支持 (HBuilderX 2.8.0+)
    // #endif

    // 全局自定义验证器。参数为statusCode 且必存在，不用判断空情况。
    validateStatus: (statusCode) => {
        if (statusCode == 400) mutual.showToast('参数错误');
        if (statusCode == 404) mutual.showToast('资源不存在');
        if (statusCode >= 500 && statusCode != 502) mutual.showToast('服务器错误');
        // statusCode 必存在。此处示例为全局默认配置
        return statusCode >= 200 && statusCode < 300;
    },
};
```

`requestjs`

```js
import Request from "luch-request";
import config from "./config";
import baseUrl from "./baseUrl";
import { useUserStore } from "@/stores/modules/user";
import { authLogin } from "@/http/modules/user.js";
const http = new Request(config);
let isRefreshing = false;
let refreshSubscribers = []; // 存储等待请求的回调

/**
 * 当 refreshToken 刷新成功后，重新执行挂起的请求
 */
function onRefreshed(token) {
  refreshSubscribers.forEach((callback) => callback(token));
  refreshSubscribers = []; // 清空等待队列
}

/**
 * 订阅 Token 刷新
 */
function subscribeTokenRefresh(callback) {
  refreshSubscribers.push(callback);
}

/**
 * 刷新 Token
 */
let refreshlogin = async function (refreshToken) {
  isRefreshing = true;
  const userStore = useUserStore();
  let data = {
    account: undefined,
    pwd: null,
    password: "",
    captchaVerification: null,
    clientId: "PcK8xDtgS11smvem",
    refreshToken: userStore.refreshToken,
    secret: "LjGaldZe66wTxIcz5d1iz4zV1TPVQnuJ",
    tokenType: "refresh",
  };

  try {
    let res = await authLogin(data);
    if (res.status == 0) {
      userStore.updateAccessToken(res.data);
      onRefreshed(res.data.access_token);
      isRefreshing = false;
      return res.data.access_token;
    } else {
      throw new Error("登录状态过期");
    }
  } catch (error) {
    console.log("刷新 token 失败", error);
    isRefreshing = false;
    refreshSubscribers = [];
    uni.showToast({ title: "登录状态过期", icon: "none" });
    setTimeout(() => {
      if (process.env.UNI_PLATFORM === "h5") {
        window.location.href = "/pages/user/login";
      } else {
        uni.navigateTo({ url: "/pages/user/login" });
      }
    }, 1000);
    return false;
  }
};
/**
 * 在请求之前拦截
 */
http.interceptors.request.use(
  async (config) => {
    const {
      custom: { auth },
    } = config;

    let userStore = useUserStore();
    let accessToken = userStore.accessToken;
    let refreshToken = userStore.refreshToken;
    let expiresIn = userStore.expiresIn;
    let timeStamp = Math.floor(new Date().getTime() / 1000);

    //没有登录
    if (auth && !accessToken) {
      console.log("没有登录，去登录");

      if (process.env.UNI_PLATFORM === "h5") {
        window.location.href = "/pages/user/login";
      } else {
        uni.navigateTo({ url: "/pages/user/login" });
      }
      return Promise.reject("未登录");
    }

    // 如果 Token 过期
    if (auth && accessToken && timeStamp > expiresIn - 30) {
      if (!isRefreshing) {
        console.log("登录过期重新获取", refreshToken);
        await refreshlogin();
      }
      return new Promise((resolve) => {
        subscribeTokenRefresh((newToken) => {
          config.header = {
            ...config.header,
            Authorization: newToken,
          };
          console.log("刷新成功,带token继续请求");
          resolve(http.request(config));
        });
      });
    } else {
      config.header = {
        ...config.header,
        Authorization: accessToken,
      };
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * 在请求之后拦截
 */
http.interceptors.response.use(
  (response) => {
    if (response.statusCode == 200) {
      return Promise.resolve(response.data);
    } else {
      return Promise.reject(response);
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default http;
```

`api.js`

```js
/**
 * 接口统一集成模块
 */
const requireComponent = require.context('./modules', false, /\.js$/) 
const modules = {}
requireComponent.keys().forEach(key => {
  const moduleName = key.replace(/(.*\/)*([^.]+).*/gi, '$2')
  const value = requireComponent(key)
  // 兼容ts
  modules[moduleName] = value
})

// 默认全部导出
export default modules
```

`modules/user.js`

```js
import http from "@/http/request";

/**
 * 用户登录
 * @returns {Promise | Promise<unknown>}
 */
export function authLogin(data = {}) {
  return http.post("/auth/oauth/noAuth/token", data, {
    custom: { auth: false },
  });
}

/**
 * 用户端直接上传到七牛，获取七牛的token
 * @returns {Promise | Promise<unknown>}
 */
export function fileUpToken() {
  return http.get("/match/file/getUpToken", {
    custom: { auth: false },
  });
}
```

