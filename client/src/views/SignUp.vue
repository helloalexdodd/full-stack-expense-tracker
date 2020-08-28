<template>
  <div>
    <h1 class="title has-text-centered is-size-1 mt-6">Sign Up</h1>
    <div class="box column is-half is-offset-one-quarter mt-6 px-6">
      <form @submit.prevent="handleSubmit" action="GET" class="my-5">
        <b-field
          label="Username"
          for="username"
          :type="usernameInvalid"
          :message="usernameValidation"
        >
          <b-input
            v-model="user.username"
            id="username"
            name="username"
            placeholder="Username"
            value="alexdodd"
          ></b-input>
        </b-field>
        <b-field label="Email" for="email" :type="emailInvalid" :message="emailValidation">
          <b-input
            v-model="user.email"
            native-type="email"
            id="email"
            name="email"
            placeholder="Email"
          ></b-input>
        </b-field>
        <b-field
          label="Password"
          for="password"
          :type="passwordInvalid"
          :message="passwordValidation"
        >
          <b-input
            v-model="user.password"
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            password-reveal
          ></b-input>
        </b-field>
        <div class="buttons is-centered">
          <b-button native-type="submit" class="is-success mt-5 mb-4 has-text-weight-bold">
            <!--  -->
            Sign Up
          </b-button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { registerUser } from '@/lib/API';

export default {
  name: 'SignUp',
  data: () => ({
    user: {
      username: 'alex',
      email: 'alex@alex.com',
      password: 'qwertyui2U@',
    },
    usernameInvalid: '',
    usernameValidation: '',
    passwordInvalid: '',
    passwordValidation: '',
    emailInvalid: '',
    emailValidation: '',
  }),
  methods: {
    async handleSubmit() {
      this.usernameInvalid = '';
      this.usernameValidation = '';
      this.passwordInvalid = '';
      this.passwordValidation = '';
      this.emailInvalid = '';
      this.emailValidation = '';

      const user = await registerUser(this.user);
      const error = user.message?.toLowerCase();
      console.log('error', error);
      if (error) {
        if (error.includes('username')) {
          this.usernameInvalid = 'is-danger';
          this.usernameValidation = user.message;
        }
        if (error.includes('email')) {
          this.emailInvalid = 'is-danger';
          this.emailValidation = user.message;
        }
        if (error.includes('password')) {
          this.passwordInvalid = 'is-danger';
          this.passwordValidation = user.message;
        }
      } else {
        this.$router.push({ name: 'Main' });
      }
    },
  },
};
</script>
