---
title: HTML之表单与列表
published: 2019-02-03
description: "HTML之表单与列表"
tags: ["html"]
category: HTML
draft: false
---

# 表单与列表

## 表单

表单是服务器收集用户数据的方式。

### FORM

一般情况下表单项要放在 FORM 内提交。

```html
<form action="/login/" method="POST">
  <fieldset>
    <legend>登录</legend>
    <input type="text" />
  </fieldset>
</form>
```

| 属性    | 说明                                                         |
| ------- | ------------------------------------------------------------ |
| action  | 处理表单提交的 URL。                                         |
| method  | 提交方式 GET 或 POST                                         |
| enctype | 当 `method` 属性值为 `post` 时，`enctype` 就是将表单的内容提交给服务器的 [MIME 类型](http://en.wikipedia.org/wiki/Mime_type)<br />`application/x-www-form-urlencoded`：未指定属性时的默认值。<br />`multipart/form-data`：当表单包含 `type=file` 的`input` 元素时使用此值<br />`text/plain`：出现于 HTML5，用于调试 |

### LABEL

使用 `label` 用于描述表单标题，当点击标题后文本框会获得焦点，需要保证使用的 ID 在页面中是唯一的。

```html
<form action="/login/" method="POST" novalidate>
  <label for="title">标题</label>
  <input type="text" name="title" id="title" />
</form>
```

> 也可以将文本框放在 `label` 标签内部，这样就不需要设置 id 与 for 属性了

### INPUT

文本框用于输入单行文本使用，下面是常用属性与示例。

| 属性        | 说明                                                         |
| ----------- | ------------------------------------------------------------ |
| type        | 表单类型默认为 `text`                                        |
| name        | 后台接收字段名                                               |
| required    | 必须输入                                                     |
| placeholder | 提示文本内容                                                 |
| value       | 默认值                                                       |
| maxlength   | 允许最大输入字符数                                           |
| size        | 表单显示长度，一般用不使用而用 `css` 控制                    |
| disabled    | 禁止使用，不可以提交到后台                                   |
| readonly    | 只读，可提交到后台                                           |
| capture     | 使用麦克风、视频或摄像头哪种方式获取手机上传文件，支持的值有 microphone, video, camera |

基本示例

```html
<form action="/login/" method="POST" novalidate>
  <fieldset>
    <legend>文本框</legend>
    <input
      type="text"
      name="title"
      required
      placeholder="请输入标题"
      maxlength="5"
      value=""
      size="100"
    />
  </fieldset>
</form>
```

**调取摄像头**

当 input 类型为 file 时手机会让用户选择图片或者拍照，如果想直接调取摄像头使用以下代码。

```html
<input type="file" capture="camera" accept="image/*" />
```

其他类型

通过设置表单的 `type` 字段可以指定不同的输入内容。

| 类型     | 说明                         |
| -------- | ---------------------------- |
| email    | 输入内容为邮箱               |
| url      | 输入内容为 URL 地址          |
| password | 输入内容为密码项             |
| tel      | 电话号，移动端会调出数字键盘 |
| search   | 搜索框                       |
| hidden   | 隐藏表单                     |
| submit   | 提交表单                     |

### HIDDEN

隐藏表单用于提交后台数据，但在前台内容不显示所以在其上做用样式定义也没有意义。

```html
<!-- django 中的 csrf_token -->
<input type="hidden" name="csrf_token" value="1" id="csrf_token" />
```

### 提交表单

创建提交按钮可以将表单数据提交到后台，有多种方式可以提交数据如使用 AJAX，或 HTML 的表单按钮。

- 使用 input 构建提交按钮，如果设置了 name 值按钮数据也会提交到后台，如果有多个表单项可以通过些判断是哪个表单提交的。

  ```html
  <input type="submit" name="submit" value="注册" />
  ```

- 使用 button 也可以提交，设置 type 属性为`submit` 或不设置都可以提交表单。

  ```html
  <button type="submit">注册</button>
  ```

### 禁用表单

通过为表单设置 `disabled` 或 `readonly` 都可以禁止修改表单，但 `readonly`表单的数据可以提交到后台。

```html
<input type="text" name="web" value="pythl.com" readonly />
```

### PATTERN

表单可以通过设置 `pattern` 属性指定正则验证，也可以使用各种前端验证库如 [formvalidator](http://www.formvalidator.net/#default-validators_custom)或 [validator.js](https://github.com/validatorjs/validator.js)。

| 属性      | 说明                 |
| --------- | -------------------- |
| pattern   | 正则表达式验证规则   |
| oninvalid | 输入错误时触发的事件 |

```bash
^[A-Z][a-z]+[0-9]{3,9}$解释一下这个正则表达式：

^: 匹配字符串的开始。
[A-Z]: 匹配一个大写字母。
[a-z]+: 匹配至少一个小写字母。
[0-9]{3,9}: 匹配3到9个连续的数字。
$: 匹配字符串的结束。
```

```html
<!DOCTYPE html>
<html lang="z">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>隆海</title>
    <style>
      .d1 {
        height: 800px;
        width: 100%;
      }
      .d2 {
        height: 300px;
      }
    </style>
  </head>
  <body>
    <form action="">
      <input
        type="text"
        name="username"
        pattern="[A-Z][a-z]+[0-9]{3,9}"
        oninvalid="validata('请输入大写字母开始,至少一个小写字母,最后是3到9个连续的数字')"
        onblur="validata"
      />
      <button>提交</button>
    </form>
    <script>
      function validata(txt) {
        console.log(111, txt);
      }
    </script>
  </body>
</html>
```

> 这个正则表达式可以用于验证输入内容是否满足特定的格式。记住，在 HTML 的`pattern`属性中，正则表达式通常不需要包含起始和结束锚定符（`^` 和 `$`）。所以，在 HTML 中使用时，可以去掉这两个锚定符。

### TEXTAREA

文本域指可以输入多行文本的表单，当然更复杂的情况可以使用编辑器如`ueditor、ckeditor`等。[MDN 地址](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/textarea)

| 选项        | 说明                                                      |
| ----------- | --------------------------------------------------------- |
| cols        | 列字符数（一般使用 css 控制更好）                         |
| rows        | 行数（一般使用 css 控制更好）                             |
| name        | 用于设置随表单一同提交到服务器的相关数据的名字            |
| maxlength   | 允许用户输入的最大字符长度 (Unicode) 。未指定表示无限长度 |
| minlength   | 允许用户输入的最小字符长度 (Unicode)                      |
| placeholder | 向用户提示可以在控件中输入的内容。                        |

```html
<textarea name="content" cols="30" rows="3">pythl.com</textarea>
```

> `<textarea>` 还可以使用 `<input>` 中的一些常见属性，如`autocomplete`, `autofocus`, `disabled`, `placeholder`, `readonly`, 和 `required`
>
> css 属性`resize`:none 可以禁止拉伸

### SELECT

下拉列表项可用于多个值中的选择。[MDN 地址](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/select)

| 选项     | 说明                                                         |
| -------- | ------------------------------------------------------------ |
| multiple | 支持多选                                                     |
| size     | 如果控件显示为滚动列表框（如声明了 `multiple`），则此属性表示为控件中同时可见的行数 |
| optgroup | 选项组                                                       |
| selected | 选中状态                                                     |
| option   | 选项值                                                       |

```html
<select name="lesson" multiple size="4">
  <option value="">== 选择课程 ==</option>
  <optgroup label="后端语言">
    <option value="python">python</option>
    <option value="java">java</option>
    <option value="Go">Go</option>
  </optgroup>
  <optgroup label="前端语言">
    <option value="HTML">HTML</option>
    <option value="JAVASCRIPT">JAVASCRIPT</option>
    <option value="CSS">CSS</option>
  </optgroup>
</select>
```

### RADIO

单选框指只能选择一个选项的表单，如性别的选择`男、女、保密` 只能选择一个。

![image-20230813213933003](https://cdn.jsdelivr.net/gh/RonHaiT/Image-hosting/image-20230813213933003.png)

| 选项    | 说明                     |
| ------- | ------------------------ |
| checked | 选中状态                 |
| value   | 包含该单选按钮值的字符串 |

```html
<input type="radio" name="sex" value="boy" id="boy" />
<label for="boy">男</label>
<input type="radio" name="sex" value="girl" id="girl" checked />
<label for="girl">女</label>
```

### CHECKBOX

复选框指允许选择多个值的表单。

![image-20230813213855757](https://cdn.jsdelivr.net/gh/RonHaiT/Image-hosting/image-20230813213855757.png)

```html
<fieldset>
  <legend>复选框</legend>
  <input type="checkbox" name="python" value="python" id="python" />
  <label for="boy">Python</label>
  <input type="checkbox" name="sex" value="JS" id="JS" checked />
  <label for="JS">JS</label>
</fieldset>
```

### 文件上传

文件上传有多种方式，可以使用插件或 JS 拖放上传处理。HTML 本身也提供了默认上传的功能，只是上传效果并不是很美观。

| 选项     | 说明                                              |
| -------- | ------------------------------------------------- |
| multiple | 支持多选                                          |
| accept   | 允许上传类型 `.png,.psd` 或 `image/png,image/gif` |

![image-20230813214100351](https://cdn.jsdelivr.net/gh/RonHaiT/Image-hosting/image-20230813214100351.png)

```html
<form action="" method="POST" enctype="multipart/form-data">
  <fieldset>
    <input
      type="file"
      name="icon"
      multiple="multiple"
      accept="image/png,image/gif"
    />
  </fieldset>
  <button>保存</button>
</form>
```

### 日期与时间

| 属性 | 说明                                                        |
| ---- | ----------------------------------------------------------- |
| step | 间隔：date 缺省是 1 天，week 缺省是 1 周，month 缺省是 1 月 |
| min  | 最小时间                                                    |
| max  | 最大时间                                                    |

**日期选择**

![image-20230813220347504](https://cdn.jsdelivr.net/gh/RonHaiT/Image-hosting/image-20230813220347504.png)

```html
<div>
  <p>日期选择</p>
  <input
    type="date"
    step="7"
    min="2019-01-22"
    max="2025-01-15"
    name="datetime"
  />
</div>
```

**周选择**

![image-20230813220331339](https://cdn.jsdelivr.net/gh/RonHaiT/Image-hosting/image-20230813220331339.png)

```html
<div>
  <p>周选择</p>
  <input type="week" />
</div>
```

**月选择**

![image-20230813220320171](https://cdn.jsdelivr.net/gh/RonHaiT/Image-hosting/image-20230813220320171.png)

```html
<div>
  <p>月选择</p>
  <input type="month" min="2019-01-22" max="2025-01-15" name="month" />
</div>
```

日期与时间

![image-20230813220309108](https://cdn.jsdelivr.net/gh/RonHaiT/Image-hosting/image-20230813220309108.png)

```html
<div>
  <p>日期和时间</p>
  <input type="datetime-local" name="datetime-local" />
</div>
```

### DATALIST

input 表单的输入值选项列表

![image-20230813220937711](https://cdn.jsdelivr.net/gh/RonHaiT/Image-hosting/image-20230813220937711.png)

```html
<form action="" method="post">
  <input type="text" list="a1" />
  <datalist id="a1">
    <option value="python">胶水语言</option>
    <option value="CSS">美化网站页面</option>
    <option value="MYSQL">掌握数据库使用</option>
  </datalist>
</form>
```

### autocomplete

浏览器基于之前键入过的值，应该显示出在字段中填写的选项。

![image-20230813221044190](https://cdn.jsdelivr.net/gh/RonHaiT/Image-hosting/image-20230813221044190.png)

```html
<form action="">
  <input type="search" autocomplete="on" name="content" />
  <button>提交</button>
</form>
```

## 列表

列表的使用与`word` 等软件的列表概念相似，只不过是应用在网页展示中。

> 取消默认样式:list-style:none
>
> OL,UL,DL 都自带有 margin,padding.需要清除

```css
ol,
ul,
dl {
  list-style: none;
  padding: 0;
  margin: 0;
}
```

![image-20230813222005178](https://cdn.jsdelivr.net/gh/RonHaiT/Image-hosting/image-20230813222005178.png)

### 有序列表

有序列表是指有数字编号的列表项，可以使用`CSS`定义更多样式。

![image-20230813221304748](https://cdn.jsdelivr.net/gh/RonHaiT/Image-hosting/image-20230813221304748.png)

```html
<ol>
  <li>li-1</li>
  <li>li-2</li>
  <li>li-3</li>
  <li>li-4</li>
  <li>li-5</li>
</ol>
```

### 无序列表

![image-20230813221406232](https://cdn.jsdelivr.net/gh/RonHaiT/Image-hosting/image-20230813221406232.png)

```html
<ul>
  <li>li-1</li>
  <li>li-2</li>
  <li>li-3</li>
  <li>li-4</li>
  <li>li-5</li>
  <li>li-6</li>
</ul>
```

### 描述列表

描述列表指每个列表项有单独的标题。

![image-20230813221552042](https://cdn.jsdelivr.net/gh/RonHaiT/Image-hosting/image-20230813221552042.png)

```html
<dl>
  <dt>晚生隆海</dt>
  <dd>隆海文档库</dd>
  <dd>隆海组件库</dd>
  <dt>网站导航</dt>
  <dd>pythl.com</dd>
  <dd>tanghailong.com</dd>
</dl>
```