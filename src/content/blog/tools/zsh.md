---
title: Zsh安装和配置
published: 2019-05-25
description: Zsh安装和配置
tags: [Mac, Linux]
category: Tools
draft: false
---
# Zsh安装和配置

## 安装 zsh

[ZSH](https://github.com/ohmyzsh/ohmyzsh/wiki/Installing-ZSH) 可以提高终端使用体验，是命令行终端必装软件，下面介绍在 MAC 与 UBUNTU 中的安装方法

安装软件

```bash
sudo yum update && sudo yum -y install zsh
```

设置当前用户默认`shell`

```bash
chsh -s /bin/zsh
或
sudo usermod -s $(which zsh) 用户名
```

注销帐号后执行，查看当前 shell 是否是 zsh

```bash
echo $SHELL
```

## 安装 git

```bash
yum install git
```

## 安装 oh my zsh

安装软件

```bash
sh -c "$(wget https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh -O -)"
```

安装时以下错误

```bash
[root@localhost ~]# sh -c "$(wget https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh -O -)"
--2022-03-09 00:58:26--  https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh
正在解析主机 raw.github.com (raw.github.com)... 185.199.111.133, 185.199.108.133, 185.199.109.133, ...
正在连接 raw.github.com (raw.github.com)|185.199.111.133|:443... 已连接。
已发出 HTTP 请求，正在等待回应... 301 Moved Permanently
位置：https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh [跟随至新的 URL]
--2022-03-09 00:58:27--  https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh
正在解析主机 raw.githubusercontent.com (raw.githubusercontent.com)... 0.0.0.0, ::
正在连接 raw.githubusercontent.com (raw.githubusercontent.com)|0.0.0.0|:443... 失败：Connection refused。
正在连接 raw.githubusercontent.com (raw.githubusercontent.com)|::|:443... 失败：Connection refused。
```

**解决办法**

`vim /etc/hosts`增加以下内容

```bash
199.232.68.133 raw.githubusercontent.com
199.232.68.133 user-images.githubusercontent.com
199.232.68.133 avatars2.githubusercontent.com
199.232.68.133 avatars1.githubusercontent.com
```

## 修改主题

zsh 拥有[丰富的主题](https://github.com/ohmyzsh/ohmyzsh/wiki/Themes)

更改配置

```bash
vim ~/.zshrc
```

配置生效

```bash
source ~/.zshrc
```

## 插件扩展

### 配置文件

- 插件需要修改 `~/.zshrc` 配置文件中的 `plugins`配置段
- 在目录 `~/.oh-my-zsh/plugins`中默认存在了大量插件，只要添加到配置项中即可。
- 更新配置后使用`source ~/.zshrc`命令重新加载配置

### 历史记录

这个插件需要单独下载

```bash
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
```

下载后在配置文件的`plugins`下载后在配置文件的

```bash
plugins=(git history history-substring-search node npm wd web-search last-working-dir zsh-autosuggestions)
```

### 命令提示

首先下载插件

```bash
cd

wget https://mimosa-pudica.net/src/incr-0.2.zsh
```

加载插件

```bash
source incr*.zsh
```