---
title: Flutter常用配置
published: 2025-02-03
description: 'Flutter常用配置'
tags: [Flutter]
category: 'Flutter'
draft: false 
---
# 透明导航栏

## main配置

在入口文件的main中加入以下代码
```dart
import 'package:flutter/services.dart';
SystemUiOverlayStyle systemUiOverlayStyle =
    const SystemUiOverlayStyle(statusBarColor: Colors.transparent);
SystemChrome.setSystemUIOverlayStyle(systemUiOverlayStyle);
```

## 页面配置

```dart
appBar: AppBar(
  backgroundColor: Colors.transparent, //背景透明
  elevation: 0, //去掉阴影
),
```

