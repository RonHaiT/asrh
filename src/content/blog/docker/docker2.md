---
title: Docker核心知识
published: 2021-02-02
description: "Docker核心知识"
tags: ["Docker"]
category: Docker
draft: false
---
# Docker核心知识
## 什么是Docker

简介:Docker是一个开源的容器引擎，用于构建、部署和管理应用程序和相关的服务。
起源:2018年Dotc1oud公司创始人solomon Hykes(所罗门·海克斯,1984年)发起一项公司内部的项目使用Google公司推出的Go语言进行开发，最初是在Ubuntu12.04上实现的。
发展:2013年3月开源，主要项目代码在GitHub上进行维护，后来还加入了Linux基金会
并成立"开放容器联盟"。
注意:Docker首选推荐安装在1inux系统上，Windows并不推荐(需要使用Hyper-V+ Docker-Desktop)

## Docker与传统虚拟技术对比

传统虚拟机技术是虚拟出一套硬件后，在其上运行一个完整操作系统，在该系统上再运行所需应用进程:

- Redis7(依赖库、Redis7安装包、配置)
  - 虚拟系统
    - 虚拟硬件
      - 虚拟软件
        - 宿主系统 windows macos
          - 宿主硬件 计算机

容器没有自己的内核，应用直接运行于宿主的内核，而且也没有进行硬件虚拟。

- Redis7容器 
  - Docker引擎
    - 宿主系统
      - 宿主硬件

因此容器要比传统虚拟机更为轻便!

| 特性       | 容器               | 虚拟机     |
| ---------- | ------------------ | ---------- |
| 启动       | 秒级               | 分钟级     |
| 硬盘使用   | 一般为 MB          | 一般为 GB  |
| 性能       | 接近原生           | 弱于原生   |
| 系统支持量 | 单机支持上千个容器 | 一般几十个 |

## 仓库

Registry镜像构建完成后，可以很容易的在当前宿主机上运行。但是，如果需要在其它服务器上使用这个镜像，需要一个集中的存储、分发镜像的服务，DockerHub就是这样的服务。

Docker-Hub地址(远程仓库):

- https://hub-stage.docker.com/
- https://hub.docker.com/

## 镜像

镜像，Image。

镜像是一个特殊的文件系统，除了提供容器运行时所需的程序、库、资源、配置等文件外,还包含了一些运行时的配置参数(如环境变量、用户等)。

- 搜索镜像

  ```bash
  docker search nginx --limit 5  #显示5条
  docker search nginx --limit 5 --no-trunc # 显示完整描述
  ```

- 查看镜像

  ```bash
  docker images # docker images ls
  ```

- 下载镜像

  ```bash
  	docker pull 镜像名:版本
  	docker pull ngxin #默认最新版latest
  ```

- 删除镜像

  ```bash
  docker rmi 镜像名:版本 或 镜像ID   	#被删镜像应从未运行过任何容器
  docker rmi -f 镜像名:版本 或 镜像ID    #强制删除镜像(不删除对应的容器)
  docker rmi 容器ID # 简写方式
  ```

## 容器

容器，Container。

镜像(Image)和容器(container)的关系，就和00P设计中"类"和"对象"的关系类似，

镜像是模板，容器是镜像运行时的实例，一个镜像可以被多次创建为不同容器。

- 查看容器docker ps -a

- 运行容器

  - docker run--name 容器名 -itd 镜像名
    若省略容器名，Docker会自动分配一个(有趣的)容器名字;注意:
    			-i(interaction)交互模式运行容器，
    			-t(terminal)为容器分配一个伪终端;
    			-d(daemon)守护进程运行容器(exit退出交互模式后容器仍运行)，针对一些自带运行进程的应用:若本地仓库没有对应镜像会自动从远程仓库下载，否则出错!

- 进入容器
  	docker exec -it 容器名字 或 容器ID /bin/bash

- 停止容器
  	

  	```bash
  	docker stop/kil1 容器名字 或 容器ID #stop优雅停止 kill 立即停止
  	```

- 启动容器
  	

  	```
  	Docker start 容器id
  	```

- 删除容器
  	docker rm 容器名 或 容器ID
  	docker rm -f 容器名 或 容器ID #强制删除,运行的也会被删除
  	docker container prune -f # 批量删除闲置的容器
  	docker rm -f  `docker ps -a`

  注意:启动中的容器无法删除!

- 删除未运行的容器

  ```bash
  docker  container prune -f
  ```

  ### 命令解释

  - `docker`: 这是 Docker 的命令行工具。
  - `container`: 指定我们要操作的是容器。
  - `prune`: 这是一个子命令，用于删除未使用的数据（在这里是指未使用的容器）。
  - `-f` 或 `--force`: 这个选项表示强制执行该操作，而无需进行交互式确认。省略此选项时，Docker 会提示用户确认操作。

  ### 功能

  运行 `docker container prune -f` 后，Docker 会删除所有处于非运行状态的容器（即那些已经停止或退出的容器）。这有助于清理系统，释放空间。

  ### 使用示例

  假设你有以下容器状态：

  - `container1`: 运行中
  - `container2`: 已退出
  - `container3`: 已停止

  运行 `docker container prune -f` 后，`container2` 和 `container3` 将被删除，而 `container1` 将继续运行。

  删除的容器无法恢复,有重要数据请提示备份
