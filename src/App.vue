<template>
  <div id="app">
    <sp-header />
    <router-view />
  </div>
</template>

<script>
import Header from "./components/header/header.vue";
export default {
  name: "app",
  components: {
    spHeader: Header
  },
  created() {
    this.$store.dispatch("tryAutoLogin");
  }
};
</script>

<style lang="scss">
body,
html {
  margin: 0;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
}
.flex-center {
  display: flex;
  justify-content: center;
}
</style>
