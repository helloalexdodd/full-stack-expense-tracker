<template>
  <section>
    <b-button @click="open = true" class="mx-3 my-3 is-pulled-right" type="is-text">
      <b-icon icon="account-details" size="is-medium"></b-icon>
    </b-button>
    <b-sidebar
      type="is-light"
      :fullheight="fullheight"
      :fullwidth="fullwidth"
      :overlay="overlay"
      :right="right"
      v-model="open"
    >
      <div class="p-1">
        <b-menu>
          <b-menu-list>
            <div class="buttons">
              <template v-if="authenticated">
                <a @click="logOut" href="#" class="button is-light has-text-weight-bold">Log Out</a>
              </template>
              <template v-else>
                <router-link :to="'/signup'" class="button is-success has-text-weight-bold">Sign up</router-link>
                <router-link :to="'/login'" class="button is-light has-text-weight-bold">Log In</router-link>
              </template>
            </div>
          </b-menu-list>
        </b-menu>
      </div>
    </b-sidebar>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Sidebar',
  data() {
    return {
      open: false,
      overlay: false,
      fullheight: true,
      fullwidth: false,
      right: true,
    };
  },
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

<style>
.p-1 {
  padding: 1em;
}
</style>
