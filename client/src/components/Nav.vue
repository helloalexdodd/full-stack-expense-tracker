<template>
  <b-navbar type="is-dark">
    <template slot="brand">
      <!-- <b-navbar-item tag="router-link" :to="{ path: '/' }"> -->
      <p class="has-text-light is-size-3 has-text-weight-bold">Expense Tracker</p>
      <!-- </b-navbar-item> -->
    </template>

    <template slot="end">
      <b-navbar-item tag="div">
        <div class="buttons">
          <a class="button is-success">
            <strong>Sign up</strong>
          </a>
          <a class="button is-light">
            Log in
          </a>
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
