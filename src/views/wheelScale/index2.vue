<template>
    <div class="drag">
        <div class="back_box" ref="back_box">这是一个背景<div class="drag_box" draggable="true" @dragstart="dragstart"
                @dragend="dragend" @wheel="handleWeel"
                :style="`left:${elLeft}px;top:${elTop}px;width:${elWidth}px;height:${elHeight}px;`">
                <div class="text"
                    :style="`left: ${(0 * elWidth) / 100}px; top:${(25 * elHeight) / 100}px; -webkit-transform: scale(${meter_zoom} )`">
                    滚这里</div>
            </div>
        </div>
    </div>
</template>
<script>
export default ({
    name: "HelloWorld", props: { msg: String, },
    data() {
        return {
            initWidth: 720, // 父元素的宽-自适应值
            initHeight: 1080, // 父元素的高-自适应值
            startclientX: 0, // 元素拖拽前距离浏览器的X轴位置
            startclientY: 0, //元素拖拽前距离浏览器的Y轴位置
            elLeft: 0, // 元素的左偏移量
            elTop: 0, // 元素的右偏移量
            zoom: 1, // 缩放比例
            elWidth: 0, // 元素宽
            elHeight: 0, // 元素高
            meter_zoom: 0, // 子元素缩放比例};},,
        };
    },
    methods: {
        // 页面初始化
        initBodySize() {
            this.initWidth = this.$refs.back_box.clientWidth;
            console.log('initWidth---', this.initWidth)
            // 拿到父元素宽
            // 
            // this.initHeight = this.initWidth * (1080 / 1920);
            this.initHeight = this.initWidth * ((1080 * 0.88) / (1920 - 1080 * 0.02)); // 根据宽计算高实现自适应
            this.elWidth = this.initWidth * (100 / (1920 / 2));
            this.elHeight = this.initHeight * (100 / (1080 / 2));
            this.meter_zoom = this.elWidth / 100; // 计算子元素缩放比例},
        },
        // 拖拽开始事件
        dragstart(e) {
            console.log(e);
            this.startclientX = e.clientX; // 记录拖拽元素初始位置
            this.startclientY = e.clientY;
        },
        // 拖拽完成事件
        dragend(e) {
            console.log(e);
            let x = e.clientX - this.startclientX; // 计算偏移量
            let y = e.clientY - this.startclientY; this.elLeft += x;
            // 实现拖拽元素随偏移量移动
            this.elTop += y;
        },
        handleWeel(e) {
            console.log(e);
            if (e.wheelDelta < 0) {
                this.zoom -= 0.5;
            } else {
                this.zoom += 0.5;
            }
            if (this.zoom >= 3) {
                // this.zoom = 3;
                // return;
            }
            if (this.zoom <= 0.5) {
                this.zoom = 0.5;
                return;
            }
            this.elWidth = this.initWidth * (100 / (1920 / 2)) * this.zoom;
            this.elHeight = this.initHeight * (100 / (1080 / 2)) * this.zoom; this.meter_zoom = this.elWidth / 100;
        },
        // 滚轮放大缩小事件
    },
    mounted() {
        // console.log(this.$el);
        this.initBodySize();
    }
})
</script>
<style scoped>
.back_box {
    background: pink;
    width: 600px;
    height: 500px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -30%);
}

.drag_box {
    width: 100px;
    height: 100px;
    background: skyblue;
    position: absolute;
    z-index: 10;
    user-select: none;
    /* 不可选中,为了拖拽时不让文字高亮 */
}

.text {
    position: absolute;
    width: 100px;
    height: 100px;
    transform-origin: 0 0;
    /* 用作缩放基点 */
    font-size: 16px;
}
</style>

