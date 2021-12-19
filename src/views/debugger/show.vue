<template>
  <div>
    <mt-btn type="danger" @click="goto">btn</mt-btn>
    <!-- <router-view></router-view> -->
  </div>
</template>

<script>
export default {
  methods: {
    goto() {
      this.$router.push('/debugger/btn')
    }
  }
}
</script>

<style>

</style>