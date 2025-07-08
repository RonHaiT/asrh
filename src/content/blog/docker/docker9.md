---
title: Docker-Compose
published: 2021-02-09
description: "Docker-Compose"
tags: ["Docker"]
category: Docker
draft: false
--- 
## 什么是Docker-Compose

Docker-Compose，是Docker中用于定义和运行多容器应用程序的工具.通过Compose可以使用一个YML文件来配置应用程序需要的所有服务通过使用一个命令，就可以从YML文件中创建并启动所有服务

## Docker-Compose使用流程

- 使用Dockerfile定义应用程序的环境
- 使用docker-compose.yml定义构成应用程序的服务
- 执行docker-compose up命令来启动并运行整个应用程序

## Docker-Compse的安装

- 官网文档：https://docs.docker.com/compose/install/

- Mac操作系统、windows操作系统
  Mac和Windows操作系统的Docker Desktop和Docker Toolbox
  已经包括Compose和其他Docker应用程序，用户不需要单独安装

- Linux操作系统
  docker-compose插件

  - 安装Docker引擎时附带docker-compose插件

    ```bash
    sudo vum install -v docker-ce docker-ce-cli \
    containerd. io docker-buildx-plugin docker-compose-plugin
    ```

    安装Docker引擎后补充安装docker-compose插件

    ```bash
    sudo yum install -y docker-compose-plugin
    ```

    独立安装Compose（不建议使用此安装方案，仅适用于向后兼容的目的）

    - 从Github上下载它的二进制包安装，其他版本的Compose请替换v2.2.2

      ```bash
      sudo curl -L "https://github.com/docker/compose/releases/download/v2.2.2/docker-compose-$(uname-s)-$(una
      ```

    - 将可执行权限应用于二进制文件

      ```bash
      sudo chmod +x /usr/local/bin/docker-compose
      ```

    - 创建软链接

      ```bash
      sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
      ```

    - 测试安装结果

      ```bash
      docker compose version
      ```

## docker-compose.yml文件

### 顶级元素

- version 定义docker-compose.yml文件的格式版本，已弃用
  https://docs.docker.com/compose/compose-file/04-version-and-name/

- name 定义应用程序使用的名字（不指定该属性，则应用程序名默认使用yml文件所在目录名）
  名字只能包含小写字母、数字、破折号（-）和下划线（_），且必须以小写字母或数字开头
  name: "myapp"

- services 定义应用程序所需的服务集合
  services:

  ​	mysql:#自定义的服务名
  ​	#mysq1服务的配置项

​		redis:
​				#redis服务的配置项

- networks 定义应用程序使用的网络（网络不存在会自动创建）
  networks:

  ​	net1:                 # 网络名字为:应用程序名_net1

  ​		driver:bridge # 默认bridge网络模式

  ​	net2:

### 服务配置项

- image 服务所使用的本地镜像名称或ID

- container_name 服务所使用的容器名字，不指定该配置项，则容器默认名为：应用程序名-服务名-序号（1开始）
  注意：建议使用容器默认命名，避免重名的冲突

- ports 服务所使用的端口映射
  ports:

  ​	"8080: 8080"

- Volumes 服务所使用的数据卷

  Volumes:

  -/宿主机路径:/容器路径

- networks 服务所使用的网络(必须使用已存在的网络)

  Networks:

  ​	\- net1

  ​	\- net2

- environment 服务所使用的环境变量

  Environment:

  \- MYSQL_ROOT_PASSWORD=123456

- env file服务所使用的环境变量文件

  env_file:

  \- .mysql_env # 与yml文件同路径下的 .mysql_env

- expose 服务对外暴露的端口

  expose:

  \- "8080"

- Build 服务所使用的自定义镜像,注意此项与image冲突

  build:

  ​	context: ./db # 指定Dockerfile使用的上下文目录

  ​	dockerfile:appdb  # 指定context路径下的Dockerfile文件名,若使用默认名字则无需指定改项

  注意:自定义镜像的名字=应用程序名-服务名

- depends_on 指定本服务所依赖的其它服务,应确保先启动所依赖的服务,后启动当前的服务

  depends_on:

  ​	\- 依赖的服务名

- command 指定本服务启动后的默认命令

  command:["java","-jar","myapp.jar"]

## docker-compose命令

- docker compose config
  含义：验证和显示由 docker-compose.ym1 文件定义的服务配置
- docker compose up [-d]
  含义：启动应用程序所需的所有服务。-d代表后台运行
- docker compose ps
  含义：查看己经启动的所有容器
- docker compose stop | kill［容器名］
  含义：停止已经启动的容器
- docker compose start | restart [7*4]
  含义：启动被停止的容器（重启容器）
- docker compose exec 容器名 bash
  含义：进入容器
- docker compose logs ［-f］
  含义：查看服务日志。-f代表输出实时日志信息
- docker compose down
  含义：用于停止和移除由 docker-compose up 创建的容器、网络和卷