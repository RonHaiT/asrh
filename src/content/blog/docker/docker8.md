---
title: Dockefile
published: 2021-02-08
description: "Dockefile"
tags: ["Docker"]
category: Docker
draft: false
---

# Dockefile

## 什么是Dockerfile

Dockerfile是一种文本文件,它包含了构建某个镜像的所有指令:

Dockerfile也是上述文件的官方推荐文件名。

## 编写规则

- 区分不同镜像的Dockerfile，建议采用不同目录分类存储，而非RedisDockerfile、TomcatDockerfile...

  mac默认不支持tree,`brew install tree`,目录结构如下:

  ```bash
  mkdir -p mydockerfile/{redis,mysql,nginx}
  ➜   ls mydockerfile
  mysql nginx redis
  
  ➜  tree mydockerfile
  mydockerfile
  ├── mysql
  ├── nginx
  │   └── Dockerfile
  └── redis
      └── Dockerfile
  
  4 directories, 2 files
  ```

- Dockerfile指令名大小写不敏感，但约定俗成都用大写(指令参数无需如此)

- Dockerfile中使用"#"作为注释

- Dockerfile非注释行第一行必须是"FROM"

- Dockerfile文件所在的目录，称为context(上下文)目录，新镜像所需文件的均需保存在该位

- Dockerfile上下文目录下支持隐藏文件(.dockerignore)，类似于git的.gitignore

- Dockerfile每行指令都被视为一层，多行指令就会形成多层，层越多执行效率就越慢

## Dockerfile的指令汇总

- FROM 指定基础镜像
- MAINTAINER 维护者信息(作者邮箱、镜像版本等，已被LABEL替代)
- RUN 运行指定的命令
- ADD/COPY 将本地文件添加到镜像中(ADD能自动解压拷贝的压缩包、还能直接请求下载URL)
- WORKDIR 设置当前工作目录
- VOLUME 创建数据养挂载点
- EXPOSE声明运行容器时监听的端口
- ENV 设置环境变量
- CMD容器启动时默认执行的命令(会被运行的command覆盖)
- ENTRYPOINT容器启动时运行的启动命令(不会被运行的命令覆盖)

## 文件指令详解

### 演示环境

- 基础镜像:alpine一个轻量级的(5.59 MB)可适用于生产的Linux基础系统

- Docker(Docker)守护进程的DNS地址为阿里云DNS
  vim /etc/docker/daemon.json

  ```bash
  {
  "dns":["223.5.5.5","223.6.6.6"] #:"dns":「"114.114.114.114","8.8.8.8"]
  }
  ```

  systemctl restart docker

  演示过程中会大量创建容器，为避免事后删除操作的麻烦，所有容器运行时添加参数--rm

### FROM、LABEL、RUN指令

- 需求

  - 基于alpine基础镜像，更换阿里云的apk源，安装vim工具

    - 提示: apk换源(阿里云)

      ```bash
      cd /etc/apk/
      echo 'https://mirrors.aliyun.com/alpine/v3.15/main/'> repositories
      echo 'https://mirrors.aliyun.com/alpine/v3.15/community/' >> repositories apk update
      apk add vim
      
      Dockerfile:
      ```

### WORKDIR、ADD、COPY指今

- 需求:

  - 上述镜像的基础上

    - 指定/laoli/download目录为当前工作目录

    - 下载网络图片到当前工作目录

    - 指定/laoli/context日录为当前工作目录

    - 拷贝上下文目录中的redis压缩包到当前工作目录中(分别使用ADD与COPY)

    - 声明/laoli/download为数据卷挂载点
      提示:
      #下载redis安装包
      wget https://download.redis.io/redis-stable.tar.gz

      Dockerfile:

### ENV、CMD、ENTRYPOINT、EXPOSE指令

- 需求

  - 前面Dockerfile的基础上
  - 指定/opt/日录为环境变量BASE PATH(也可在运行容器时通过 docker run -e BASE PATH=值 指定)
  - 指定容器启动时默认运行的命令1s/laoli
  - 指定容器启动时的入口命令 1s /laoli
  - 声明8088为对外暴露的端口

  Dockerfile:

## 总结

- 构建镜像的2种方式
  - docker commit
  - Dockerfile

- Dockerfile能记录镜像构建历史，利于版本控制，适合自动化部署场景

## 多阶段构建

1. 什么是多阶段构建

- 单阶段构建：Docker v17.05之前，Dockerfile中只能有一个FROM指令，称为单阶段构建
- 多阶段构建：Docker V17.05之后，新增多阶段构建（multistage builds）.
  - Dockerfile中允许多个FROM指令，每一个FROM指令代表一个阶段，称多阶段构建
- 多阶段构建出现的背景
  开发环境(单阶段构建)->生产环境(多阶段构建)

2. 为什么需要多阶段构建
   在每个阶段结束后，只需将必要的数据复制到下一个阶段，并舍弃上一个阶段中的多余信息

   - 减少镜像的体积
   - 加快构建的速度
   - 提升安全性

3. 实现多阶段构建
   需求：代码托管平台下载后端项目->docker中构建maven环境->maven打包->docker中构建运行环境
   -＞启动容器，运行项目。目录结构组织如下：

   myapplication

   ├── Dockerfile
   ├── pom.xml
   └── src

   3.1 传统Dockfile实现

   ```bash
   FROM maven: 3.8.3	 		# 基础镜像maven:3.8.3，java version=17
   WORKDIR /app     			# 设置容器的工作目录为 /app
   COPY ./pom.xml / app/  	#将宿主机当前日录下的pom.xmI拷贝到容器的工作日录中
   COPY ./src /app/src	 	# 将宿主机当前目录下的src目录拷贝到容器的工作目录中
   RUN mvn -f /app/pom.ml clean package -DskipTests=true	# 根据pom文件执行maven清理和打包命令（跳过测试）
   EXPOSE 8080 # 对外暴露8080端口
   CMD ["java", "-jar", "app/target/myapp.jar"]		# 透行jar包
   ニニニニニニニニニニニニニニニニニニニニニニニニニニニニニニニニニニ
   docker build -t build01 .	# build01镜像体积851MB，构建时长573S
   docker run -p 8080:8080 -it --rm build01	#--rm 代表容器停止后会自动被删
   ```

   3.2 多阶段构建实现

   ```bash
   FROM maven: 3.8.3 AS maven-build #阶段一：maven-build代表阶段名，不指定名字也可按序号引用,默认是0,from=0
   WORKDIR /app
   COPY ./pom.xml /app/
   COPY ./src /app/src
   RUN mvn -f /app/pom.ml clean package -DskipTest=true
   
   FROM openjdk:17-alpine ＃阶段二：基础镜像openjdk:17-alpine
   WORKDIR /app
   COPY --from=0  /app/target/myapp.jar /app # 把阶段一产生的jar包拷贝到本阶段/app目录中
   EXPOSE 8080
    CMD ['"java", "-jar", "/app/myapp. jar"]
   ```

4. 指定构建阶段

   - 构建镜像时，不一定需要构建整个Dockfile的全部阶段，可以指定构建停留在某个阶段
     实现命令

     ```bash
     docker build --target 构建名 -t 镜像名 .
     ```

> 当最终的项目需要经过一个环境处理得到结果在运行时用的另外一个环境，就用多阶段构建