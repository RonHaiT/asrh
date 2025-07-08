---
title: FinClip部署
published: 2025-04-22
description: "FinClip环境部署，本地搭建社区版本"
tags: ["Flutter","小程序"]
category: Flutter
draft: false
---
有没有想过，开发好的微信小程序能放在自己的 APP 里直接运行，只需要开发一次小程序，就能在不同的应用中打开它，是不是很不可思议？

有没有试过，在自己的 APP 中引入一个 SDK ，应用中不仅可以打开小程序，还能自定义小程序接口，修改小程序样式，是不是觉得更不可思议？

这就是 FinClip ，就是有这么多不可思议！
# Windows 部署指南

[官方文档](https://www.finclip.com/mop/document/introduce/quickStart/windows-deployment-guide.html#_1-%E6%8F%90%E5%89%8D%E5%87%86%E5%A4%87)

点击 [这里 (opens new window)](https://desktop.docker.com/win/main/amd64/Docker Desktop Installer.exe)下载 Docker Desktop for Windows，并在下载完成后双击 `Docker Desktop Installer.exe` 完成安装；请注意，安装完毕后需要重启电脑。

## 部署与安装

您需要先下载以下文件，镜像文件下载完毕后请进行解压操作：

- compose 配置： [https://static.finogeeks.club/deploy/finclip-ce/finclip-community-v1.7.0.tar.gz (opens new window)](https://static.finogeeks.club/deploy/finclip-ce/finclip-community-v1.7.0.tar.gz)
- 镜像文件： https://static.finogeeks.club/deploy/finclip-ce/images-v1.7.0.tgz

找到下载的镜像文件目录，输入cmd，导入镜像

![image-20250422132622861](https://cdn.jsdelivr.net/gh/RonHaiT/Image-hosting/image-20250422132622861.png)

```bash
docker load -i .\images-v1.7.0
```

查看镜像

![image-20250422132939589](https://cdn.jsdelivr.net/gh/RonHaiT/Image-hosting/image-20250422132939589.png)

解压finclip-community-v1.7.0.tar.gz到当前到finclip，打开finclip文件夹运行cmd输入以下命令

```bash
docker compose up -d mysql redis minio consul
```

![image-20250422132904418](https://cdn.jsdelivr.net/gh/RonHaiT/Image-hosting/image-20250422132904418.png)

```bash
docker compose logs mysql
```

![image-20250422133145075](https://cdn.jsdelivr.net/gh/RonHaiT/Image-hosting/image-20250422133145075.png)

看到以下结果成功

![image-20250422133252991](https://cdn.jsdelivr.net/gh/RonHaiT/Image-hosting/image-20250422133252991.png)

```bash
docker compose up -d quark
docker compose logs quark
```

![image-20250422133333114](https://cdn.jsdelivr.net/gh/RonHaiT/Image-hosting/image-20250422133333114.png)



```bash
docker compose up -d
```

![image-20250422133557325](https://cdn.jsdelivr.net/gh/RonHaiT/Image-hosting/image-20250422133557325.png)

```bash
docker ps
```

![image-20250422133640063](https://cdn.jsdelivr.net/gh/RonHaiT/Image-hosting/image-20250422133640063.png)

## 开始使用

部署流程结束，您可以通过以下地址访问使用

### 企业端使用指南

请在浏览器地址栏中输入“[http://127.0.0.1:8000/login?app_type=dev (opens new window)](http://127.0.0.1:8000/login?app_type=dev)”，如您是在部署远程服务器，则需要将“127.0.0.1”替换为对应的 IP 地址，如您在上文修改了端口，则需要将“8000”替换为对应的端口号码。企业端主要用于小程序上下架，应用关联，SDK 集成

![image-20250422133849332](https://cdn.jsdelivr.net/gh/RonHaiT/Image-hosting/image-20250422133849332.png)

![image-20250422133931813](https://cdn.jsdelivr.net/gh/RonHaiT/Image-hosting/image-20250422133931813.png)

### 运营端使用指南

请在浏览器地址栏中输入“[http://127.0.0.1:8000/login?app_type=ops (opens new window)](http://127.0.0.1:8000/login?app_type=ops)”，如您是在部署远程服务器，则需要将“127.0.0.1”替换为对应的 IP 地址，如您在上文修改了端口，则需要将“8000”替换为对应的端口号码。运营端主要用于小程序审核，成员管理。

账号与密码

登录企业端与运营端的默认用户名为“finclip”，密码为“Finclip@@2024”

想了解企业端与运营端更多的实际操作指引，请点击[企业端操作指引](https://www.finclip.com/mop/document/introduce/accessGuide/enterprise-guidelines.html)，或[运营端操作指引](https://www.finclip.com/mop/document/introduce/accessGuide/operational-guidelines.html)。

![image-20250422133857473](https://cdn.jsdelivr.net/gh/RonHaiT/Image-hosting/image-20250422133857473.png)

![image-20250422133951382](https://cdn.jsdelivr.net/gh/RonHaiT/Image-hosting/image-20250422133951382.png)

# FlutterSdk

[官方文档](https://www.finclip.com/mop/document/runtime-sdk/flutter/flutter-intro.html)

示例[Demo](https://github.com/finogeeks/finclip-flutter-demo)