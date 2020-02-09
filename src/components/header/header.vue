<template>
  <header class="mb-4">
    <nav class="navbar navbar-dark bg-primary">
      <router-link class="logo" to="/">Superheroes</router-link>
      <div v-if="!auth">
        <router-link class="btn btn-light" tag="button" to="/signup">Sign Up</router-link>
        <router-link class="btn btn-light" tag="button" to="/signin">Sign In</router-link>
      </div>
      <div v-if="auth">
        <router-link class="btn btn-light" tag="button" to="/dashboard">Dashboard</router-link>
        <button class="btn btn-light" @click="onLogout">Logout</button>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  data() {
    return {
      auth: false
    };
  }
};
</script>

<style scoped lang="scss">
.flex-left {
  display: flex;
}
.logo {
  color: white;
  text-decoration: none;
  font-size: 2rem;
  font-weight: 600;
}

div > button {
  margin-right: 1rem;
}
</style>