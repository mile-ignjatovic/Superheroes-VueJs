<template>
  <div id="welcome">
    <h1>Welcome to the Superheroes app!</h1>
    <p>If you want to browse the Superheroes you should sign in or sign up first!</p>
    <div class="cta">
      <router-link class="btn btn-primary" tag="button" to="/signup">Sign Up</router-link>
      <router-link class="btn btn-primary" tag="button" to="/signin">Sign In</router-link>
    </div>
    <div class="mt-4 center">
      <h3>Specifications for this app</h3>
      <pre>
 Develop a simple website that lists superheroes from an API.
 (Register for free API access here https://superheroapi.com/index.html)
 • Use Vue js to build the website (VueCLI, NUXT.js) or similar
 • You can use any framework (Bootstrap, Bulma etc.) for your components
 Features
 • Implement a login function to the site. Use Firebase
 or similar for authentication
 • Implement a search function for logged in users to
 search through the superheroes
 Bonus
 • Implement a filter on the site where logged in users can filter through
 the superheroes using the powersats provided by the API
 (speed, power, strength etc.)
 Example: A slider which filters superheroes by their power.
      </pre>
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

.center {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>