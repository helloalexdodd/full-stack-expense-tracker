<template>
  <div>
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
  components: {
    TheSidebar,
    Footer,
  },
};
</script>
