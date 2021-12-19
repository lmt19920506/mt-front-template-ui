<template>
  <div class="box-container">
    <monaco-comp
      v-model="codePrivew"
      theme="vs-dark"
      language="html"
      :custom-style="{
        width: '100%',
        height: '80vh',
        border: '1px solid grey',
      }"
    ></monaco-comp>
  </div>
</template>

<script>
import monacoComp from "./monacoComp";
export default {
  components: {
    monacoComp,
  },
  data() {
    return {}
  }
};
</script>

<style></style>
