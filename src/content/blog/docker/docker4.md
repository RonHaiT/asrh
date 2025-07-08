---
title: Docker容器数据卷
published: 2021-02-04
description: "Docker容器数据卷"
tags: ["Docker"]
category: Docker
draft: false
--- 
# Docker容器数据卷

## 什么是数据卷

- 容器保存的数据，在容器停止后是否仍旧存在？

​	`wget https://github.com/redis-stack/redis-stack/archive/refs/tags/v6.2.6-v14.tar.gz`

- 答案是存在的

- 容器删除后，在容器的数据是否存在
  - 答案是不存在的

### 数据卷的含义

- 数据卷是Docker实现数据持久化的一种技术

- 数据卷表现为宿主机中的目录或文件，以"挂载"的方式为容器提供数据存取服务。

### 数据卷的特点

- 数据卷独立于容器存在
- 数据卷的修改可直接实时生效
- 容器与数据卷的关系是N:M关系
- 数据卷中的更改不会包含在镜像的更新中

## 挂载数据卷

- 命令
  `docker run -v /宿主机目录(文件):/容器目录(文件)`
  - 注意:宿主机或容器，在编写目录(文件)路径时，需要使用从"/"开始的绝对路径;
- 实验
  - 运行容器容器内下载redis->查看宿主机挂载点
  - 停止容器->删除容器->查看宿主机挂载点。

## 数据卷容器

- 场景
  多个容器需要使用相同数据卷时

- 优势省去了每个容器使用"-v"配置数据卷的繁琐操作

  - 命令

    ```bash
    docker run --name d01 -v /Users/rh/docker/d1:/root/d1 -v /Users/rh/docker/d2:/root/d2 -itd alpine #创建数据卷容器
    docker run --name d02 --volumes-from ap01  -itd alpine  #创建和ap01相同的挂载方式
    ```

    ```bash
    ➜ docker exec -it d01 /bin/sh
    / # ls /root/
    d1  d2
    ➜   ls /Users/rh/docker
    d1                d2                v6.2.6-v14.tar.gz
    ```

- 实验

  - 创建数据卷容器 
  - 创建使用数据卷容器
  - 使用的容器内新建文件hello.txt
  - 删除数据卷容器
  - 查看挂载点

## 数据覆盖问题

| 数据卷 | 空   | 非空 | 空   | 非空               |
| ------ | ---- | ---- | ---- | ------------------ |
| 容器   | 空   | 空   | 非空 | 非空               |
| 结果   | 空   | 非空 | 非空 | 非空(容器覆盖宿主) |

- 实验
  - 创建容器，数据卷挂载 /opt/d1:/root/d1
  - 进入容器，创建文件:touch /root/d1/a.txt
  - 停止docker system,systemctl stop docker
  - 修改配置文件
    - cd /var/lib/docker/containers
    - cd 容器id
    - vim config.v2.json 搜索" MountPoints
  - 重启docker，查看容器挂载点