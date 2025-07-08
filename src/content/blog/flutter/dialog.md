---
title: Flutter反馈组件
published: 2022-01-06
description: "Flutter反馈组件"
tags: ["Flutter"]
category: Flutter
draft: false
---
# 反馈组件

## Dialog

### AlertDialog

```dart
    // 1.弹出框
    alertDialog() async {
      var result = await showDialog(
          barrierDismissible: false, //表示点击灰色背景的时候是否消失弹出框
          context: context,
          builder: (context) {
            return AlertDialog(
              title: const Text("提示信息!"),
              content: const Text("您确定要删除吗?"),
              actions: <Widget>[
                TextButton(
                  child: const Text("取消"),
                  onPressed: () {
                    print("取消");
                    Navigator.pop(context, 'Cancle');
                  },
                ),
                TextButton(
                  child: const Text("确定"),
                  onPressed: () {
                    print("确定");
                    Navigator.pop(context, "Ok");
                  },
                )
              ],
            );
          });
      print('result${result}'); //resultOk resultCancle
    }

ElevatedButton(
   onPressed: alertDialog,
   child: const Text('弹出对话框'),
 ),
```

### SimpleDialog

SimpleDialogOption

```dart
   //2.简单选择框
    simpleDialog() async {
      var result = await showDialog(
          barrierDismissible: true, //表示点击灰色背景的时候是否消失弹出框
          context: context,
          builder: (context) {
            return SimpleDialog(
              title: const Text("请选择内容"),
              children: <Widget>[
                SimpleDialogOption(
                  child: const Text("Option A"),
                  onPressed: () {
                    Navigator.pop(context, "A");
                  },
                ),
                const Divider(),
                SimpleDialogOption(
                  child: const Text("Option B"),
                  onPressed: () {
                    Navigator.pop(context, "B");
                  },
                ),
                const Divider(),
                SimpleDialogOption(
                  child: const Text("Option C"),
                  onPressed: () {
                    Navigator.pop(context, "C");
                  },
                ),
              ],
            );
          });
      print('result${result}');
    }
 ElevatedButton(
   onPressed: simpleDialog,
   child: const Text('简单选择框'),
 ),
```

### showModalBottomSheet

```dart
    //3.底部选择框
    modelBottomSheet() async {
      var result = await showModalBottomSheet(
          context: context,
          builder: (context) {
            return SizedBox(
              height: 220,
              child: Column(
                children: <Widget>[
                  ListTile(
                    title: const Text("分享 A"),
                    onTap: () {
                      Navigator.pop(context, "分享 A");
                    },
                  ),
                  const Divider(),
                  ListTile(
                    title: const Text("分享 B"),
                    onTap: () {
                      Navigator.pop(context, "分享 B");
                    },
                  ),
                  const Divider(),
                  ListTile(
                    title: const Text("分享 C"),
                    onTap: () {
                      Navigator.pop(context, "分享 C");
                    },
                  )
                ],
              ),
            );
          });
      print(result);
    }

```

```dart
    ElevatedButton(
      onPressed: modelBottomSheet,
      child: const Text('底部选择框'),
    ),
```

### 自定义dialog

自定义 Dialog 对象，需要继承 Dialog 类，尽管 Dialog 提供了 child 参数可以用来写视图界面，但是往往会
达不到我们想要的效果，因为默认的 Dialog 背景框是满屏的。如果我们想完全定义界面，就需要重写
build 函数。下面我们通过两个案例给大家演示一下 Dialog 的使用。

`myDialog.dart`

```dart
import 'dart:async';
import 'package:flutter/material.dart';

// ignore: must_be_immutable
class MyDialog extends Dialog {
  String title;
  String content;
  Function()? onClosed;
  MyDialog(
      {Key? key,
      required this.title,
      required this.onClosed,
      this.content = ""})
      : super(key: key);
  @override
  Widget build(BuildContext context) {
    return Material(
      type: MaterialType.transparency,
      child: Center(
          child: Container(
        height: 300,
        width: 300,
        color: Colors.white,
        child: Column(
          children: <Widget>[
            Padding(
              padding: const EdgeInsets.all(10),
              child: Stack(
                children: <Widget>[
                  Align(
                    alignment: Alignment.center,
                    child: Text(title),
                  ),
                  Align(
                    alignment: Alignment.centerRight,
                    child: InkWell(
                      onTap: onClosed,
                      child: const Icon(Icons.close),
                    ),
                  )
                ],
              ),
            ),
            const Divider(),
            Container(
              padding: const EdgeInsets.all(10),
              width: double.infinity,
              child: Text(content, textAlign: TextAlign.left),
            ),
          ],
        ),
      )),
    );
  }
}
```

```dart
import '../../components/myDialog.dart';
   
//4.自定义dialog
    myDialog() async {
      await showDialog(
          barrierDismissible: true, //表示点击灰色背景的时候是否消失弹出框
          context: context,
          builder: (context) {
            return MyDialog(
                title: '标题',
                onClosed: () {
                  print("关闭");
                  Navigator.of(context).pop();
                },
                content: "我是一个内容");
          });
    }
ElevatedButton(
  onPressed: myDialog,
  child: const Text('自定义dialog'),
),
```

## FlutterToast

支持 ANDROID IOS WEB

[pub 地址](https://pub.dev/packages/fluttertoast)

安装

```dar

```

引入 

```dart
import 'package:fluttertoast/fluttertoast.dart';
```

使用

```dart
    //5. fluttertoast使用
    flutterToast() {
      Fluttertoast.showToast(
          msg: "This is Center Short Toast",
          toastLength: Toast.LENGTH_SHORT,
          gravity: ToastGravity.CENTER,
          timeInSecForIosWeb: 1,
          backgroundColor: Colors.red,
          textColor: Colors.white,
          fontSize: 16.0);
    }
ElevatedButton(
  onPressed: flutterToast,
  child: const Text('fluttertoast使用'),
),
```

## ftoast 的使用

支持支持 ANDROID IOS LINUX MACOS WEB WINDOWS 的另一个插件

[文档地址](https://github.com/Fliggy-Mobile/ftoast/blob/master/README_CN.md)

### 参数

| 参数           | 类型          | 必要  | 默认值                                                       | 说明                              |
| -------------- | ------------- | ----- | ------------------------------------------------------------ | --------------------------------- |
| context        | BuildContext  | true  | null                                                         | 页面环境                          |
| toast          | Widget        | false | null                                                         | 自定义 toast 视图，会覆盖默认视图 |
| msg            | String        | false | null                                                         | 主信息                            |
| msgStyle       | TextStyle     | false | null                                                         | 主信息文本样式                    |
| subMsg         | String        | false | null                                                         | 副信息                            |
| subMsgStyle    | TextStyle     | false | null                                                         | 副信息文本样式                    |
| subMsgSpace    | double        | false | 12.0                                                         | 副信息与主信息的间距              |
| corner         | double        | false | 6.0                                                          | 边角                              |
| color          | Color         | false | Colors.black54                                               | 颜色                              |
| duration       | double        | false | 1800                                                         | 展示时长                          |
| padding        | EdgeInsets    | false | `EdgeInsets.only(left: 16.0, right: 16.0, top: 16.0, bottom: 16.0)` | 内间距                            |
| image          | Widget        | false | null                                                         | 图标                              |
| imageDirection | AxisDirection | false | AxisDirection.up                                             | 图标相对文本的位置                |
| imageSpace     | double        | false | 9.0                                                          | 图标与文本的间距                  |