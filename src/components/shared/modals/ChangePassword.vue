<template>
    <div class="modal fade" id="changePassword" tabindex="-1" aria-labelledby="changePasswordLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="changePasswordLabel">Update Password</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form @submit.prevent="" class="form--workspace__create mb--20">
                        <div class="form__item">
                            <label for="name" class="form-label">Old Password</label>
                            <div class="input-icon">
                                <input type="text" class="form-control form-control-sm" v-model="old_password" id="name" :disabled="loading || isOldPasswordCorrect === 'success'">
                                <span class="input-check default cursor-pointer" v-if="!loading && old_password !== ''" @click="checkOldPassword" :class="{ 'hide': isOldPasswordCorrect === 'success' }">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style="fill: #596DDE;transform: ;msFilter:;"><path d="M11.999 1.993c-5.514.001-10 4.487-10 10.001s4.486 10 10.001 10c5.513 0 9.999-4.486 10-10 0-5.514-4.486-10-10.001-10.001zM12 19.994c-4.412 0-8.001-3.589-8.001-8s3.589-8 8-8.001C16.411 3.994 20 7.583 20 11.994c-.001 4.411-3.59 8-8 8z"></path><path d="M12 10.994H8v2h4V16l4.005-4.005L12 7.991z"></path></svg>
                                </span>
                                <span class="input-check spinner-border spinner text-secondary" role="status" v-if="loading">
                                </span>
                            </div>
                            <div class="invalid-feedback" v-if="isOldPasswordCorrect === 'failed'">
                                Incorrect password. Try again
                            </div>
                            <div class="valid-feedback" v-if="isOldPasswordCorrect === 'success'">Password is a match!</div>
                        </div>
                        <template v-if="isOldPasswordCorrect === 'success'">
                            <div class="fade-in" :class="{ 'show': isOldPasswordCorrect === 'success' }">
                                <div class="form__item">
                                    <label for="newPassword" class="form-label">New Password</label>
                                    <input type="text" class="form-control form-control-sm" v-model="new_password" id="newPassword">
                                    <div id="passwordHelpBlock" class="form-text text--color-warning text--xs">
                                        Password must be 8-20 characters long, contain letters and numbers only.
                                    </div>
                            </div>
                                <div class="form__item">
                                    <label for="confirmNewPassword" class="form-label">Confirm New Password</label>
                                    <input type="text" class="form-control form-control-sm" v-model="confirm_new_password" id="confirmNewPassword">
                                    <div id="passwordHelpBlock" class="form-text text--color-warning text--xs" v-if="isPasswordMatch === 'notMatch'">
                                        Password does not match
                                    </div>
                                </div>
                            </div>
                        </template>
                    </form>
                </div>
                <div class="modal-footer flex items-center">
                    <button type="button" class="btn btn--secondary btn--sm" data-bs-dismiss="modal" aria-label="Close" @click="reset">Cancel</button>
                    <button type="button" class="btn btn--primary btn--sm" :disabled="isBtnDisabled">Save</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import MainModal from './MainModal.vue';
export default {
    name: 'ChangePasswordModal',
    components: {
        'main-modal': MainModal,
    },
    props: [],
    data () {
        return {
            old_password: '',
            new_password: '',
            confirm_new_password: '',
            isOldPasswordCorrect: 'default',
            loading: false
        }
    },
    computed: {
        isBtnDisabled() {
            if(!this.old_password || !this.new_password || !this.confirm_new_password) {
                return true
            } else {
                return false
            }
        },
        isPasswordMatch() {
            if (!this.new_password || this.new_password === '') {
                return 'default'
            } else if (this.new_password && this.new_password === this.confirm_new_password) {
                return 'match'
            } else {
                return 'notMatch'
            }
        },
    },
    methods: {
        checkOldPassword(val) {
            if (typeof val === 'number' || !val) {
                return
            } else {
                this.loading = true
                this.isOldPasswordCorrect = 'loading';

                setTimeout(() => {
                    this.loading = false
                    this.isOldPasswordCorrect = 'success';
                }, 5000)
            }
        },
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.fade-in {
  overflow: hidden;
  width: 100%;
  height:0;
  transition: .5s ease;
}

.fade-in.show {
  height: 100%;
}

.input-icon {
    position: relative;
}

.input-check {
    padding-right: calc(1.5em + 0.75rem);
    padding-right: 5px;
    top: 2px;
    height: 24px;
    right: 0;
    position: absolute;

    &.default {
        animation-name: example;
        animation-duration: 4s;
        animation-iteration-count: infinite;
        animation-timing-function: ease-in-out;
    }
    &.hide {
        display: none;
    }
    &.spinner {
        top: 7px !important;
        height: 16px !important;
        right: 5px !important;
        width: 16px !important;
    }
}

.valid-feedback {
    display: block !important;
    font-size: 0.75rem !important;
}

@keyframes example {
  from  { right: 0px; top: 0px; }
  to { right: 2px; top: 0px; }
}
</style>
