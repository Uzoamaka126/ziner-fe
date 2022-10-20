<template>
  <div class="tab-panel" role="tabPanel" style="height: auto;">
    <div class="tab-content" style="height: auto;">
      <slot></slot>
    </div>
  </div>
</template>
<script>

export default {
    name: 'Tab',
    props: ["title", "titleSlot", "disabled"],
    data () {
      return {
        isActive: true
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.tab-panel {
  .tab-content {
    padding: 0.5rem;
    padding-top: 0px;
  }
}
</style>
