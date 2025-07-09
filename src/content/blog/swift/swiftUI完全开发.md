---
title: SwiftUI完全开发
published: 2025-02-23
description: SwiftUI完全开发
tags: [Swift,SwiftUI]
category: SwiftUI
draft: false
---

在SwiftUI中，基础控件都以首字母大写的单词替代，使用样式"修饰符"，修饰符的使用方式为在控件后使用"."加修饰符名称。

# Text文字

字体大小:.font()

```swift
Text(/*@START_MENU_TOKEN@*/"Hello, World!"/*@END_MENU_TOKEN@*/).font(.system(size: 35))
```

背景颜色:..foregroundStyle()

```swift
Text(/*@START_MENU_TOKEN@*/"Hello, World!"/*@END_MENU_TOKEN@*/).font(.system(size: 35))
            .foregroundStyle(Color(uiColor: .red))
```

## 自定义字体

- 下载好的字体拖入项目

- 点击导航栏的项目名称,选择"TARGETS",选择"Inof"

- ![image-20250223112500177](https://cdn.jsdelivr.net/gh/RonHaiT/Image-hosting/image-20250223112500177.png)

- 选择到最后,点击+号输入Fonts 找到Fonts provided by application 在item0后的value输入字体名称

- ![image-20250223113225002](https://cdn.jsdelivr.net/gh/RonHaiT/Image-hosting/image-20250223113225002.png)

- 使用字体

  ```swift
  Text("我是隆海一个前端开发,专注于移动开发,官方ronhai.com").font(.custom("slideyouran-Regular", size: 34))
  ```

  

常用属性

| 修饰符                    | 名称     | 示例                                                         |
| ------------------------- | -------- | ------------------------------------------------------------ |
| .font()                   | 字体大小 | .font(.system(size: 35))                                     |
| .foregroundStyle()        | 字体颜色 | .foregroundStyle(Color(uiColor: .red))                       |
| .multilineTextAlignment() | 对齐方式 | .multilineTextAlignment(.center)//leading左 trailing右       |
| .lineLimit()              | 显示行数 | .lineLimit(2)//超出了就省略号                                |
| .fontWeight()             | 字体粗线 | .fontWeight(.bold)                                           |
| .padding()                | 内边距   | .padding()                                                   |
| .tracking()               | 字间距   | .tracking(3)                                                 |
| .lineSpacing()            | 行间距   | .lineSpacing(5)                                              |
| .truncationMode()         | 截断模式 | .truncationMode(.head)//超出的截断头还是中间还是尾           |
| .border()                 | 边框     | .border(Color.blue,width: 2)                                 |
| .blur()                   | 模糊     | .blur(radius: 3)                                             |
| .rotationEffect()         | 2D旋转   | .rotationEffect(.degrees(20),anchor: UnitPoint(x: 0, y: 0)) //00为起点旋转20 |
| .rotation3DEffect()       | #D旋转   | .rotation3DEffect(.degrees(30), axis: (x: 1, y: 0, z: 0)) //空间坐标旋转30 |

# Image图片

## 基本使用

```swift
VStack {
  Image("cloud")
  .resizable()
  .frame(width: 200,height: 200)
  .cornerRadius(20)

  Image("jamie-street-hBzrr6m6-pc-unsplash")
  .resizable()
  .frame(width: 200,height: 200)
  .cornerRadius(20)
  .blendMode(.color)
}
.padding()
```

常用属性

| 修饰符               | 名称             | 示例                                          |
| -------------------- | ---------------- | --------------------------------------------- |
| .resizable()         | 调整图片大小     | .resizable()//原图片是静态图片,不允许调整大小 |
| .scaledToFit()       | 保持纵横比修饰符 | .scaledToFit()                                |
| .frame()             | 尺寸修饰符       | .frame(width: 300,height: 200)                |
| .cornerRadius()      | 圆角修饰符       | .cornerRadius(20)                             |
| .clipShape(Circle()) | 圆角             | .clipShape(Circle())                          |
| .opacity()           | 透明度           | .opacity(0.3)//范围0-1                        |
| .blendMode()         | 混合模式         | .blendMode(.color) //根ps的正片叠底类似       |
|                      |                  |                                               |

## SF Symbols图标库

[下载地址](https://developer.apple.com/cn/sf-symbols/)

### 使用

```swift
Image(systemName: "square.and.arrow.up")
.font(.system(size: 50))
.foregroundColor(.green)
```

## 互联网图片

```swift
//
//  ContentView.swift
//  analyze
//
//  Created by RonHai on 2025/2/23.
//

import SwiftUI

struct ContentView: View {
    var body: some View {
        let imageUrl="https://ronhai.com/media/banners/web.jpg"
        VStack {
            Image("cloud")
                .resizable()
                .frame(width: 200,height: 200)
                .cornerRadius(20)
            
            AsyncImage(url: URL(string: imageUrl)){phase in
                switch phase {
                case .empty:
                    ProgressView() // 加载时显示进度条
                case .success(let image):
                    image
                        .resizable()
                        .scaledToFit()
                        .frame(width: 300, height: 200)
                        .cornerRadius(20) // 给加载的图片加圆角
                case .failure:
                    Text("Image failed to load.") // 加载失败时显示文本
                @unknown default:
                    EmptyView() // 处理未来可能新增的情况
                }
            }
        }
    }
}

#Preview {
    ContentView()
}
```

![image-20250223142449368](https://cdn.jsdelivr.net/gh/RonHaiT/Image-hosting/image-20250223142449368.png)

# Stack布局容器

- VStack

  纵向布局容器,可以让内部元素按照纵向从上至下的优先顺序垂直展示

- HStack

  横向布局容器的元素,可以让内部元素按照横向从左向右的优先顺序排列

- ZStack

  堆叠布局容器,基于Z轴实现从底层向外层的排布方式

## 启动页

```swift
//
//  SwiftUIStack.swift
//  analyze
//
//  Created by RonHai on 2025/2/23.
//

import SwiftUI

struct SwiftUIStack: View {
    var body: some View {
        
        ZStack{
            
            //背景
            Image("bg")
                .resizable()
                .aspectRatio(contentMode: ContentMode.fill)
                .edgesIgnoringSafeArea(.all)//忽略安全区域
            VStack{
                Spacer()
                
                HStack{
                    Image("logo")
                        .resizable()
                        .aspectRatio(contentMode: .fit)
                        .frame(width: 60)
                        .cornerRadius(16)
                    Text("嘿记助")
                        .font(.system(size: 32))
                        .foregroundColor(.white)
                        .bold()
                }
            }
        }
    }
}

#Preview {
    SwiftUIStack()
    
}
```

![image-20250223145849963](https://cdn.jsdelivr.net/gh/RonHaiT/Image-hosting/image-20250223145849963.png)

## 缺失页

```swift
//
//  DefaultImage.swift
//  analyze
//
//  Created by RonHai on 2025/2/23.
//

import SwiftUI

struct DefaultImage: View {
    var body: some View {
        VStack(spacing:40){
            Image("DefaultImage")
                .resizable()
                .aspectRatio(contentMode: .fit)
                .frame(width: 200)
            VStack(spacing:10){
                Text("还没有收到消息哦")
                    .font(.system(size: 20))
                    .foregroundColor(.gray)
                    .bold()
                Text("不如去社区逛逛吧~")
                    .font(.system(size: 17))
                    .foregroundColor(.gray)
                    .bold()
            }
            
        }
    }
}

#Preview {
    DefaultImage()
}
```

![image-20250223150735869](https://cdn.jsdelivr.net/gh/RonHaiT/Image-hosting/image-20250223150735869.png)

## 状态显示页

```swift
//
//  PopoverImage.swift
//  analyze
//
//  Created by RonHai on 2025/2/23.
//

import SwiftUI

struct PopoverImage: View {
    var body: some View {
        ZStack{
            //遮罩
            VStack{
                Spacer()
            }
            .frame(minWidth: 0,maxWidth: .infinity,minHeight: 0,maxHeight: .infinity)
            .background(Color.black)
            .opacity(0.6)
            .edgesIgnoringSafeArea(.all)
            //内容
            VStack(spacing:20){
                VStack(spacing:20){
                    Image("PropoverImage")
                        .resizable()
                        .aspectRatio(contentMode: .fit)
                        .frame(width: 120)
                    
                    VStack(spacing:10){
                        Text("签到成功")
                            .font(.system(size: 20))
                            .foregroundColor(.black)
                            .bold()
                        Text("签到2天可获得500积分")
                            .font(.system(size: 17))
                            .foregroundColor(.gray)
                    }
                    Text("知道了")
                        .font(.system(size: 17))
                        .foregroundColor(.white)
                        .bold()
                        .padding()
                        .frame(width: 180)
                        .background(Color.green)
                        .cornerRadius(20)
                }
            }
            .padding()
            .frame(maxWidth: 320)
            .background(Color.white)
            .cornerRadius(16)
            
        }
        
    }
}

#Preview {
    PopoverImage()
}
```

![image-20250223153116036](https://cdn.jsdelivr.net/gh/RonHaiT/Image-hosting/image-20250223153116036.png)

## 开启定位

```swift
//
//  LocationPageView.swift
//  analyze
//
//  Created by RonHai on 2025/2/23.
//

import SwiftUI

struct LocationPageView: View {
    var body: some View {
        ZStack{
            VStack{
                Spacer()
            }
            .frame(minWidth: 0,maxWidth: .infinity,minHeight: 0,maxHeight: .infinity)
            .background(Color.black)
            .opacity(0.6)
            .edgesIgnoringSafeArea(.all)
            VStack(spacing:20){
                
                Image("Location")
                    .resizable()
                    .aspectRatio(contentMode: .fit)
                    .frame(width: 120)
                
                VStack(spacing:10){
                    Text("开启位置访问")
                        .font(.system(size: 20))
                        .bold()
                    Text("在使用该应用时访问您的位置,用于绘制您的跑步轨迹")
                        .font(.system(size: 17))
                        .foregroundColor(.gray)
                        .multilineTextAlignment(.center)
                }
                Text("马上开启")
                    .font(.system(size: 17))
                    .foregroundColor(.white)
                    .bold()
                    .padding()
                    .frame(width: 180)
                    .background(Color.green)
                    .cornerRadius(16)
            }
            .padding()
            .frame(width: 320)
            .background(Color.white)
            .cornerRadius(16)
        }
    }
}

#Preview {
    LocationPageView()
}
```

![image-20250223154130096](https://cdn.jsdelivr.net/gh/RonHaiT/Image-hosting/image-20250223154130096.png)

# Button按钮

## 基本使用

```swift
//
//  SwiftUIButton.swift
//  analyze
//
//  Created by RonHai on 2025/2/23.
//

import SwiftUI

struct SwiftUIButton: View {
    var body: some View {
        VStack(spacing:20){
            Button(action:{
                print("button")
            }){
                Text("立即使用")
                    .font(.system(size: 17))
                    .foregroundStyle(.white)
                    .padding()
                    .frame(width: 180)
                    .background(Color.green)
                    .cornerRadius(16)
            }
            Button(action:{
                print("image button")
            }){
                Image(systemName: "trash")
            }
        }
            
    }
}

#Preview {
    SwiftUIButton()
}
```

Button按钮的特性,纯文字按钮和图标按钮默认前景色会设置为蓝色,以突出按钮的特性，使用.foregroundStyle改变背景颜色

## 渐变按钮 

```swift
//
//  SwiftUIButton.swift
//  analyze
//
//  Created by RonHai on 2025/2/23.
//

import SwiftUI

struct SwiftUIButton: View {
    var body: some View {
        VStack(spacing:20){
            Button(action:{
                print("button")
            }){
                Text("立即使用")
                    .font(.system(size: 17))
                    .foregroundStyle(.white)
                    .padding()
                    .frame(width: 180)
                    .background(LinearGradient(gradient: Gradient(colors: [Color.blue,Color.green]), startPoint: .leading, endPoint: .trailing))
                    .cornerRadius(16)
            }
           
        }
            
    }
}

#Preview {
    SwiftUIButton()
}
```

渐变色修饰参数

| 参数             | 名称     | 说明                                                       |
| ---------------- | -------- | ---------------------------------------------------------- |
| LinearGradinet() | 线性渐变 | 用于定义渐变色                                             |
| gradinet         | 渐变色   | 通常用颜色组[Color.blue,Color.green]开始是蓝色,结束是绿色  |
| startPoint       | 开始位置 | 通常使用.leading左边、.trailing右边、.top上边、.bottom下边 |
| endPoint         | 结束位置 | 通常使用.leading左边、.trailing右边、.top上边、.bottom下边 |

## 万物可变按钮

```swift
//
//  SwiftUIButton.swift
//  analyze
//
//  Created by RonHai on 2025/2/23.
//

import SwiftUI

struct SwiftUIButton: View {
    @State var totalNumber:Int=1
    var number:Int=1
    var body: some View {
        VStack(spacing:20){
            Text("星星"+String(totalNumber))
            Button(action:{
                print("button")
                totalNumber+=number
            }){
                VStack(spacing:20){
                 
                    Image("logo")
                        .resizable()
                        .scaledToFit()
                        .frame(width: 160)
                }
            }
           
        }
            
    }
}

#Preview {
    SwiftUIButton()
}
```

## onTapGesture修饰符

有时候我们觉得使用Button按钮太麻烦,可以用一种点击交互的变成方案:onTapGesture修饰符

```swift
//
//  SwiftUIButton.swift
//  analyze
//
//  Created by RonHai on 2025/2/23.
//

import SwiftUI

struct SwiftUIButton: View {
    @State var totalNumber:Int=1
    var number:Int=1
    var body: some View {
        VStack(spacing:20){
            Text("星星"+String(totalNumber))
            Image("logo")
                .resizable()
                .scaledToFit()
                .frame(width: 160)
                .onTapGesture {
                    totalNumber+=number
                }
           
        }
            
    }
}

#Preview {
    SwiftUIButton()
}
```

批量改变量名

- 选择变量名右键Refactor
- 选择Rename
- 输入新名称,回车

# TextField

## 基本使用

```swift
//
//  SwiftUITextfield.swift
//  analyze
//
//  Created by RonHai on 2025/2/25.
//

import SwiftUI

struct SwiftUITextfield: View {
    @State var iptText:String=""
    @State var iptPwd:String=""
    var body: some View {
        Text("用户名:"+iptText)
        Text("密码名:"+iptPwd)
        TextField("请输入帐号",text:$iptText)
        SecureField("请输入密码",text:$iptPwd)
    }
}

#Preview {
    SwiftUITextfield()
}
```

## 修饰文本框

```swift
//
//  SwiftUITextfield.swift
//  analyze
//
//  Created by RonHai on 2025/2/25.
//

import SwiftUI

struct SwiftUITextfield: View {
    @State var iptText:String=""
    @State var iptPwd:String=""
    var body: some View {
        Text("用户名:"+iptText)
        Text("密码名:"+iptPwd)
        TextField("请输入帐号",text:$iptText)
            .textFieldStyle(RoundedBorderTextFieldStyle())
            .padding()
            .textContentType(.telephoneNumber)//输入文本的类型如:邮箱,URL地址,电话号码等
            .keyboardType(.numberPad)//真机或模拟器软键盘转为数字键盘
            .autocorrectionDisabled(false)//自动就错关闭
        SecureField("请输入密码",text:$iptPwd)//安全文本框
            .textFieldStyle(RoundedBorderTextFieldStyle())//边框
            .padding()
    }
}

#Preview {
    SwiftUITextfield()
}
```

## 登录页面

