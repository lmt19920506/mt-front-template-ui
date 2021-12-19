<template>
  <div>
    <div id="box" :style="{ height: divHeight + 'px' }">
      <div id="left">
        1111111111
      </div>
      <div id="resize"></div>
      <div id="right">
        22222222222
      </div>
    </div>
  </div>
</template>

<script>
/*eslint-disable */
export default {
  data() {
    return {
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight,
      divHeight: window.innerHeight - 110,
    };
  },
  created() {
    this.divHeight = window.innerHeight - 110;
  },
  mounted() {
    this.dragControllerDiv();
    this.screenWidth = document.body.clientWidth;
    this.screenHeight = document.body.clientHeight;
    window.onresize = () => {
      return (() => {
        this.screenWidth = document.body.clientWidth;
        this.screenHeight = document.body.clientHeight;
      })();
    };
  },
  methods: {
    dragControllerDiv() {
      let resize = document.getElementById("resize");
      let left = document.getElementById("left");
      let right = document.getElementById("right");
      let box = document.getElementById("box");

      resize.onmousedown = function(e) {
        let startX = e.clientX;
        console.log('startX---', startX)
        resize.left = resize.offsetLeft;
        console.log('resize.left---', resize.left)
        document.onmousemove = function(e) {
          let endX = e.clientX;
          let moveLen = resize.left + (endX - startX);
          let maxT = box.clientWidth - resize.offsetWidth;
          if (moveLen < 100) moveLen = 100;
          //   if (moveLen > maxT - 800) moveLen = maxT - 800
          resize.style.left = moveLen;
          left.style.width = moveLen + "px";
          right.style.width = box.clientWidth - moveLen - 5 + "px";
        };
        document.onmouseup = function() {
          document.onmousemove = null;
          document.onmouseup = null;
          resize.releaseCapture && resize.releaseCapture();
        };
        resize.setCapture && resize.setCapture();
        return false;
      };
    },
  },
};
</script>

<style scoped>
.bigbox {
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
#box {
  flex: 1;
  width: 100%;
  height: 500px;
  position: relative;
  display: flex;
}

#left {
  width: calc(20% - 5px);
  height: 100%;
  overflow: auto;
  border: 1px solid red;
}

#resize {
  position: relative;
  width: 5px;
  height: 100%;
  cursor: w-resize;
}

#right {
  width: 80%;
  height: 100%;
  overflow: hidden;
}
.flex {
  display: flex;
  margin-bottom: 10px;
  align-items: center;
}
</style>

<style lang="scss" scoped></style>
