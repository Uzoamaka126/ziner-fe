<template>
    <login-layout></login-layout>
</template>

<script>
import LoginLayout from '../components/auth/login/LoginLayout.vue'
export default {
    name: 'LoginView',
    components: {
      LoginLayout
  },
  props: {
    msg: String
  }
}
</script>