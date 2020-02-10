<template>
  <div class="container mt-4">
    <form @submit.prevent="onSubmit">
      <div class="flex-center">
        <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
          <div class="form-group">
            <label for="email">Email</label>
            <input
              :class="{invalid: $v.email.$error}"
              @blur="$v.email.$touch()"
              class="form-control"
              type="email"
              id="email"
              v-model="email"
            />
            <p
              v-if="!$v.email.required && $v.email.$dirty"
              class="invalid-message"
            >This field is required!</p>
            <p
              v-if="!$v.email.email && $v.email.$dirty"
              class="invalid-message"
            >This field Has to be an email!</p>
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input
              :class="{invalid: $v.password.$error}"
              @blur="$v.password.$touch()"
              class="form-control"
              type="password"
              id="password"
              v-model="password"
            />
            <p
              v-if="!$v.password.required && $v.password.$dirty"
              class="invalid-message"
            >This field is required!</p>
            <p
              v-if="!$v.password.minLength && $v.password.$dirty"
              class="invalid-message"
            >This field Has to be at least 6 characters long!</p>
          </div>
          <div class="form-group">
            <label for="confirm-password">Confirm Password</label>
            <input
              @blur="$v.confirmPassword.$touch()"
              :class="{invalid: $v.confirmPassword.$error}"
              class="form-control"
              type="password"
              id="confirm-password"
              v-model="confirmPassword"
            />
          </div>
          <p
            v-if="!$v.confirmPassword.required && $v.confirmPassword.$dirty"
            class="invalid-message"
          >This field is required!</p>
          <p
            v-if="!$v.confirmPassword.sameAs && $v.confirmPassword.$dirty"
            class="invalid-message"
          >This field must be same as password field!</p>
          <button :disabled="$v.$invalid" class="btn btn-primary" type="submit">Submit</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { required, email, minLength, sameAs } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      email: "",
      password: "",
      confirmPassword: ""
    };
  },
  validations: {
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(6)
    },
    confirmPassword: {
      required,
      sameAs: sameAs(vm => {
        return vm.password;
      })
    }
  },
  methods: {
    onSubmit() {
      const formData = {
        email: this.email,
        password: this.password,
        confirmPassword: this.confirmPassword
      };
      this.$store.dispatch("signup", formData);
    }
  }
};
</script>

<style scoped lang="scss">
</style>