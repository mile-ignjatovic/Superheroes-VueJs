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
      password: ""
    };
  },
  methods: {
    onSubmit() {
      const formData = {
        email: this.email,
        password: this.password
      };
      this.$store.dispatch("login", {
        email: formData.email,
        password: formData.password
      });
    }
  }
};
</script>

<style scoped>
</style>