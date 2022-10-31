<template>
  <div class="content__body" :style="collapseProp ? bodyStylesCollapse : bodyStyles">
    <div style="height: 100%; padding-right: 15px; padding-left: 15px; padding-top: 2rem">
      <div class="workspace__content--view">
        <router-view :key="$route.fullPath"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DashbaordContentBody',
  created() {
    // console.log(this.$store.state);
  },
  props: ["collapse"],
  data() {
    return {
      collapseProp: this.collapse,
      bodyStyles: {
        maxWidth: '95%',
        marginLeft: 'auto',
        marginRight: 'auto',
        transition: 'all .3s ease-out'
      },
      bodyStylesCollapse: {
        maxWidth: 'none',
        marginLeft: '0px',
        marginRight: '0px',
        transition: 'all .3s ease-out'
      },
    }
  }
}
</script>
