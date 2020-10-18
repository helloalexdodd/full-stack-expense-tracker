<template>
  <div>
    <b-button type="is-text" class="my-3 mx-3" @click="open = true">
      <b-icon icon="menu" size="is-medium" />
    </b-button>
    <b-sidebar
      v-model="open"
      type="is-light"
      :fullheight="fullheight"
      :fullwidth="fullwidth"
      :overlay="overlay"
      :right="right"
      :can-cancel="canCancel"
    >
      <div class="section">
        <b-menu>
          <b-menu-list>
            <li class="buttons is-centered mb-6">
              <template v-if="authenticated">
                <a href="#" class="button is-link has-text-weight-bold" @click="logOut">Log Out</a>
              </template>
              <template v-else>
                <router-link :to="'/signup'" class="button is-success has-text-weight-bold"> Sign up </router-link>
                <router-link :to="'/login'" class="button is-link has-text-weight-bold"> Log In </router-link>
              </template>
            </li>
            <p class="mb-4">Having an issue or have a suggestion?</p>
            <b-menu-item
              icon="email"
              label="Get In Touch"
              href="mailto:hello@alexdodd.ca"
              data-subject="Hello! 🦖✨😃"
            />
            <b-menu-item
              icon="ladybug"
              label="Report a bug"
              href="https://github.com/helloalexdodd/full-stack-expense-tracker/issues/new"
              target="_blank"
              rel="noopener noreferrer"
            />
          </b-menu-list>
        </b-menu>
      </div>
    </b-sidebar>
  </div>
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
      canCancel: ['escape', 'outside'],
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
