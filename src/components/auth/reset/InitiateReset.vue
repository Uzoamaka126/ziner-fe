<template>
    <div class="auth__bg">
        <div class="auth__wrapper">
            <div class="logo auth--logo">
                <siner-logo :layout="'center'"></siner-logo>
            </div>
            <div class="auth__wrap--center">
                <div>
                    <form class="form form__md form auth--form">
                        <div class="auth--form__wrap">
                            <div class="auth__title-wrap">
                                <h2 class="auth__title">Initiate Passowrd Reset</h2>
                            </div>
                             <!-- content  -->
                            <div class="form__item">
                                <label for="emailaddress" class="form__label">Email Address</label>
                                <input type="email" id="emailaddress" class="form-control" required="required" v-model="email">
                            </div>
                            <div class="form--btn__wrap auth--btn__submit">
                               <primary-button 
                                    :loadingState="loading" 
                                    :type="'submit'" 
                                    :isBtnDisabled="isBtnDisabled" 
                                    :btnSize="'100%'" 
                                    :classValues="'btn btn--primary btn--md bold btn--block'"
                                    @submitFunc="handleSignUp"
                                >
                               {{ loading === 'loading' ? '' : 'Initiate Reset'}}
                                </primary-button>
                            </div>
                        <!-- no account -->
                            <div class="signup--notify__wrap">
                                <div class="text--sm">Have an account? <router-link class="auth--link" :to="{ name: 'login' }">Login</router-link></div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Logo from '../../shared/Logo.vue';
import IconSvg from '../../shared/icons/Icon-Svg.vue';
import PrimaryButtton from '../../shared/buttons/PrimaryButton.vue';

export default {
  name: 'InitiateResetLayout',
  components: {
    'siner-logo': Logo,
    IconSvg,
    'primary-button': PrimaryButtton
  },
  data: () => ({
    email:  '',
    error: {
        show: false,
        value: ''
    },
    loading: 'default'
  }),
  computed: {
    isBtnDisabled() {
        if(!this.email) {
            return true
        } else if (this.loading === 'loading') {
            return true
        } else {
            return false
        }
    },
  },
  methods: {
      handleReset() {
        const payload = { email }
    }
  },
  mounted() {
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    @import '../../../assets/scss/pages/auth.scss'
</style>
