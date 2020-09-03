<template>
  <section>
    <b-button @click="open = true" type="is-text" class="my-3 mx-3">
      <b-icon icon="menu" size="is-medium"></b-icon>
    </b-button>
    <b-sidebar
      type="is-light"
      :fullheight="fullheight"
      :fullwidth="fullwidth"
      :overlay="overlay"
      :right="right"
      v-model="open"
    >
      <div class="section">
        <b-menu>
          <b-menu-list>
            <li class="buttons is-centered mb-6">
              <template v-if="authenticated">
                <a @click="logOut" href="#" class="button is-link has-text-weight-bold">Log Out</a>
              </template>
              <template v-else>
                <router-link :to="'/signup'" class="button is-success has-text-weight-bold">Sign up</router-link>
                <router-link :to="'/login'" class="button is-link has-text-weight-bold">Log In</router-link>
              </template>
            </li>
            <p class="mb-4">Having an issue or have a suggestion?</p>
            <b-menu-item
              icon="email"
              label="Get In Touch"
              href="#mailgo"
              data-address="hello"
              data-domain="alexdodd.ca"
              data-subject="Hello! 🦖✨😃"
            ></b-menu-item>
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
      right: false,
    };
  },
  computed: {
    ...mapGetters({
      authenticated: 'auth/authenticated',
      transactions: 'transactions/transactions',
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
