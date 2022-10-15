<template>
    <div>
        <main-modal 
            :showModal="showModal" 
            :isCloseButton=false 
            :modalSize="'modal__dialog--lg'"
            :width="'620px'"
            :position="'center'"
            :isShowHeader="true"
            :title="'Create new task'"
            :headerSize="'16px'"
        >
            <template #body>
                <div class="modal__wrapper--onboarding mb--45">
                    <div class="modal--section">
                        <div>
                            <form @submit.prevent="" class="form--workspace__create mb--20">
                                <div class="form__item">
                                    <div class="">
                                        <label for="name" class="form-label">Task name</label>
                                        <input type="text" class="form-control form-control-sm" v-model="form.name" id="name" placeholder="Do xyz today">
                                    </div>
                                    <!-- <p class="text-mute text--xxs text--info mt-1" v-if="form.name">Task name should be not less than four words</p> -->
                                </div>
                                <div class="task__create--status form__item">
                                    <div class="form__item">
                                        <label for="name" class="form-label text--sm flex align-items-center">Priority</label>
                                        <div class="form-control">
                                            <ul class="align-items-center flex">
                                                <li class="cursor-pointer" v-for="(item, index) in priorityLabels" :key="index" @click="setPriority(item)">
                                                    <span class="text--sm task__priority--flag" :class="{ 'selected': form.priority === item }">
                                                        <icon-svg 
                                                            :name="item + 'PriorityFlag'"
                                                            :width="'12px'"
                                                            :styles="'display: inline-block;'"
                                                        /> 
                                                    </span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div class="form__item">
                                    <div class="">
                                        <div for="name" class="form-label text--sm flex align-items-center">
                                        Deadline for this task
                                        </div>
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
                    <button class="btn btn--sm btn--danger" type="submit" @click="handleAddTask">Delete task</button>
                </div>
            </template>
        </main-modal>
    </div>
</template>

<script>
import MainModal from './MainModal.vue';
import IconSvg from '../../shared/icons/Icon-Svg.vue';
import { priorityLabels } from '../../../utils/dataHelpers'

export default {
    name: 'CreateTaskModal',
    components: {
        MainModal,
        IconSvg,
    },
    props: ["showModal"],
    data() {
        return {
            taskStatus: ['Pending', "Completed", "On-Hold"],
            priorityLabels: ['Low', 'Medium', 'High', 'Highest'],
            form: {
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
            if(this.form.name) {
                return true
            } else {
                return false
            }
        },
    },
    methods: {
        setPriority(val) {
            this.priority = val
        },
        handleCreateTask() {
            const payload = {
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
        }
    }
}
</script>