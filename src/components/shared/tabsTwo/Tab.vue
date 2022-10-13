<template>
  <div v-show="isActive" class="tab-panel" :class="{ 'block': isActive }" role="tabPanel" style="height: auto;">
    <div class="tab-content" style="height: auto;">
      <slot></slot>
    </div>
  </div>
</template>
<script>

export default {
    name: 'Tab',
    props: {
      title: {
        type: String,
        default: 'Overview'
      },
      isActive: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.tab-panel {
  .tab-content {
    padding: 0.5rem;
  }
}
</style>
