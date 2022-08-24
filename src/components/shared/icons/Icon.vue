<template :style="styles" :width="width" :height="height" :fill="fill">
  <span>
    <slot v-if="name"></slot>
  </span>
</template>

<script>
export default {
  name: 'IconMain',
  props: ['iconName'],

  data() {
    return {
    }
  },

  computed: {
    _iconPosition() {
      switch( this.iconPosition ) {
        case "right": return "right"
        default: return "left";
      }
    }
  },

  components: {
    // `${this.iconName.key}`: this.iconName.value
  },

  methods: {
  }
}
</script>

<style>
</style>
