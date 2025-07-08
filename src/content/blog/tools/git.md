---
title: Git 安装与使用
published: 2019-12-21
description: Git 安装与使用
tags: [Git, Mac, Linux, Windows]
category: Tools
draft: false
---

# Git 安装与使用

> [git 官方文档]([Git - Book (git-scm.com)](https://git-scm.com/book/zh/v2))

```bash
$ git init #初始化
$ git status 检测当前目录下的文件的状态
	三种状态：
	红色：新增的文凭/修改了的原才文件 =》git add 文件名/.
	绿色：git已经管理起来 =》git commit -m '描述信息'
	生成版本
$ git add 文件名或文件夹、或者全部.
$ git commit -m '描述信息'
```

## Git 全局设置

```
git config --global user.name "ronhai"
git config --global user.email "122286911@qq.com"
```

创建 git 仓库:

```
mkdir document
cd document
git init
touch README.md
git add README.md
git commit -m "first commit"
git remote add origin https://gitee.com/thell/document.git
git push -u origin master
```

已有仓库?

```
cd existing_git_repo
git remote add origin https://gitee.com/thell/document.git
git push -u origin master
```

首次提交到仓库

```bash
git remote add origin https://xxxx
```

git pull 拉去分支

```bash
 git pull --rebase origin master
```

修改拉去分支冲突的地方

```bash
git rebase --continue
```

`命令继续代码的提交(推荐),执行之后,需要重新提交,解决一下当前的代码冲突之后重新提交直至没有rebase提示,就可以正常提交了`

推送到仓库

```bash
git push -u origin master
```

## Windows 下定义别名

修改 Git 安装目录下的`C:\Program Files\Git\etc/bash.bashrc`文件,加入以下配置

```bash
alias gs="git status"
alias gc="git commit -m "
alias gl="git log --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit"
alias gb="git branch"
alias ga="git add -A"
alias go="git checkout"
alias gp="git push;git push github"
```

> 注意打开文件需要管理员身份打开，否则不能保存

## Mac 下定义别名

编辑文件`vim ~/.zshrc`,增加以下代码

```bash
# git别名
alias gs="git status"
alias gc="git commit -m "
alias gl="git log --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit"
alias gb="git branch"
alias ga="git add -A"
alias go="git checkout"
alias gp="git push;git push github"
```

让配置文件生效

`source ~/.zshrc`

## 同时推送 gitee 和 github

项目下找到.git 文件夹，打开配置文件，增加 github 配置

```bash
[core]
        repositoryformatversion = 0
        filemode = true
        bare = false
        logallrefupdates = true
        ignorecase = true
        precomposeunicode = true
[remote "origin"]
        url = git@gitee.com:pythl/wslh.git
        fetch = +refs/heads/*:refs/remotes/origin/*
[remote "origin"]
        url = git@github.com:pythl/wslh.git
        fetch = +refs/heads/*:refs/remotes/origin/*
[branch "master"]
        remote = origin
        merge = refs/heads/master
```

## gitignore 配置

[官方地址](https://github.com/github/gitignore/blob/main/Python.gitignore)

## 常用分支

### master 分支

1 .主分支，主要用来版本发布,一般不提交代码，只会 merge 其他分支已经测试好的代码
2 .

### develop

- 开发分支，保存了开发的最新代码
- 日常开发都是从这里拉分支

### feature

- 具体的功能发开分支，只会和 develop 分支交互
- 在 master 分支打 tag 来表明所有新功能开发完毕,一次性合并

### release

- master 分支的未测试版本，某一期功能开发完毕，都 merge 到 release 上面，测试没有问题并且到了发布日期就合并到 master 分支，进行发布

### hotfix

- 线上 bug 修复分支
- master 存在的 bug，也需要提到 dev 上面