<template>
    <div>
        <div>
            <div class="align-items-center justify-content-between" style="display: flex;">
            <div class="list--count">
                <p>{{ tasks.length }} {{ tasks.length > 1 ? 'tasks' : 'task' }}</p>
            </div>
            <!-- Add new task -->
            <div class="flex align-items-center justify-content-between" v-if="tasks.length > 0">
                <!-- filter -->
                <div 
                    class="btn--outline__sm align-items-center mr--10" 
                    data-bs-toggle="modal" 
                    data-bs-target="#createTask" 
                    style="display: flex; padding: .375rem .75rem;"
                >
                    <span class="flex ">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" style="fill: #5e6c84;transform: ;msFilter:;">
                            <path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path>
                        </svg>
                    </span>
                        <span>Add task</span>
                </div>
                <!-- filter  -->
                <div class="btn-group mr--10" role="group" aria-label="Basic example">
                    <button 
                        v-for="item in tasksViewType.types" 
                        :key="item" 
                        type="button" 
                        class="btn btn--outline__sm normal" 
                        :class="{'active' : tasksViewType.default === item }"
                        @click="setTasksView(item)"
                    >
                        {{ item }}
                    </button>
                </div>
                    <!-- search list -->
                <div class="filter__actions--list">
                    <form class="bd-search position-relative" style="margin-right: 0.5rem;">
                        <span class="algolia-autocomplete" style="position: relative; display: inline-block; direction: ltr;">
                            <input 
                                type="search" 
                                class="form-control" 
                                id="search-input" 
                                placeholder="Search by task name" 
                                aria-label="Search docs for..." 
                                autocomplete="off" 
                                data-bd-docs-version="5.1" 
                                spellcheck="false" 
                                role="combobox" 
                                aria-autocomplete="list" 
                                aria-expanded="false" 
                                aria-owns="algolia-autocomplete-listbox-0" dir="auto" 
                                style="position: relative; vertical-align: top; font-size: 12px; padding-left: 2rem;"
                            >
                                <span role="listbox" id="algolia-autocomplete-listbox-0" style="position: absolute; top: 3px; z-index: 100; left: 10px;">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" style="fill: #dee2e6;transform: ;msFilter:;">
                                        <path d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z"></path>
                                    </svg>
                                </span>
                        </span>
                    </form>
                </div>
            </div>
            </div>
            <!-- content -->
            <template v-if="computeTasksByView.length > 0">
                <div>
                    <div class="col-12 mt--40">
                        <draggable 
                            v-model="computeTasksByView" 
                            group="people" 
                            @start="dragging=true" 
                            @end="dragging=false" 
                            item-key="id"
                            @mouseleave="showBtns = false"
                            @mouseover="showActionBtnsOnHover()"
                        >
                            <template #item="{element}">
                                <div class="task__completed--list">
                                    <span class="task__completed__wrap">
                                        <svg class="task__completed--icon" focusable="false" viewBox="0 0 32 32">
                                            <path class="outer-path" d="M31,16c0,8.3-6.7,15-15,15S1,24.3,1,16S7.7,1,16,1S31,7.7,31,16z"></path>
                                            <path class="inner-path" d="M13.4,22.1c-0.3,0-0.5-0.1-0.7-0.3l-3.9-3.9c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l3.1,3.1l8.1-8.1c0.4-0.4,1-0.4,1.4,0   s0.4,1,0,1.4l-8.9,8.9C13.9,22,13.7,22.1,13.4,22.1z"></path>
                                        </svg>
                                    </span>
                                    <div class="flex align-items-center width--100 justify-content-between">
                                        <!-- name -->
                                        <input 
                                            class="form-control form-control-sm task__form--input" 
                                            type="text" 
                                            v-model="element.name" 
                                            @keyup="removeTaskByDeletion(element.id, element.name)"
                                            :id="element.id"
                                            style="width: 70%;"
                                        >
                                        <div class="flex align-items-center">
                                            <span
                                                v-for="item in taskActions"
                                                :key="item.id"
                                                class="tasks__action--btns"
                                                :class="{ 'active':showBtns }"
                                            >
                                                <icon-svg
                                                    :name="item.name"
                                                    icon-position="left"
                                                    :width="'16px'"
                                                    :styles="'display: inline-block; margin-right: 5px;'"
                                                    :fill="item.fill"
                                                    type="button"
                                                    :title="item.toolTipTitle"
                                                    data-bs-toggle="tooltip" 
                                                    data-bs-placement="top" 
                                                /> 
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </draggable>
                    </div>
                </div>
            </template>
            <template v-else>
                <empty-page 
                    :title="'You have no tasks yet.'" 
                    :subtitle="'Your tasks will show up here once you add them.'" 
                    :iconName="'tasks'"
                    :width="'60px'"
                    :height="'60px'"
                />
            </template>
        </div>
        <create-task />
    </div>
</template>

<script>
import IconSvg from '../../shared/icons/Icon-Svg.vue';
import draggable from "vuedraggable";
import EmptyPage from '../../shared/emptyPage/EmptyPage.vue'
import CreateTask from '../../shared/modals/CreateTask.vue';
import { taskActions } from '../../../utils/dataHelpers';

export default {
    name: 'ProjectTasks',
     components: {
        IconSvg,
        draggable,
        EmptyPage,
        CreateTask
    },
    created() {
        // if(this.user && this.user.isRecentlyCreated === true) {
        //     this.setShowOnboardingModal('show');
        // }
    },
    data () {
        return {
            search: {
                active: false,
                value: ''
            },
            tasks: [
                { name: "John", id: 0, status: 'completed' },
                { name: "Joao", id: 1, status: 'pending' },
                { name: "Jean", id: 2, status: 'completed' }
            ],
            dragging: false,
            enabled: true,
            tasksViewType: {
                default: 'Pending',
                types: ['All', 'Pending', 'Completed']
            },
            taskActions: taskActions,
            showBtns: false
        }
    },
    props: ['user'],
    computed: {
        draggingInfo() {
            return this.dragging ? "under drag" : "";
        },
        computeTasksByView() {
            if(this.tasksViewType.default === 'Pending') {
                return this.tasks.filter(item => item.status === 'pending')
            } else if (this.tasksViewType.default === 'Completed') {
                return this.tasks.filter(item => item.status === 'completed')
            } else {
                return this.tasks
            }
        }
    },
    methods: {
        add () {
            this.list.push({ name: "Juan " + id, id: id++ });
        },
        replace () {
            this.list = [{ name: "Edgard", id: id++ }];
        },
        checkMove (e) {
            window.console.log("Future index: " + e.draggedContext.futureIndex);
        },
        removeTaskByDeletion(id, value) {
            var previousSibling = document.getElementById(id).previousElementSibling;
            if (value === '') {
                this.tasks = this.tasks.filter(item => item.id !== id)
                console.log(previousSibling);
                previousSibling.getElementsByTagName('input').focus
            }
        },
        setTasksView(val) {
            console.log('val', val);
            this.tasksViewType.default = val
            console.log('this.tasksViewType.default', this.tasksViewType.default);
        },
        markTaskAsCompleted(val) {},
        showActionBtnsOnHover(val) {
            this.showBtns = true;
        }
    }
}
</script>

<style lang="scss">
.buttons {
  margin-top: 35px;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
</style>
