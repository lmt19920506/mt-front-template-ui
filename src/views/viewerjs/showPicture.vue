<template>
  <div id="picture">
    <section
      v-for="(item, index) in pictureDatas"
      :key="index"
      class="pictureBox"
    >
      <img
        width="220px"
        height="180px"
        :key="index"
        :data-original="item.url"
        :src="item.url"
        :alt="item.name"
      />
    </section>
  </div>
</template>

<script>
import "viewerjs/dist/viewer.css";
import Viewer from "viewerjs";
export default {
  props: {
    pictureDatas: {
      type: Array,
      default: function() {
        return [];
      },
    },
  },
  data() {
    return {
      viewer: null,
    };
  },
  mounted() {
    let _self = this;
    this.$nextTick(() => {
      if (this.viewer) this.viewer.destroy();
      setTimeout(() => {
        _self.viewer = new Viewer(document.getElementById("picture"), {
          url: "data-original",
          fullscreen: false,
          interval: 3000,
        });
      }, 200);
    });
  },
};
</script>

<style lang="scss" scoped>
#picture {
}
.pictureBox {
  float: left;
  margin-left: 10px;
}
</style>
