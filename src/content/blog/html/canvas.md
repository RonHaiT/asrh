---
title: Canvas
published: 2020-02-02
description: "HTML之文本相关"
tags: ["html","canvas"]
category: HTML
draft: false
---

# Canvas 基础

## 创建画布

```html
<body>
  <canvas id="canvas" width="300" height="300"></canvas>
  <script type="module" src="/src/main.ts"></script>
</body>
```

## 获取画布

```typescript
const el: HTMLCanvasElement =
  document.querySelector<HTMLCanvasElement>("#canvas")!;
const app = el.getContext("2d")!;
```

## 填充矩形

```typescript
//填充颜色
app.fillStyle = "red";
//填充矩形
app.fillRect(0, 0, el.offsetWidth, el.offsetHeight);
```

![image-20231019150958988](https://cdn.jsdelivr.net/gh/RonHaiT/Image-hosting/image-20231019150958988.png)

```typescript
app.fillStyle = "green";

app.fillRect(el.offsetWidth / 2 - 50, el.offsetHeight / 2 - 50, 100, 100);
```

![image-20231019151033686](https://cdn.jsdelivr.net/gh/RonHaiT/Image-hosting/image-20231019151033686.png)

## 画矩形

```typescript
//画笔颜色
app.strokeStyle = "#99B080";
//线条宽度
app.lineWidth = 30;
//画圆角
app.lineJoin = "round";
//画矩形
app.strokeRect(50, 50, 200, 200);
```

![image-20231019153754825](https://cdn.jsdelivr.net/gh/RonHaiT/Image-hosting/image-20231019153754825.png)

## 画圆

[官方文档](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/arc)

```typescript
//定义颜色
app.strokeStyle = "#ED7D31";
app.lineWidth = 20;
//画圆 void ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise);
app.arc(150, 150, 100, 0, 2 * Math.PI);
//绘制
app.stroke();
```

![image-20231019154451716](https://cdn.jsdelivr.net/gh/RonHaiT/Image-hosting/image-20231019154451716.png)

## 不规则形状

绘制倒正三角

```typescript
//提笔
app.beginPath();
//上颜色
app.strokeStyle = "#E95793";
//放到x:0,y:0
app.moveTo(50, 50);
//x:150 y:200
app.lineTo(150, 50);
//x:75,y:200
app.lineTo(100, 100);
//闭合
app.closePath();
//线条宽度
app.lineWidth = 20;
//绘制
app.stroke();
```

![image-20231019155611652](https://cdn.jsdelivr.net/gh/RonHaiT/Image-hosting/image-20231019155611652.png)

```typescript
//提笔
app.beginPath();
//上颜色
app.fillStyle = "#E95793";
//放到x:0,y:0
app.moveTo(50, 50);
//x:150 y:200
app.lineTo(150, 50);
//x:75,y:200
app.lineTo(100, 100);
//闭合
app.closePath();
//线条宽度
app.lineWidth = 20;
//填充
app.fill();
```

![image-20231019155756082](https://cdn.jsdelivr.net/gh/RonHaiT/Image-hosting/image-20231019155756082.png)

## 渐变色

[官方文档](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/createLinearGradient)

```typescript
const gradient = app.createLinearGradient(150, 0, 300, 300);
gradient.addColorStop(0, "#DA0C81");
gradient.addColorStop(1, "#610C9F");

app.fillStyle = gradient;
app.fillRect(0, 0, 300, 300);
```

![image-20231019161519036](https://cdn.jsdelivr.net/gh/RonHaiT/Image-hosting/image-20231019161519036.png)

```typescript
const gradient = app.createLinearGradient(150, 0, 300, 300);
gradient.addColorStop(0, "#DA0C81");
gradient.addColorStop(1, "#610C9F");

app.strokeStyle = gradient;
app.lineWidth = 20;
app.lineJoin = "round";
app.strokeRect(50, 50, 200, 200);
```

![image-20231019161652426](https://cdn.jsdelivr.net/gh/RonHaiT/Image-hosting/image-20231019161652426.png)

## 文本绘制

[官方文档](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/strokeText)

```typescript
app.fillStyle = "#b84592 ";
app.fillRect(0, 0, el.width, el.height);
//设置字体大小和字体
app.font = "40px Arial";
// app.fillStyle = 'white'
app.strokeStyle = "white";
//文本的基线
app.textBaseline = "top";
app.lineWidth = 2;
//文字和x,y位置
app.strokeText("晚生隆海", 70, 100);
```

![image-20231019162703539](https://cdn.jsdelivr.net/gh/RonHaiT/Image-hosting/image-20231019162703539.png)

## 图片贴图

[官方文档](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/createPattern)

贴图无法放的位置和缩放的大小，图片绘制可实现

```typescript
//创建图片
const img = document.createElement("img");
img.src = "./images/wepay.png";
img.onload = () => {
  // document.body.insertAdjacentElement('beforeend', img)
  //创建贴图
  const pattern = app.createPattern(img, "repeat")!;
  //填充贴图
  app.fillStyle = pattern;
  app.fillRect(0, 0, 300, 300);
};
```

![image-20231019164541560](https://cdn.jsdelivr.net/gh/RonHaiT/Image-hosting/image-20231019164541560.png)

## 图片绘制

[官方文档](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/drawImage)

```typescript
//创建图片
const img = document.createElement("img");
img.src = "./images/1.jpg";
img.onload = () => {
  //图片 x:50,y:50 缩放的大小w:200 h：200
  app.drawImage(img, 50, 50, 200, 200);
};
```

![image-20231019165152796](https://cdn.jsdelivr.net/gh/RonHaiT/Image-hosting/image-20231019165152796.png)

### 等比例缩放

```typescript
const img = document.createElement("img");
img.src = "./images/1.jpg";
img.onload = () => {
  el.width = img.naturalWidth * scale(img, el);
  el.height = img.naturalHeight * scale(img, el);
  app.drawImage(img, 0, 0, el.width, el.height);
};

function scale(img: HTMLImageElement, el: HTMLCanvasElement) {
  //返回缩放比例，以最小的来
  return Math.min(el.width / img.naturalWidth, el.height / img.naturalHeight);
}
```

![image-20231019165949252](https://cdn.jsdelivr.net/gh/RonHaiT/Image-hosting/image-20231019165949252.png)

## 黑板案例

创建项目

```bash
PS D:\thl\ts_demo\canvas> npm create vite
√ Project name: ... blackboard
? Select a frameork: » - Use arrow-keys. Return to submit.
>   Vanilla
    Vue
    React
    Preact
    Lit
    Svelte
    Solid
    Qwik
    Others
```

输入项目名

```
√ Project name: ... blackboard
```

选择脚手架

```bash
? Select a framework: » - Use arrow-keys. Return to submit.
>   Vanilla
>   TypeScript
```

安装依赖并运行

```bash
npm i
npm run dev
```

详情代码见仓库

https://github.com/pythl/blackboard