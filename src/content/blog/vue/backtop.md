---
title: Vue返回顶部
published: 2020-03-22
description: Vue返回顶部
tags: [Vue,Components]
category: Vue
draft: false
---
# Vue3返回顶部

ts代码

```typescript
<script setup lang="ts">
const props = defineProps({
  visibilityHeight: {
    type: Number,
    default: 200, //按钮距离底部距离
  },
  insurance: {
    type: Boolean,
    default: true,
  },
});
let visiable = ref(true); //是否显示返回顶部
let timer: ReturnType<typeof setInterval> | null = null; // 明确指定 timer 为 number 或 null 类型
const phoneNumber = "18765321000"; // 示例电话号码
let flat = ref(true); //
//滚动到顶部
const handleScroll = () => {
  let scroll = document.documentElement.scrollTop;

  if (scroll >= (props.insurance ? 100 : props.visibilityHeight)) {
    visiable.value = true;
  } else {
    visiable.value = false;
  }
};
const backTop = () => {
  window.scrollTo({
    top: 0, // 滚动到顶部
    behavior: "smooth", // 平滑滚动效果
  });
};
// 复制电话号码到剪贴板
const copyPhoneNumber = async () => {
  try {
    await navigator.clipboard.writeText(phoneNumber); //确保你的页面在 HTTPS 环境下运行（或者 localhost），因为剪贴板 API 在非安全上下文中会受到限制
    message.success("电话号码已复制到剪贴板");
  } catch (error) {
    console.error("复制失败", error);
    message.error("复制失败，请手动复制");
  }
};
onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>
```

vue代码 

```vue
<template>
  <div
    class="back-list"
    :style="{ bottom: insurance ? 300 + 'px' : visibilityHeight + 'px' }"
  >
    <div class="back-tel" v-if="insurance" @click="copyPhoneNumber">
      <i class="iconfont icon-arrow-up"></i>
      <div>资讯热线</div>
    </div>
    <div class="back-connect" v-if="insurance">
      <WhatsAppOutlined />
      <div class="name">在线客服</div>
    </div>
    <div class="back-top" @click="backTop" v-if="insurance || visiable">
      <i class="iconfont icon-arrow-up"></i>
      <div class="back-name">回顶部</div>
    </div>
  </div>
</template>
```

less代码

```less
<style scoped lang="less">
.back-list {
  position: fixed;
  right: 20px;
  width: 90px;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  gap: 10px;
  z-index: 9999;
  .back-tel,
  .back-connect,
  .back-top {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 10px;
    cursor: pointer;
    width: 90px;
    height: 90px;
    background-color: #fff;
  }
  .back-top {
    background-color: @dbMain;
    color: #fff;

    .back-name {
      font-size: 14px;
    }
    .iconfont {
      font-size: 22px;
    }
  }
}
</style>
```

效果图

![image-20250219100532875](https://cdn.jsdelivr.net/gh/RonHaiT/Image-hosting/image-20250219100532875.png)

# Vue3返回顶部

`vue`

```vue
<template>
  <div v-show="firstShow" class="back-top" :class="isHide ? 'isHide' : 'isShow'" :style="{ bottom: bottom + 'px' }">
    <div class="box">
      <transition
        enter-active-class="animate__animated animate__flipInY animate__delay-1s"
        leave-active-class="animate__animated animate__flipOutY "
      >
        <div class="name" @click="conduct" v-if="showTemplate">
          <img src="@daoba-match/assets/matchcenter/medal.png" alt="" />
        </div>
      </transition>
      <transition
        enter-active-class="animate__animated animate__flipInY animate__delay-1s"
        leave-active-class="animate__animated animate__flipOutY "
      >
        <div class="name" @click="conduct" v-if="!showTemplate">
          <div>'我要</div>
          <div v-if="$t('办赛') == 'Competition'" style="font-size: 13px;font-weight: bold;">'办赛'</div>
          <div v-else>办赛</div>
        </div>
      </transition>
      <!-- <div class="line" v-if="!showTemplate"></div> -->
    </div>
    <div class="customer">
      <img class="img" src="@daoba-match/assets/matchcenter/customer.png" alt="" />
      <div class="customer-name">专属客服</div>
    </div>
    <div class="icon" @click="backTop">
      <a-icon type="arrow-up" />
    </div>
  </div>
</template>
```

`javascript`

```js
<script>
import 'animate.css'
export default {
  name: 'backTop',
  props: {
    //滚动显示距离
    visibilityHeight: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      firstShow: false, //是否显示返回顶部
      isHide: false, //返回顶部的动画控件
      scrollFLag: true, //滚动控件
      bottom: 450, //按钮距离底部距离
      scrollTimer1: null,
      showTemplate: true,
      timer: null,
    }
  },
  mounted() {
    this.toggleTemplate()
  },
  created() {
    if (this.visibilityHeight == 0) {
      this.firstShow = true
    } else {
      document.addEventListener('scroll', () => {
        let scroll = document.documentElement.scrollTop
        if (scroll > this.visibilityHeight) {
          this.isHide = false
          this.firstShow = true
        } else {
          this.isHide = true
          this.firstShow = false
        }
      })
    }
  },
  beforeDestroy() {
    clearInterval(this.timer)
  },
  methods: {
    //旋转动画
    toggleTemplate() {
      this.timer = setInterval(() => {
        this.showTemplate = !this.showTemplate
        console.log(this.showTemplate)
      }, 5000)
    },
    //返回顶部
    backTop() {
      if (this.scrollFLag) {
        this.scrollFLag = false
        //屏幕高度
        let scroll = document.documentElement.scrollTop
        this.scrollTimer1 = setInterval(() => {
          scroll -= 50
          document.documentElement.scrollTop = Math.max(scroll, 0)
          if (scroll <= 0) {
            clearInterval(this.scrollTimer1)
          }
        }, 10)
        this.scrollFLag = true
      }
      console.log('返回顶部')
    },
    //跳转指定位置
    conduct() {
      console.log(111, this.$route.path == '/Center')
      if (this.$route.path != '/Center') {
        this.$router.push({
          path: '/Center',
        })
        document.documentElement.scrollTop = 0
      } else {
        let selectDom = document.getElementById('start-match')
        let realTop = selectDom.offsetTop
        document.documentElement.scrollTop = Math.max(realTop, 0)
      }
    },
  },
}
</script>
```

`scss`

```scss
<style scoped lang="scss">
.back-top {
  position: fixed;
  right: 60px;
  top: 585px;
  width: 60px;
  z-index: 200;
  text-align: center;
  color: white;
  .box {
    width: 80px;
    height: 80px;
    position: relative;
    // border: 1px solid #b01f23;
    .name {
      position: absolute;
      z-index: 50;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      font-size: 14px;
      font-size: 24px;
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      background-color: #b01f23;
      margin-bottom: 2px;
      cursor: pointer;
    }
    .line {
      width: 2px;
      height: 100%;
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      background-color: #b01f23;
    }
  }

  .card.flipped {
    transform: rotateY(180deg);
  }
  .customer {
    font-size: 24px;
    width: 80px;
    height: 80px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    font-weight: bold;
    color: #333333;
    background-color: #fff;
    .img {
      width: 60px;
    }
    .customer-name {
      font-size: 12px;
    }
  }
  .icon {
    width: 80px;
    height: 38px;
    line-height: 38px;
    font-size: 20px;
    font-weight: bold;
    background-color: #333333;
    cursor: pointer;
  }

  .isShow {
    animation: back-top-move 0.5s forwards linear, back-top-yurayura 2s 0.6s forwards linear infinite;
  }
  .isHide {
    opacity: 0;
    animation: back-top-hide 0.5s forwards linear;
  }
}

@keyframes back-top-hide {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-100%);
  }
}

@keyframes back-top-move {
  to {
    transform: translateY(0);
  }
}
@keyframes back-top-yurayura {
  0% {
    transform-origin: top center;
    transform: rotate(0);
  }
  25% {
    transform-origin: top center;
    transform: rotate(2deg);
  }
  75% {
    transform-origin: top center;
    transform: rotate(-2deg);
  }
  100% {
    transform-origin: top center;
    transform: rotate(0);
  }
}
</style>
```



