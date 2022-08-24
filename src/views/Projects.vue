<template>
    <projects-layout></projects-layout>
</template>

<script>
import ProjectsLayout from '../components/projects/ProjectsLayout.vue'
export default {
    name: 'ProjectsView',
    components: {
        'projects-layout' : ProjectsLayout
  },
  props: {
   
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
