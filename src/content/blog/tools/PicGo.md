---
title: Markdown图床设置
published: 2019-01-11
description: Markdown图床设置
tags: [Markdown]
category: Tools
draft: false
---

# Markdown 图床设置

## 下载软件 PicGo

官方下载地址：

- Github 地址：[Release 2.3.0 · Molunerfinn/PicGo · GitHub](https://github.com/Molunerfinn/PicGo/releases/tag/v2.3.0)
- 官方地址：[PicGo (molunerfinn.com)](https://molunerfinn.com/PicGo/)

选择自己的操作文件下载,安装即可

# 配置七牛云图床

- 注册七牛云：[七牛云(qiniu.com)](https://www.qiniu.com/)，完成认证

  - 注册域名，绑定域名，解析 CNAME

- 配置 PicGo

  - 第一项设定 AK：七牛云我的个人中心=>密钥管理=>AK
  - 第二项设定 SK：七牛云我的个人中心=>密钥管理=>SK
  - 第三项存储空间名：七牛云对象存储=>空间管理=>空间名
  - 第四项域名：七牛云=>CDN=>域名管理=>域名
  - 默认存储区域：[配置手册 | PicGo](https://picgo.github.io/PicGo-Doc/zh/guide/config.html#七牛图床)查看对应的值填写即可

  ![image-20231109163515517](https://cdn.jsdelivr.net/gh/RonHaiT/Image-hosting/image-20231109163515517.png)

## 配置 Markdown

- 打开偏好设置

  ![image-20231109163543362](https://cdn.jsdelivr.net/gh/RonHaiT/Image-hosting/image-20231109163543362.png)

- 找到图像=>上传服务设定=>选择 PicGo.app=>验证图片上传选项

  ![image-20231109163557899](https://cdn.jsdelivr.net/gh/RonHaiT/Image-hosting/image-20231109163557899.png)

- 验证成功

- Markdown 的文档图片可以选择右键上传到 PicGo

# 配置github图床

设置的七牛云的仓库如何遇到爬虫会把流量用超,产生费用,觉得自己搞一个github图床更稳当,也方便使用

## 新建一个github仓库,设置为公开库


![image-20250326210921168](https://cdn.jsdelivr.net/gh/RonHaiT/Image-hosting/image-20250326210921168.png)

## 新建github的访问token 

设定的自定义域名使用cdn访问:前缀是https://cdn.jsdelivr.net/gh/+设定的仓库名即可访问

登录github仓库,依次找到`settings`->`Developer Settings`->`Personal access tokens`->`Tokens(classic)`的右上角新建

![image-20250326211131280](https://cdn.jsdelivr.net/gh/RonHaiT/Image-hosting/image-20250326211131280.png)

`New personal access token (classic)`

`note填写名称,勾选仓库repo,点击创建后会看到token,要自己保存下来,后面就看不见了

![image-20250326211303727](https://cdn.jsdelivr.net/gh/RonHaiT/Image-hosting/image-20250326211303727.png)

## 打开PicGo.app配置github图床

要想访问仓库中的这个 test.png 图片，需要把链接地址中的 blob 改为 raw。即 `https://github.com/RonHaiT/Image-hosting/blob/master/image-20250326211842473.png` 。或者在地址后拼接一段 `?raw=true`，即 `https://github.com/RonHaiT/Image-hosting/blob/master/image-20250326211842473.png?raw=true` 。url会变成`https://raw.githubusercontent.com/RonHaiT/Image-hosting/refs/heads/master/image-20250326211842473.png`

但是，我们发现，通过 github 直接访问图片，速度不是特别理想，毕竟服务器在国外。

因此，我们可以使用 jsDelivr 进行 CDN 加速。这是完全开源免费的。

使用方法，非常简单，即把图片地址链接域名改为 CDN 的域名。格式如下：

```
https://cdn.jsdelivr.net/gh/<你的github用户名>/<你的图床仓库名>@<仓库版本号>/图片的路径
```

还是以上边的 test.png 图片为例，仓库版本号直接用分支名，由于现在 github 主分支名字都叫 main 了，因此版本号写 main 。图片路径，是在仓库中的相对路径，因为我这里就在根目录，因此就是 test.png 。

最终地址为 `https://cdn.jsdelivr.net/gh/RonHaiT/Image-hosting@master/image-20250326211842473.png`。

其他说明，可参考 jsDelivr 官网介绍，[jsDelivr 官网](https://www.jsdelivr.com/?docs=gh)

![image-20250326211555173](https://cdn.jsdelivr.net/gh/RonHaiT/Image-hosting/image-20250326211555173.png)

设置完成确定,在设为默认图床

## Typora设置

找到设置->图像->插入图片时上传图片->上传服务选择PicGo,app->验证成功即可使用

![image-20250326211842473](https://cdn.jsdelivr.net/gh/RonHaiT/Image-hosting/image-20250326211842473.png)

