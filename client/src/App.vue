<template>
  <div class="body">
    <the-sidebar />
    <h1 class="title has-text-centered is-size-1"><img src="../public/favicon-32x32.png" /> Expense Tracker</h1>
    <router-view />
    <Footer />
  </div>
</template>

<script>
import TheSidebar from '@/components/TheSidebar.vue';
import Footer from '@/components/Footer.vue';

export default {
  name: 'App',
  title: 'Expense Tracker',
  components: {
    TheSidebar,
    Footer,
  },
};
</script>
<style>
.body {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  min-height: 100vh;
}
img {
  margin-right: 10px;
}
</style>
