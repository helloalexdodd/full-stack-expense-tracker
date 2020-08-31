<template>
  <b-navbar class="is-dark">
    <template slot="brand">
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <p class="has-text-light is-size-1 has-text-weight-bold px-2">🧾</p>
      </b-navbar-item>
    </template>
    <template slot="end">
      <b-navbar-item tag="div">
        <div class="buttons">
          <template v-if="authenticated">
            <a @click="logOut" href="#" class="button is-light has-text-weight-bold">Log Out</a>
          </template>
          <template v-else>
            <router-link :to="'/signup'" class="button is-success has-text-weight-bold">Sign up</router-link>
            <router-link :to="'/login'" class="button is-light has-text-weight-bold">Log In</router-link>
          </template>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Nav',
  computed: {
    ...mapGetters({
      authenticated: 'auth/authenticated',
    }),
  },
  methods: {
    ...mapActions({
      signOut: 'auth/signOut',
    }),
    async logOut() {
      await this.signOut();
      this.$router.push('/login');
    },
  },
};
</script>
