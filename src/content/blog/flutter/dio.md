---
title: Dio网络请求
published: 2025-02-01
description: 'Flutter Dio网络请求'
tags: [Flutter,Dio]
category: 'Flutter'
draft: false 
---
## JsonMap
json和Map相互转换

### Json转Map
```dart
import 'dart:convert';
Map UserInfo = {"username": "隆海", "age": 23, "hobby": "run"};
print(userInfo);// {"username":"隆海","age":23,"hobby":"run"}
```
### Map转Json

```dart
import 'dart:convert';
String userino = '{"username":"隆海","age":23,"hobby":"run"}';
Map user = json.decode(userino);
Map user = json.decode(userino);
print(json.encode(UserInfo));
print(user);
print(user is Map);
print(user['username']);
```
## 模型类

定义模型类

```dart
class Shopmodel {
  String? sId;
  String? title;
  String? status;
  String? pic;
  String? url;
  Shopmodel.fromJson(Map<String, dynamic> mapJson) {
    sId = mapJson['sid'];
    title = mapJson['title'];
    status = mapJson['status'];
    pic = mapJson['pic'];
    url = mapJson['url'];
  }
}
```

使用

```dart
  void formaJson() {
    String jsonStr =
        '{"_id": "59f6ef443ce1fb0fb02c7a43","title": "米家智能空气炸烤箱","status": "1","pic": "public\\upload\\zon0TTXnXUs1z5meqZhP5aNF.png","url": "12", "position": 1}';
    var jsonMap = json.decode(jsonStr);
    Shopmodel shop = Shopmodel.fromJson(jsonMap);
    print(shop.title);
  }
```

## Dio请求

dio是一个强大的Dart Http请求库，支持Restful API、FormData、拦截器、请求取消、Cookie管理、文件上传/下载、超时、自定义适配器等...

github地址:https://github.com/cfug/dio

中文文档：https://github.com/cfug/dio/blob/main/dio/README-ZH.md
## 安装
```bash
flutter pub add dio
pubspec.yaml安装
dependencies:
dio: ^5.7.0
```
## 使用

### 简单示例
```dart
import 'package:dio/dio.dart';

final dio = Dio();

void getHttp() async {
  final response = await dio.get('https://dart.dev');
  print(response);
}
get
    var res = await Dio().get('https://jdmall.dazhuzi.com/api/httpGet',
        queryParameters: {'username': 'dazhuzi', 'age': 23});
    print(res);
post
var res = await Dio().post('https://jdmall.dazhuzi.com/api/httpPost',
        data: {'username': 'dazhuzi', 'age': 23});
put
    var res = await Dio().put('https://jdmall.dazhuzi.com/api/httpPut',
        queryParameters: {'username': 'dazhuzi', 'age': 23});
    print(res);
delete
    var res = await Dio().delete('https://jdmall.dazhuzi.com/api/httpDelete',
        queryParameters: {'username': 'dazhuzi', 'age': 23});
    print(res);
```

### 列表渲染
```dart
import 'package:flutter/material.dart';
import 'package:dio/dio.dart';

class DioDataPage extends StatefulWidget {
  final String title;
  const DioDataPage({super.key, this.title = 'DioDataPage'});

  @override
  State<DioDataPage> createState() => _DioDataPageState();
}

class _DioDataPageState extends State<DioDataPage> {
  List list = [];
  _getDataList() async {
    var res = await Dio().get(
      'https://jdmall.dazhuzi.com/api/pcate',
    );
    setState(() {
      list = res.data['result'];
    });
  }

  @override
  void initState() {
    super.initState();
    _getDataList();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
      ),
      body: list.isNotEmpty
          ? ListView(
              children: list.map((item) {
                return Column(
                  children: [
                    ListTile(title: Text('${item['title']}')),
                    const Divider()
                  ],
                );
              }).toList(),
            )
          : const Center(child: CircularProgressIndicator()),
    );
  }
}
```

### FutureBuilder渲染
```dart
class _GetDataPageState extends State<GetDataPage> {
  List list = [];
  _getDataList() async {
    var res = await Dio().get(
      'https://jdmall.dazhuzi.com/api/pcate',
    );
    return res.data['result'];
  }

  @override
  void initState() {
    super.initState();
    _getDataList();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
      ),
      body: FutureBuilder(
          future: _getDataList(),
          builder: (context, snapshot) {
            print(snapshot.connectionState);
            if (snapshot.connectionState == ConnectionState.done) {
              if (snapshot.hasError) {
                return Center(
                  child: Text("${snapshot.error}"),
                );
              } else {
                var res = snapshot.data as List;
                return ListView(
                    children: res.map((item) {
                  return ListTile(
                    title: Text("${item['title']}"),
                  );
                }).toList());
              }
            } else {
              return const Center(
                child: CircularProgressIndicator(),
              );
            }
          }),
    );
  }
}
```

### 下拉刷新
```dart
import 'package:flutter/material.dart';
import 'package:dio/dio.dart';
import 'dart:convert';

class RefreshMore extends StatefulWidget {
  final String title;
  const RefreshMore({super.key, this.title = ''});

  @override
  State<RefreshMore> createState() => _RefreshMoreState();
}

class _RefreshMoreState extends State<RefreshMore> {
  List _list = [];
  _getListData() async {
    try {
      var res = await Dio().get(
          'https://www.dazhuzi.com');
      print(res is String);
      var data = json.decode(res.data);
      setState(() {
        _list = data['result'];
      });
    } catch (e) {
      print("err:${e}");
    }
  }

  @override
  void initState() {
    super.initState();
    _getListData();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('RefreshMore'),
      ),
      body: _list.isNotEmpty
          ? RefreshIndicator(
              child: ListView(
                children: _list.map((item) {
                  return ListTile(
                    title: Text("${item['title']}"),
                  );
                }).toList(),
              ),
              onRefresh: () async {
                print('执行刷新');
                await _getListData();
              })
          : circularProgressIndicator(),
    );
  }
}

Widget circularProgressIndicator() {
  return const Center(
    child: CircularProgressIndicator(),
  );
}
```

### 上拉加载更多
```dart
import 'package:flutter/material.dart';
import 'package:dio/dio.dart';
import 'dart:convert';
import 'package:flutter/widgets.dart';

class RefreshMore extends StatefulWidget {
  final String title;
  const RefreshMore({super.key, this.title = ''});

  @override
  State<RefreshMore> createState() => _RefreshMoreState();
}

class _RefreshMoreState extends State<RefreshMore> {
  final ScrollController _scrollController = ScrollController();
  List _list = [];
  bool _isLoading = false;
  int _page = 1;
  bool flag = true;
  _getListData() async {
    try {
      if (!_isLoading && flag) {
        _isLoading = true;
        var res = await Dio().get(
            'https://www.dazhuzi.com');
        print(res is String);
        var data = json.decode(res.data)['result'];
        if (data.length < 20) {
          flag = false;
        }
        setState(() {
          _list.addAll(data);
          _page++;
          _isLoading = false;
        });
      }
    } catch (e) {
      print("err:${e}");
    }
  }

  @override
  void initState() {
    super.initState();
    _getListData();
    _scrollController.addListener(() {
      if (_scrollController.position.pixels >
          _scrollController.position.maxScrollExtent - 30) {
        print('加载更多');
        _getListData();
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('RefreshMore'),
      ),
      body: _list.isNotEmpty
          ? RefreshIndicator(
              child: ListView.builder(
                  controller: _scrollController,
                  itemCount: _list.length,
                  itemBuilder: (context, index) {
                    if (index == _list.length - 1) {
                      return Column(
                        children: [
                          ListTile(
                            title: Text("${_list[index]['title']}"),
                          ),
                          const Divider(),
                          circularProgressIndicator(),
                        ],
                      );
                    } else {
                      return Column(
                        children: [
                          ListTile(
                            title: Text("${_list[index]['title']}"),
                          ),
                          const Divider(),
                        ],
                      );
                    }
                  }),
              onRefresh: () async {
                print('执行刷新');
                await _getListData();
              })
          : circularProgressIndicator(),
    );
  }

  Widget circularProgressIndicator() {
    return Center(
      child:
          flag ? const CircularProgressIndicator() : const Text('...我是有底线的...'),
    );
  }
}
```