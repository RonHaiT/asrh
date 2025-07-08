---
title: Jekyll博客生成器
published: 2025-03-22
description: Jekyll博客生成器
tags: [SSG]
category: Tools
draft: false
---
Jekyll是一个简单的静态网站生成器，用于生成个人，项目或组织的网站。 它由GitHub联合创始人汤姆·普雷斯顿·沃纳用Ruby编写，并根据MIT许可证发布。

官网地址：https://jekyllrb.com/

中文地址:https://www.jekyll.com.cn/

# Windows安装

推荐使用[RubyInstaller](https://rubyinstaller.org/) 安装

安装成功后,不更换源出现执行安装命令后没有反应

查看源

```ruby
gem sources
```

添加淘宝源

```ruby
gem sources --add https://gems.ruby-china.com/ --remove https://rubygems.org/
gem sources -l  # 确保已经切换
```

在查看
```bash
gem sources
```

切换官方源

```bash
gem sources --add https://rubygems.org/ --remove https://gems.ruby-china.com/
```

安装 Jekyll 和 [bundler](https://www.jekyll.com.cn/docs/ruby-101/#bundler) [gems](https://www.jekyll.com.cn/docs/ruby-101/#gems)

```bash
gem install jekyll bundler
```

![image-20250402132425576](https://cdn.jsdelivr.net/gh/RonHaiT/Image-hosting/image-20250402132425576.png)

在 `./web` 目录下创建一个全新的 Jekyll 网站

```bash
jekyll new jekyllblog
```

进入新创建的目录。

```bash
cd jekyllblog
```

构建网站并启动一个本地服务器

```bash
bundle exec jekyll serve
```

在浏览器中打开 [http://localhost:4000](http://localhost:4000/) 网址

# Mac安装

保持 xcode 为最新，执行以下命令

```bash
xcode-select --install
```

## 使用 brew安装ruby

Jekyll 需要**Ruby > 2.4.0**。macOS Catalina 10.15 附带 ruby 2.6.3，因此没问题。如果您运行的是以前的 macOS 系统，则必须安装较新版本的 Ruby。

```bash
brew install ruby
```

```bash
export PATH=/usr/local/opt/ruby/bin:$PATH
```

## 安装 Bundler 和 jekyll

``` bash
sudo gem install bundler
sudo gem install -n /usr/local/bin/ jekyll
```

```bash
bundler -v
Bundler version 2.6.6
```

设置环境变量

```bash
ruby -v
ruby 3.4.2 (2025-02-15 revision d2930f8e7a) +PRISM [arm64-darwin24]
```

```bash
export PATH=$HOME/.gem/ruby/X.X.0/bin:$PATH
# 替换为查看到的版本
export PATH=$HOME/.gem/ruby/3.4.2/bin:$PATH
```

```bash
gem env
```



