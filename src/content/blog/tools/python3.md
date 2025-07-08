---
title: Linux 安装 Python3
published: 2019-05-25
description: Linux 安装 Python3
tags: [Linux, Mac, Windows]
category: Tools
draft: false
---
# Linux 安装 Python3

查看原 python 版本终端输入`python`有点低，django5 是需要 3.10 及以后，准备升级到 python3.13

## 安装必要的依赖包

```bash
Python 3.6.8 (default, Jun  5 2024, 14:25:36)
[GCC 10.2.1 20200825 (Alibaba 10.2.1-3.8 2.32)] on linux
Type "help", "copyright", "credits" or "license" for more information.
```

### python 源代码

[下载地址](https://www.python.org/ftp/python/3.13.0/)

```bash
wget https://www.python.org/ftp/python/3.13.0/Python-3.13.0.tgz
```

### 编译环境

```bash
sudo yum groupinstall "Development Tools"
sudo yum install gcc openssl-devel bzip2-devel libffi-devel zlib-devel
sudo yum install wget make
```

这些包分别提供了以下功能：

- `Development Tools`：包含了构建程序所需的编译工具（例如 `gcc`, `make` 等）。
- `openssl-devel`：用于 SSL 支持。
- `bzip2-devel`：用于压缩和解压缩的 bzip2 库。
- `libffi-devel`：用于外部函数接口（FFI），Python 与其他库的交互。
- `zlib-devel`：用于压缩支持。

### 解压和进入源文件目录

```bash
#解压缩进入对应目录
[root@pythl_51 opt]# tar -zxvf Python-3.13.0.tgz
[root@pythl_51 opt]# cd Python-3.13.0
```

### 编译安装

此时准备编译三部曲，编译的

**第一曲**：指定 python3 的安装路径，以及对系统的开发环境监测，使用如下命令

```bash
#configure是一个脚本文件，用于告诉gcc编译器，python3即将安装到哪里，以及对基础的开发环境检查，检查openss1，检查sq1lite，等等
[root@pythl_51 Python-3.13.0]# ./configure --enable-optimizations  --prefix=/opt/python3130
```

**第二曲**：编译 Python
直接输入`make`指令即可

**第三曲**：安装 Python

```bash
sudo make altinstall
```

`altinstall` 比 `install` 更安全，它避免覆盖系统默认的 `python` 版本。

> 编译的第二曲，和第三曲，可以简写成 make&&make install
>
> 代表 make 成功之后，继续 make install

验证安装

安装完成后，验证 Python 版本是否正确

```bash
python3.13 --version
```

## 创建 django 项目

### 安装虚拟环境

```bash
pip3.13 install virtualenv -i https://mirrors.aliyun.com/pypi/simple/
cd /path/to/your/django/project
python3.13 -m venv venv
```

### 激活虚拟环境

```bash
source venv/bin/activate
#退出环境
deactivate
```

### 安装依赖（`requirements.txt`）

```bash
# 导出依赖
pip freeze > requirements.txt
# 安装
pip install -r requirements.txt  -i https://mirrors.aliyun.com/pypi/simple/
```

### 安装 uwsgi

```bash
pip install uwsgi -i https://mirrors.aliyun.com/pypi/simple/
```

### 迁移数据

安装 mysqlclient

```bash
sudo yum install -y gcc python3-devel mysql-devel
```

```bash
pip install mysqlclient -i https://mirrors.aliyun.com/pypi/simple/
```

```bash
python manage.py collectstatic --settings=myblog.settings.prod

python manage.py makemigrations  --settings=myblog.settings.prod
python manage.py  migrate --settings=myblog.settings.prod
python manage.py createsuperuser --settings=myblog.settings.prod
```

### 启动项目

```bash
[root@pythl_51 mysite]# python3.13 manage.py runserver 0.0.0.0:8080
```

## mysq 安装

### 安装

```bash
yum install mariadb-server mariadb-y
```

### 启动数据库

```bash
systemctl start mariadb
systemctl enable mariadb
```

## 虚拟环境安装

```bash
[root@pythl_51 mysite]# pip3 install -i https://pypi.tuna.tsinghua.edu.cn/simple/ virtualenv
```

### 生成虚拟环境

```bash
[root@pythl_51 mysite]# virtualenv  --python=python3 /opt/venvs/mysite
```

### 进入虚拟环境

```bash
[root@pythl_51 opt]# source /opt/venvs/mysite/bin/activate
(mysite) [root@pythl_51 opt]#
```

退出虚拟环境

```python
(city_server) ➜  city_server deactivate
```

### 导出 pip 包

真机的环境包导出

```bash
[root@pythl_51 opt]# pip3 freeze > /opt/mysite/requirements.txt
```

### 导入 pip 包

虚拟机的包安装

```bash
(mysite) [root@pythl_51 mysite]# pip install -i https://pypi.douban.com/simple -r /opt/mysite/requirements.txt
```

## 常见问题

### sqlite3 版本不对

```bash
[root@pythl_51 mysite]# sqlite3 --version
3.7.17 2013-05-20 00:56:22 118a3b35693b134d56ebd780123b7fd6f1497668
```

**删除 sqlit**

```bash
#找到sqlite包名
[root@pythl_51 mysite]# rpm -q sqlite
sqlite-3.7.17-8.el7_7.1.x86_64
#移出包名
[root@pythl_51 mysite]# rpm -e --nodeps sqlite-3.7.17-8.el7_7.1.x86_64

```

**下载安装最新 sqlite**

```bash
[root@pythl_51 opt]# wget https://www.sqlite.org/2022/sqlite-autoconf-3380500.tar.gz
#编译安装
[root@pythl_51 opt]# tar -zxvf sqlite-autoconf-3380500.tar.gz
[root@pythl_51 sqlite-autoconf-3380500]# ./configure  --prefix=/usr
[root@pythl_51 sqlite-autoconf-3380500]# make && make install
[root@pythl_51 mysite]# sqlite3 --version
3.38.5 2022-05-06 15:25:27 78d9c993d404cdfaa7fdd2973fa1052e3da9f66215cff9c5540ebe55c407d9fe
```

**更新完成后报错**

1.查找文件

```bash
[root@pythl_51 mysite]# sudo find / -name libsqlite3.so.0
/usr/lib/libsqlite3.so.0
/opt/sqlite-autoconf-3380500/.libs/libsqlite3.so.0
# 第一个是正确新安装的路径
```

2.将.so 文件路径的目录添加到`/etc/ld.so.conf`文件末尾新添加一行，

```bash
[root@pythl_51 mysite]# vim /etc/ld.so.conf
include ld.so.conf.d/*.conf
#增加此行配置
/usr/lib/libsqlite3.so.0
```

### python 版本不对

错误启动报错

```bash
[root@pythl_51 course]# python manage.py run server 0.0.0.0:9000
  File "manage.py", line 17
    ) from exc
         ^
SyntaxError: invalid syntax
```

正确启动

```bash
[root@pythl_51 course]# python3 manage.py run server 0.0.0.0:9000
```