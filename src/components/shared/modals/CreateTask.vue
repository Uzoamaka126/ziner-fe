<template>
    <div class="modal fade" id="createTask" tabindex="-1" aria-labelledby="createTaskLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="createTaskLabel">Add new task </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form @submit.prevent="" class="form--workspace__create mb--20">
                        <div class="form__item">
                            <div class="">
                                <label for="name" class="form-label">Task name</label>
                                <input type="text" class="form-control form-control-sm" v-model="taskName" id="name" placeholder="Do xyz today">
                            </div>
                            <p class="text-mute text--xxs text--info mt-1" v-if="checkNameLength">Task name should be not less than four words</p>
                        </div>
                        <div class="task__create--status form__item">
                             <div class="form__item">
                                <div for="name" class="form-label text--sm flex align-items-center">
                                   Priority
                                </div>
                                <div class="form-control" style="padding-left: 5px">
                                    <button class="btn filter--btn filter--btn__noBorder btn__select btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        {{ priority || 'Select a priority' }}
                                    </button>
                                    <ul class="dropdown-menu filter__dropdown-menu" style="width: 87%;">
                                        <li class="cursor-pointer" v-for="(item, index) in priorityLabels" :key="index" @click="setPriority(item.name)">
                                            <div class="dropdown-item text--xs flex align-items-center" style="display: flex">
                                                <icon-svg 
                                                    :name="item.icon"
                                                    icon-position="left"
                                                    :width="'12px'"
                                                    :styles="'display: inline-block;'"
                                                /> 
                                                <span class="ml--5" style="align-self: flex-end;">{{ item.name }}</span>
                                            </div>
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
                                <v-date-picker v-model="deadlineDate">
                                    <template #default="{ inputValue, inputEvents }">
                                        <input class="px-3 py-1 border rounded form-control text--sm" :value="inputValue" v-on="inputEvents" />
                                    </template>
                            </v-date-picker>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn--secondary btn--sm" data-bs-dismiss="modal" @click="resetValues()">Cancel</button>
                    <button type="button" class="btn btn--primary btn--sm" :disabled="isBtnDisabled">Create task</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import IconSvg from '../../shared/icons/Icon-Svg.vue';
import { priorityLabels } from '../../../utils/dataHelpers'

export default {
    name: 'CreateTask',
    props: [],
     components: {
        IconSvg,
    },
    data: () => ({
       taskName: '',
       taskStatus: ['Pending', "Completed", "On-Hold"],
       state: 'default',
       priorityLabels: priorityLabels,
       priority: '',
       deadlineDate: null
    }),
    computed: {
        isBtnDisabled() {
            if(this.taskName.length < 3|| !this.priority || !this.deadlineDate) {
                return true
            } else {
                return false
            }
        },
        checkNameLength() {
            if (this.taskName.length < 4) {
                return true
            } else {
                return false
            }
        }
    },
    methods: {
        setPriority(val) {
            this.priority = val
        },
        handleCreateTask() {},
        resetValues() {
            this.priority = '',
            this.deadlineDate = null,
            this.taskName = ''
        }
    }
}
</script>