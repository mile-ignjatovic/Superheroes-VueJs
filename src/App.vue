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
.invalid {
  border-color: #dc3545;
  box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);
  &-message {
    color: #dc3545;
  }
}
button:disabled {
  cursor: not-allowed;
}
</style>
