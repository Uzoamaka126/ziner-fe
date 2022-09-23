<template>
    <div>
        <div style="height: 100%; padding-right: 25px; padding-left: 25px; padding-top: 2rem">
            <div class="back--wrap">
                <router-link class="back--link">
                    <icon-svg 
                        fill="rgba(66, 82, 110)" 
                        class="nav__icon" 
                        name="folder" 
                        icon-position="left"
                        :style="{ fill: 'rgba(66, 82, 110)' }"
                        :width="'16px'"
                    /> 
                    <span>Back to clients</span>
                </router-link>
            </div>
            <template v-if="loadingState === 'loading'">
                <div class="flex justify-content-center align-items-center  mt--40 mb--45">
                    <div class="spinner-border text-primary" role="status" style="color: #5750ec !important">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
            </template>
            <template v-else>
                <div class="flex align-items-center justify-content-between">
                    <div class="text--md text--color-dark text-medium">
                        <p>{{ client.name }}</p>
                    </div>
                </div>

                <!-- content -->
                <div style="display: flex; margin-top: 2.5rem;">
                    <div class="client__item">
                            <div class="form__item">
                                <label for="workspaceTitle" class="form__label title">Client name</label>
                                <input name="title" id="workspaceTitle" class="form__input" v-model="reactiveClientName" :readonly="!isEdit"/>
                            </div>
                    </div>
                    <div class="client__item">
                        <div class="form__item">
                            <label for="workspaceTitle" class="form__label title">Billing email(s)</label>
                            <input name="title" id="workspaceTitle" class="form__input" v-model="reactiveClientName" :readonly="!isEdit"/>
                        </div>
                    </div>
                    <div class="client__item">
                        <div class="form__item">
                            <label for="workspaceTitle" class="form__label title">Phone number</label>
                            <input name="title" id="workspaceTitle" class="form__input" v-model="reactiveClientName" :readonly="!isEdit"/>
                        </div>
                    </div>
                    <div class="client__item">
                        <div class="form__item">
                            <label for="workspaceTitle" class="form__label title">Address</label>
                            <input name="title" id="workspaceTitle" class="form__input" v-model="reactiveClientName" :readonly="!isEdit"/>
                        </div>
                    </div>
                    <div class="client__item">
                        <div class="form__item">
                            <label for="workspaceTitle" class="form__label title">Industry</label>
                            <input name="title" id="workspaceTitle" class="form__input" v-model="reactiveClientName" :readonly="!isEdit"/>
                        </div>
                    </div>
                    <div class="mt--20">
                        <p class="title">Date created</p>
                        <p class="sub-title">{{ currentClientDetails.createdAt ? computedDateCreated : 'N/A' }}</p>
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

export default {
    name: 'ClientLayout',
    created() {
    },
    props: {
        user: Object
    },
    components: {
        IconSvg,
        ConfirmDeletionModal,
    },
   data() {
        return {
            isMenuItemHover: '',
            currentClient: {},
            loadingState: 'default',
            client: {},
            // clientId: this.$route.params.id,
            clientsList: clientsList
        }
    },
    computed: {
        
    },
    methods: {
        resetCurrentClient() {
            this.client = {};
        },

        handleFetchClient() {
            this.loadingState = 'loading';

            // setTimeout(() => {
            //     this.loadingState = 'success';
            //     const currentClient = this.clientsList.find(id => id === this.clientId);
            //     this.client = currentClient;
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
            this.$route.path('/clients')
        },
    },
    watch: {
        '$route': 'handleFetchClient'
    }
}
</script>

<style lang="scss" scoped>
    .client__item {
       width: 100%;
       margin-bottom: 1rem;
    }
    .title {
        color: #404452; 
        font-weight: 500;
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
    input:read-only {
        cursor: not-allowed;
        background: #f6f8fa;
    }
</style>