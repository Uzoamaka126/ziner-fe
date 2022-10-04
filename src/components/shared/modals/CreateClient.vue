<template>
    <div>
        <main-modal 
            :showModal="showModal" 
            :isCloseButton=false 
            :modalSize="'modal__dialog--lg'"
            :width="'620px'"
            :position="'center'"
            :isShowHeader="true"
            :title="'Add a new project'"
            :headerSize="'16px'"
        >
            <template #body>
                <div class="modal__wrapper--onboarding mb--45">
                    <div class="modal--section">
                        <div>
                            <form @submit.prevent="" class="form--workspace__create mb--20">
                                <div class="modal__form--row">
                                    <div class="modal__form--item">
                                        <label for="name" class="form-label">Client Name</label>
                                        <input type="text" class="form-control form-control-sm" v-model="form.clientName" id="name" placeholder="X design agency">
                                    </div>
                                    <div class="modal__form--item">
                                        <label for="name" class="form-label">Email addresses</label>
                                        <input type="email" class="form-control form-control-sm" v-model="form.email" placeholder="xyz@gmail.com">
                                    </div>
                                </div>
                                <div class="modal__form--row">
                                    <div class="modal__form--item">
                                        <label for="name" class="form-label">Country</label>
                                        <select class="form-select" aria-label="Default select example" v-model="form.country">
                                            <option v-for="country in countryList" :key="country.Code" :value="country.Name">{{ country.Name }}</option>
                                        </select>
                                    </div>
                                    <div class="modal__form--item">
                                        <label for="name" class="form-label">Phone Number</label>
                                        <input type="text" class="form-control form-control-sm" v-model="form.phoneNumber" placeholder="+2345566777">
                                    </div>
                                </div>
                                <div class="modal__form--row">
                                    <div class="modal__form--item">
                                        <label for="name" class="form-label">Industry</label>
                                        <select class="form-select" aria-label="Default select example" v-model="form.industry">
                                            <option v-for="country in countryList" :key="country.Code" :value="country.Name">{{ country.Name }}</option>
                                        </select>
                                    </div>
                                    <div class="modal__form--item">
                                        <label for="name" class="form-label">Address</label>
                                        <input type="text" class="form-control form-control-sm" v-model="form.address" placeholder="xyz@gmail.com">
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </template>
            <template #footer>
                <div class="width--100">
                    <button class="btn btn--secondary btn--md form__footer--btnFirst" @click="closeModal()">Cancel</button>
                    <button class="btn btn--primary btn--md" :disabled="!isBtnDisabled" type="submit">Add client</button>
                </div>
            </template>
        </main-modal>
    </div>
</template>

<script>
import countryList from '../../../assets/js/countrycodes.json'
import MainModal from '@/components/shared/modals/MainModal'

export default {
    name: 'CreateClient',
    props: ['loading', 'userId', 'showModal'],
    components: {
        MainModal
    },
    data() {
        return {
            countryList: countryList,
            form: {
                clientName: '',
                emails: '',
                phoneNumber: '',
                country: '',
                address: '',
                industry: ''
            }        
        }
    },
    computed: {
        isBtnDisabled() {
            if(!this.form.clientName || !this.form.emails.length) {
                return true
            } else if (this.loading) {
                return true
            }
            else {
                return false
            }
        },
    },
    methods: {
        closeModal() {
            this.form = {
                clientName: '',
                emails: '',
                phoneNumber: '',
                country: '',
                address: '',
                industry: ''
            }
            this.$emit("cancel");
        },

        createNewClient() {
            const payload = {
                name: this.form.clientName,
                userId: this.userId,
                email: this.form.email,
                phoneNumber: this.form.phoneNumber,
                country: this.form.country,
                address: this.form.address,
                organizationType: this.form.industry
            }
            this.$emit("handleAddClient", payload)
        },
    }
}
</script>