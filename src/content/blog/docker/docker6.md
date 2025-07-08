---
title: Docker常用软件部署
published: 2021-02-06
description: "Docker常用软件部署"
tags: ["Docker"]
category: Docker
draft: false
--- 
# Docker常用软件部署

应用的配置文件获取途径

- 手头有现成的
- 网络上下载的(推荐官网)
- 从容器中提取的(本视频途径

部署的基本流程

- 搜索镜像
- 拉取镜像
- 创建专用目录
- 运行容器
- 测试

## Tomcat

### 搜索镜像

docker search tomcat

### 拉取镜像

docker pull tomcat

### 创建tomcat专用日录

mkdir tomcat

### 运行容器

- 临时容器

  ```bash
  #创建临时容器拷贝配置文件
  docker run --name temp -itd tomcat
  # 宿主主执行
  docker cp temp:/usr/local/tomcat/conf ./tomcat/
  # 删除临时容器
  docker rm -f temp
  ```

- 正式容器

  ```bash
  #Linux:
  docker run --name mytomcat -itd -p 8080:8080 \
  -v /root/tomcat/conf:/usr/local/tomcat/conf \
  -v /root/tomcat/webapps:/usr/local/tomcat/webapps \
  tomcat
  # Mac:
  docker run --name mytomcat -itd -p 8080:8080 \
  -v /Users/rh/docker/tomcat/conf:/usr/local/tomcat/conf \
  -v /Users/rh/docker/tomcat/webapps:/usr/local/tomcat/webapps \
  tomcat
  ```

### 测试

- 宿主机器
  /Users/rh/docker/tomcat/webapps中创建目录myweb，里面创建文件index.html

- 浏览器访间 http://127.0.0.1:8080/myweb/index.html

  ![image-20240427165956804](https://cdn.jsdelivr.net/gh/RonHaiT/Image-hosting/image-20240427165956804.png)

## Nginx

### 搜索镜像

```bash
docker search nginx
```

### 拉取镜像

```bash
docker pull nginx
```

### 创建nginx专用目录

```bash
mkdir nginx
```

### 运行容器

- 临时容器

  ```bash
  docker run --name temp -itd nginx
  docker cp temp:/etc/nginx/nginx.conf ./nginx/nginx.conf  #主配置(nginx.conf)
  docker cp temp:/etc/nginx/conf.d ./nginx/ #从配置(default.conf)
  docker cp temp:/usr/share/nginx/html ./nginx/  #欢迎页面和错误页
  docker rm -f temp
  ```

- 正式容器

  ```bash
  # linux环境
  sudo docker run --name rhnginx -itd \
  -p 80:80 \
  -p 443:443 \
  -v /home/xx/www/nginx/conf.d:/etc/nginx/conf.d \
  -v /home/xx/nginx/html:/usr/share/nginx/html \
  -v /home/xx/www/nginx/nginx.conf:/etc/nginx/nginx.conf  \
  -v /home/xx/www/ssl:/etc/nginx/ssl \
  nginx 
  
  # Mac
  docker run --name mynginx -itd \
  -p 80:80 \
  -v  /Users/rh/docker/nginx/conf.d:/etc/nginx/conf.d \
  -v /Users/rh/docker/nginx/html:/usr/share/nginx/html \
  -v /Users/rh/docker/nginx/nginx.conf:/etc/nginx/nginx.conf  \
  nginx
  ```

- 重载配置

  ```bash
  重新加载配置命令：sudo docker exec mynginx nginx -s reload
  验证配置文件命令：sudo  docker exec mynginx nginx -t
  ```

###  测试

- 外部机器访问 http://127.0.0.1:80 #默认80可以省略

  ![image-20240427172135174](https://cdn.jsdelivr.net/gh/RonHaiT/Image-hosting/image-20240427172135174.png)

## Mysql   

### 搜索镜像

```bash
docker search mysql
```

### 拉取镜像

```bash
docker pull mysql
```

### 创建`mysql`专用目录

```bash
mkdir mysql
```

### 运行容器

- 临时容器 

  ```bash
  # 旧版
  sudo docker run --name temp -itd -e MYSQL_ROOT_PASSWORD=123456 mysql
  sudo docker cp temp:/etc/mysql/my.cnf ./mysql/
  sudo docker cp temp:/etc/mysql/conf.d ./mysql/
  sudo docker rm -f temp
  
  # 安装的版本是:mysql  Ver 8.3.0 for Linux on aarch64 (MySQL Community Server - GPL)
  # Server version: 9.0.1 MySQL Community Server - GPL
  sudo docker run --name temp -itd -e MYSQL_ROOT_PASSWORD=123456 mysql
  sudo docker cp temp:/etc/my.cnf ./mysql/
  sudo docker cp temp:/etc/mysql/conf.d ./mysql/
  sudo docker rm -f temp
  ```

- 正式容器

  ```bash
  # Linux
  sudo docker run --name rhmysql -itd \
  -p 3306:3306 \
  -v /home/xx/www/mysql/my.cnf:/etc/mysql/my.cnf \
  -v /home/xx/www/mysql/conf.d:/etc/mysql/conf.d \
  -v /home/xx/www/mysql/data:/var/lib/mysql \
  -e MYSQL_ROOT_PASSWORD=Pythl.com \
  mysql
  # Mac
  sudo docker run --name mysql -itd \
  -p 3306:3306 \
  -v /Users/rh/docker/mysql/my.cnf:/etc/my.cnf \
  -v /Users/rh/docker/mysql/conf.d:/etc/mysql/conf.d \
  -v /Users/rh/docker/mysql/data:/var/lib/mysql \
  -e MYSQL_ROOT_PASSWORD=123456 \
  mysql
  ```

- 修改字符集

  ```bash
  # 修改字符集I
  vim my.cnf
  [mysql]
  default-character-set=utf8mb4
  [mysql. server]
  default-character-set=utf8mb4
  准备初始化脚本init.sql
  ＃ 拷贝数据库初始化脚本到指定日录 数据库启动时会自动运行
  COPY init.sql /docker-entrypoint-initdb.d
  ```

- 登录mysql设置密码登录

  ```bash
  sudo docker exec-it rhmysql /bin/bash
  mysql -uroot -proot123
  mysql> ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY 'root123';
  ```

- 宿主机连接

  ```bash
  sudo yum install mysql
  mysql -h 127.0.0.1 -P 3306 -u root -p
  #创建数据库
  CREATE DATABASE rhweb character set utf8mb4;
  ```

### 测试

```bash
firewall-cmd--zone=public --permanent --add-port=3306/tcp
firewall-cmd --reload
```

外部机器通过户端连接并操作

### 创建新用户

```bash
# caching_sha2_password是8和9的默认加密方式，8可以切换密码加密mysql_native_password，9已不存在此加密方式
CREATE USER 'username'@'%' IDENTIFIED WITH caching_sha2_password BY 'xxx';
# 授权所有数据
GRANT ALL PRIVILEGES ON *.* TO 'username'@'%' WITH GRANT OPTION; 
FLUSH PRIVILEGES;
```

创建数据库指定字符集

```bash
CREATE DATABASE text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

限定数据库访问

```bash
撤销全部权限：
REVOKE ALL PRIVILEGES ON *.* FROM 'username'@'%';
FLUSH PRIVILEGES;
授权：
GRANT ALL ON bdev.* TO 'usernmae'@'%';
FLUSH PRIVILEGES;
```

## Redis

### 搜索镜像

```bash
docker search redis
```

### 拉取镜像

```bash
docker pull redis
```

### 创建redis专用目录

```bash
#创建redis目录及下面2个子目录
mkdir -p redis/{conf,data}
```

### 创建配置文件

```bash
vim redis/conf/redis.conf
# 允许任何主机访问redis
# bind 127.0.0.1
# 禁用保护模式
protected-mode no
# 端囗6379(默认)
port 6379
#不允许守护进程模式(设置允许与参数-d冲突，容器无法启动)
daemonize no
#访问密码
requirepass 123456
```

### 运行容器

```bash
# Linux
docker run --name myredis -d \
-p 6379:6379 \
-v /root/redis/conf:/etc/redis \
-v /root/redis/data:/data \
redis \
redis-server /etc/redis/redis.conf

# Mac
docker run --name myredis -d \
-p 6379:6379 \
-v /Users/rh/docker/redis/conf:/etc/redis \
-v /Users/rh/docker/redis/data:/data \
redis \
redis-server /etc/redis/redis.conf
```

### 测试

开放端口

```bash
firewall-cmd --zone=public --permanent --add-port=6379/tcp
firewall-cmd --reload
```

外部机器通过客户端连接并操作,

推荐redis客户端:

Another Reids Desktop Manager,下载地址:https://github.com/qishibo/AnotherRedisDesktopManager

作者很nice国内免费,国外是收费的

##  RabbitMQ

标签带management是带后台管理的

### 搜索镜像

```bash
docker search rabbitmg:management
```

### 拉取镜像

```bash
docker pull rabbitmq:management
```

### 端口介绍

- 15672 管理页面通信端口
- 5672   client端通信端口
- 25672 server间通信端口
- 4369 EPMD默认端口号
- 61613 stomp消息传输端口

### 运行容器

```bash
docker run -d --name rabbit \
-e RABBITMQ_DEFAULT_USER=admin \
-e RABBITMQ_DEFAULT_PASS=admin \
-p 15672:15672 -p 5672:5672 \
-p 25672:25672 -p 4369:4369 \
rabbitmq:management
```

### 测试

### Linux

放行端口

```bash
firewall-cmd --zone=public --permanent --add-port=5672/tcp
firewall-cmd --zone=public --permanent --add-port=15672/tcp
firewall-cmd --zone=public --permanent  --add-port=25672/tcp
firewall-cmd --zone=public --permanent --add-port=4369/tcp
firewall-cmd --reload
```

外部机器通过浏览器连接:http://192.168.56.101:15672

### Mac真机测试

访问地址:http://127.0.0.1:15672

![image-20240427204257851](https://cdn.jsdelivr.net/gh/RonHaiT/Image-hosting/image-20240427204257851.png)