<template>
  <div>
    <editor v-model="yourContent" @editorClick="editorClick"></editor>
  </div>
</template>

<script>
import Editor from "./imcoder-tinymce";
export default {
  components: { Editor },
  data() {
    return {
      yourContent: ''
    }
  },
  methods: {
    editorClick(data) {
      console.log('editorClick---', data)
    }
  }
};
</script>

<style></style>
