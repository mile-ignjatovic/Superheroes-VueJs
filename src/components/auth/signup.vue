<template>
  <div class="container">
    <form @submit.prevent="onSubmit">
      <div class="flex-center">
        <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
          <div class="form-group">
            <label for="email">Email</label>
            <input class="form-control" type="email" id="email" v-model="email" />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input class="form-control" type="password" id="password" v-model="password" />
          </div>
          <div class="form-group">
            <label for="confirm-password">Confirm Password</label>
            <input
              class="form-control"
              type="password"
              id="confirm-password"
              v-model="confirmPassword"
            />
          </div>
          <div class="submit">
            <button class="btn btn-primary" type="submit">Submit</button>
          </div>
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
      const formData = {
        email: this.email,
        password: this.password,
        confirmPassword: this.confirmPassword
      };
    }
  }
};
</script>

<style scoped lang="scss">
.flex-center {
  display: flex;
  justify-content: center;
}
</style>