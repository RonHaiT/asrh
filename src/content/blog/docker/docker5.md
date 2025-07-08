---
title: Docker端口映射
published: 2021-02-05
description: "Docker端口映射"
tags: ["Docker"]
category: Docker
draft: false
---

# Docker端口映射

## 为什么需要端口映射

- 外部机器访问docker容器的应用，需要解决2个问题
  - 外部机器能够成功连接docker容器
  - 外部机器能够访问docker容器的端口

## 实现端口映射

`docker run  -p [宿主机服务端口:]容器服务端口`

注意:"宿主机服务端口:"部分若省略，宿主机会采用随机端口号和容器端口完成映射

## 查看端口映射

docker port 容器 	#查看指定容器的端口映射
docker ps -a			#查看所有容器的端口映射


## 修改端口映射

- 首先，停止docker服务

- 修改"hostconfig.json'
  - Linux 存放位置如下
    - cd /var/lib/docker/containers/容器ID
    - vim hostconfig.json
    - 搜索`PortBindings`

  - Mac 存放位置如下
    -  cd /Users/rh/Library/Containers/com.docker.docker/Data/vms/0/data

## 防火墙问题

放行端口

```bash
firewall-cmd --zone=public --permanent --add-port=80/tcp
firewall-cmd --reload
```

停止关闭

```bash
systemctl stop firewalld
systemctl disable firewalld
```

