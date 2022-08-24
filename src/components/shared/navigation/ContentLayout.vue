<template>
  <div class="content" :style="{ 'padding-left': collapse ? '30px' : '200px', transition: 'all .3s ease-out' }">
    <dashboard-content-header
        :toggleSidebar="toggleSidebar"
        :collapse="collapse"
        :sidebarWidth="sidebarWidth"
    >
    </dashboard-content-header>
    <dashboard-content-body :collapse="collapse"></dashboard-content-body>
  </div>
</template>

<script>
// @ is an alias to /src
import DashbaordContentHeader from './headerNav/ContentHeader.vue';
import DashbaordContentBody from './ContentBody.vue';

export default {
  name: 'DashbaordContentLayout',
  components: {
    'dashboard-content-header': DashbaordContentHeader,
    'dashboard-content-body': DashbaordContentBody,
  },
  props: ["toggleSidebar", "collapse", "sidebarWidth"]
}
</script>

<style lang="scss" scoped>
  .home {
    height: 100%;
  }
</style>
