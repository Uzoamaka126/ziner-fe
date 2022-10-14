<template>
    <div style="height: 100%">
        <div>
            <template v-if="loading === 'loading'">
                <div class="flex justify-content-center align-items-center  mt--40 mb--45">
                    <div class="spinner-border text-primary" role="status" style="color: #5f76d3 !important">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
            </template>
            <template v-if="loading === 'success'">
                <div class="action--btns flex justify-content-end">
                    <template v-if="!isEditable">
                        <outline-button 
                            :classNames="'text--sm '" 
                            :btnSize="'fit-content'" 
                            @submit="showEdit" 
                            :label="'Edit'" 
                            :outlineType="'primary'"
                        />
                    </template>
                    <template v-else>
                        <outline-button 
                            :classNames="'text--sm mr--10'" 
                            :outlineType="'primary'" 
                            :btnSize="'fit-content'" 
                            @submit="isEditable = false" 
                            :label="'Save'" 
                        />
                        <outline-button 
                            :classNames="'text--sm'" 
                            :outlineType="'secondary'"
                            :btnSize="'fit-content'" 
                            @submit="cancelUpdate" 
                            :label="'Cancel'" 
                        />
                    </template>
                </div>
                <div class="project__overview--item flex">
                    <span class="text--color-dark text--medium text--sm">Title:</span>
                        <template v-if="!isEditable">
                            <span class="ml--10 text--sm">{{ data.title }}</span>
                        </template>
                        <template v-else>
                            <span class="ml--10" style="min-width: 340px;">
                                <input 
                                    type="text" 
                                    class="text--sm form-control px-2 py-1" 
                                    v-model="form.title"
                                />
                            </span>
                        </template>
                </div>
                <div class="project__overview--item flex align-items-center flex">
                    <span class="text--color-dark text--medium text--sm">Status:</span>
                        <template v-if="!isEditable">
                            <span class="ml--10 text--sm">{{ data.status }}</span>
                        </template>
                        <template v-else>
                            <span class="ml--10" style="min-width: 340px;">
                                <select class="form-select form-select-sm form-control text--sm" v-model="form.status">
                                    <option selected>Open this select menu</option>
                                </select>
                            </span>
                        </template>
                </div>
                    <div class="project__overview--item flex align-items-center" style="display: flex;">
                        <span class="text--color-dark text--medium text--sm">Deadline:</span>
                        <template v-if="!isEditable">
                            <span class="ml--10 text--sm">{{ computeDeadlineDate(data.deadline) }}</span>
                        </template>
                        <template v-else>
                            <v-date-picker v-model="data.deadline" class="ml--10" style="min-width: 340px;">
                                <template #default="{ inputValue, inputEvents }">
                                    <input class="px-2 text--sm py-1 border rounded form-control" :value="inputValue" v-on="inputEvents" required />
                                </template>
                            </v-date-picker>
                        </template>
                    </div>
                    <div class="project__overview--item flex">
                        <span class="text--color-dark text--medium text--sm">Tags:</span>
                        <span class="ml--10 text--sm ml--10">1</span>
                    </div>
            </template>
    </div>
 </div>
</template>

<script>
import IconSvg from '../../shared/icons/Icon-Svg.vue';
import { formatDateTime } from '../../../utils/others'
import OutlineButton from '../../../components/shared/buttons/OutlineButton.vue'
import TextButton from '../../shared/buttons/TextButton.vue';

export default {
    name: 'ProjectOverview',
    created() {},
    components: {
        IconSvg,
        OutlineButton,
        TextButton
    },
    props: {
        user: Object,
        data: Object,
        loading: String
    },
    data(){
        return {
            isEditable: false,
            form: {
                title: '',
                status: '',
                deadline: '',
                tags: [],
            },
        }
    },
    computed: {
    },
    methods: {
        computeDeadlineDate(date) {
            if(date) {
                return formatDateTime(date)
            } else {
                return 'None'
            }
        },

        fillFormWithProps() {
            this.form = {
                title: this.data.title || '',
                status: this.data.status || '',
                deadline: this.data.deadline || '',
                tags: this.data.tags || [],
            }
        },

        cancelUpdate() {
            this.isEditable = false;
            this.form = {
                title: this.data.title || '',
                status: this.data.status || '',
                deadline: this.data.deadline || '',
                tags: this.data.tags || [],
            }
        },

        showEdit () {
            this.form = {
                title: this.data.title || '',
                status: this.data.status || '',
                deadline: this.data.deadline || '',
                tags: this.data.tags || [],
            }
            this.isEditable = true;
        },

        handleEditProjectDetails(actionVal) {
            const payload = {
                ...this.projectDetails
            }

            this.overviewActions[actionVal] = false;
        }
    },
    watch: {
        // isEditable(newVal, oldVal) {
        //     if (newVal !== oldVal && newVal === true) {
        //         this.form = {
        //             title: this.data.title || '',
        //             status: this.data.status || '',
        //             deadline: this.data.deadline || '',
        //             tags: this.data.tags || [],
        //         }
        //     }
        // }
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
