<template>
  <div>
    <the-sidebar />
    <router-view />
  </div>
</template>

<script>
import TheSidebar from '@/components/TheSidebar.vue';

export default {
  name: 'App',
  components: {
    TheSidebar,
  },
};
</script>
