<template>
    <div>
        <main-modal 
            :showModal="showModal" 
            :isCloseButton=false 
            :modalSize="'modal__dialog--lg'"
            :width="'620px'"
            :position="'center'"
            :isShowHeader="true"
            :title="'Add a new client'"
            :headerSize="'16px'"
        >
            <template #body>
                <div class="modal__wrapper--onboarding mb--45">
                    <div class="modal--section">
                        <div>
                            <form @submit.prevent="" class="form--workspace__create mb--20">
                                <div class="modal__form--row">
                                    <div class="modal__form--item">
                                        <label for="name" class="form-label">Client Name <span class="text--xs text--color-warning">*</span></label>
                                        <input type="text" class="form-control form-control-sm" v-model="form.clientName" id="name" placeholder="X design agency">
                                    </div>
                                    <div class="modal__form--item">
                                        <label for="name" class="form-label">Email address <span class="text--xs text--color-warning">*</span></label>
                                        <input type="email" class="form-control form-control-sm" v-model="form.email" placeholder="xyz@gmail.com">
                                    </div>
                                </div>
                                <div class="modal__form--row">
                                    <div class="modal__form--item">
                                        <label for="name" class="form-label">Country <span class="text-faded text--xs">(optional)</span></label>
                                        <select class="form-select" aria-label="Default select example" v-model="form.country">
                                            <option v-for="country in countryList" :key="country.Code" :value="country.Name">{{ country.Name }}</option>
                                        </select>
                                    </div>
                                    <div class="modal__form--item">
                                        <label for="name" class="form-label">Phone Number <span class="text-faded text--xs">(optional)</span></label>
                                        <input type="text" class="form-control form-control-sm" v-model="form.phoneNumber" placeholder="+2345566777">
                                    </div>
                                </div>
                                <div class="modal__form--row">
                                    <div class="modal__form--item">
                                        <label for="name" class="form-label">Industry <span class="text-faded text--xs">(optional)</span></label>
                                        <select class="form-select" v-model="form.industry">
                                            <option v-for="industry in industries" :key="industry" :value="industry">{{ industry }}</option>
                                        </select>
                                    </div>
                                    <div class="modal__form--item">
                                        <label for="name" class="form-label">Address <span class="text-faded text--xs">(optional)</span></label>
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
                    <!-- <button class="btn btn--primary btn--md" :disabled="isBtnDisabled" type="submit">Add client</button> -->
                    <primary-button 
                      :loading="loading" 
                      :type="'submit'" 
                      :isBtnDisabled="isBtnDisabled" 
                      :classNames="'btn--md'"
                      @submit="submitForm"
                  >
                    {{actionType ? 'Add client' : 'Save'}}
                  </primary-button>
                </div>
            </template>
        </main-modal>
    </div>
</template>

<script>
import countryList from '../../../assets/js/countrycodes.json'
import MainModal from '@/components/shared/modals/MainModal'
import PrimaryButton from '@/components/shared/buttons/PrimaryButton'
import { industryData } from '../../../utils/dummy'

export default {
    name: 'CreateClient',
    props: ['loading', 'userId', 'showModal', 'actionType', 'clientData'],
    components: {
        MainModal,
        PrimaryButton
    },
    data() {
        return {
            countryList: countryList,
            form: {
                _id: this.clientData._id || '',
                clientName: this.clientData.name || '',
                email: this.clientData.email || '',
                phoneNumber: this.clientData.phoneNumber || '',
                country: this.clientData.country || '',
                address: this.clientData.address || '',
                industry: this.clientData.organizationType || ''
            },
            industries: industryData     
        }
    },
    computed: {
        isBtnDisabled() {
            if(!this.form.clientName || !this.form.email) {
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
                email: '',
                phoneNumber: '',
                country: '',
                address: '',
                industry: ''
            }
            this.$emit("cancel");
        },

        submitForm() {
            if (this.actionType === 'add') {
                this.createNewClient()
            } else if (this.actionType === 'edit') {
                this.modifyClientData()
            } else {
                return
            }
        },

        createNewClient() {
            const payload = {
                name: this.form.clientName,
                email: this.form.email,
                phoneNumber: this.form.phoneNumber,
                country: this.form.country,
                address: this.form.address,
                organizationType: this.form.industry
            }
            this.$emit("addClient", payload)
            this.form = {
                clientName: '',
                email: '',
                phoneNumber: '',
                country: '',
                address: '',
                industry: ''
            }
        },
        
        modifyClientData() {
            const payload = {
                name: this.form.clientName,
                email: this.form.email,
                phoneNumber: this.form.phoneNumber,
                country: this.form.country,
                address: this.form.address,
                organizationType: this.form.industry
            }

            this.$emit("editClient", payload)
            this.form = {
                clientName: '',
                email: '',
                phoneNumber: '',
                country: '',
                address: '',
                industry: ''
            }
        }
    }
}
</script>