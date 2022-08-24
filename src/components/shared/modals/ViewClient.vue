<template>
    <div class="modal fade" id="clientDetails" tabindex="-1" aria-labelledby="clientDetailsLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="createTagLabel">Client Details </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="flex align-items-center width--100">
                        <div class="form__item width--100">
                            <label for="workspaceTitle" class="form__label title">Client name</label>
                            <input name="title" id="workspaceTitle" class="form__input" v-model="reactiveClientName" :readonly="!isEdit"/>
                        </div>
                        <div class="edit-btns ml--10">
                           <template v-if="!isEdit">
                                <span class="action--span" @click="isEdit = true">Edit</span>
                           </template>
                           <template v-else>
                                <span class="action--span mr--10">Save</span>
                                <span class="action--span secondary" @click="isEdit = false">Cancel</span>
                           </template>
                        </div>
                    </div>
                    <div class="mt--20">
                        <p class="title">Email:</p>
                        <p class="sub-title">{{ currentClientDetails.email ? currentClientDetails.email : 'N/A' }}</p>
                    </div>
                    <div class="mt--20">
                        <p class="title">Country:</p>
                        <p class="sub-title">{{ currentClientDetails.country ? currentClientDetails.country : 'N/A' }}</p>
                    </div>
                    <div class="mt--20">
                        <p class="title">Address:</p>
                        <p class="sub-title">{{ currentClientDetails.address ? currentClientDetails.address : 'N/A' }}</p>
                    </div>
                    <div class="mt--20">
                        <p class="title">No of associated projects:</p>
                        <p class="sub-title">3 projects</p>
                    </div>
                    <div class="mt--20">
                        <p class="title">Date created</p>
                        <p class="sub-title">{{ currentClientDetails.createdAt ? computedDateCreated : 'N/A' }}</p>
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

export default {
    name: 'ViewClient',
    props: {
        currentClientDetails: { type: Object, required: true, default: () => {}},
        clientName: { type: String, default: undefined || '' },
    }, 
    data () {
        return {
            reactiveClientName: this.clientName,
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
    .form__item {
        max-width: 50%;
        margin-bottom: 0rem;
    }
    .action--span {
        line-height: 20px;
        font-size: 14px;
        color: rgba(99, 91, 255, 1);
        font-weight: 500;
        cursor: pointer;

        &.secondary {
            color: #a3acba;
        }
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
    .edit-btns {
        align-self: flex-end;
    }
    .form__input {
        font-size: 14px;
    }
    input:read-only {
        cursor: not-allowed;
        background: #eee;
    }
</style>
