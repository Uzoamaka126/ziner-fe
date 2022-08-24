<template>
    <div class="modal fade" id="createClient" tabindex="-1" aria-labelledby="createClientLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="createClientLabel">Add client</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                <form @submit.prevent="" class="form--workspace__create mb--20">
                    <div class="form__item">
                        <div style="">
                            <label for="name" class="form-label">Client Name</label>
                            <input type="text" class="form-control form-control-sm" v-model="clientName" id="name" placeholder="X design agency">
                        </div>
                    </div>
                    <div class="form__item">
                        <div>
                            <label for="name" class="form-label">Email address</label>
                            <input type="text" class="form-control form-control-sm" v-model="email" id="name" placeholder="xyz@gmail.com">
                        </div>
                    </div>
                    <div class="form__item">
                        <div>
                            <label for="name" class="form-label">Country</label>
                            <select class="form-select" aria-label="Default select example" v-model="country">
                                <option v-for="country in countryList" :key="country.Code" :value="country.Name">{{ country.Name }}</option>
                            </select>
                        </div>
                    </div>
                    <div class="form__item">
                        <div>
                            <label for="name" class="form-label">Phone Number</label>
                            <input type="text" class="form-control form-control-sm" v-model="phoneNumber" id="name" placeholder="+2345566777">
                        </div>
                    </div>
                    <div class="form__item">
                        <div>
                            <label for="name" class="form-label">Address</label>
                            <input type="text" class="form-control form-control-sm" v-model="address" id="name" placeholder="xyz@gmail.com">
                        </div>
                    </div>
                </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn--secondary mr--10 btn--sm" data-bs-dismiss="modal" aria-label="Close" @click="resetValues()">Cancel</button>
                    <button type="button" class="btn btn--primary btn--sm" :disabled="isBtnDisabled" :style="{ width: btnSize }" @click="createNewClient">
                        <template v-if="loading === 'addClientLoading'">
                            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            <span class="visually-hidden">Loading...</span>
                        </template>
                        <template v-else>
                            <span>Create</span>
                        </template>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import countryList from '../../../assets/js/countrycodes.json'

export default {
    name: 'CreateClient',
    props: ['loading'],
    data: () => ({
        clientName: '',
        email: '',
        phoneNumber: '',
        country: '',
        address: '',
        countryList: countryList,        
    }),
    computed: {
        isBtnDisabled() {
            if(!this.clientName || !this.email || !this.address || !this.country || !this.phoneNumber) {
                return true
            } else if (this.loading === 'addClientLoading') {
                return true
            }
            else {
                return false
            }
        },
        btnSize() {
            return this.loading === 'addClientLoading' ? '64.6094px' : 'auto'
        }
    },
    methods: {
        resetValues() {
            this.clientName = '';
            this.email = '';
            this.phoneNumber = ''
            this.country = ''
            this.address = ''
        },
        createNewClient() {
            const payload = {
                name: this.clientName,
                user_id: this.user_id,
                email: this.email,
                phoneNumber: this.phoneNumber,
                country: this.country,
                address: this.address,
            }
            this.$emit("handleAddClient", payload)
        },
    }
}
</script>