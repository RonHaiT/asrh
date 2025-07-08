---
title: SSH连接和设置
published: 2019-10-22
description: SSH连接和设置
tags: [Linux, Mac,Windows,]
category: Linux
draft: false
---

# SSH禁止管理员登录

## 新增用户

```bash
adduser test
```

## 修改密码

```bash
passwd test
```

## 赋管理员权限

- 先修改配置文件为可编辑：chmod -v u+w /etc/sudoers
- 修改：vim /etc/sudoers
- 赋权：找到 root ALL=(ALL) ALL 在下边加一行 test ALL=(ALL) NOPASSWD :ALL
- 说明：NOPASSWD :ALL 代表的含义是在 test 用户进行 sudo 操作指令的时候不需要输入密码

## 权限管理设为只读

```bash
chmod -v u-w /etc/sudoers
```

## 禁止 root 登录

编辑配置文件:`vim /etc/ssh/sshd_config`

```vim
 39 #LoginGraceTime 2m
 40 #PermitRootLogin prohibit-password
 41 PermitRootLogin no //改为 no
 42 #StrictModes yes
 43 #MaxAuthTries 6
 44 #MaxSessions 10
```

重启 ssh

```bash
systemctl restart sshd
```

## 调试用户

- 退出登录后使用 root 测试是否可以登录成功,不可以即成功

  ```bash
  root@11.222.33.188's password:
  Permission denied, please try again.
  ```

- 使用自定义的用户名,登录即成功

  没有使用 sudo

  ```bash
  ~
  "/etc/ssh/sshd_config" [Permission Denied]
  ```

  使用 sudo

  ![image-20231109222630429](https://cdn.jsdelivr.net/gh/RonHaiT/Image-hosting/image-20231109222630429.png)

## 文件传输

个人电脑传服务器，如果是传文件夹需要加`-r`,文件就不用加

```bash
scp -r D:\thl\vue3_demo\wslh-doc\docs\.vitepress\dist lh@11.111.11.11:/www/doc/
```

## 生成sslkey

服务器命令生成

```bash
ssh-keygen -t rsa -b 4096 -C "122286911@qq.com"
```

查看密钥

```bash
cat id_rsa.pub 
```

复制密钥到github

## 安装git

```basic
sudo yum install -y git
```

