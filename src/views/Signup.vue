<template>
    <signup-layout></signup-layout>
</template>

<script>
import SignupLayout from '../components/auth/signup/SignupLayout.vue'
export default {
    name: 'SignupView',
    components: {
        'signup-layout' : SignupLayout
  },
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
