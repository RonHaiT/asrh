---
title: Flutter表单组件
published: 2022-01-07
description: "Flutter表单组件"
tags: ["Flutter"]
category: Flutter
draft: false
---
# 表单组件

Flutter中常见的表单有TextField单行文本框，TextField多行文本框、CheckBox、Radio、SwitchCheckboxListTile、RadioListTile、SwitchListTile、Slide。

## TextField文本框组件

常见属性

| **属性**    | **描述**                                                     |
| ----------- | ------------------------------------------------------------ |
| maxLines    | 设置此参数可以把文本框改为多行文本框                         |
| onChanged   | 文本框改变的时候触发的事件                                   |
| decoration  | hintText 类似html中的placeholder border 配置文本框边框 OutlineInputBorder配合使用 labelText lable的名称 labelStyle 配置lable的样式 |
| obscureText | 把文本框框改为密码框                                         |
| controller  | controller 结合TextEditingController()可以配置表单默认显示的内容 |

## Radio单选按钮组

只能点击圆圈选中

## RadioListTile单选按钮组

点选文字可以选中,

## CheckBox

## CheckboxListTile

## Switchflu