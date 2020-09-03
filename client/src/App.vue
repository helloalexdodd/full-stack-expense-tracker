<template>
  <div>
    <Sidebar />
    <router-view />
  </div>
</template>

<script>
import Sidebar from '@/views/Sidebar.vue';

export default {
  name: 'App',
  components: {
    Sidebar,
  },
};
</script>
