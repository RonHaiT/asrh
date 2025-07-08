---
title: Flutter组件状态
published: 2022-01-09
description: "Flutter组件状态"
tags: ["Flutter"]
category: Flutter
draft: false
---
状态管理一直是 Flutter 开发中一个火热的话题。谈到状态管理框架，社区也有诸如有以 [Get](https://pub.flutter-io.cn/packages/get)、[Provider](https://pub.flutter-io.cn/packages/provider) 为代表的多种方案，它们有各自的优缺点。面对这么多的选择，你可能会想：「我需要使用状态管理么？哪种框架更适合我？」本文将从作者的实际开发经验出发，分析状态管理解决的问题以及思路，希望能帮助你做出选择。

# 为什么需要状态管理？

首先，为什么需要状态管理？根据笔者的经验，这是因为 Flutter 基于 [**声明式**](https://docs.flutter.cn/resources/architectural-overview#reactive-user-interfaces) 构建 UI ，使用状态管理的目的之一就是解决「声明式」开发带来的问题。

「声明式」开发是一种区别于传原生的方式，所以我们没有在原生开发中听到过状态管理，那如何理解「声明式」开发呢？

> 官方说明：https://docs.flutter.cn/community/tutorials/state-management-package-getx-provider-analysis/

# StatelessWidget

`StatelessWidget` 是无状态的组件。它的内容在生命周期中保持不变，只在创建时构建一次，之后不会重新渲染，除非父组件触发重建。

- **适用场景**：
  - UI 只依赖外部传入的参数。
  - UI 不会动态变化。

# StatefulWidget

`StatefulWidget` 是有状态的组件，它的内容可以根据用户交互或其他事件动态变化。
与 `StatelessWidget` 不同，它由两部分组成：

- **StatefulWidget 类**：负责定义组件的不可变部分（构造函数和静态内容）。
- **State 类**：负责存储和管理组件的可变状态。

Flutter 的设计通过将 `StatefulWidget` 和 `State` 分开，清晰地分离了静态结构和动态行为。

## 为何分成两个类

- **不可变性**：`StatefulWidget` 本身是不可变的，只有 `State` 才存储可变数据。这符合 Flutter 对不可变组件的设计理念。
- **重用性**：当 `StatefulWidget` 重建时（例如父组件触发重建），Flutter 不会重新创建对应的 `State` 实例，只是重新关联，这样可以保留组件的状态。

## 两者区别总结

| **特性**       | **StatelessWidget** | **StatefulWidget**                 |
| -------------- | ------------------- | ---------------------------------- |
| **是否有状态** | 无状态              | 有状态                             |
| **重新渲染**   | 依赖父组件重建      | 状态改变时触发重建                 |
| **组件数据**   | 通过构造函数传入    | 通过 `State` 类存储                |
| **用途**       | 静态内容或短暂 UI   | 动态内容，例如交互按钮、表单等     |
| **实例重用**   | 始终创建新实例      | `State` 可以在 `Widget` 重建时保留 |
| **性能开销**   | 较低                | 略高（但可通过分离逻辑优化）       |

Flutter 将 `StatefulWidget` 分为两个类是为了实现以下目标：

- **声明式 UI**：`Widget` 是不可变的，这与声明式 UI 的设计思想一致。
- **状态与界面分离**：将不可变部分（`StatefulWidget`）与可变部分（`State`）分开，简化逻辑和提升维护性。
- **提高性能**：通过保存状态避免不必要的重建开销。

这个分离让开发者的代码更具可读性，同时保证框架的高效运行

```dart
import 'package:flutter/material.dart';

void main(List<String> args) {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: Scaffold(
        appBar: AppBar(
          title: Text('Hello World'),
        ),
        body: const MyHomePage(),
      ),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key});

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  List<String> list = [];
  @override
  Widget build(BuildContext context) {
    return ListView(children: [
      Column(
        children: list.map((value) {
          return ListTile(
            title: Text('$value'),
          );
        }).toList(),
      ),
      const SizedBox(height: 20),
      Padding(
        padding: const EdgeInsets.all(40),
        child: ElevatedButton(
            onPressed: () {
              setState(() {
                list.add('Hello World');
              });
            },
            child: const Text('增加')),
      )
    ]);
  }
}
```

# 自定义tab切换

```dart
class MyTab extends StatefulWidget {
  const MyTab({super.key});

  @override
  State<MyTab> createState() => _MyTabState();
}

class _MyTabState extends State<MyTab> {
  int _selectedIndex = 0; // 当前选中的 tab 索引
  final tabList = ['中低风险运动', '高风险运动', '高风险运动'];
  void _onTabTapped(int index) {
    setState(() {
      _selectedIndex = index;
    });
  }

  List<Widget> getTabList() {
    final List<Widget> list = [];

    // 使用asMap来同时获取index和item
    tabList.asMap().forEach((index, item) {
      list.add(
        GestureDetector(
            onTap: () => _onTabTapped(index), // 点击时触发的事件
            behavior: HitTestBehavior.opaque,
            child: Padding(
              padding: EdgeInsets.only(top: 10),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    item, // 显示tab的名字
                    style: TextStyle(
                        color: Colors.white, // 否则为灰色
                        fontWeight: _selectedIndex == index
                            ? FontWeight.bold
                            : FontWeight.normal),
                  ),
                  Container(
                    width: ScreenAdapter.getScreenWidth() /
                        tabList.length, // 横线的宽度
                    height: 4, // 横线的高度
                    color: _selectedIndex == index
                        ? Colors.white
                        : Theme.of(context).primaryColor, // 横线的颜色
                  ),
                ],
              ),
            )),
      );
    });

    return list; // 返回列表
  }

  Widget tabbar() {
    return Container(
        width: ScreenAdapter.getScreenWidth(),
        height: ScreenAdapter.height(88),
        decoration: BoxDecoration(
          color: Theme.of(context).primaryColor,
        ),
        padding: EdgeInsets.fromLTRB(
            ScreenAdapter.height(30), 0, ScreenAdapter.height(30), 0),
        child: SingleChildScrollView(
            scrollDirection: Axis.horizontal, // 设置为横向滑动
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: getTabList().map((widget) {
                return Container(
                  width: ScreenAdapter.getScreenWidth() /
                      tabList.length, // 每个 Tab 均匀分配宽度
                  child: widget,
                );
              }).toList(),
            )));
  }

  @override
  Widget build(BuildContext context) {
    return tabbar();
  }
}
```

