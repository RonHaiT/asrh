---
title: Docker私有镜像仓库
published: 2021-02-12
description: "Docker私有镜像仓库"
tags: ["Docker"]
category: Docker
draft: false
--- 
## 什么是私有镜像仓库

- Docker镜像仓库分两类:公用仓库和私有仓库

- 公用镜像仓库:DockerHub、网易云镜像仓库、DaoCloud镜像仓库、阿里云镜像仓库

- 私有镜像仓库:本地搭建，局部范围内使用的仓库

## 为什么需要私人镜像仓库

- 企业镜像大多带有商业机密，不希望对外公开

- 镜像操作(例如上传、下载)，效率更高Ⅰ

## 实现私人镜像仓库

### 准备工作

192.168.56.102 -> docker-registry私人镜像仓库服务器

192.168.56.103 -> docker测试镜像push和pull的工作站

### Docker Registry

Docker官方的Docker Registry是一个基础版的镜像仓库，具备仓库管理的完整功能，但是没有图形化UI界面官网文档: https://docs.docker.com/registry/

搭建过程：https://distribution.github.io/distribution/

```bash
 docker pull registry : latest
 mkdir -p registry/data && cd registry
 docker run -d \
--restart=always \
--name registry \
-p 5000:5000
-v ./data:/var/lib/registry \
registry:latest
```

测试

http://私有仓库ip:5000/v2/ catalog # 查看镜像仓库中所有的镜像

## 私人镜像仓库常用操作

