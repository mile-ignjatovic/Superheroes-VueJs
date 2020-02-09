<template>
  <div id="welcome">
    <h1>Welcome to the Superheroes app!</h1>
    <p>If you want to browse the Superheroes you should sign in or sign up first!</p>
    <div class="cta">
      <router-link class="btn btn-primary" tag="button" to="/signup">Sign Up</router-link>
      <router-link class="btn btn-primary" tag="button" to="/signin">Sign In</router-link>
    </div>
  </div>
</template>

<style scoped lang="scss">
#welcome {
  width: 80%;
  margin: auto;

  > h1 {
    text-align: center;
  }

  > p {
    text-align: center;
  }

  > .cta {
    width: 300px;
    margin: auto;
    text-align: center;

    > button {
      margin: 1rem;
    }
  }
}
</style>