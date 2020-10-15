<template>
  <div>
    <div class="box column is-half is-offset-one-quarter mt-6 px-6">
      <h2 class="title has-text-centered is-size-3 my-5">Forgot Password</h2>
      <form action="GET" class="my-5" @submit.prevent="handleSubmit">
        <b-field label="Email" for="Email">
          <b-input id="email" v-model="email" name="email" placeholder="Email" />
        </b-field>
        <b-tag v-if="message" class="is-centered is-primary is-light">
          {{ message }}
        </b-tag>
        <div class="buttons is-centered">
          <b-button native-type="submit" :loading="loading" class="is-success mt-5 mb-4 has-text-weight-bold"
            >Search</b-button
          >
        </div>
        <div class="level is-mobile">
          <div class="level-left">
            <router-link to="/signup"> Sign Up </router-link>
          </div>
          <div class="level-right">
            <router-link to="/login"> Log In </router-link>
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
    loading: false,
  }),
  methods: {
    ...mapActions({
      forgotPassword: 'auth/forgotPassword',
    }),
    async handleSubmit() {
      this.message = '';
      this.loading = true;
      const data = await this.forgotPassword(this.email);
      this.loading = false;
      this.message = data.message;
    },
  },
};
</script>
