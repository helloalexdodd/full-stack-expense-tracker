<template>
  <div>
    <h1 class="title has-text-centered is-size-1 mt-6">Forgot Password</h1>
    <div class="box column is-half is-offset-one-quarter mt-6 px-6">
      <form @submit.prevent="handleSubmit" action="GET" class="my-5">
        <b-field label="Email" for="Email">
          <b-input v-model="email" id="email" name="email" placeholder="Email"></b-input>
        </b-field>
        <b-tag v-if="message" class="is-centered is-primary is-light">{{ message }}</b-tag>
        <div class="buttons is-centered">
          <b-button native-type="submit" class="is-success mt-5 mb-4 has-text-weight-bold">Search</b-button>
        </div>
        <div class="level">
          <div class="level-left">
            <router-link class="level-item" to="/signup">Sign Up</router-link>
          </div>
          <div class="level-right">
            <router-link class="level-item" to="/login">Log In</router-link>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data: () => ({
    email: '',
    message: '',
  }),
  methods: {
    ...mapActions({
      forgotPassword: 'auth/forgotPassword',
    }),
    async handleSubmit() {
      const data = await this.forgotPassword(this.email);
      this.message = data.message;
    },
  },
};
</script>
