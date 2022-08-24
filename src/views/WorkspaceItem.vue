<template>
    <workspace-item-layout></workspace-item-layout>
</template>

<script>
import WorkspaceItemLayout from '../components/clients/WorkspaceItem.vue'
export default {
    name: 'WorkspaceItemView',
    components: {
        'workspace-item-layout' : WorkspaceItemLayout
  },
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
