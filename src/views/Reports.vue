<template>
  <div class="home">
    <report-layout></report-layout>
  </div>
</template>

<script>
import ReportLayout from '@/components/reports/ReportsLayout.vue'

export default {
  name: 'Reports',
  components: {
   ReportLayout
  },
};
</script>

<style lang="scss" scoped>
  .home {
    height: 100%;
  }
</style>
