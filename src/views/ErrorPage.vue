<template>
  <div style="height: 100%;">
    <div class="background--white h-100">
      <div class="auth__wrapper error__wrapper">
        <div class="logo auth--logo">
          <siner-logo :layout="'center'"></siner-logo>
        </div>

        <div class="mt--40">
          <img src="../assets/img/error_bg_1.png" alt="">
        </div>

        <div>
          <div class="error__msg">
            <h1>Oops! I think you are lost.</h1>
            <p>The page you are looking for does not exist. Not to worry, click on the button below to get back on track.</p>
            <icon-button 
              :btnSize="'fit-content'" 
              :classNames="'btn--primary btn--md mt--40'"
              :label="'Home'"
              :iconName="'right-arrow-alt'"
              :iconFillColor="'#fff'"
              :iconWidth="'12px'"
              @submit="goBackToHome" 
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SinerLogo from '../components/shared/Logo.vue';
import IconButton from '../components/shared/buttons/IconButton.vue';

export default {
  name: 'ErrorPage',
  components: {
    SinerLogo,
    IconButton
  },
  data() {
    return {}
  },
  computed: {
  },
  methods: {
    goBackToHome() {
      console.log('this.$router--->', this.$router);
      this.$router.push('/');
    }
  }
}
</script>

<style lang="scss" scoped>
  .home {
    height: 100%;
  }
</style>
