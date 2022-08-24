<template>
  <div>
    <board-layout></board-layout>
  </div>
</template>

<script>
// @ is an alias to /src
import BoardLayout from '@/components/boards/BoardLayout.vue'

export default {
  name: 'Boards',
  components: {
    'board-layout': BoardLayout
  }
}
</script>

<style lang="scss" scoped>
  .home {
    height: 100%;
  }
</style>
