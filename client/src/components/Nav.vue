<template>
  <b-navbar class="is-dark">
    <template slot="brand">
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <p class="has-text-light is-size-4 has-text-weight-bold px-2">Expense Tracker</p>
      </b-navbar-item>
    </template>

    <template slot="end">
      <b-navbar-item tag="div">
        <div class="buttons">
          <b-navbar-item
            tag="router-link"
            :to="{ path: '/signup' }"
            class="button is-success has-text-weight-bold"
          >
            Sign up
          </b-navbar-item>
          <b-navbar-item
            tag="router-link"
            :to="{ path: '/login' }"
            class="button is-light has-text-weight-bold"
          >
            Log in
          </b-navbar-item>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
export default {
  name: 'Nav',
};
</script>
