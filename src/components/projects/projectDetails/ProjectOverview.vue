<template>
    <div style="height: 100%">
        <div>
            <!-- title -->
           <div class="project__overview--item">
               <span class="text--color-dark text--medium text--sm">Title:</span>
                <template v-if="!overviewActions.isEditableTitle">
                    <span>
                        <span class="ml--10 text--sm">Test Title</span>
                        <span class="ml--10 text--xs text--link text-faded cursor-pointer" @click="startEditProjectDetails('isEditableTitle')">(Edit)</span>
                    </span>
                </template>
                <template v-else>
                    <span class="ml--10">
                        <span class="bd-search position-relative cursor-pointer">
                            <input 
                                type="text" 
                                class="form__input form__input--lg" 
                                v-model="title"
                                style="position: relative; vertical-align: top; font-size: 14px; padding-left: 10px; padding-top: 3px; padding-right: 3px;"
                            >
                            <span>
                                <span class="ml--10 text--xs text-faded cursor-pointer" @click="cancelEditProjectDetails('isEditableTitle')">Cancel</span>
                                <span class="ml--10 text--xs text--link cursor-pointer" :class="!title ? 'text--disabled' : '' " @click="handleEditProjectDetails('isEditableTitle')">Save</span>
                            </span>
                        </span>
                    </span>
                </template>
           </div>
           <div class="project__overview--item align-items-center" style="display: flex;">
               <span class="text--color-dark text--medium text--sm">Status:</span>
                <template v-if="!overviewActions.isEditableStatus">
                    <span>
                        <span class="ml--10 text--sm">{{ projectDetails.status }}</span>
                        <span class="ml--10 text--xs text--link text-faded cursor-pointer" @click="startEditProjectDetails('isEditableStatus')">(Edit)</span>
                    </span>
                </template>
                <template v-else>
                    <span class="ml--10 align-items-center" style="display: flex; font-size: 12px;">
                        <span>
                            <select class="form-select form-select-sm" style="width: fit-content" aria-label=".form-select-sm example" v-model="projectDetails.status">
                                <option selected>Open this select menu</option>
                                <option value="pending">Pending</option>
                                <option value="completed">Completed</option>
                                <option value="onHold">On-hold</option>
                                <option value="inReview">In Review</option>
                            </select>
                        </span>
                        <span>
                            <span class="ml--10 text--xs text--link text-faded cursor-pointer" @click="cancelEditProjectDetails('isEditableStatus')">Cancel</span>
                            <span class="ml--10 text--xs text--link text-faded cursor-pointer" @click="handleEditProjectDetails('isEditableStatus')" :class="!projectDetails.status ? 'text--disabled' : '' ">Save</span>
                        </span>
                    </span>
                </template>
           </div>
            <div class="project__overview--item align-items-center" style="display: flex;">
               <span class="text--color-dark text--medium text--sm">Deadline:</span>
                <template v-if="!overviewActions.isEditableDeadline">
                    <span>
                        <span class="ml--10 text--sm">{{ computedDeadlineDate }}</span>
                        <span class="ml--10 text--xs text--link text-faded cursor-pointer" @click="startEditProjectDetails('isEditableDeadline')">(Edit)</span>
                    </span>
                </template>
                <template v-else>
                   <span class="flex align-items-center ml--10">
                        <v-date-picker v-model="deadline">
                            <template #default="{ inputValue, inputEvents }">
                                <input class="px-3 py-1 border rounded" :value="inputValue" v-on="inputEvents" required />
                            </template>
                        </v-date-picker>
                        <span>
                            <span class="ml--10 text--xs text-faded cursor-pointer" @click="cancelEditProjectDetails('isEditableDeadline')">Cancel</span>
                            <span class="ml--10 text--xs text--link cursor-pointer" :class="!title ? 'text--disabled' : '' " @click="handleEditProjectDetails('isEditableDeadline')">Save</span>
                        </span>
                   </span>
                </template>
           </div>
            <div class="project__overview--item">
               <span class="text--color-dark text--medium text--sm">Tags:</span>
                <span class="ml--10 text--sm">1</span>
           </div>
    </div>
 </div>
</template>

<script>
import IconSvg from '../../shared/icons/Icon-Svg.vue';
import { formatDateTime } from '../../../utils/others'

export default {
    name: 'ProjectOverview',
    created() {
    },
    components: {
        IconSvg
    },
    props: {
        user: Object
    },
    data(){
        return {
            title: '',
            projectDetails: {
                title: '',
                status: 'pending',
                deadline: new Date('Thu Mar 10 2022 21:25:37 GMT+0100 (West Africa Standard Time)'),
                tags: []
            },
            overviewActions: {
                isEditableTitle: false,
                isEditableStatus: false,
                isEditableDeadline: false
            }
        }
    },
    computed: {
        computedDeadlineDate() {
            if(this.projectDetails.deadline) {
                return formatDateTime(this.projectDetails.deadline)
            } else {
                return 'None'
            }
        }
    },
    methods: {
        startEditProjectDetails (actionVal) {
            this.overviewActions[actionVal] = true;
        },
        cancelEditProjectDetails (actionVal) {
            this.overviewActions[actionVal] = false;
        },
        handleEditProjectDetails(actionVal) {
            const payload = {
                ...this.projectDetails
            }

            // if successful
            this.overviewActions[actionVal] = false;
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
