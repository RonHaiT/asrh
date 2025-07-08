---
title: Docker Dockge简介
published: 2021-02-11
description: "Docker Dockge简介"
tags: ["Docker"]
category: Docker
draft: false
--- 
## Dockge简介

Dockge是一款开源的Docker可视化管理面板，由Uptime Kuma项目（知名的监控工具）的开发团队所开发
Dockge还是是一个热门的服务器管理/监控的程序，Dockge还支持多国语言，包括简体中文
官网地址：https://dockge.kuma.pet/

## 对比Portainer

Dockge 是专注于 docker compose 的管理工具，做得精而专；
Portainer是一个全能型选手，但目前越来越向企业靠拢。

## Dockge安装

### 创建Dockge支用目录

```bash
mkdir -p / root/dockge/data
```

### 下载官方的compose.yaml件

更名为:dockge-compose.yaml

### 安装命令

```bash
cd /root/dockge && docker compose -f dockge-compose.yaml up -d
```

### 访问

```bash
http://docker主机IP:5001 ＃ 开了防火墙的要在防火墙中开放5001端口并重启防火墙
http://192.168.56.115:5001
```

## Dockge的使用

### 创建堆栈statck

