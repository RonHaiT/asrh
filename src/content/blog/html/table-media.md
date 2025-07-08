---
title: HTML之表格和多媒体
published: 2019-02-03
description: "HTML之表格和多媒体"
tags: ["html"]
category: HTML
draft: false
---

# 表格和多媒体

表格在网页开发中使用频率非常高，尤其是数据展示时。

## 基本使用

| 属性    | 说明         |
| ------- | ------------ |
| caption | 表格标题     |
| thead   | 表头部分     |
| tbody   | 表格主体部分 |
| tfoot   | 表格尾部     |

> Table {border-collapse: collapse;}显示单一边框

```html
<table border="1">
  <thead>
    <th>标题</th>
    <th>时间</th>
    <th>名称</th>
    <th>备注</th>
  </thead>
  <tbody>
    <tr>
      <td>td1</td>
      <td>td2</td>
      <td>td3</td>
      <td>td4</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td>1</td>
      <td>2</td>
      <td>3</td>
      <td>4</td>
    </tr>
  </tfoot>
</table>
```

![image-20230813222748932](https://cdn.jsdelivr.net/gh/RonHaiT/Image-hosting/image-20230813222748932.png)

### 水平单元格合并

![image-20230813222918797](https://cdn.jsdelivr.net/gh/RonHaiT/Image-hosting/image-20230813222918797.png)

```html
<tbody>
  <tr>
    <td colspan="2">td1</td>
    <td>td3</td>
    <td>td4</td>
  </tr>
</tbody>
```

### 垂直单元格合并

```html
<tbody>
  <tr>
    <td rowspan="2">td1</td>
    <td>td2</td>
    <td>td3</td>
    <td>td4</td>
  </tr>
  <tr>
    <td>6</td>
    <td>7</td>
    <td>8</td>
  </tr>
</tbody>
```

![image-20230813223309337](https://cdn.jsdelivr.net/gh/RonHaiT/Image-hosting/image-20230813223309337.png)

## 视频

Adobe 与苹果公司对 FLASH 都不支持或消极状态，这时 HTML 提供对视频格式的支持，除了使用 html 提供的标签来播放视频外，也有很多免费或付费的插件，如[video.js](https://videojs.com/)、[阿里云播放器](https://help.aliyun.com/document_detail/57314.html)等等。

[参考资料](https://www.cnblogs.com/xiaonanxia/p/2715491.html)

| 属性     | 描述                                                         |
| :------- | :----------------------------------------------------------- |
| autoplay | 如果出现该属性，则视频在就绪后马上播放（需要指定类型如 `type="video/mp4"`)。 |
| preload  | 如果出现该属性，则视频在页面加载时进行加载，并预备播放。如果使用 "autoplay"，则忽略该属性。 如果视频观看度低可以设置为 `preload="none"` 不加载视频数据减少带宽。 如果设置为 `preload=metadata`值将加载视频尺寸或关键针数据，目的也是减少带宽占用。 设置为`preload="auto"` 时表示将自动加载视频数据 |
| controls | 如果出现该属性，则向用户显示控件，比如播放按钮。             |
| height   | 设置视频播放器的高度。                                       |
| width    | 设置视频播放器的宽度。                                       |
| loop     | 如果出现该属性，则当媒介文件完成播放后再次开始播放。         |
| muted    | 规定视频的音频输出应该被静音。                               |
| poster   | 规定视频下载时显示的图像，或者在用户点击播放按钮前显示的图像。 |
| src      | 要播放的视频的 URL。                                         |

```html
<video
  src="./童话镇.mp4"
  autoplay="autoplay"
  loop
  muted
  controls
  width="800"
  height="480"
>
  <source src="tanghailong.mp4" type="video/mp4" />
  <source src="pythl.webm" type="video/webm" />
</video>
```

## 声音

HTML 对声音格式文件也提供了很好的支持。

| 属性     | 描述                                                         |
| :------- | :----------------------------------------------------------- |
| autoplay | 如果出现该属性，则视频在就绪后马上播放。                     |
| preload  | 如果出现该属性，则视频在页面加载时进行加载，并预备播放。如果使用 "autoplay"，则忽略该属性。 如果视频观看度低可以设置为 `preload="none"` 不加载视频数据减少带宽。 如果设置为 `preload="metadata"`值将加载视频尺寸或关键针数据，目的也是减少带宽占用。 设置为`preload="auto"` 时表示将自动加载视频数据 |
| controls | 如果出现该属性，则向用户显示控件，比如播放按钮。             |
| loop     | 如果出现该属性，则当媒介文件完成播放后再次开始播放。         |
| muted    | 规定视频的音频输出应该被静音。                               |
| src      | 要播放的视频的 URL。                                         |

```html
<audio controls autoplay loop preload="auto">
  <source src="pythl.ogg" type="audio/ogg" />
  <source src="pythl.mp3" type="audio/mp3" />
</audio>
```