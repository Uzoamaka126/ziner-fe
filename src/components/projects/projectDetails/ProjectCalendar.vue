<template>
    <div>
        <!-- add new task to calendar -->
        <div>
            <div class="align-items-center mb--20 justify-content-end" style="display: flex;">
            <div class="btn--outline__sm align-items-center" data-bs-toggle="modal" data-bs-target="#createCalendarTask" style="display: flex;">
               <span class="flex ">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" style="fill: #5e6c84;transform: ;msFilter:;">
                        <path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path>
                    </svg>
               </span>
                <span>Add task to calendar</span>
            </div>
            </div>
            <v-calendar :attributes="attributes" is-expanded>
                <template #day-popover="{dayTitle, attributes }">
                    <div class="text-xs text-gray-300 font-semibold text-center">
                        {{ dayTitle }}
                    </div>
                    <popover-row
                        v-for="attr in attributes"
                        :key="attr.key"
                        :attribute="attr"
                    >
                        {{ attr.customData.description }}
                    </popover-row>
                </template>
            </v-calendar>
        </div>

        <create-calendar-task :addNewCalendarTask="addNewCalendarTask"></create-calendar-task>
    </div>
</template>

<script>
import IconSvg from '../../shared/icons/Icon-Svg.vue';
import CreateCalendarTask from '../../shared/modals/CreateCalendarTask.vue'
// import { mapState } from 'vuex';

export default {
    name: 'ProjectCalendar',
    data () {
        const todos = [
            {
                description: 'Take Noah to basketball practice.',
                isComplete: false,
                dates: { weekdays: 6 }, // Every Friday
                color: 'red',
            },
            {
                description: 'Start project X.',
                isComplete: false,
                dates: [ new Date(2021, 11, 12) ], // Jan 12th// Every Friday
                color: 'red',
            },
        ];
        return {
            incId: todos.length,
            todos,
        };
    },
    components: {
        IconSvg,
        'create-calendar-task': CreateCalendarTask
    },
    computed: {
        attributes() {
            return [
                // Attributes for todos
                ...this.todos.map(todo => ({
                dates: todo.dates,
                dot: {
                    color: todo.color,
                    class: todo.isComplete ? 'opacity-75' : '',
                },
                // We need to at least pass a truthy value for the popover to appear
                // Pass an object to customize popover settings like visibility, placement, etc.
                popover: {
                    visibility: 'click',
                     label: todo.description,
                },
                customData: todo,
                })),
            ];
            },
    },
    methods: {
        addNewCalendarTask(data) {
            this.todos = [...this.todos, data]
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
