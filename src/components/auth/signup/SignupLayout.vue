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
                                <h2 class="auth__title">Create account</h2>
                            </div>
                            <div class="form__item">
                                <label for="firstName" class="form__label">Full Name</label>
                                <input type="email" id="firstName" class="form-control" required="required" v-model="fullName">
                            </div>
                            <div class="form__item">
                                <label for="emailaddress" class="form__label">Email Address</label>
                                <input type="email" id="emailaddress" class="form-control" required="required" v-model="email">
                            </div>
                            <div class="form__item">
                                <label for="username" class="form__label">Username</label>
                                <input type="email" id="username" class="form-control" required="required" v-model="username">
                            </div>
                            <div class="form__item">
                                <label for="password" class="form__label">Password</label>
                                <div class="flex align-items-center positionRelative">
                                    <input id="password" class="form-control" required="required" v-model="password" :type="passwordType" />
                                    <span class="positionAbsolute me-1 right--5 cursor-pointer" @click="toggleViewPasswordIcon" style="max-width: 24px; max-height: 24px">
                                        <icon-svg 
                                            fill="rgba(194, 200, 212, 1)" 
                                            :name="showPassword ? 'show' : 'eye-hide'" 
                                            icon-position="left"
                                            :width="'100%'"
                                            :height="'100%'"
                                        /> 
                                    </span>
                                </div>
                            </div>
                            <div v-if="error && error.value" class="signup-section__form__row" style="margin-top: -15px;margin-bottom: 15px;">
                                <span class="textRed">{{ error.value  }}</span>
                            </div>
                            <!-- <div class="checkbox__item auth--checkbox">
                                <input class="checkbox__input" id="termsAndService" type="checkbox" v-model="termsAndService" />
                                <span class="checkbox--label no--padding__all" for="termsAndService">I agree to the </span><router-link class="auth--form__link" :to="{ name: 'signup' }"> Terms and Service</router-link>
                            </div> -->

                            <!-- signup form row -->
                            <div class="form--btn__wrap auth--btn__submit">
                                <primary-button 
                                    :loadingState="loading" 
                                    :type="'submit'" 
                                    :isBtnDisabled="isBtnDisabled" 
                                    :btnSize="'100%'" 
                                    :classValues="'btn btn--primary btn--md bold btn--block'"
                                    @submitFunc="handleSignUp"
                                >
                               {{ loading === 'loading' ? '' : ' Sign up'}}
                                </primary-button>
                            </div>
                            <div class="signup--notify__wrap ">
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
  name: 'SignupLayout',
  components: {
    'siner-logo': Logo,
    IconSvg,
    'primary-button': PrimaryButtton
  },
  data: () => ({
    email: '',
    fullName: '',
    username: '',
    password: '',
    error: {
        show: false,
        value: ''
    },
    showPassword: false,
    loading: 'default'
  }),
  computed: {
    isBtnDisabled() {
        if(!this.email || !this.password) {
            return true
        } else if (this.loading === 'loading') {
            return true
        } else {
            return false
        }
    },
    passwordType() {
        if(this.showPassword) {
            return 'text'
        } else {
            return 'password'
        }
    }
  },
  methods: {
    toggleViewPasswordIcon() {
       this.showPassword = !this.showPassword
    },
    handleSignUp() {
        const payload = { email, password, username, fullName }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    @import '../../../assets/scss/pages/auth.scss';

</style>
