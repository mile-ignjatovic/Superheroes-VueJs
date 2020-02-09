<template>
  <div id="welcome">
    <h1>Welcome to the Superheroes app!</h1>
    <p>If you want to browse the Superheroes you should sign in or sign up first!</p>
    <div class="cta">
      <router-link to="/signup">Sign Up</router-link>
      <router-link to="/signin">Sign In</router-link>
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

    > a {
      margin: 10px;
      text-decoration: none;
      display: inline-block;
      border: 1px solid #007bff;
      border-radius: 3px;
      width: 100px;
      padding: 10px;
      box-sizing: border-box;
      color: #007bff;

      &:hover {
        background-color: #007bff;
        color: white;
      }
      &:active {
        background-color: #007bff;
        color: white;
      }
    }
  }
}
</style>