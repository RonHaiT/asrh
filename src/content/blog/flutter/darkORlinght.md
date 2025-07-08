---
title: Flutter 暗黑模式
published: 2025-02-28
description: 'Flutter 暗黑模式'
tags: [Flutter]
category: 'Flutter'
draft: false 
---

# Getx管理主题

在使用 `GetX` 时，判断当前是暗黑模式（Dark Mode）还是白天模式（Light Mode）可以通过 `MediaQuery` 或 `Get` 的 `theme` 属性来实现。`GetX` 提供了一些非常方便的方法来获取当前的主题模式

##  使用 `Get.isDarkMode` 判断

`GetX` 有一个非常方便的 `isDarkMode` 属性，它直接返回一个 `bool` 值，表示当前应用是否处于暗黑模式

```dart
import 'package:get/get.dart';

// 获取当前是否为暗黑模式
bool isDarkMode = Get.isDarkMode;

if (isDarkMode) {
  // 暗黑模式
  print("当前是暗黑模式");
} else {
  // 白天模式
  print("当前是白天模式");
}
```

## 使用 `Get.theme` 获取当前主题

通过 `Get.theme` 获取当前的 `ThemeData`，然后根据 `brightness` 属性判断当前的模式。

```dart
import 'package:get/get.dart';
import 'package:flutter/material.dart';

// 获取当前主题
Brightness brightness = Get.theme.brightness;

if (brightness == Brightness.dark) {
  // 暗黑模式
  print("当前是暗黑模式");
} else {
  // 白天模式
  print("当前是白天模式");
}
```

## 使用 `MediaQuery` 判断

`MediaQuery` 也是 Flutter 提供的一种方法来判断主题。`MediaQuery.of(context).platformBrightness` 返回当前平台的亮度模式，可以通过它来判断是否为暗黑模式或白天模式。

```dart
import 'package:flutter/material.dart';

Brightness brightness = MediaQuery.of(context).platformBrightness;

if (brightness == Brightness.dark) {
  // 暗黑模式
  print("当前是暗黑模式");
} else {
  // 白天模式
  print("当前是白天模式");
}
```

## 结合 `GetX` 使用 `MediaQuery` 判断主题

如果想使用 `GetX` 并结合 `MediaQuery`，可以在 `GetX` 中结合 `MediaQuery` 来获取主题信息，比如在一个 `GetX` 控制器中监听主题变化：

```dart
import 'package:get/get.dart';
import 'package:flutter/material.dart';

class ThemeController extends GetxController {
  Rx<Brightness> brightness = (Get.theme.brightness).obs;

  @override
  void onInit() {
    super.onInit();

    // 可以在这里监听主题变化
    ever(brightness, (_) {
      print('主题已更新：${brightness.value == Brightness.dark ? "暗黑模式" : "白天模式"}');
    });
  }
}
```

- `Get.isDarkMode` 是最直接且最简洁的方式来判断当前是否为暗黑模式。
- 如果需要获取更详细的主题信息，可以使用 `Get.theme.brightness`。
- 使用 `MediaQuery` 是 Flutter 原生的方式，也可以作为替代方法。

建议使用 `Get.isDarkMode` 作为首选方法，因为它既简洁又方便。

# 原生主题设置

## 安装插件

- `shared_preferences`插件
- `provider`插件

## 配置`main.dart`

`MyApp`使用`StatefulWidget`

```dart
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import './providers/ThemeProvider.dart'; // 引入主题管理
import 'package:get/get.dart';
import 'routes/routes.dart';

void main() => runApp(
      ChangeNotifierProvider(
        create: (context) => ThemeProvider(), // 全局提供 ThemeProvider
        child: const MyApp(),
      ),
    );

class MyApp extends StatefulWidget {
  const MyApp({super.key});

  @override
  _MyAppState createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  @override
  Widget build(BuildContext context) {
    final themeProvider = Provider.of<ThemeProvider>(context);
    return GetMaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Material App',
      theme: ThemeData.light(), // 亮色模式
      darkTheme: ThemeData.dark(), // 暗黑模式
      themeMode: themeProvider.themeMode, // 绑定动态主题
      initialRoute: '/',
      onGenerateRoute: onGenerateRoute,
    );
  }
}
```

## 封装Provider

`providers/ThemeProvider.dart`

```dart
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

class ThemeProvider with ChangeNotifier {
  ThemeMode _themeMode = ThemeMode.light;

  ThemeProvider() {
    _loadTheme(); // 启动时加载本地存储的主题
  }

  ThemeMode get themeMode => _themeMode;

  void toggleTheme(ThemeMode mode) {
    _themeMode = mode;
    notifyListeners();
    _saveTheme(mode); // 存储到本地
  }

  Future<void> _loadTheme() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    String? theme = prefs.getString('themeMode');
    if (theme == 'dark') {
      _themeMode = ThemeMode.dark;
    } else if (theme == 'light') {
      _themeMode = ThemeMode.light;
    } else {
      _themeMode = ThemeMode.system;
    }
    notifyListeners();
  }

  Future<void> _saveTheme(ThemeMode mode) async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    await prefs.setString(
        'themeMode',
        mode == ThemeMode.dark
            ? 'dark'
            : mode == ThemeMode.light
                ? 'light'
                : 'system');
  }
}
```

## 页面使用

`settings.dart`

```dart
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/ThemeProvider.dart';

// 设置页面
class SettingsPage extends StatefulWidget {
  const SettingsPage({super.key});

  @override
  State<SettingsPage> createState() => _SettingsPageState();
}

class _SettingsPageState extends State<SettingsPage> {
  @override
  Widget build(BuildContext context) {
    final themeProvider = Provider.of<ThemeProvider>(context);
    return Scaffold(
      appBar: AppBar(title: const Text('设置')),
      body: Column(
        children: [
          ListTile(
            title: const Text('亮色模式'),
            leading: Radio(
              value: ThemeMode.light,
              groupValue: themeProvider.themeMode,
              onChanged: (value) {
                themeProvider.toggleTheme(value!);
              },
            ),
          ),
          ListTile(
            title: const Text('暗黑模式'),
            leading: Radio(
              value: ThemeMode.dark,
              groupValue: themeProvider.themeMode,
              onChanged: (value) {
                themeProvider.toggleTheme(value!);
              },
            ),
          ),
          ListTile(
            title: const Text('跟随系统'),
            leading: Radio(
              value: ThemeMode.system,
              groupValue: themeProvider.themeMode,
              onChanged: (value) {
                themeProvider.toggleTheme(value!);
              },
            ),
          ),
        ],
      ),
    );
  }
}
```

# 主题色配置

官方主题颜色变量

| **参数**               | **作用**                             |
| ---------------------- | ------------------------------------ |
| `primary`              | 主要颜色，品牌色、主按钮色           |
| `onPrimary`            | `primary` 上的文本/图标颜色          |
| `primaryContainer`     | `primary` 的容器色（较浅）           |
| `onPrimaryContainer`   | `primaryContainer` 上的文本/图标色   |
| `secondary`            | 次要颜色，辅助按钮、标签等           |
| `onSecondary`          | `secondary` 上的文本/图标颜色        |
| `secondaryContainer`   | `secondary` 的容器色                 |
| `onSecondaryContainer` | `secondaryContainer` 上的文本/图标色 |
| `tertiary`             | 第三颜色，通常用于强调色             |
| `onTertiary`           | `tertiary` 上的文本/图标颜色         |
| `error`                | 错误颜色                             |
| `onError`              | `error` 上的文本/图标颜色            |
| `surface`              | 主要背景色（如 `Scaffold` 背景）     |
| `onSurface`            | `surface` 上的文本/图标颜色          |
| `surfaceContainer`     | 中等深度的表面色                     |
| `onSurfaceVariant`     | `surfaceVariant` 上的文本/图标颜色   |
| `inverseSurface`       | 反向 `surface`（用于暗黑模式）       |
| `onInverseSurface`     | 反向 `surface` 上的文本/图标色       |
| `outline`              | 轮廓颜色（如输入框的边框）           |
| `shadow`               | 阴影颜色                             |
| `scrim`                | 遮罩颜色（通常用于 `Dialog`）        |

## 自动管理颜色

```dart
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import './providers/ThemeProvider.dart'; // 引入主题管理
import 'package:get/get.dart';
import 'routes/routes.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:flutter_01/common/app_colors.dart';

void main() => runApp(
      ChangeNotifierProvider(
        create: (context) => ThemeProvider(), // 全局提供 ThemeProvider
        child: const MyApp(),
      ),
    );

class MyApp extends StatefulWidget {
  const MyApp({super.key});

  @override
  _MyAppState createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  @override
  Widget build(BuildContext context) {
    final themeProvider = Provider.of<ThemeProvider>(context);
    return ScreenUtilInit(
        designSize: const Size(750, 1400),
        minTextAdapt: true,
        splitScreenMode: true,
        builder: (context, child) {
          return GetMaterialApp(
            debugShowCheckedModeBanner: false,
            title: 'Material App',
            theme: lightTheme, // 亮色模式
            darkTheme: darkTheme, // 暗黑模式
            themeMode: themeProvider.themeMode, // 绑定动态主题
            initialRoute: '/',
            onGenerateRoute: onGenerateRoute,
          );
        });
  }

  /// **亮色主题**
  final ThemeData lightTheme = ThemeData(
    colorScheme: const ColorScheme.light(
      primary: Color(0xffE92215), // 主色
      secondary: Colors.orange, // 按钮色
      surface: Colors.white, // 背景色
      error: Colors.redAccent, // 错误色
      onSurface: Colors.black87, // 文字色
    ),
    scaffoldBackgroundColor: Colors.white,
    appBarTheme: const AppBarTheme(
      backgroundColor: Colors.blue,
      foregroundColor: Colors.white,
    ),
  );

  /// **暗色主题**
  final ThemeData darkTheme = ThemeData(
    colorScheme: const ColorScheme.dark(
      primary: Colors.deepPurple, // 主色
      secondary: Colors.teal, // 按钮色
      surface: Colors.black, // 背景色
      error: Colors.redAccent, // 错误色
      onSurface: Colors.white70, // 文字色
    ),
    scaffoldBackgroundColor: Colors.black,
    appBarTheme: const AppBarTheme(
      backgroundColor: Colors.deepPurple,
      foregroundColor: Colors.white,
    ),
  );
}

```

使用

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
    return Scaffold(
      bottomNavigationBar: BottomNavigationBar(
        // backgroundColor: AppColors.background(context), //定制背景颜色
        backgroundColor: Theme.of(context).colorScheme.primary, //定制背景颜色
        onTap: _onItemTapped,
        currentIndex: _selectedIndex,
        elevation: 0, // BottomNavigationBar被设置为从表面抬高8 点
        type: BottomNavigationBarType.fixed, //超过3个需要设置
        iconSize: 30, //图标大小
        mouseCursor: SystemMouseCursors.grab, //鼠标指针
        selectedFontSize: 16, //选中字体大小
        // showSelectedLabels: false, //移出文字
        // showUnselectedLabels: false, //移出文字
        selectedIconTheme: IconThemeData(
            color: Theme.of(context).colorScheme.surface), //选中iconu颜色
        selectedItemColor: Theme.of(context).colorScheme.surface, //选中字体颜色
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

## 定义主题色变量

```dart
import 'package:flutter/material.dart';

class AppColors {
  /// **主要颜色**
  static const Color primaryLight = Color(0xffE92215);
  static const Color primaryDark = Color(0xFFB71C1C);

  /// **次要颜色**
  static const Color secondaryLight = Color(0xFF2196F3);
  static const Color secondaryDark = Color(0xFF1565C0);

  /// **背景颜色**
  static const Color backgroundLight = Colors.white;
  static const Color backgroundDark = Color(0xFF121212);

  /// **文本颜色**
  static const Color textLight = Colors.black87;
  static const Color textDark = Colors.white70;

  /// **按钮颜色**
  static const Color buttonLight = Colors.blue;
  static const Color buttonDark = Colors.deepPurple;

  /// **分割线颜色**
  static const Color dividerLight = Colors.grey;
  static const Color dividerDark = Colors.white30;

  /// **输入框颜色**
  static const Color inputBackgroundLight = Colors.white;
  static const Color inputBackgroundDark = Color(0xFF1E1E1E);
  static const Color inputBorderLight = Colors.grey;
  static const Color inputBorderDark = Colors.white30;

  /// **状态颜色**
  static const Color error = Colors.redAccent;
  static const Color warning = Colors.orangeAccent;
  static const Color success = Colors.green;
}
```

如需要使用app的变量，引入文件即可

## 配置主题

`main.dart`

```dart
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import './providers/ThemeProvider.dart'; // 引入主题管理
import 'package:get/get.dart';
import 'routes/routes.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:flutter_01/common/app_colors.dart';

void main() => runApp(
      ChangeNotifierProvider(
        create: (context) => ThemeProvider(), // 全局提供 ThemeProvider
        child: const MyApp(),
      ),
    );

class MyApp extends StatefulWidget {
  const MyApp({super.key});

  @override
  _MyAppState createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  @override
  Widget build(BuildContext context) {
    final themeProvider = Provider.of<ThemeProvider>(context);
    return ScreenUtilInit(
        designSize: const Size(750, 1400),
        minTextAdapt: true,
        splitScreenMode: true,
        builder: (context, child) {
          return GetMaterialApp(
            debugShowCheckedModeBanner: false,
            title: 'Material App',

            theme: lightTheme, // 亮色模式
            darkTheme: darkTheme, // 暗黑模式
            themeMode: themeProvider.themeMode, // 绑定动态主题
            initialRoute: '/',
            onGenerateRoute: onGenerateRoute,
          );
        });
  }

  /// **亮色主题**
  final ThemeData lightTheme = ThemeData(
    colorScheme: const ColorScheme.light(
      primary: AppColors.primary, // 主色
      error: AppColors.error, // 错误颜色
    ),
    scaffoldBackgroundColor: AppColors.backgroundLight,
    appBarTheme: const AppBarTheme(
      backgroundColor: AppColors.primary,
      foregroundColor: Colors.white, // 文字颜色
    ),
    elevatedButtonTheme: ElevatedButtonThemeData(
      style: ElevatedButton.styleFrom(
        backgroundColor: AppColors.buttonLight,
        foregroundColor: Colors.white,
      ),
    ),
  );

  /// **暗色主题**
  final ThemeData darkTheme = ThemeData(
    colorScheme: const ColorScheme.dark(
      primary: AppColors.primaryDark, // 主色
      error: AppColors.error, // 错误颜色
    ),
    scaffoldBackgroundColor: AppColors.backgroundDark,
    appBarTheme: const AppBarTheme(
      backgroundColor: AppColors.primaryDark,
      foregroundColor: Colors.white,
    ),
    elevatedButtonTheme: ElevatedButtonThemeData(
      style: ElevatedButton.styleFrom(
        backgroundColor: AppColors.buttonDark,
        foregroundColor: Colors.white,
      ),
    ),
  );
}
```

# 插件flex_color_scheme

[pub地址](https://pub.dev/packages/flex_color_scheme)
