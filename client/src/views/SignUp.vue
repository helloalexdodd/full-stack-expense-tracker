<template>
  <div>
    <h2 class="title has-text-centered is-size-5">A simple daily income and expense tracker</h2>
    <div class="box column is-half is-offset-one-quarter mt-6 px-6">
      <h3 class="title has-text-centered is-size-3 my-5">Sign Up</h3>
      <form action="GET" class="my-5" @submit.prevent="handleSubmit">
        <b-field label="Username" for="username" :message="usernameValidation" :type="usernameInvalid">
          <b-input v-model="user.username" id="username" name="username" placeholder="Username" />
        </b-field>
        <b-field label="Email" for="email" :message="emailValidation" :type="emailInvalid">
          <b-input v-model="user.email" id="email" type="email" name="email" placeholder="Email" />
        </b-field>
        <b-field label="Password" for="password" :message="passwordValidation" :type="passwordInvalid">
          <b-input
            v-model="user.password"
            id="password"
            type="password"
            name="password"
            placeholder="Password"
            password-reveal
          />
        </b-field>
        <div class="buttons is-centered">
          <b-button native-type="submit" :loading="loading" class="is-success mt-5 mb-4 has-text-weight-bold"
            >Sign Up</b-button
          >
        </div>
        <div class="level is-mobile">
          <div class="level-left">
            <router-link to="/login">Log In</router-link>
          </div>
          <div class="level-right">
            <router-link to="/forgotpassword">Forgot Password</router-link>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'SignUp',
  title: 'Boomerang Tracker | Sign Up',
  data: () => ({
    user: {
      username: '',
      email: '',
      password: '',
    },
    loading: false,
  }),
  computed: {
    ...mapGetters({
      usernameInvalid: 'auth/usernameInvalid',
      usernameValidation: 'auth/usernameValidation',
      passwordInvalid: 'auth/passwordInvalid',
      passwordValidation: 'auth/passwordValidation',
      emailInvalid: 'auth/emailInvalid',
      emailValidation: 'auth/emailValidation',
    }),
  },
  methods: {
    ...mapActions({
      registerUser: 'auth/registerUser',
    }),
    async handleSubmit() {
      this.loading = true;
      const { message } = await this.registerUser(this.user);
      this.loading = false;
      if (!message) this.$router.push('/');
    },
  },
};
</script>
