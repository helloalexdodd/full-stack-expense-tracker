<template>
  <div>
    <h1 class="title has-text-centered is-size-1">Log In</h1>
    <div class="box column is-half is-offset-one-quarter mt-6 px-6">
      <form action="GET" class="my-5" @submit.prevent="handleSubmit">
        <b-field label="Username" for="username" :type="usernameValidation">
          <b-input v-model="user.username" id="username" name="username" placeholder="Username" />
        </b-field>
        <b-field label="Password" for="password" :type="passwordValidation" :message="passwordMessage">
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
          <b-button
            tag="input"
            native-type="submit"
            value="Submit input"
            :loading="loading"
            class="is-success mt-5 mb-4 has-text-weight-bold"
          >
            Log In
          </b-button>
        </div>
        <div class="level is-mobile">
          <div class="level-left">
            <router-link class="level-item" to="/signup"> Sign Up </router-link>
          </div>
          <div class="level-right">
            <router-link class="level-item" to="/forgotpassword"> Forgot Password </router-link>
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
      username: '',
      password: '',
    },
    usernameValidation: '',
    passwordValidation: '',
    passwordMessage: '',
    loading: false,
  }),
  methods: {
    ...mapActions({
      signIn: 'auth/signIn',
    }),
    async handleSubmit() {
      this.loading = true;
      const { data } = await this.signIn(this.user);
      this.loading = false;
      if (data) {
        this.usernameValidation = 'is-danger';
        this.passwordValidation = 'is-danger';
        this.passwordMessage = data;
      } else {
        this.$router.push('/');
      }
    },
  },
};
</script>
