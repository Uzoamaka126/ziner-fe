<template>
    <div style="height: 100%">
        <div>
            <form class="form" @submit.prevent>
                <div class="">
                    <div class="form__item">
                    <label for="fullName" class="form__label">Full Name</label>
                    <input type="email" id="fullName" class="form-control form-control-sm">
                </div>
                <div class="form__item">
                    <label for="username" class="form__label">Username</label>
                    <input type="email" id="username" class="form-control form-control-sm">
                </div>
                <div class="form__item">
                    <label for="emailaddress" class="form__label">Email Address</label>
                    <input type="email" id="emailaddress" class="form-control form-control-sm" disabled>
                </div>
                <div class="form__item">
                    <label for="bio" class="form__label">Phone number</label>
                    <input type="email" id="emailaddress" class="form-control form-control-sm">
                </div>
                <div>
                    <button 
                        class="btn btn--ghost text--xs text--bold" 
                        style="color: #42526e; padding-left: 0px; font-weight: 600 !important;" 
                        data-bs-toggle="modal" data-bs-target="#changePassword"
                        
                    >
                    Click here to change password
                </button>
                </div>
                <div>
                    <button class="btn btn--primary btn--md mt--40 btn--sm" type="submit">Update Profile</button>
                </div>
            </div>
        </form>
    </div>
    <change-password-modal />
 </div>
</template>

<script>
import ChangePasswordModal from '../shared/modals/ChangePassword.vue';

export default {
    name: 'SettingsProfile',
    created() {
    },
    components: {
        ChangePasswordModal
    },
    props: {
        user: Object
    },
    data: () => ({
        isPasswordChangeModal: false
    }),
    computed: {

    },
    methods: {
        togglePasswordChange(value) {
            this.isPasswordChangeModal = value;
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .form {
        max-width: 600px;
        padding: 30px;
        height: auto;
    }
    .password__change {
        border-top: 2px solid #eee;
        margin-top: 1.5rem;
        padding-top: 2rem;
    }
    input[disabled] {
        background-color: #fafbfc;
        cursor: not-allowed;
    }
    textarea {
        min-height: 70px;
    }
    label {
        font-size: 0.8rem;
    }
</style>
