<template>
  <div>
    <h1 class="title has-text-centered is-size-1">Sign Up</h1>
    <div class="box column is-half is-offset-one-quarter mt-6 px-6">
      <form action="GET" class="my-5" @submit.prevent="handleSubmit">
        <b-field label="Username" for="username" :message="usernameValidation" :type="usernameInvalid">
          <b-input v-model="user.username" id="username" name="username" placeholder="Username" />
        </b-field>
        <b-field label="Email" for="email" :message="emailValidation" :type="emailInvalid">
          <b-input v-model="user.email" id="email" native-type="email" name="email" placeholder="Email" />
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
          <b-button native-type="submit" class="is-success mt-5 mb-4 has-text-weight-bold">Sign Up</b-button>
        </div>
        <div class="level">
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
  data: () => ({
    user: {
      username: '',
      email: '',
      password: '',
    },
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
      const { message } = await this.registerUser(this.user);
      if (!message) this.$router.push('/');
    },
  },
};
</script>
