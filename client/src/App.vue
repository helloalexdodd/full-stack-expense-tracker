<template>
  <div class="body">
    <the-sidebar />
    <h1 class="title has-text-centered is-size-1 mb-3 is-family-monospace">
      <img src="../public/favicon-32x32.png" class="mr-4" />Boomerang Tracker
    </h1>
    <router-view />
    <Footer />
  </div>
</template>

<script>
import TheSidebar from '@/components/TheSidebar.vue';
import Footer from '@/components/Footer.vue';

export default {
  name: 'App',
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
