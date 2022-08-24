<template>
  <div class="home">
    <home-layout></home-layout>
  </div>
</template>

<script>
import HomeLayout from '@/components/home/HomeLayout.vue'

export default {
  name: 'Home',
  components: {
   'home-layout': HomeLayout
  },
};
</script>

<style lang="scss" scoped>
  .home {
    height: 100%;
  }
</style>
