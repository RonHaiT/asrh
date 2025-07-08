---
title: Docker可视化
published: 2021-02-10
description: "Docer可视化-Portainer可视化工具"
tags: ["Docker"]
category: Docker
draft: false
--- 
## Portainer可视化工具

- Portainer是一款docker容器管理平台，提供可视化的UI管理工具；
- Portainer由GO语言编写，占用资源少（轻量级），支持单机和集群的Docker环境。
- 官网地址：https://www.portainer.io/

## 安装Portainer

- 官网文档：https://docs.portainer.io/start/install-ce

- 安装流程：

  - 运行容器安装

    ```bash
    docker pull portainer/portainer-ce:latest
    docker volume create portainer_data #拉取portaine镜像
    #说明：创建命名数据卷 portainer_data，保存路径/var/1ib/docker/volumes/portainer_data/_data
    docker run -d -p 8000:8000 -p 9443:9443 --name portainer --restart=always \
    -v /var/run/docker.sock:/var/run/docker.sock \
    -v portainer_data:/data \
    portainer/portainer-ce:latest 
    #说明：
    # 8000是portainer与本机Dokcer通信的端口，9443是Portainer UI端口（https协议），
    # 9000是Portainer UI端口（http协议，已过时）；
    # --restart=always代表重启docker服务时，自动启动portainer容器；
    # docker.sock是Docker守护进程默认监听的Unix域套接字文件，
    # Portainer要检测到的容器和镜像都依赖docker.sock这个文件：
    # Portainer从2.0.0版本开始，镜像名字改次portainer/portainer-ce
    # 旧版镜像为 portainer/portainer（2022年1月标记内过期）
    ```

  - Docker-compose安装

    ```yaml
    services:
    	portainer:
    		image: portainer/portainer-ce:latest
    		ports:
                - "8000:8000"
                - "9443:9443"
            restart: always
            volumes:
              - /var/run/docker.sock:/var/run/docker.sock
              - ./data:/data
    ```

  - 访问Portainer UI

    ip地址:9443

## Portainer的常用操作

### 拉取镜像

- 左侧菜单找到并点击"Images"
- Pull image
  选择相应的"Registry"
  填写相应的"Image"及其版本（忽略版本即最新版）
  点击"Pul1 the images"
- Images列表查看所拉取的镜像

### 自定义网络

- 左侧菜单找到并点击"Networks"
- Networks
  点击Add network
  Name 填写自定义网络名字
  Create the network 创建自定义网络

### 运行容器

- 左侧菜单找到并点击"Containers"
- Containers
  点击Add container
  Name 填写自定义容器名字
  Image configuration 选择镜像源和镜像名字及版本
  AIways puli the image 每次创建容器都要重新拉一遍最新镜像，不建议开启（厝名DockenHub账号有100次/6小时的限制
  Publish all exposed network ports to random host ports 将所有暴露的端口随机发布到主机端口，不建议