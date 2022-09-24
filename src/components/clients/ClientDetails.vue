<template>
    <div>
        <div style="height: 100%; padding-right: 25px; padding-left: 3rem; padding-top: 2rem">
            <div class="flex align-items-center justify-content-between">
                <div class="back--wrap">
                    <router-link class="back--link" to="/dashboard/clients">
                        <icon-svg 
                            class="nav__icon mr--0" 
                            name="left-arrow-alt" 
                            icon-position="left"
                            :style="{ fill: 'rgba(66, 82, 110)' }"
                            :width="'16px'"
                        /> 
                        <span>Back to clients</span>
                    </router-link>
                </div>
                <div class="action--btns" v-show="loadingState === 'success'">
                    <template v-if="!isEdit">
                        <outline-button 
                            :classNames="'text--sm mr--10'" 
                            :btnSize="'fit-content'" 
                            @submit="isEdit = true" 
                            :label="'Edit'" 
                            :outlineType="'primary'"
                        />
                    </template>
                    <template v-else>
                        <outline-button 
                            :classNames="'text--sm'" 
                            :outlineType="'primary'" 
                            :btnSize="'fit-content'" 
                            @submit="isEdit = false" 
                            :label="'Save'" 
                        />
                        <outline-button 
                            :classNames="'text--sm'" 
                            :outlineType="'secondary'"
                            :btnSize="'fit-content'" 
                            @submit="isEdit = false" 
                            :label="'Cancel'" 
                        />
                    </template>
                </div>
            </div>
            <template v-if="loadingState === 'loading'">
                <div class="flex justify-content-center align-items-center  mt--40 mb--45">
                    <div class="spinner-border text-primary" role="status" style="color: #5f76d3 !important">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
            </template>
            <template v-else>
                <div class="flex align-items-center justify-content-between mt--40">
                    <div class="text--md text--color-dark text-medium">
                        <p class="text--medium text--xmd">{{ client.name }}</p>
                    </div>
                </div>

                <!-- content -->
                <div class="client__item--wrap">
                    <div class="client__item">
                        <div class="form__item">
                            <label for="workspaceTitle" class="form__label title">Client name</label>
                            <input name="name" class="form__input" v-model="client.name" :readonly="!isEdit"/>
                        </div>
                    </div>
                    <div class="client__item">
                        <div class="form__item">
                            <label for="workspaceTitle" class="form__label title">Phone number</label>
                            <input name="phoneNumber" class="form__input" v-model="client.phoneNumber" :readonly="!isEdit"/>
                        </div>
                    </div>
                     <div class="client__item">
                        <div class="form__item">
                            <label for="workspaceTitle" class="form__label title">Country</label>
                            <input name="country" class="form__input" v-model="client.country" :readonly="!isEdit"/>
                        </div>
                    </div>
                    <div class="client__item">
                        <div class="form__item">
                            <label for="workspaceTitle" class="form__label title">Address</label>
                            <input name="address" class="form__input" v-model="client.address" :readonly="!isEdit"/>
                        </div>
                    </div>
                    <div class="client__item">
                        <div class="form__item">
                            <label for="industry" class="form__label title">Industry</label>
                            <select name="industry" class="form-select form__input" v-model="client.organizationType" :readonly="!isEdit">
                                <option v-for="industry in industries" :value="industry" :key="industry">{{ industry }}</option>
                            </select>
                        </div>
                    </div>
                    <div class="client__item">
                        <p class="title">Date created</p>
                        <p class="sub-title">{{ client.createdAt ? computedCreatedAtDate : 'N/A' }}</p>
                    </div>
                    <div class="client__item flex align-items-center mb--0 email">
                        <div class="form__item mb--0">
                            <label for="email" class="form__label title">Billing email(s)</label>
                            <div class="input-group">
                                <input name="email" class="form__input" v-model="emailToBeAdded" :readonly="!isEdit" aria-describedby="basic-addon2" />
                                <span class="input-group-text" id="basic-addon2">&#8594;</span>
                            </div>
                        </div>
                        <div class="multiple__emails">
                            <div class="email--item" v-for="item in client.emails" :key="item">
                                <span class="inlineBlock">{{ item }}</span>
                                <span @click="removeEmail(item)" class="cursor-pointer inline-block">
                                    <svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M4.25837 4.02991L1.08967 0.861205C0.892799 0.664505 0.892799 0.345351 1.08967 0.14865C1.28654 -0.0482175 1.60535 -0.0482175 1.80222 0.14865L4.97092 3.31735L8.13979 0.14865C8.33666 -0.0482175 8.65548 -0.0482175 8.85235 0.14865C9.04922 0.345351 9.04922 0.664505 8.85235 0.861205L5.68348 4.02991L8.85235 7.19861C9.04922 7.39531 9.04922 7.71446 8.85235 7.91116C8.75391 8.00943 8.62491 8.05865 8.49607 8.05865C8.36723 8.05865 8.23823 8.00943 8.13979 7.911L4.97092 4.74229L1.80222 7.911C1.70379 8.00943 1.57478 8.05865 1.44594 8.05865C1.31711 8.05865 1.1881 8.00943 1.08967 7.911C0.892799 7.7143 0.892799 7.39514 1.08967 7.19844L4.25837 4.02991Z" fill="#696969"/>
                                    </svg>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </div>

        <confirm-deletion-modal :type="'client'" :action="handleDeleteClient" :reset="resetCurrentClient" />
    </div>
</template>

<script>
import ConfirmDeletionModal from '../shared/modals/ConfirmDeletion';
import IconSvg from '../shared/icons/Icon-Svg.vue';
import clientsList from '../../assets/js/clients.json'
import { formatDateTime } from '../../utils/others';
import { industryData } from '../../utils/dummy';
import OutlineButton from '../../components/shared/buttons/OutlineButton.vue'

export default {
    name: 'ClientLayout',
    created() {
        this.handleFetchClient()
    },
    props: {
        user: Object
    },
    components: {
        IconSvg,
        ConfirmDeletionModal,
        OutlineButton,
    },
   data() {
        return {
            isMenuItemHover: '',
            loadingState: 'default',
            client: {},
            isEdit: false,
            clients: clientsList,
            clientId: this.$route.params.id,
            industries: industryData,
            emailToBeAdded: ''
        }
    },
    computed: {
        computedCreatedAtDate() {
            if(this.client.createdAt) {
                return formatDateTime(this.client.createdAt)
            } else {
                return 'N/A'
            }
        },
    },
    methods: {
        resetCurrentClient() {
            this.client = {};
        },

        handleFetchClient() {
            this.loadingState = 'loading';

            // setTimeout(() => {
                this.loadingState = 'success';
                const currentClient = this.clients.find(client => client._id === this.clientId);
                this.client = currentClient;
            // }, 3000)
        },

        handleUpdateClient(data) {
            this.loadingState = 'loading';
            setTimeout(() => {
                this.loadingState = 'addClientSuccess';
                this.clientsList.push(data);
                $("#createClient").modal("hide");
            }, 10000)
        },

        startDelete(data) {
            this.currentClient = data;
            $("#deleteClient").modal("show");
        },

        handleDeleteClient() {
            this.client = {}
            this.$route.push({ path: '/dashboard/clients' })
        },
        removeEmail(email) {
            const updatedEmails = this.client.emails.filter(item => item !== email)
            this.client.emails = [...updatedEmails]
        },
        addEmail(email) {
            const updatedEmails = this.client.emails.push(email)
            this.client.emails = [...updatedEmails]
        }
    },
    watch: {
        '$route': 'handleFetchClient'
    }
}
</script>

<style lang="scss" scoped>
    .client__item--wrap {
        display: flex;
        margin-top: 2.5rem;
        flex-wrap: wrap;
    }
    .client__item {
        margin-bottom: 1rem;
        width: 40%;
        margin-bottom: 1rem;
        margin-right: 2.5rem;

        &.email {
            align-items: flex-end !important;
        }

        &:last-of-type {
            width: 100%;
        }
    }
    .title {
        color: #404452; 
        font-weight: 600;
        font-size: 14px;
    }
    .sub-title {
        color: #687383;
        font-weight: normal;
        font-size: 14px;
    }
    .form__input {
        font-size: 14px;
    }
    input:read-only, select:read-only {
        cursor: not-allowed;
        background: #f6f8fa;
    }
    .email {
        &--item {
            display: flex;
            align-items: center;
            flex-grow: 1;
            background: #c7d2f5;
            border-radius: 50px;
            padding: 3px 12px;
            justify-content: center;
            font-size: 14px;
            margin-right: 5px;

            span {
                &:first-of-type {
                    margin-right: 5px;
                }
            }
        }
    }
    .multiple__emails {
        margin-left: 2rem;
        max-width: 70%;
        display: flex;
        /* flex-wrap: wrap; */
        flex-basis: 206px;
        width: fit-content;
    }

    .input-group-text {
        color: #596DDE;
        background: #f2ebff;
        padding-bottom: 5px;
        padding-top: 5px;
        font-size: 14px;
    }
</style>