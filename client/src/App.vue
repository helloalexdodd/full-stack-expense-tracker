<template>
  <div class="body">
    <the-sidebar />
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
</style>
