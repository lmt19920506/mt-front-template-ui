<template>
    <div class="home">
      <!-- <div class="btn-area">
        <button @click="switchImgHandle(1)">竖图</button>
        <button @click="switchImgHandle(2)">横图</button>
        <button @click="handleRotate">旋转</button>
        <button @click="imgScaleHandle(0.25)">放大</button>
        <button @click="imgScaleHandle(-0.25)">缩小</button>
        <button @click="handleReset">重置</button>
      </div> -->
      <div class="image-box" ref="maskBox" @mousedown="onmousedownHandle">
        <div :style="{width: imgW + 'px', height: imgH + 'px',
            top: top + 'px', left: left + 'px', transform: scale, transformOrigin: trans}">
            111</div>
      </div>
    </div>
  </template>
  
  <script>
  /*eslint-disable */
  export default {
    name: "HomeView",
    data() {
      return {
        imageUrl: "",
        imageUrl1: require("@/assets/house/1.jpg"),
        imageUrl2: require("@/assets/house/2.jpg"),
        imgW: 0,
        imgW: 0,
        imgH: 0,
        deg: 0,
        top: 0,
        left: 0,
        scale: "scale(1)",
        size: 0,
        mousewheelevt: null,
        trans: '0 0'
      };
    },
    mounted() {
      this.imageUrl = this.imageUrl1;
      //初始化图片
      this.initImage();
  
      // 兼容火狐浏览器
      this.mousewheelevt = /Firefox/i.test(navigator.userAgent) ? "DOMMouseScroll" :"mousewheel";
      // 为空间区域绑定鼠标滚轮事件 =》 处理函数是wheelHandle
      // 如果你监听了window的scroll或者touchmove事件，你应该把passive设置为true，这样滚动就会流畅很多
      this.$refs.maskBox.addEventListener(this.mousewheelevt, this.wheelHandle, { passive:true});
    },
    beforeDestroy() {
      //取消监听
      this.$refs.maskBox.removeEventListener(this.mousewheelevt,this.wheelHandle,{passive:true});
    },
    methods: {
      /**
       * 切换图片
       *  flag: 1竖图 2 横图
       */
      switchImgHandle(flag) {
        if (flag === 1) {
          this.imageUrl = this.imageUrl1;
        } else {
          this.imageUrl = this.imageUrl2;
        }
        this.handleReset();
      },
      /**
       * 获取图片的url
       * @param {string} url
       */
      getImgSize(url) {
        return new Promise((resolve, reject) => {
          let imgObj = new Image();
          imgObj.src = url;
          imgObj.onload = () => {
            resolve({
              width: imgObj.width,
              height: imgObj.height,
            });
          };
        });
      },
      /**
       * 初始化图片
       */
      async initImage() {
        if (!this.imageUrl) {
          return;
        }
        // let { width, height } = await this.getImgSize(this.imageUrl);
        let width = 200
        let height = 300
        // 设置原始图片的大小
        let realWidth = width;
        let realHeight = height;
  
        // 获取高宽比例
        const whRatio = realWidth / realHeight;
        const hwRatio = realHeight / realWidth;
  
        //获取盒子的大小
        const boxW = this.$refs.maskBox.clientWidth;
        const boxH = this.$refs.maskBox.clientHeight;
  
        if (realWidth >= realHeight) {
          this.imgH = hwRatio * boxW;
          const nih = this.imgH;
          if (nih > boxH) {
            this.imgH = boxH;
            this.imgW = whRatio * boxH;
          } else {
            this.imgW = boxW;
          }
          this.top = (boxH - this.imgH) / 2;
          this.left = (boxW - this.imgW) / 2;
        } else {
          this.imgW = (boxH / realHeight) * realWidth;
          this.imgH = boxH;
          this.left = (boxW - this.imgW) / 2;
        }
      },
      /**
       * 旋转
       */
      handleRotate() {
        this.deg += 90;
        if (this.deg >= 360) {
          this.deg = 0;
        }
        this.size = 0;
        this.scale = `scale(1) rotateZ(${this.deg}deg)`;
      },
  
      /**
       * 图片的缩放
       *    zoom >0 放大
       *    zoom <0 缩小
       */
      imgScaleHandle(zoom) {
        this.size += zoom;
        if (this.size < -0.5) {
          this.size = -0.5;
        }
        this.scale = `scale(${1 + this.size}) rotateZ(${this.deg}deg)`;
      },
  
      /**
       * 重置
       */
      handleReset() {
        this.imgW = 0;
        this.imgH = 0;
        this.top = 0;
        this.left = 0;
        this.deg = 0;
        this.scale = "scale(1)";
        this.size = 0;
        this.initImage();
      },
  
      /**
       * 鼠标滚动 实现放大缩小
       */
      wheelHandle(e) {
        console.log('eee---', e.currentTarget.getBoundingClientRect().top, e.currentTarget.getBoundingClientRect().left)
        const ev = e || window.event; // 兼容性处理 => 火狐浏览器判断滚轮的方向是属性 detail，谷歌和ie浏览器判断滚轮滚动的方向是属性 wheelDelta
        // dir = -dir; // dir > 0 => 表示的滚轮是向上滚动，否则是向下滚动 => 范围 (-120 ~ 120)
        const dir = ev.detail ? ev.detail * -120 : ev.wheelDelta;
        //滚动的数值 / 2000 => 表示滚动的比例，用此比例作为图片缩放的比例
        this.imgScaleHandle(dir / 2000);
      },
  
      /**
       * 处理图片拖动
       */
      onmousedownHandle(e) {
        const that = this;
        this.$refs.maskBox.onmousemove = function (el) {
          const ev = el || window.event; // 阻止默认事件
          ev.preventDefault();
          that.left += ev.movementX;
          that.top += ev.movementY;
        };
        this.$refs.maskBox.onmouseup = function () {
          // 鼠标抬起时将操作区域的鼠标按下和抬起事件置为null 并初始化
          that.$refs.maskBox.onmousemove = null;
          that.$refs.maskBox.onmouseup = null;
        };
        if (e.preventDefault) {
          e.preventDefault();
        } else {
          return false;
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .home {
    width: 1000px;
    margin: 50px auto;
  }
  .btn-area {
    display: flex;
    justify-content: center;
    width: 100%;
    margin-bottom: 50px;
  }
  .btn-area button {
    width: 100px;
    height: 40px;
    font-size: 18px;
    margin-right: 10px;
  }
  .image-box {
    position: relative;
    margin: 0 auto;
    width: 1000px;
    height: 700px;
    border: 1px solid #333;
    overflow: hidden;
  }
  .image-box div {
    position: absolute;
    cursor: pointer;
    background: pink;
  }
  </style>
  
  