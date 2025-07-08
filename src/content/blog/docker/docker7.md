---
title: Docker容器转镜像
published: 2021-02-07
description: "Docker容器转镜像"
tags: ["Docker"]
category: Docker
draft: false
--- 
# Docker容器转镜像

## 创建镜像

```bash
➜   docker run --name tomcat01 -itd -p 8080:8080 tomcat
3dc98bba662499c68b4dd4741c7fab1ee2ebf04121c09b1cfb5b28ca0f210a72
```



### 设置Tomcat

进入tomcat容器

```bash
➜  docker exec tomcat01 -it bash
```

转移静态文件

```bash
cp -r webapps.dist/* webapps/
```

在访问tomcat:127.0.0.1:8080

![image-20240427205129582](https://cdn.jsdelivr.net/gh/RonHaiT/Image-hosting/image-20240427205129582-7026509.png)

## 容器转镜像

```bash
#docker commit 容器 新镜像:版本
docker commit tomcat01 rh/tomcat
```

注意:新镜像并不包含数据卷的内容，不属于数据卷的内容则会被保留

```bash
➜   di
REPOSITORY    TAG          IMAGE ID       CREATED          SIZE
rh/tomcat     latest       6af93fa14c46   56 seconds ago   464MB
tomcat        latest       b6fd7b4107cc   35 hours ago     460MB
hello-world   latest       ee301c921b8a   12 months ago    9.14kB
```

> di是我设置系统了别名docker images 的简称

## 镜像迁移

可以把自己制作的镜像保存下来

别人拿到保存的镜像加载到docker即可使用

```bash
docker save -o 压缩文件 镜像:版本
docker load -i 压缩文件
```

示例:

保存之前新建的rh/tomcat镜像

```bash
docker save -o rh_tomcat.tar rh/tomcat
```

删除所有的tomcat镜像和容器,重新加载rh/tomcat

```bash
REPOSITORY    TAG          IMAGE ID       CREATED         SIZE
hello-world   latest       ee301c921b8a   12 months ago   9.14kB
➜  docker load -i rh_tomcat.tar
560864831f00: Loading layer [==================================================>]  71.84MB/71.84MB
5b3fa541c5ab: Loading layer [==================================================>]  55.03MB/55.03MB
097c86ac9eb6: Loading layer [==================================================>]  308.3MB/308.3MB
456c85e8c423: Loading layer [==================================================>]  3.072kB/3.072kB
f0a3d37ebeed: Loading layer [==================================================>]  3.072kB/3.072kB
8e22e97ec950: Loading layer [==================================================>]  3.072kB/3.072kB
0b753d7b4851: Loading layer [==================================================>]  31.26MB/31.26MB
7bb833ed7c41: Loading layer [==================================================>]  2.048kB/2.048kB
4e2c7abe32ac: Loading layer [==================================================>]  5.042MB/5.042MB
Loaded image: rh/tomcat:latest
➜  docker images
REPOSITORY    TAG          IMAGE ID       CREATED          SIZE
rh/tomcat     latest       6af93fa14c46   11 minutes ago   464MB
hello-world   latest       ee301c921b8a   12 months ago    9.14kB
```

生成新镜像

```bash
➜ docker run --name tomcat -itd -p 8081:8080 rh/tomcat
728361175bdded93f38191ed6feaebb3e3d3204d75d554dd6a303a24af480e61
➜ docker ps
CONTAINER ID   IMAGE                 COMMAND                   CREATED          STATUS          PORTS                                                                                                                                      NAMES
728361175bdd   rh/tomcat             "catalina.sh run"         4 seconds ago    Up 4 seconds    0.0.0.0:8081->8080/tcp                                                                                                                     tomcat
```

## 总结

容器转换镜像 `docker commit 容器 新镜像:版本`
优点:简单快速，一条命令可得到想要的新镜像

缺点:无法查看镜像的构建历史不适用于版本控制，不适用自动化部署

