---
title: Docker网络
published: 2021-02-03
description: "Docker网络"
tags: ["Docker"]
category: Docker
draft: false
--- 
# Docker网络

## 从docker0说起

- docker默认网络

  - docker安装后，会自动创建3个网络 `docker network ls`

  - docker默认采用的网络:`bridge`桥接网络docker

  - 安装成功后，会出现` docker` 的网络设备，本质是一个虚拟网桥 `brctl show`

    注意:brctl show命令需要通过`yum install bridge-utils -y`安装

- docker的作用

  - 给容器分配IP地址(与docker8同网段)
  - 给容器分配Mac地址
  - 是每个容器的默认网关
  - 同一个宿主机的各个容器之间通信基础(都接入dockere网桥)
  - 宿主机和容器之间通信的基础

- docker的地址划分

  - dockere本身的IP:172.17.0.1
  - dockero的子双掩码:255.255.0.0
  - dockere分配的IP范围:172.17.0.2~172.17.255.254，总计65534个

## docker0如何组织网络

- 运行某个容器

  - dockersearch alpine
  - docker pull alpine
  - docker run -itd --name ap01 alpine
  - ip addr
    - 17:veth c587b92  @if16  ap01
    - 19:veth  875bff4   @if18   ap02
      brctl  show

- 查看容器网络接口

  ```bash
  docker exec -it ap01 ip addr
  ```

- 查看容器IP

  ```bash
  docker exec -it ap01  hostname -i
   docker inspect ap01
  ```

- 小结
  veth全称是Virtual Ethernet(虚拟以太网)

  - veth通过"veth pair"技术在veth设备一端写入网络包，其对端的veth设备可以读取到对应的网络包:(可想象成使用一根虚拟网线将两个veth设备连接起来)
  - 容器启动
    - docker创建一对虚拟接口’
    - 一端放到本地主机，如veth75f9，然后桥接到默认的 docker0 上
    - 另外一端放到新容器中，并修改名字为eth0
    - docker0分配一个IP给容器的eth0，并配置默认路由到桥接网卡veth75f9。

## 网络互连

- 容器与宿主机之间的互连

  - 宿主机IP地址:192.168.13.21
  - 容器ap01:172.17.0.2
  - 容器ap01:172.17.0.3

- 容器与容器之间的互连

  - 默认情况下，docker(Docker)容器之间都是通过IP互相连接的

  - 通过docker运行指令的参数“--链接容器名:别名”，直接修改容器的hosts映射(/etc/hosts)

  - 基于安全考虑，通过 vim /etc/docker/daome.json 在末尾添加配置

    `“icc”:false` 禁止所有的容器通信

    - 可禁止容器之间的互连(需要重启docker生效，但此配置不对--link 生效)

      `"iptables":true` 设置了--link的可以访问,其它的不能访问

      `service docker restart`

  - 容器访问互联网

## 白定义网络

- 为何需要自定义网络
  容器的隔离，提高安全性;DNS解析和服务发现:容器与外网的连接;容器之间的负载均衡。

- 如何创建自定义网络

  - docker network create[--driver 驱动类型] [--subnet=192.168.1.0/24] 自定义网络名
  - 注意:--driver代表驱动类型，默认"bridge"
  - subnet代表网段设置，默认dockere地址上递增(172.17.0.1-->172.18.0.1)
  - 可通过 docker network ls 查看自定义网络

- 查看网络详情

  通过 docker network inspect 网络名 

  ```bash
  docker network inspect rh
  ```

- 如何使用自定义网络

  ```bash
  # 容器启动时加入
  docker run --network  自定义网络名
  # 容器启动后加入
  docker network connect 网络名 容器名
  ```

- 自定义网络删除

  删除时网络中没有容器,如果有先使用命令`docker network disconnect 网络名 容器名`退出网络

  ```bash
  docker network delete rh
  ```

## 总结

涉及到了docker网络基本概念、组网原理、自定义网络以及容器的互连

未涉及到不同主机之间容器的网络连接。