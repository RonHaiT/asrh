---
title: Flutter极光推送
published: 2022-05-15
description: Flutter极光推送
tags: ["Flutter","JPUSH"]
category: Flutter
draft: false
---
# 极光推送

## 注册帐号

官网:https://www.jiguang.cn/

注册帐号，实名认证，创建应用

设置包名

## Flutter创建项目指定包名

`sdk`文档：https://pub.dev/packages/jpush_flutter

`github api`文档 ：https://github.com/jpush/jpush-flutter-plugin

### pub集成

当前时间是2024-07-18使用最新的3.0.5会启动不了项目，使用3.0.3可以

```yaml
// pub 集成
dependencies:
  jpush_flutter: ^3.0.3
```

### android配置

找到项目目录`android/app/build.gradle`，增加极光推送配置

```yaml
    defaultConfig {
        // TODO: Specify your own unique Application ID (https://developer.android.com/studio/build/application-id.html).
        applicationId = "com.ronhai.rh_jpush"
        // You can update the following values to match your application needs.
        // For more information, see: https://docs.flutter.dev/deployment/android#reviewing-the-gradle-build-configuration.
        minSdk = flutter.minSdkVersion
        targetSdk = flutter.targetSdkVersion
        versionCode = flutterVersionCode.toInteger()
        versionName = flutterVersionName
	//极光推送
        manifestPlaceholders = manifestPlaceholders + [
            JPUSH_PKGNAME : applicationId,
            JPUSH_APPKEY : "625df0266732b0e69aa4686b", //自己的极光appkey8
            JPUSH_CHANNEL : "developer-default",
        ]
    }
```

### main代码

```dart
import 'package:flutter/material.dart';
import 'package:jpush_flutter/jpush_flutter.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Flutter Demo',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
        useMaterial3: true,
      ),
      home: const MyHomePage(),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({Key? key}) : super(key: key);

  @override
  _MyHomePageState createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  void initState() {
    super.initState();
    this.initPlatformState();
  }

  Future<void> initPlatformState() async {
    JPush jpush = new JPush();
    jpush.getRegistrationID().then((rid) {
      print('jpushid:$rid');
    });
    jpush.setup(
      appKey: "625df0266732b0e69aa4686b",
      channel: "theChannel",
      production: false,
      debug: true,
    );
    jpush.setAlias('rh').then((map) {
      print('设置别名成功');
    });
    jpush.applyPushAuthority(
        new NotificationSettingsIOS(sound: false, alert: false, badge: false));
    try {
      jpush.addEventHandler(
        onReceiveNotification: (Map<String, dynamic> message) async {
          print("flutter onReceiveNotification: $message");
        },
        onOpenNotification: (Map<String, dynamic> message) async {
          print("flutter onOpenNotification: $message");
        },
        onReceiveMessage: (Map<String, dynamic> message) async {
          print("flutter onReceiveMessage: $message");
        },
      );
    } on Exception {
      print("Failed to get platform version");
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('极光推送'),
      ),
      body: const Center(
        child: Text('极光推送'),
      ),
    );
  }
}
```

## 报错文档

如果提示下面错误：

```bash
    uses-sdk:minSdkVersion 16 cannot be smaller than version 17 declared in library [:jpush_flutter] D:\flutter2x\flutter_jpush\build\jpush_flutter\intermediates\library_manifest\debug\AndroidManifest.xml as the library might be using APIs not available in 16
        Suggestion: use a compatible library with a minSdk of at most 16,
                or increase this project's minSdk version to at least 17,
                or use tools:overrideLibrary="com.jiguang.jpush" to force usage (may lead to runtime failures)
```

请修改：minSdkVersion版本为17

修改方法：找到a`ndroid/app/build.gradle`  修改` minSdkVersion`版本为17

`AndroidManifest.xml`报错文档

如果提示下面错误：

```bash
android\app\src\main\AndroidManifest.xml:5:9-42 Error:
        Attribute application@name at AndroidManifest.xml:5:9-42 requires a placeholder substitution but no value for <applicationName> is provided.D:\getx\flutter_jpush\android\app\src\debug\AndroidManifest.xml Error:
        Validation failed, exiting

FAILURE: Build failed with an exception.
```

参考：https://github.com/jpush/jpush-flutter-plugin/issues/339

修改`/android/app/build.gradle` 配置方法

以前：

```yaml
android: {
  ....
  defaultConfig {
    ...
    manifestPlaceholders = [
        JPUSH_PKGNAME : applicationId,
        JPUSH_APPKEY : "17d78ecf32c322db169a1d98",
        JPUSH_CHANNEL : "developer-default", //暂时填写默认值即可.
    ]
  }    
```

替换为：

```yaml
android: {
  ....
  defaultConfig {  
    ...     
     manifestPlaceholders = manifestPlaceholders + [
            JPUSH_PKGNAME : applicationId,
            JPUSH_APPKEY : "17d78ecf32c322db169a1d98",
            JPUSH_CHANNEL : "developer-default",
      ]
  }   
```

(注意+号)

### 最终效果

![image-20240718123359836](https://cdn.jsdelivr.net/gh/RonHaiT/Image-hosting/image-20240718123359836.png)

![image-20240718123414593](https://cdn.jsdelivr.net/gh/RonHaiT/Image-hosting/image-20240718123414593.png)