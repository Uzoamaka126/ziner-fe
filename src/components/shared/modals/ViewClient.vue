<template>
    <div class="modal fade" id="clientDetails" tabindex="-1" aria-labelledby="clientDetailsLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="createTagLabel">Client Details </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="modal__action--btns">
                        <template v-if="!isEdit">
                            <text-button :classNames="'text--sm text--color-primary'" :btnSize="'fit-content'" @submit="isEdit = true" :label="'Edit'" />
                        </template>
                        <template v-else>
                            <text-button :classNames="'text--sm text--color-primary'" :btnSize="'fit-content'" @submit="isEdit = false" :label="'Save'" />
                            <text-button :classNames="'text--sm text--color-normal'" :btnSize="'fit-content'" @submit="isEdit = false" :label="'Cancel'" />
                        </template>
                    </div>
                    
                    <div class="modal__content--wrap">
                        <!-- name -->
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
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn--secondary btn--sm" data-bs-dismiss="modal" aria-label="Close" @click="reset">Close</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { formatDateTime } from '../../../utils/others'
import TextButton from '../buttons/TextButton.vue'

export default {
    name: 'ViewClient',
    props: {
        currentClientDetails: { type: Object, required: true, default: () => {}},
    }, 
    components: {
        TextButton
    },
    data () {
        return {
            isEdit: false
        }
    },
    model: {
        prop: "clientName",
        event: "change",
    },
    computed: {
        computedDateCreated() {
            if(this.currentClientDetails.createdAt) {
                return formatDateTime(this.currentClientDetails.createdAt)
            } else {
                return 'N/A'
            }
        }
    },
    methods: {
        reset() {
            this.$emit("resetCurrentClient");
        },
    },
     watch: {
        clientName( newVal ) {
            this.reactiveClientName = newVal;
         },

        reactiveClientName( newVal ) {
            this.$emit( "change", newVal )
        }
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
