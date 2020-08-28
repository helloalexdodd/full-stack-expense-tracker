<template>
  <div>
    <h1 class="title has-text-centered is-size-1 mt-6">Log In</h1>
    <div class="box column is-half is-offset-one-quarter mt-6 px-6">
      <form @submit.prevent="handleSubmit" action="GET" class="my-5">
        <b-field label="Username" for="username">
          <b-input id="username" name="username" placeholder="Username"></b-input>
        </b-field>
        <b-field label="Password" for="password">
          <b-input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            password-reveal
          ></b-input>
        </b-field>
        <div class="buttons is-centered">
          <b-button native-type="submit" class="is-success mt-5 mb-4 has-text-weight-bold"
            >Log In</b-button
          >
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LogIn',
  methods: {
    handleSubmit() {
      console.log('submitted');
    },
  },
};
</script>
