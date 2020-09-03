<template>
  <div>
    <h1 class="title has-text-centered is-size-1 mt-6">Log In</h1>
    <div class="box column is-half is-offset-one-quarter mt-6 px-6">
      <form @submit.prevent="handleSubmit" action="GET" class="my-5">
        <b-field label="Username" for="username" :type="usernameValidation">
          <b-input v-model="user.username" id="username" name="username" placeholder="Username"></b-input>
        </b-field>
        <b-field label="Password" for="password" :type="passwordValidation" :message="passwordMessage">
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
          <b-button native-type="submit" class="is-success mt-5 mb-4 has-text-weight-bold">Log In</b-button>
        </div>
        <div class="level">
          <div class="level-left">
            <router-link class="level-item" to="/signup">Sign Up</router-link>
          </div>
          <div class="level-right">
            <router-link class="level-item" to="/forgotpassword">Forgot Password</router-link>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'LogIn',
  data: () => ({
    user: {
      username: 'qwerty',
      password: 'qwertY7&',
    },
    usernameValidation: '',
    passwordValidation: '',
    passwordMessage: '',
  }),
  methods: {
    ...mapActions({
      signIn: 'auth/signIn',
    }),
    async handleSubmit() {
      const { data } = await this.signIn(this.user);
      if (data) {
        this.usernameValidation = 'is-danger';
        this.passwordValidation = 'is-danger';
        this.passwordMessage = data.message;
      } else {
        this.$router.push('/');
      }
    },
  },
};
</script>
