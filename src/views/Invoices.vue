<template>
  <div style="height: 100%">
    <invoice-layout></invoice-layout>
  </div>
</template>

<script>
import InvoiceLayout from '@/components/invoices/InvoiceList.vue'

export default {
  name: 'Home',
  components: {
   'invoice-layout': InvoiceLayout
  },
};
</script>

<style lang="scss" scoped>
  .home {
    height: 100%;
  }
</style>
