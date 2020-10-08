<template>
  <div>
    <h1 class="title has-text-centered is-size-1">Sign Up</h1>
    <div class="box column is-half is-offset-one-quarter mt-6 px-6">
      <form action="GET" class="my-5" @submit.prevent="handleSubmit">
        <b-field label="Username" for="username" :type="usernameInvalid" :message="usernameValidation">
          <b-input v-model="user.username" id="username" name="username" placeholder="Username" />
        </b-field>
        <b-field label="Email" for="email" :type="emailInvalid" :message="emailValidation">
          <b-input v-model="user.email" id="email" native-type="email" name="email" placeholder="Email" />
        </b-field>
        <b-field label="Password" for="password" :type="passwordInvalid" :message="passwordValidation">
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
import { mapActions } from 'vuex';

export default {
  name: 'SignUp',
  data: () => ({
    user: {
      username: '',
      email: '',
      password: '',
    },
    usernameInvalid: '',
    usernameValidation: '',
    passwordInvalid: '',
    passwordValidation: '',
    emailInvalid: '',
    emailValidation: '',
  }),
  computed: {
    ...mapGetters({
      usernameInvalid: 'transactions/usernameInvalid',
      usernameValidation: 'transactions/usernameValidation',
      emailInvalid: 'transactions/emailInvalid',
      emailValidation: 'transactions/emailValidation',
      passwordInvalid: 'transactions/passwordInvalid',
      passwordValidation: 'transactions/passwordValidation',
    }),
  },
  methods: {
    ...mapActions({
      registerUser: 'auth/registerUser',
    }),
    async handleSubmit() {
      this.usernameInvalid = '';
      this.usernameValidation = '';
      this.passwordInvalid = '';
      this.passwordValidation = '';
      this.emailInvalid = '';
      this.emailValidation = '';

      const { data } = await this.registerUser(this.user);

      const error = data.message;
      console.log(data);
      if (error) {
        if (error.includes('username')) {
          this.usernameInvalid = 'is-danger';
          this.usernameValidation = error;
        }
        if (error.includes('email')) {
          this.emailInvalid = 'is-danger';
          this.emailValidation = error;
        }
        if (error.includes('password')) {
          this.passwordInvalid = 'is-danger';
          this.passwordValidation = error;
        }
      } else {
        this.$router.push('/');
      }
    },
  },
};
</script>
