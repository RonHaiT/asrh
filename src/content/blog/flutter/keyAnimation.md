---
title: Flutter Key 和动画
published: 2022-01-11
description: "Flutter Key 和动画"
tags: ["Flutter"]
category: Flutter
draft: false
---
# Key 和动画

## Key 详解

我们平时一定接触过很多的 Widget，比如 Container、Row、Column 等，它们在我们绘制界面的过程中发挥着重要的作用。但是不知道你有没有注意到，在几乎每个 Widget 的构造函数中，都有一个共同的参数，它们通常在参数列表的第一个，那就是 Key。

在Flutter中，Key是不能重复使用的，所以Key一般用来做唯一标识。组件在更新的时候，其状态的保存主要是通过判断组件的类型或者key值是否一致。因此，当各组件的类型不同的时候，类型已经足够用来区分不同的组件了，此时我们可以不必使用key。但是如果同时存在多个同一类型的控件的时候，此时类型已经无法作为区分的条件了，我们就需要使用到key。

### LocalKey、GlobalKey

LocalKey、GlobalKeyFlutter key 子类包含 LocalKey 和 GlobalKey

- 局部键（LocalKey）：ValueKey、ObjectKey、UniqueKey
- 全局键（GlobalKey)： GlobalKey、GlobalObjectKey

ValueKey （值 key）把一个值作为 key ，UniqueKey（唯一 key）程序生成唯一的 Key，当我们不知道如何指定 ValueKey 的时候就可以使用 UniqueKey，ObjectKey（对象 key)把一个对象实例作为 key。

GlobalKey（全局 key），GlobalObjectKey（全局 Objec key，和 ObjectKey 有点类似）

### GlobalKey的使用

如果把LocalKey比作局部变量， GlobalKey就类似于全局变量下面使用了LocalKey，当屏幕状态改变的时候把 Colum换成了Row，Box的状态就会丢失.

### 获取子组件状态

- globalKey.currentState 可以获取子组件的状态，执行子组件的方法
- globalKey.currentWidget 可以获取子组件的属
- \_globalKey.currentContext!.findRenderobject()可以获取渲染的属性。

### Widget Tree、Element Tree 和 RenderObject Tree

Flutter应用是由是Widget Tree、Element Tree 和 RenderObject Tree组成Widget可以理解成一个类，Element可以理解成Widget的实例，Widget与Element的关系可以是一对多，一份配置可以创造多个Element实例

| **属性**     | **描述**                                                     |
| ------------ | ------------------------------------------------------------ |
| Widget       | Widget就是一个类， 是Element 的配置信息。与Element的关系可以是一对多，一份配置可以创造多个Element实例 |
| Element      | Widget 的实例化，内部持有Widget和RenderObject。              |
| RenderObject | 负责渲染绘制                                                 |

默认情况下面，当Flutter同一个 Widget的大小，顺序变化的时候，FLutter不会改变Widget的state。

> 关于GlobalKey： 每个Widget 都对应一个Element ，我们可以直接对Widget 进行操作，但是无法直接操作Widget 对应的Element 。而GlobalKey 就是那把直接访问Element 的钥匙。通过GlobalKey可以获取到Widget 对应的Element

## Flutter 动画

### 动画组件

#### AnimatedList

AnimatedList 和 ListView 的功能大体相似，不同的是， AnimatedList 可以在列表中插入或删除节点时执行一个动画，在需要添加或删除列表项的场景中会提高用户体验.

AnimatedList 是一个 StatefulWidget，它对应的 State 类型为 AnimatedListState，添加和删除元素的方法位于 AnimatedListState 中

*常见属性*

| **属性**         | **描述**                                                     |
| ---------------- | ------------------------------------------------------------ |
| key              | globalKey ﬁnal globalKey = GlobalKey();                      |
| initialItemCount | 子元素数量                                                   |
| itemBuilder      | 方法 ( BuildContext context, int index, Animation animation) {} |

增加数据

```dart
import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';

void main() => runApp(const MyApp());

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(title: 'Material App', home: HomePage());
  }
}

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  //获取AnimatedList对象执行insertItem
  final globalKey = GlobalKey<AnimatedListState>();
  List<String> list = ['第一条', '第二条'];
  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: const Text('Material App Bar1'),
        ),
        floatingActionButton: FloatingActionButton(
            child: Icon(Icons.add),
            onPressed: () {
              list.add('新增的一条数据');
              //增加数据需要
              globalKey.currentState?.insertItem(list.length - 1);
            }),
        body: AnimatedList(
            key: globalKey, //增加数据需要
            initialItemCount: list.length,
            itemBuilder: (context, index, animation) {
              {
                return FadeTransition(
                  opacity: animation,
                  child: ListTile(
                    title: Text(list[index]),
                    trailing: IconButton(
                      icon: Icon(Icons.delete),
                      onPressed: () {},
                    ),
                  ),
                );
              }
            }));
  }
}
```

删除数据

```dart
import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';

void main() => runApp(const MyApp());

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(title: 'Material App', home: HomePage());
  }
}

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  //获取AnimatedList对象执行insertItem
  final globalKey = GlobalKey<AnimatedListState>();
  List<String> list = ['第一条', '第二条'];
  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: const Text('Material App Bar1'),
        ),
        floatingActionButton: FloatingActionButton(
            child: const Icon(Icons.add),
            onPressed: () {
              list.add('新增的一条数据');
              //增加数据需要
              globalKey.currentState?.insertItem(list.length - 1);
            }),
        body: AnimatedList(
            key: globalKey, //增加数据需要
            initialItemCount: list.length,
            itemBuilder: (context, index, animation) {
              {
                return FadeTransition(
                  opacity: animation,
                  child: ListTile(
                    title: Text(list[index]),
                    trailing: IconButton(
                      icon: const Icon(Icons.delete),
                      onPressed: () {
                        // 提前保存要删除的项数据,确保在回调中保存当前要移除的列表项内容，而不是直接从 list 中读取（因为此时数据可能已经被修改）
                        final String removedItem = list[index];
                        list.removeAt(index);

                        // 移除动画
                        globalKey.currentState!.removeItem(index,
                            (context, animationA) {
                          return FadeTransition(
                              opacity: animation,
                              child: ListTile(
                                  title: Text(removedItem),
                                  trailing: IconButton(
                                    icon: Icon(Icons.delete),
                                    onPressed: () {},
                                  )));
                        });
                      },
                    ),
                  ),
                );
              }
            }));
  }
}
```

### 动画原理

动画基本原理以及 Flutter 动画简介

在任何系统的 UI 框架中，动画实现的原理都是相同的，即：在一段时间内，快速地多次改变 UI 外观；由于人眼会产生视觉暂留，所以最终看到的就是一个“连续”的动画，这和电影的原理是一样的。我们将 UI 的一次改变称为一个动画帧，对应一次屏幕刷新，而决定动画流畅度的一个重要指标就是帧率 FPS（Frame Per Second），即每秒的动画帧数。很明显，帧率越高则动画就会越流畅！一般情况下，对于人眼来说，动画帧率超过 16 FPS，就基本能看了，超过 32 FPS 就会感觉相对平滑，而超过 32 FPS，大多数人基本上就感受不到差别了。由于动画的每一帧都是要改变 UI 输出，所以在一个时间段内连续的改变 UI 输出是比较耗资源的，对设备的软硬件系统要求都较高，所以在 UI 系统中，动画的平均帧率是重要的性能指标，而在 Flutter 中，理想情况下是可以实现 60FPS 的，这和原生应用能达到的帧率是基本是持平的。

#### Flutter 动画简介

FLutter 中的动画主要分为：隐式动画、显式动画、自定义隐式动画、自定义显式动画、和 Hero 动画

## 隐式动画

隐式动画即内置动画,是Flutter实现,背后的实现原理和繁琐的操作细节都被隐去了，所以叫隐式动画，FLutter 中提供的 AnimatedContainer、AnimatedPadding、AnimatedPositioned、 AnimatedOpacity、AnimatedDefaultTextStyle、AnimatedSwitcher 都属于隐式动画。隐式动画中可以通过 duration 配置动画时长、可以通过 Curve （曲线）来配置动画过程

### AnimatedContainer

AnimatedContainer 的属性和 Container 属性基本是一样的，当 AnimatedContainer 属性改变的时候就会触发动画

### AnimatedPadding 以及 curve 属性

**Curves 曲线值**

| **曲线名** | **动画过程**                                                 |
| ---------- | ------------------------------------------------------------ |
| linear     | 匀速的                                                       |
| decelerate | 匀减速                                                       |
| ease       | 开始加速，后面减速                                           |
| easeIn     | 开始慢，后面快                                               |
| easeOut    | 开始快，后面慢                                               |
| easeInOut  | 开始慢，然后加速，最后再减速                                 |
| 更多曲线   | [https://docs.ﬂutter.io/ﬂutter/animation/Curves-class.html](https://docs.flutter.io/flutter/animation/Curves-class.html) 官方文档打不开也可以参考教程目录中提供的 gif 截图 |

### AnimatedPositioned

### AnimatedOpacity

### AnimatedDefaultTextStyle

### AnimatedSwitcher 以及transitionBuilder

上面的AnimatedContainer、AnimatedPadding、AnimatedPositioned、AnimatedOpacity、AnimatedDefaultTextStyle都是在属性改变的时候执行动画，AnimatedSwitcher则是在子元素改变的时候执行动画。相比上面的动画组件AnimatedSwitcher多了transitionBuilder参数，可以在transitionBuilder中自定义动画

## 显式动画

显式动画有RotationTransition、FadeTransition、ScaleTransition、SlideTransition、AnimatedIcon。在显示动画中开发者需要创建一个AnimationController，通过AnimationController控制动画的开始、暂停、重置、跳转、倒播等。

## Hero 动画

Hero 指的是可以在路由(页面)之间“飞行”的 widget，简单来说 Hero 动画就是在路由切换时，有一个共享的widget 可以在新旧路由间切

### Hero +photo_view