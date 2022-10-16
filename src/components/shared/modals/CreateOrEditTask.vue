<template>
    <div>
        <main-modal 
            :showModal="showModal" 
            :isCloseButton=false 
            :modalSize="'modal__dialog--lg'"
            :width="'620px'"
            :position="'center'"
            :isShowHeader="true"
            :title="computedModalHeaderText"
            :headerSize="'16px'"
        >
            <template #body>
                <div class="modal__wrapper--onboarding mb--45">
                    <div class="modal--section">
                        <div>
                            <form @submit.prevent="" class="form--workspace__create mb--20">
                                <div class="form__item">
                                    <div class="">
                                        <label for="name" class="form-label">Task name <span class="ml--5 text--xs text--color-warning">*</span></label>
                                        <input type="text" class="form-control form-control-sm" v-model="form.name" id="name" placeholder="Do xyz today">
                                    </div>
                                    <!-- <p class="text-mute text--xxs text--info mt-1" v-if="form.name">Task name should be not less than four words</p> -->
                                </div>
                                <div class="task__create--status form__item">
                                    <div class="form__item">
                                        <label for="name" class="form-label text--sm flex align-items-center mb--10">Priority <span class="ml--5 text-faded text--xs">(optional)</span></label>
                                        <div class="">
                                            <ul class="align-items-center flex ml--0 pl--0 mb--0">
                                                <li class="task__priority--item" v-for="(item, index) in priorityLabels" :key="index" @click="setPriority(item)">
                                                    <span class="text--sm task__priority--flag" :class="{ 'selected': form.priority === item }">
                                                        <icon-svg 
                                                            :name="item + 'PriorityFlag'"
                                                            :width="'24px'"
                                                            :styles="'display: inline-block;'"
                                                        /> 
                                                    </span>
                                                    <p class="text--xxs text--color-normal mt--10 text-center">{{ item }}</p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div class="form__item">
                                    <div class="">
                                        <label for="deadline" class="form-label text--sm flex align-items-center">
                                            Deadline for this task 
                                            <span class="ml--5 text-faded text--xs">(optional)</span>
                                        </label>
                                        <v-date-picker v-model="form.deadline">
                                            <template #default="{ inputValue, inputEvents }">
                                                <input class="px-3 py-1 border rounded form-control text--sm" :value="inputValue" v-on="inputEvents" />
                                            </template>
                                    </v-date-picker>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </template>
            <template #footer>
                <div class="width--100">
                    <button class="btn btn--secondary btn--sm form__footer--btnFirst" type="submit" @click="resetValues()">Cancel</button>
                    <button class="btn btn--sm btn--primary" :disabled="isBtnDisabled" type="submit" @click="handleSubmit">{{ computedPrimaryBtnext }}</button>
                </div>
            </template>
        </main-modal>
    </div>
</template>

<script>
import MainModal from './MainModal.vue';
import IconSvg from '../../shared/icons/Icon-Svg.vue';

export default {
    name: 'CreateOrEditTaskModal',
    components: {
        MainModal,
        IconSvg,
    },
    props: ["showModal", 'actionType', 'task'],
    data() {
        return {
            taskStatus: ['Pending', "Completed", "On-Hold"],
            priorityLabels: ['Low', 'Medium', 'High', 'Highest'],
            form: {
                _id: '',
                name: '',
                description: '',
                priority: '',
                deadline: '',
                isCompleted: false
            },
            loading: false,
        }
    },
    computed: {
        isBtnDisabled() {
            if(!this.form.name) {
                return true
            } else {
                return false
            }
        },
        computedPrimaryBtnext() {
            if (this.actionType === 'add') {
                return 'Add'
            } else {
                return 'Save'
            }
        },
        computedModalHeaderText() {
            if (this.actionType === 'add') {
                return 'Create new task'
            } else {
                return 'Edit task'
            }
        }
    },
    methods: {
        setPriority(val) {
            this.form.priority = val
        },

        handleAddTask() {
            const payload = {
                ...this.form
            }
        },

        handleEditTask() {
            const form = {
                ...this.form
            }
        },

        resetValues() {
            this.form = {
                name: '',
                description: '',
                priority: '',
                deadline: '',
                isCompleted: false
            }
            this.$emit('cancel')
        },

        handleSubmit() {
            if (this.actionType === 'add') {
                this.handleAddTask();
            } else {
                this.handleEditTask();
            }
        }
    },
    watch: {
        task(val) {
            console.log({ val });
            if (val._id) {
                this.form = {
                    _id: this.task._id,
                    name: this.task.name,
                    description: this.task.description,
                    priority: this.task.priority,
                    deadline: this.task.deadline,
                    isCompleted: this.task.isCompleted
                }
            }
        }
        // '$route': 'checkIfQueryParamsExists'
    }
}
</script>