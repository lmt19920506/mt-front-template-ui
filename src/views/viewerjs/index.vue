<template>
  <div class="box-container">
    <show-picture :pictureDatas="pictureDatas"></show-picture>
  </div>
</template>

<script>
import showPicture from './showPicture';
export default {
  components: {
    showPicture
  },
  // props: {
  //   pictureList: {
  //     type: Array,
  //     default: function() {
  //       return [];
  //     }
  //   }
  // },
  data() {
    return {
      pictureDatas: [
        { name: 'a', url: require('../../assets/house/1.jpg') },
        { name: 'b', url: require('../../assets/house/2.jpg') },
        { name: 'c', url: require('../../assets/house/3.jpg') },
        { name: 'd', url: require('../../assets/house/4.jpg') },
        { name: 'e', url: require('../../assets/house/5.jpg') },
        { name: 'g', url: require('../../assets/house/6.jpg') },
        { name: 'h', url: require('../../assets/house/7.jpg') },
        { name: 'i', url: require('../../assets/house/8.jpg') },
        { name: 'j', url: require('../../assets/house/9.jpg') },
        { name: 'k', url: require('../../assets/house/10.jpg') },
        { name: 'l', url: require('../../assets/house/11.jpg') },
        { name: 'm', url: require('../../assets/house/12.jpg') },
        { name: 'n', url: require('../../assets/house/13.jpg') },
        { name: 'o', url: require('../../assets/house/14.jpg') },
        { name: 'p', url: require('../../assets/house/15.jpg') },
        { name: 'q', url: require('../../assets/house/16.jpg') },
        { name: 'r', url: require('../../assets/house/17.jpg') },
        { name: 'a', url: require('../../assets/house/1.jpg') },
        { name: 'b', url: require('../../assets/house/2.jpg') },
        { name: 'c', url: require('../../assets/house/3.jpg') },
        { name: 'd', url: require('../../assets/house/4.jpg') },
        { name: 'e', url: require('../../assets/house/5.jpg') },
        { name: 'g', url: require('../../assets/house/6.jpg') },
        { name: 'h', url: require('../../assets/house/7.jpg') },
        { name: 'i', url: require('../../assets/house/8.jpg') },
        { name: 'j', url: require('../../assets/house/9.jpg') },
        { name: 'k', url: require('../../assets/house/10.jpg') },
        { name: 'l', url: require('../../assets/house/11.jpg') },
        { name: 'm', url: require('../../assets/house/12.jpg') },
        { name: 'n', url: require('../../assets/house/13.jpg') },
        { name: 'o', url: require('../../assets/house/14.jpg') },
        { name: 'p', url: require('../../assets/house/15.jpg') },
        { name: 'q', url: require('../../assets/house/16.jpg') },
        { name: 'r', url: require('../../assets/house/17.jpg') }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
  overflow-y: auto;
}
</style>
