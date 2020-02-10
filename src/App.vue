<template>
  <div id="app">
    <div class="image-div"></div>
    <app-header />
    <app-alert v-if="connectionFailed" :message="'Connection failed!'" :type="'danger'" />
    <router-view />
  </div>
</template>

<script>
import Header from "./components/header/header.vue";
import Alert from "./components/shared/alert/Alert.vue";
export default {
  name: "app",
  components: {
    appHeader: Header,
    appAlert: Alert
  },
  computed: {
    connectionFailed() {
      return this.$store.getters.connectionFailed;
    }
  },
  methods: {
    hideWarning() {
      this.$store.dispatch("hideConnectionFailed");
    }
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
.image-div {
  background: -moz-radial-gradient(
      circle,
      rgba(254, 255, 255, 1) 70%,
      transparent 95%,
      transparent 100%
    ),
    url("./assets/Justice_League_of_America_Vol_2_1_Full.jpg") no-repeat;
  background: -webkit-radial-gradient(
      circle,
      rgba(254, 255, 255, 1) 60%,
      transparent 95%,
      transparent 100%
    ),
    url("./assets/Justice_League_of_America_Vol_2_1_Full.jpg") no-repeat;
  background: -webkit-radial-gradient(
      circle,
      rgba(254, 255, 255, 1) 60%,
      transparent 95%,
      transparent 100%
    ),
    url("./assets/Justice_League_of_America_Vol_2_1_Full.jpg") no-repeat;
  background: -o-radial-gradient(
      circle,
      rgba(254, 255, 255, 1) 60%,
      transparent 95%,
      transparent 100%
    ),
    url("./assets/Justice_League_of_America_Vol_2_1_Full.jpg") no-repeat;
  background: -ms-radial-gradient(
      circle,
      rgba(254, 255, 255, 1) 60%,
      transparent 95%,
      transparent 100%
    ),
    url("./assets/Justice_League_of_America_Vol_2_1_Full.jpg") no-repeat;
  background: radial-gradient(
      circle,
      rgba(254, 255, 255, 1) 60%,
      transparent 95%,
      transparent 100%
    ),
    url("./assets/Justice_League_of_America_Vol_2_1_Full.jpg") no-repeat;

  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -10;

  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
</style>
