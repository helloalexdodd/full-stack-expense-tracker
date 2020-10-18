<template>
  <div>
    <h2 class="title has-text-centered is-size-5">A simple daily income and expense tracker</h2>
    <div class="box column is-half is-offset-one-quarter mt-6 px-6">
      <h3 class="title has-text-centered is-size-3 my-5">Reset Password</h3>
      <form v-if="approved === 'approved'" action="POST" class="my-5" @submit.prevent="handleSubmit">
        <b-field label="New Password" for="password" :type="passwordInvalid">
          <b-input
            id="password"
            v-model="newPassword"
            type="password"
            name="password"
            placeholder="Password"
            password-reveal
          />
        </b-field>
        <b-field label="Confirm Password" for="confirm-password" :type="passwordInvalid" :message="passwordValidation">
          <b-input
            id="confirm-password"
            v-model="confirmPassword"
            type="password"
            name="confirm-password"
            placeholder="Confirm Password"
            password-reveal
          />
        </b-field>
        <b-tag v-if="message" class="is-centered is-primary is-light">
          {{ message }}
        </b-tag>
        <div class="buttons is-centered">
          <b-button native-type="submit" :loading="loading" class="is-success mt-5 mb-4 has-text-weight-bold">
            Change Password
          </b-button>
        </div>
      </form>
      <div v-if="approved === 'expired'" class="py-6">
        <h2 class="is-size-4 has-text-centered">Sorry, this link is no longer valid.</h2>
        <div class="level mt-6">
          <div class="level-left">
            <router-link to="/login"> Log In </router-link>
          </div>
          <div class="level-right">
            <router-link to="/forgotpassword"> Forgot Password </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'SignUp',
  title: 'Boomerang Tracker | Password Reset',
  data: () => ({
    newPassword: '',
    confirmPassword: '',
    passwordInvalid: '',
    passwordValidation: '',
    message: '',
    approved: null,
    loading: false,
  }),
  async mounted() {
    this.loading = true;
    const { data } = await this.$store.dispatch('auth/approveResetPassword', this.$route.query.token);
    this.loading = false;
    this.approved = data.message;
  },
  methods: {
    ...mapActions({
      resetPassword: 'auth/resetPassword',
    }),
    async handleSubmit() {
      this.passwordInvalid = '';
      this.passwordValidation = '';
      const match = this.newPassword === this.confirmPassword;

      if (!match) {
        this.passwordInvalid = 'is-danger';
        this.passwordValidation = 'Passwords must match';
        return;
      }

      const { data } = await this.resetPassword({
        token: this.$route.query.token,
        password: this.newPassword,
      });

      if (data.details) {
        const error = data?.details[0].message;
        this.passwordInvalid = 'is-danger';
        this.passwordValidation = error;
      } else {
        this.passwordInvalid = 'is-success';
        this.passwordValidation = data.message;
        setTimeout(() => {
          this.$router.push('/login');
        }, 3000);
      }
    },
  },
};
</script>
