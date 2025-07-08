---
title: Flutter路由系统
published: 2022-01-08
description: "Flutter路由系统"
tags: ["Flutter"]
category: Flutter
draft: false
---
# 路由系统

## 路由介绍

Flutter 中的路由通俗的讲就是页面跳转。在 Flutter 中通过 Navigator 组件管理路由导航。
并提供了管理堆栈的方法。如：Navigator.push 和 Navigator.pop
Flutter 中给我们提供了两种配置路由跳转的方式：1、基本路由 2、命名路由

## 普通路由

比如我们现在想从 HomePage 组件跳转到 SearchPage 组件。

**需要在 HomPage 中引入 search.dart**

```dart
import 'package:flutter/material.dart';
import './search.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  @override
  Widget build(BuildContext context) {
    return Center(
      child: Column(
        children: [
          const Text('HomePage'),
          ElevatedButton(
              onPressed: () {
                Navigator.of(context).push(MaterialPageRoute(
                    builder: (context) => const SearchPage()));
              },
              child: const Text('跳转到搜索页面'))
        ],
      ),
    );
  }
}
```

**search.dart**

```dart
import 'package:flutter/material.dart';

class SearchPage extends StatefulWidget {
  const SearchPage({super.key});

  @override
  State<SearchPage> createState() => _SearchPageState();
}

class _SearchPageState extends State<SearchPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('SearchPage'),
      ),
      body: const Center(
        child: Text('SearchPage'),
      ),
    );
  }
}
```

### 普通路由跳转传值

跳转传值和调用组件传值的实现方法是一样的

```dart
//home.dart
import 'package:flutter/material.dart';
import './search.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  @override
  Widget build(BuildContext context) {
    return Center(
      child: Column(
        children: [
          const Text('HomePage'),
          ElevatedButton(
              onPressed: () {
                Navigator.of(context).push(MaterialPageRoute(
                    builder: (context) => const SearchPage(
                          title: "home页面来的",
                        )));
              },
              child: const Text('跳转到搜索页面'))
        ],
      ),
    );
  }
}
```

```dart
//searh.dart
import 'package:flutter/material.dart';

class SearchPage extends StatefulWidget {
  final String title;
  const SearchPage({super.key, this.title = "SearchPage"});

  @override
  State<SearchPage> createState() => _SearchPageState();
}

class _SearchPageState extends State<SearchPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
      ),
      body: const Center(
        child: Text('SearchPage'),
      ),
    );
  }
}
```

## 命名路由

注册路由

```dart
class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Tabs',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      initialRoute: '/',
      routes: {
        '/': (context) => const HomePage(),
        '/search': (context) => const SearchPage(),
        '/profile': (context) => const ProfilePage(),
        '/user': (context) => const UserPage(),
        '/settings': (context) => const SettingsPage(),
      },
      // home: const Tabs(),
    );
  }
}
```

跳转命名路由

```dart
ElevatedButton(
    onPressed: () {
        Navigator.pushNamed(context, '/search');
    },
    child: const Text('命名路由跳转到搜索页面')
),
```

### 命名路由传值

### 定义路由对象

```dart
  //1定义map类型的routes
  final Map routes = {
    '/': (context) => const Tabs(),
    '/search': (context) => const SearchPage(),
    '/profile': (context, {arguments}) => ProfilePage(arguments: arguments),
    '/user': (context) => const UserPage(),
    '/settings': (context) => const SettingsPage(),
  };
```

### MaterialApp 设置

```dart
 //2注册路由表
      onGenerateRoute: (RouteSettings settings) {
        // 获取name参数并匹配路由表
        final String? name = settings.name;
        final Function? pageContentBuilder = routes[name];
        // 若匹配到路由表，返回对应的PageRoute
        if (pageContentBuilder != null) {
          if (settings.arguments != null) {
            final Route route = MaterialPageRoute(
                builder: (context) =>
                    pageContentBuilder(context, arguments: settings.arguments));
            return route;
          } else {
            final Route route = MaterialPageRoute(
                builder: (context) => pageContentBuilder(context));
            return route;
          }
        }
        return null;
      },
```

### 完整设置

```dart
import 'package:flutter/material.dart';

class ProfilePage extends StatefulWidget {
  final Map arguments;
  const ProfilePage({super.key, required this.arguments});

  @override
  State<ProfilePage> createState() => _ProfilePageState();
}

class _ProfilePageState extends State<ProfilePage> {
  @override
  void initState() {
    super.initState();
    print(widget.arguments);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('ProfilePage'),
      ),
      body: Center(
        child: Text('ProfilePage'),
      ),
    );
  }
}
```

### 页面传值

```dart
  ElevatedButton(
      onPressed: () {
          Navigator.pushNamed(context, '/profile', arguments: {
              "title": "搜索页面",
          });
      },
      child: const Text('命名路由传参跳转到Profile页面'),
  ),
```

### 页面接值

```dart
import 'package:flutter/material.dart';

class ProfilePage extends StatefulWidget {
  final Map arguments;
  const ProfilePage({super.key, required this.arguments});

  @override
  State<ProfilePage> createState() => _ProfilePageState();
}

class _ProfilePageState extends State<ProfilePage> {
  @override
  void initState() {
    super.initState();
    print(widget.arguments);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('ProfilePage'),
      ),
      body: Center(
        child: Text('ProfilePage'),
      ),
    );
  }
}
```

## 组件化路由

### 新建 routers/routers.dart 配置路由

```dart
import 'package:flutter/material.dart';
import '../pages/tabs.dart';
import '../pages/tabs/search.dart';
import '../pages/tabs/profile.dart';
import '../pages/tabs/user.dart';
import '../pages/tabs/settings.dart';

//1定义map类型的routes
final Map routes = {
  '/': (context) => const Tabs(),
  '/search': (context) => const SearchPage(),
  '/profile': (context, {arguments}) => ProfilePage(arguments: arguments),
  '/user': (context) => const UserPage(),
  '/settings': (context) => const SettingsPage(),
};
var onGenerateRoute = (RouteSettings settings) {
  // 获取name参数并匹配路由表
  final String? name = settings.name;
  final Function? pageContentBuilder = routes[name];
  // 若匹配到路由表，返回对应的PageRoute
  if (pageContentBuilder != null) {
    if (settings.arguments != null) {
      final Route route = MaterialPageRoute(
          builder: (context) =>
              pageContentBuilder(context, arguments: settings.arguments));
      return route;
    } else {
      final Route route =
          MaterialPageRoute(builder: (context) => pageContentBuilder(context));
      return route;
    }
  }
  return null;
};
```

### 引用路由

```dart
import 'package:flutter/material.dart';
import './routers/routers.dart';

void main(List<String> args) {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Tabs',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      initialRoute: '/',
      onGenerateRoute: onGenerateRoute,
      //2注册路由表
    );
  }
}
```

### MyTabs

```dart
import 'package:flutter/material.dart';
import 'setting.dart';
import 'timecount.dart';
import 'tomato.dart';
import '../insurance/home.dart';
import 'package:flutter_01/common/app_colors.dart';

class MyTabs extends StatefulWidget {
  const MyTabs({super.key});

  @override
  State<MyTabs> createState() => _MyTabsState();
}

class _MyTabsState extends State<MyTabs> {
  int _selectedIndex = 0;
  static const List<Widget> _pages = <Widget>[
    InsuranceHomePage(),
    TomatoPage(),
    TimecountPage(),
    SettingsPage(),
  ];

  void _onItemTapped(int index) {
    setState(() {
      _selectedIndex = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    final isDarkMode = Theme.of(context).brightness == Brightness.dark;
    final bgColor = isDarkMode ? AppColors.primaryDark : AppColors.primary;
    return Scaffold(
      bottomNavigationBar: BottomNavigationBar(
        backgroundColor: bgColor, //定制背景颜色
        onTap: _onItemTapped,
        currentIndex: _selectedIndex,
        elevation: 0, // BottomNavigationBar被设置为从表面抬高8 点
        type: BottomNavigationBarType.fixed, //超过3个需要设置
        iconSize: 30, //图标大小
        mouseCursor: SystemMouseCursors.grab, //鼠标指针
        selectedFontSize: 16, //选中字体大小
        // showSelectedLabels: false, //移出文字
        // showUnselectedLabels: false, //移出文字
        selectedIconTheme:
            const IconThemeData(color: Colors.white, size: 30), //选中iconu颜色
        selectedItemColor: Colors.white, //选中字体颜色
        selectedLabelStyle: const TextStyle(fontWeight: FontWeight.bold),
        items: const <BottomNavigationBarItem>[
          BottomNavigationBarItem(
            icon: Icon(Icons.home),
            label: '首页',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.camera),
            label: '相机',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.message),
            label: '消息',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.settings),
            label: '设置',
          ),
        ],
      ),
      body: Center(
        child: _pages[_selectedIndex],
      ),
    );
  }
}
```

![image-20250401111039374](https://cdn.jsdelivr.net/gh/RonHaiT/Image-hosting/image-20250401111039374.png)

## 返回上级路由

```dart
Navigator.of(context).pop();
```

## 替换路由

比如我们从用户中心页面跳转到了 registerFirst 页面，然后从 registerFirst 页面通过 pushReplacementNamed 跳转到了 registerSecond 页面。这个时候当我们点击 registerSecond 的返回按钮的时候它会直接返回到用户中心。

```dart
Navigator.of(context).pushReplacementNamed('/registerSecond');
```

## 返回到根路由

比如我们从用户中心跳转到 registerFirst 页面，然后从 registerFirst 页面跳转到 registerSecond 页面，然后从 registerSecond 跳转到了 registerThird 页面。这个时候我们想的是 registerThird 注册成功后返回到用户中心。 这个时候就用到了返回到根路由的方法。

```dart
Navigator.of(context).pushAndRemoveUntil(
    MaterialPageRoute(builder: (BuildContext context) {
    return const Tabs();
}), (route) => false);
```

## 路由跳转网格

Material 组件库中提供了一个 MaterialPageRoute 组件，它可以使用和平台风格一致的路由切换动画，如在 iOS 上会左右滑动切换，而在 Android 上会上下滑动切换 , CupertinoPageRoute 是 Cupertino 组件库提供的 iOS 风格的路由切换组件如果在 Android 上也想使用左右切换风格，可以使用 CupertinoPageRoute。

routers.dart 中引入 cupertino.dart

```dart
import 'package:flutter/cupertino.dart';
```

MaterialPageRoute 改为 CupertinoPageRoute

```dart
import 'package:flutter/cupertino.dart';
import '../pages/tabs.dart';
import '../pages/tabs/search.dart';
import '../pages/tabs/profile.dart';
import '../pages/tabs/user.dart';
import '../pages/tabs/settings.dart';

//1定义map类型的routes
final Map routes = {
  '/': (context) => const Tabs(),
  '/search': (context) => const SearchPage(),
  '/profile': (context, {arguments}) => ProfilePage(arguments: arguments),
  '/user': (context) => const UserPage(),
  '/settings': (context) => const SettingsPage(),
};
var onGenerateRoute = (RouteSettings settings) {
  // 获取name参数并匹配路由表
  final String? name = settings.name;
  final Function? pageContentBuilder = routes[name];
  // 若匹配到路由表，返回对应的PageRoute
  if (pageContentBuilder != null) {
    if (settings.arguments != null) {
      final Route route = CupertinoPageRoute(
          builder: (context) =>
              pageContentBuilder(context, arguments: settings.arguments));
      return route;
    } else {
      final Route route =
          CupertinoPageRoute(builder: (context) => pageContentBuilder(context));
      return route;
    }
  }
  return null;
};
```

## 全局主题配置

app颜色变量`common/app_colors.dart`

```dart
import 'package:flutter/material.dart';

class AppColors {
  /// **主色**
  static const Color primary = Color(0xffE92215);
  static const Color primaryDark = Color(0xFF3700B3);
  static const Color primaryLight = Color(0xFFBB86FC);

  /// **背景色**
  static const Color backgroundLight = Colors.white;
  static const Color backgroundDark = Color(0xFF121212); // 深色模式背景

  /// **文本颜色**
  static const Color textLight = Colors.black87;
  static const Color textDark = Colors.white70;

  /// **按钮颜色**
  static const Color buttonLight = Colors.blue;
  static const Color buttonDark = Colors.deepPurple;

  /// **错误颜色**
  static const Color error = Colors.redAccent;
}

```

配置主题

```dart
import 'package:flutter/material.dart';
import './routers/routers.dart';

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
      onGenerateRoute: onGenerateRoute,
      //2注册路由表
    );
  }
}
```