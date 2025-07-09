---
title: Flutter 日期时间处理
published: 2025-02-01
description: 'Flutter 日期时间处理'
tags: [Flutter]
category: 'Flutter'
draft: false 

---
## DateTime
### 当前时间
```dart
DateTime dateTime = DateTime.now();
```
![image.png](https://cdn.jsdelivr.net/gh/RonHaiT/Image-hosting/1737722456160-37b03eff-3a1f-4a70-932d-09f901422c7a.png)

### 获取年月日

```dart
DateTime dateTime = DateTime.now();
var str =
  "${dateTime.year}年-${dateTime.month}月-${dateTime.day}日-${dateTime.hour}时-${dateTime.minute}分-${dateTime.second}秒";
print(str);
```
### 时间戳
```dart
DateTime dateTime = DateTime.now();
print(dateTime.microsecond);
print(dateTime.millisecondsSinceEpoch);
```
### 时间戳转日期
```dart
DateTime dateTime = DateTime.now();
DateTime d =
  DateTime.fromMillisecondsSinceEpoch(dateTime.millisecondsSinceEpoch);
print(d);
```
### 日期字符串转日期
```dart
DateTime d = DateTime(2024, 02, 02);
print(d.millisecondsSinceEpoch);

DateTime d = DateTime.parse('2024-01-02');
print(d.millisecondsSinceEpoch);
```
### 时间加减
```dart
DateTime d = DateTime.now();
print(d);//2025-01-24 21:28:27.706136
print(d.add(const Duration(days: 1)));//2025-01-25 21:28:27.706136
print(d.add(const Duration(minutes: 5)));//2025-01-24 21:33:27.706136
print(d.add(const Duration(days: -3)));//2025-01-21 21:28:27.706136
TimeOfDay
```
### 获取当前时间
```dart
TimeOfDay time = TimeOfDay.now();
print(time);//TimeOfDay(21:31)
```
### showDatePicker
时间选择器
```dart
import 'package:flutter/material.dart';

class DateHomePage extends StatefulWidget {
  const DateHomePage({super.key});

  @override
  State<DateHomePage> createState() => _DateHomePageState();
}

class _DateHomePageState extends State<DateHomePage> {
  late DateTime _dateTime = DateTime.now();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: Text('Date and Time'),
        ),
        body: Center(
            child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            InkWell(
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text("${_dateTime.year}-${_dateTime.month}-${_dateTime.day}"),
                  const Icon(Icons.arrow_drop_down),
                ],
              ),
              onTap: () async {
                DateTime? d = await showDatePicker(
                    context: context,
                    firstDate: DateTime(2000, 11, 11),
                    lastDate: DateTime(2025, 12, 31));
                if (d != null) {
                  setState(() {
                    _dateTime = d;
                  });
                }
              },
            )
          ],
        )));
  }
}
```
格式为英语,如果使用中文需要配置国际化语言
### 国际化
官方文档:https://docs.flutter.cn/ui/accessibility-and-internationalization/internationalization/

pubspec.yaml配置
```dar
dependencies:
  flutter:
    sdk: flutter
  flutter_localizations:
    sdk: flutter
```
下一步，先运行 pub get packages，然后引入 flutter_localizations 库，然后为 MaterialApp 指定 localizationsDelegates 和 supportedLocales：
```dart
import 'package:flutter_localizations/flutter_localizations.dart';
import 'package:flutter/material.dart';
import './routers/routers.dart';
import 'package:flutter_localizations/flutter_localizations.dart';

void main(List<String> args) {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Tabs',
      //全局主题
      theme: ThemeData(
          primarySwatch: Colors.blue,
          appBarTheme: const AppBarTheme(
            centerTitle: true,
          )),
      initialRoute: '/',
      //2注册路由表
      onGenerateRoute: onGenerateRoute,
      //配置国际化
      localizationsDelegates: const [
        GlobalMaterialLocalizations.delegate,
        GlobalWidgetsLocalizations.delegate,
        GlobalCupertinoLocalizations.delegate,
      ],
      supportedLocales: const [
        Locale('zh', 'CH'), // 中文
        Locale('en', 'US'), // English
      ],
    
    );
  }
}
```
![image.png](https://cdn.jsdelivr.net/gh/RonHaiT/Image-hosting/1737727002183-c9307822-d85d-4a25-a292-e3ba1e8295fd.png)

### showTimePicker

选择时间框
```dart
import 'package:flutter/material.dart';

class DateHomePage extends StatefulWidget {
  const DateHomePage({super.key});

  @override
  State<DateHomePage> createState() => _DateHomePageState();
}

class _DateHomePageState extends State<DateHomePage> {
  late TimeOfDay _timeOfDay = TimeOfDay.now();
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: const Text('Date and Time'),
        ),
        body: Center(
            child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            InkWell(
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text("${_timeOfDay.hour}-${_timeOfDay.minute}"),
                  const Icon(Icons.arrow_drop_down),
                ],
              ),
              onTap: () async {
                TimeOfDay? t = await showTimePicker(
                    context: context, initialTime: _timeOfDay);
                if (t != null) {
                  setState(() {
                    _timeOfDay = t;
                  });
                }
              },
            )
          ],
        )));
  }
}
```

![image.png](https://cdn.jsdelivr.net/gh/RonHaiT/Image-hosting/1737727633965-a7ad69ee-7990-4cec-b280-0db181fac91d.png)