<template>
  <div class="container">
    <form @submit.prevent="onSubmit">
      <div class="flex-center">
        <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
          <div class="form-group">
            <label for="email">Email</label>
            <input class="form-control" type="email" id="email" v-model="email" required />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input class="form-control" type="password" id="password" v-model="password" required />
          </div>
          <div class="form-group">
            <label for="confirm-password">Confirm Password</label>
            <input
              class="form-control"
              type="password"
              id="confirm-password"
              v-model="confirmPassword"
              required
            />
          </div>
          <button class="btn btn-primary" type="submit">Submit</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      confirmPassword: ""
    };
  },
  methods: {
    onSubmit() {
      if (this.password === this.confirmPassword) {
        const formData = {
          email: this.email,
          password: this.password,
          confirmPassword: this.confirmPassword
        };
        this.$store.dispatch("signup", formData);
      } else {
        // TODO: show error msg
      }
    }
  }
};
</script>

<style scoped lang="scss">
</style>