<template>
    <div>
        <div>
            <template v-if="loading === 'loading'">
                <div class="flex justify-content-center align-items-center  mt--40 mb--45">
                    <div class="spinner-border text-primary" role="status" style="color: #5f76d3 !important">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
            </template>
            <template v-else>
                <div class="align-items-center justify-content-between" style="display: flex;">
                    <div class="list--count">
                        <p>{{ tasks.length }} {{ tasks.length > 1 ? 'tasks' : 'task' }}</p>
                    </div>
                    <div class="flex align-items-center justify-content-between" v-if="tasks.length > 0">
                        <outline-button 
                            :classNames="'text--xs flex align-items-center mr--5'" 
                            :outlineType="'secondary'"
                            :btnSize="'fit-content'" 
                            @submit="handleAddTask" 
                            :label="'Add task'" 
                        >
                            <span class="flex ">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" style="fill: #5e6c84;transform: ;msFilter:;">
                                    <path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path>
                                </svg>
                            </span>
                        </outline-button>
                        <!-- filter  -->
                        <div class="flex align-items-center" v-if="tasks.length > 1">
                            <main-filter :filter="filter" @filter="filterTasks" />
                            <sort-filter :filter="displayType" @setType="setDisplayType" />
                        </div>
                    </div>
                </div>
                <!-- content -->
                <div v-if="tasks.length > 0">
                    <div>
                        <div class="col-12 mt--40">
                            <draggable v-model="tasks">
                                <template v-slot:item="{item}">
                                    <div 
                                        class="task__completed--list" 
                                        :id="item._id" 
                                        @mouseleave="toggleActionBtnsOnHover(item._id, 'leave')" 
                                        @mouseover="toggleActionBtnsOnHover(item._id, 'show')"
                                    >
                                        <span class="task__completed__wrap">
                                            <svg class="task__completed--icon" focusable="false" viewBox="0 0 32 32">
                                                <path class="outer-path" d="M31,16c0,8.3-6.7,15-15,15S1,24.3,1,16S7.7,1,16,1S31,7.7,31,16z"></path>
                                                <path class="inner-path" d="M13.4,22.1c-0.3,0-0.5-0.1-0.7-0.3l-3.9-3.9c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l3.1,3.1l8.1-8.1c0.4-0.4,1-0.4,1.4,0   s0.4,1,0,1.4l-8.9,8.9C13.9,22,13.7,22.1,13.4,22.1z"></path>
                                            </svg>
                                        </span>
                                        <div class="width--100">
                                            <div class="flex align-items-center justify-content-between">
                                                <input 
                                                    class="form-control form-control-sm task__form--input" 
                                                    type="text" 
                                                    v-model="item.name" 
                                                    @keyup="removeTaskByDeletion(item._id, item.name)"
                                                    :id="item._id"
                                                    style="width: 70%;"
                                                >
                                                <div class="flex align-items-center tasks__action--btns" :id="`taskActionBtns-${item._id}`" :class="{ 'active':showBtns }">
                                                    <span class="mr--5">
                                                        <icon-svg
                                                            :name="'alarm'"
                                                            icon-position="left"
                                                            :width="'16px'"
                                                            :fill="'rgba(128, 128, 128, 1)'"
                                                            type="button"
                                                            title="'Set deadline'"
                                                            data-bs-toggle="tooltip" 
                                                            data-bs-placement="top" 
                                                        /> 
                                                    </span>
                                                    <span class="mr--5">
                                                        <icon-svg
                                                            :name="'flag'"
                                                            icon-position="left"
                                                            :width="'16px'"
                                                            :fill="'rgba(128, 128, 128, 1)'"
                                                            type="button"
                                                            title="'Set priority'"
                                                            data-bs-toggle="tooltip" 
                                                            data-bs-placement="top" 
                                                        /> 
                                                    </span>
                                                    <span>
                                                        <icon-svg
                                                            :name="'delete'"
                                                            icon-position="left"
                                                            :width="'16px'"
                                                            :fill="'rgba(209, 69, 59, 1)'"
                                                            type="button"
                                                            title="'Delete this task'"
                                                            data-bs-toggle="tooltip" 
                                                            data-bs-placement="top" 
                                                        /> 
                                                    </span>
                                                </div>
                                            </div>
                                            <div class="text--xs text--color-warning" style="padding: 0rem 0.7rem 0.3rem;">Due date: {{ formatDate(item.deadline) }}</div>
                                        </div>
                                    </div>
                                </template>
                            </draggable>
                        </div>
                    </div>
                </div>
                <div v-else>
                    <empty-page 
                        :title="'You have no tasks yet.'" 
                        :subtitle="'Your tasks will show up here once you add them.'" 
                        :iconName="'tasks'"
                        :width="'60px'"
                        :height="'60px'"
                    />
                </div>
            </template>
        </div>
        <create-task />
    </div>
</template>

<script>
import IconSvg from '../../shared/icons/Icon-Svg.vue';
import draggable from "vue3-draggable";
import EmptyPage from '../../shared/emptyPage/EmptyPage.vue'
import CreateTask from '../../shared/modals/CreateTask.vue';
import { taskActions } from '../../../utils/dataHelpers';
import MainFilter from '../../shared/filter/Main';
import SortFilter from '../../shared/filter/Sort';
import OutlineButton from '../../shared/buttons/OutlineButton.vue'
import { formatDateStrings, sortList } from '../../../utils/others';
import { te } from 'date-fns/locale';

export default {
    name: 'ProjectTasks',
    components: {
        IconSvg,
        draggable,
        EmptyPage,
        CreateTask,
        MainFilter,
        SortFilter,
        OutlineButton
    },
    props: ['tasks', 'loading'],
    created() {},
    data () {
        return {
            search: {
                active: false,
                value: ''
            },
            dragging: false,
            enabled: true,
            tasksViewType: {
                default: 'Pending',
                types: ['All', 'Pending', 'Completed']
            },
            taskActions: taskActions,
            showBtns: false,
            isPageLoading: false,
            displayType: '',
            filter: {
                status: {
                    types: {
                        "pending": "Pending", 
                        "due": "Due", 
                        "on-hold": 'OnHold',
                        'completed': 'Completed'
                    },
                    selected: [],
                },
                client: this.$route.query.client || undefined,
                title: this.$route.query.title || undefined,
            },
            showDeadlineModal: false,
            showPriorityModal: false,
            showDeleteModal: false
        }
    },
    computed: {
        draggingInfo() {
            return this.dragging ? "under drag" : "";
        },
    },
    methods: {
        handleAddTask () {
            this.list.push({ name: "Juan " + id, _id: id++ });
        },
        replace () {
            this.list = [{ name: "Edgard", _id: id++ }];
        },
        checkMove (e) {
            window.console.log("Future index: " + e.draggedContext.futureIndex);
        },
        removeTaskByDeletion(id, value) {
            var previousSibling = document.getElementById(id).previousElementSibling;
            if (value === '') {
                this.tasks = this.tasks.filter(item => item._id !== id)
                console.log(previousSibling);
                previousSibling.getElementsByTagName('input').focus
            }
        },
        setTasksView(val) {
            this.tasksViewType.default = val
        },
        markTaskAsCompleted(val) {},
        filterTasks () {
            const params = this.buildQueryString();
            this.$router.replace({ name: 'projects', query: params });
        },

        sortTasks() {
            console.log('log here');
            sortList(this.displayType, this.tasks, 'name')
        },
        setDisplayType(val) {
            this.displayType = val
        },
        formatDate(dateString) {
            return dateString && typeof dateString === 'string' ? formatDateStrings(dateString) : 'N/A'
        },
        toggleTaskBtnActions() {

        },
        toggleActionBtnsOnHover(id, type) {
            const getParentElem = document.getElementById(id);
            if (!getParentElem) {
                return
            }

            if (getParentElem && type === 'show') {
                document.getElementById(`taskActionBtns-${id}`).style.visibility = 'visible'
            } else {
                document.getElementById(`taskActionBtns-${id}`).style.visibility = 'hidden'
            }
        }

    },
    watch: {
        displayType(newType, oldType) {
            if(newType !== oldType) {
                this.sortTasks()
            }
        },
        // '$route': 'checkIfQueryParamsExists'
    }
}
</script>

<style lang="scss">
</style>
