---
title: Nginx 安装和使用
published: 2019-11-15
description: Nginx 安装和使用
tags: [Linux, Mac, Windows,Nginx,]
category: Tools
draft: false
---

# Nginx 安装和使用

## 安装

安装依赖

```bash
yum install -y gcc-c++ pcre pcre-devel zlib zlib-devel openssl openssl-devel
```

下载 ngxin 安装包

官方地址https://nginx.org/en/download.html

右键红色框处复制地址

![image-20231109223504595](https://cdn.jsdelivr.net/gh/RonHaiT/Image-hosting/image-20231109223504595.png)

检查 wget,以下提示表示有

```bash
wget --version
-cares +digest -gpgme +https +ipv6 +iri +large-file -metalink +nls
+ntlm +opie +psl +ssl/gnutls

Wgetrc:
    /etc/wgetrc (system)
Locale:
    /usr/share/locale

```

没有安装命令

```bash
yum install -y wget
```

下载 nginx

```bash
cd /home/用户目录
//下载nginx
wget https://nginx.org/download/nginx-1.24.0.tar.gz
```

解压 nginx

```bash
 tar -xzvf nginx-1.24.0.tar.gz
```

进入解压目录

```bash
cd nginx-1.24.0/
```

配置并制定安装路径 /usr/local/nginx 下

```bash
./configure --prefix=/usr/local/nginx --user=www --group=www --with-http_stub_status_module --with-http_ssl_module
```

![image-20231109224057685](https://cdn.jsdelivr.net/gh/RonHaiT/Image-hosting/image-20231109224057685.png)

执行安装，可能新系统提示没有`make`命令，输入 y 继续安装执行即可

```bash
make install
```

编译后入下图，可执行命令查看 nginx 的文件目录

```bash
whereis nginx
```

切换路径并删除解压包

```bash
cd ..
rm -rf /usr/local/nginx-1.24.0
```

### 清空注释

```bash
grep -Ev '#|^$' nginx.conf.default > nginx.conf
```

## 添加配置文件

新建配置文件

```bash
vim nginx.service
```

复制配置文件到启动目录

```bash
sudo mv nginx.service /etc/systemd/system
```

新建 nginx 运行的用户组和用户

```bash
sudo groupadd -f www
sudo useradd -g www www
```

## 常用命令

```bash
#重新载入服务列表
systemctl daemon-reload
#启动nginx
systemctl start nginx.service
#将nginx加入自启动脚本
systemctl enable nginx.service

#重启nginx
systemctl restart nginx.service
#查看nginx状态
systemctl status nginx.service
```

![image-20231109224959390](https://cdn.jsdelivr.net/gh/RonHaiT/Image-hosting/image-20231109224959390.png)

### 重启后执行查看 80 端口占用

```bash
netstat -tlunp | grep 80
```

找服务实例的安全规则放行 80 端口

放行后访问 ip 地址可以看到以下图,安装成功

![image-20231109230321051](https://cdn.jsdelivr.net/gh/RonHaiT/Image-hosting/image-20231109230321051.png)

## 常用配置

找到自己的 nginx 安装目录,按上述配置的文件在:`sudo vim /usr/local/nginx/conf/nginx.conf`

```bash
# 以下是全局段配置
#user administrator administrators;  #配置用户或者组，默认为nobody nobody。
#worker_processes 2;  #设置进程数，默认为1
#pid /nginx/pid/nginx.pid; #指定nginx进程运行文件存放地址
error_log log/error.log debug;  #制定日志路径，级别：debug|info|notice|warn|error|crit|alert|emerg
# events段配置信息
events {
    accept_mutex on;   #设置网路连接序列化，防止惊群现象发生，默认为on
    multi_accept on;  #设置一个进程是否同时接受多个网络连接，默认为off
    #use epoll;      #事件驱动模型，select|poll|kqueue|epoll|resig|/dev/poll|eventport
    worker_connections  1024;    #最大连接数，默认为512
}
# http、配置请求信息
http {
    include       mime.types;   #文件扩展名与文件类型映射表
    default_type  application/octet-stream; #默认文件类型，默认为text/plain
    #access_log off; #取消服务日志
    log_format myFormat '$remote_addr–$remote_user [$time_local] $request $status $body_bytes_sent $http_referer $http_user_agent $http_x_forwarded_for'; #自定义格式
    access_log log/access.log myFormat;  #combined为日志格式的默认值
    sendfile on;   #允许sendfile方式传输文件，默认为off，可以在http块，server块，location块。
    sendfile_max_chunk 100k;  #每个进程每次调用传输数量不能大于设定的值，默认为0，即不设上限。
    keepalive_timeout 65;  #连接超时时间，默认为75s，可以在http，server，location块。


    upstream mysvr {
      server 127.0.0.1:7878;
      server 192.168.10.121:3333 backup;  #热备
    }
    error_page 404 https://www.baidu.com; #错误页
    # 第一个Server区块开始，表示一个独立的虚拟主机站点
    server {
        keepalive_requests 120; #单连接请求上限次数。
        listen       4545;   #监听端口
        server_name  127.0.0.1;   #监听地址
        location  ~*^.+$ {       #请求的url过滤，正则匹配，~为区分大小写，~*为不区分大小写。
           #root path;  #根目录
           #index vv.txt;  #设置默认页
           proxy_pass  http://mysvr;  #请求转向mysvr 定义的服务器列表
           deny 127.0.0.1;  #拒绝的ip
           allow 172.18.5.54; #允许的ip
        }
    }
}
```