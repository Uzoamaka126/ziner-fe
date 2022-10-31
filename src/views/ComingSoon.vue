<template>
    <div style="height: 100%;">
      <div class="background--white h-100">
        <div class="auth__wrapper error__wrapper">
          <div>
            <div class="cs__wrap">
              <h1 class="cs__heading">Coming soon</h1>
              <p class="cs__text">This feature isn't available yet.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import SinerLogo from '../components/shared/Logo.vue';
  
  export default {
    name: 'ComingSoonPage',
    components: {
      SinerLogo,
    },
  }
  </script>
  
  <style lang="scss" scoped>
    .home {
      height: 100%;
    }
  </style>
  