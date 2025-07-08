---
title: Brew安装
published: 2019-10-25
description: Brew安装及使用
tags: [Mac, Linux]
category: Tools
draft: false
---
# Brew

### 安装

#### Git 安装

安装前需要先安装 git,Git 官网:https://git-scm.com/

#### 官方安装

Brew 官网:https://brew.sh/

终端执行命令:

`/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`

#### 国内快速安装

使用自动安装脚本 [HomebrewCN](https://gitee.com/cunkai/HomebrewCN)安装简单快速，并可以在安装过程中设置镜像源，适合安装经常失败的同学。

苹果电脑标准安装脚本：（推荐 优点全面 缺点慢一点）

```bash
/bin/zsh -c "$(curl -fsSL https://gitee.com/cunkai/HomebrewCN/raw/master/Homebrew.sh)"
```

苹果电脑极速安装脚本：（优点安装速度快 缺点 update 功能需要命令修复 ）

```bash
/bin/zsh -c "$(curl -fsSL https://gitee.com/cunkai/HomebrewCN/raw/master/Homebrew.sh)" speed
```

Linux 标准安装脚本：

```bash
rm Homebrew.sh ; wget https://gitee.com/cunkai/HomebrewCN/raw/master/Homebrew.sh ; bash Homebrew.sh
```

苹果电脑卸载脚本：

```bash
/bin/zsh -c "$(curl -fsSL https://gitee.com/cunkai/HomebrewCN/raw/master/HomebrewUninstall.sh)"
```

Linux 卸载脚本：

```bash
rm HomebrewUninstall.sh ; wget https://gitee.com/cunkai/HomebrewCN/raw/master/HomebrewUninstall.sh ; bash HomebrewUninstall.sh
```

#### 错误处理

更新系统后无法正常下载,请安装按官方方法安装

提示`the remote end hung up unexpectedly`,卸载了重新安装

```bash
Press RETURN to continue or any other key to abort
==> /usr/bin/sudo /usr/sbin/chown -R aa:admin /opt/homebrew
==> Downloading and installing Homebrew...
HEAD is now at 8de10a05b Merge pull request #10472 from MikeMcQuaid/new-issue-templates
error: Not a valid ref: refs/remotes/origin/master
fatal: ambiguous argument 'refs/remotes/origin/master': unknown revision or path not in the working tree.
Use '--' to separate paths from revisions, like this:
'git [...] -- [...]'
fatal: the remote end hung up unexpectedly
fatal: early EOF
fatal: index-pack failed
Error: Fetching /opt/homebrew/Library/Taps/homebrew/homebrew-core failed!
fatal: invalid upstream 'origin/master'
Failed during: /opt/homebrew/bin/brew update --force --quiet

```

解决方法:

1.卸载

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/uninstall.sh)"
```

2.设置 Git Compression

```bash
git config --global core.compression 0
```

3.设置 Git buffer size

```bash
git config --global http.postBuffer 1048576000
```

4.重新安装 brew

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

### 问题 fatal

`unable to access 'https://github.com/Homebrew/brew/':`

执行以下两条命令:

```bash
git config --global --unset http.proxy
git config --global --unset https.proxy
```

### 通信协议错误

提示默认[通信协议](https://so.csdn.net/so/search?q=通信协议&spm=1001.2101.3001.7020)出错

`HTTP/2 stream 1 was not closed cleanly before end of the underlying stream`

更改默认通信协议：git config --global http.version HTTP/1.1

### 网络问题

提示以下信息,更换好的网络环境重新执行

`curl: (56) LibreSSL SSL_read: error:02FFF03C:system library:func(4095):Operation timed out, errno 60`

### 成功过程

提示成功后执行

```bash
~ /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
==> Checking for `sudo` access (which may request your password)...
Password:
==> This script will install:
/opt/homebrew/bin/brew
/opt/homebrew/share/doc/homebrew
/opt/homebrew/share/man/man1/brew.1
/opt/homebrew/share/zsh/site-functions/_brew
/opt/homebrew/etc/bash_completion.d/brew
/opt/homebrew

Press RETURN/ENTER to continue or any other key to abort:
==> /usr/bin/sudo /usr/sbin/chown -R wslh:admin /opt/homebrew
==> Downloading and installing Homebrew...
HEAD is now at a5a5d927f Merge pull request #13400 from Homebrew/dependabot/bundler/Library/Homebrew/sorbet-static-and-runtime-0.5.10087
==> Tapping homebrew/core
remote: Enumerating objects: 1207052, done.
remote: Counting objects: 100% (63/63), done.
remote: Compressing objects: 100% (38/38), done.
remote: Total 1207052 (delta 31), reused 56 (delta 25), pack-reused 1206989
Receiving objects: 100% (1207052/1207052), 484.26 MiB | 671.00 KiB/s, done.
Resolving deltas: 100% (831897/831897), done.
From https://github.com/Homebrew/homebrew-core
 * [new branch]              master     -> origin/master
HEAD is now at 20ff88ce3b0 toxcore: add 0.2.18 bottle.
Warning: /opt/homebrew/bin is not in your PATH.
  Instructions on how to configure your shell for Homebrew
  can be found in the 'Next steps' section below.
==> Installation successful!

==> Homebrew has enabled anonymous aggregate formulae and cask analytics.
Read the analytics documentation (and how to opt-out) here:
  https://docs.brew.sh/Analytics
No analytics data has been sent yet (nor will any be during this install run).

==> Homebrew is run entirely by unpaid volunteers. Please consider donating:
  https://github.com/Homebrew/brew#donations

==> Next steps:
- Run these two commands in your terminal to add Homebrew to your PATH:
    echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> /Users/wslh/.zprofile
    eval "$(/opt/homebrew/bin/brew shellenv)"
- Run brew help to get started
- Further documentation:
    https://docs.brew.sh
```

提示成功后执行以下两条命令:(路径根据安装本机的提示设置)

```bash
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> /Users/wslh/.zprofile
eval "$(/opt/homebrew/bin/brew shellenv)"
```

### 配置 brew 源

[阿里源地址](https://developer.aliyun.com/mirror/homebrew)

### Bash 终端配置

```bash
    # 替换brew.git:
    cd "$(brew --repo)"
    git remote set-url origin https://mirrors.aliyun.com/homebrew/brew.git
    # 替换homebrew-core.git:
    cd "$(brew --repo)/Library/Taps/homebrew/homebrew-core"
    git remote set-url origin https://mirrors.aliyun.com/homebrew/homebrew-core.git
    # 应用生效
    brew update
    # 替换homebrew-bottles:
    echo 'export HOMEBREW_BOTTLE_DOMAIN=https://mirrors.aliyun.com/homebrew/homebrew-bottles' >> ~/.bash_profile
    source ~/.bash_profile
```

### Zsh 终端配置

```bash
    # 替换brew.git:
    cd "$(brew --repo)"
    git remote set-url origin https://mirrors.aliyun.com/homebrew/brew.git
    # 替换homebrew-core.git:
    cd "$(brew --repo)/Library/Taps/homebrew/homebrew-core"
    git remote set-url origin https://mirrors.aliyun.com/homebrew/homebrew-core.git
    # 应用生效
    brew update
    # 替换homebrew-bottles:
    echo 'export HOMEBREW_BOTTLE_DOMAIN=https://mirrors.aliyun.com/homebrew/homebrew-bottles' >> ~/.zshrc
    source ~/.zshrc
```

### 恢复默认配置

出于某些场景, 可能需要回退到默认配置, 你可以通过下述方式回退到默认配置。

首先执行下述命令:

```bash
# 重置brew.git:
	$ cd "$(brew --repo)"
	$ git remote set-url origin https://github.com/Homebrew/brew.git
	# 重置homebrew-core.git:
	$ cd "$(brew --repo)/Library/Taps/homebrew/homebrew-core"
	$ git remote set-url origin https://github.com/Homebrew/homebrew-core.git
```

然后删掉 HOMEBREW_BOTTLE_DOMAIN 环境变量,将你终端文件

```bash
 ~/.bash_profile
```

或者

```bash
 ~/.zshrc
```

中

```bash
HOMEBREW_BOTTLE_DOMAIN
```

行删掉, 并执行

```bash
 source ~/.bash_profile
```

或者

```bash
 source ~/.zshrc
```

### 常用命令

```bash
# 安装软件
brew install wget
# 更新软件
brew upgrade
# 更新homebrew
brew update
# 重新安装软件
brew reinstall wget
# 查看所有软件
brew list
# 卸载软件
brew uninstall wget
```