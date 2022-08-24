<template>
    <div class="tabs horizontal ">
        <ul class="tab-list left" role="tabList">
            <li 
                v-for="(tab, index) in tabsList"
                :key="tab.name"
                class="tab-list__item"
                tabIndex="0"
                role="tabItem"
                :aria-selected="selectedIndex === index ? true : false"
                @click="getCurrentTab(tab.component, index)"
            >
            {{ tab.id }}
            </li>
        </ul>
        <div class="tab">
            <div class="tab--panel" role="tabPanel" data-v-0292cb4e="">
                <div class="tab-content">
                    <keep-alive>
                        <component :is="currentTabComponent"></component>
                    </keep-alive>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ProjectOverview from '../components/projects/projectDetails/ProjectOverview';
import ProjectBoards from '../components/projects/projectDetails/ProjectBoards.vue';
import ProjectMembers from '../components/projects/projectDetails/ProjectMembers.vue';
import ProjectTasks from '../components/projects/projectDetails/ProjectTasks.vue';
import ProjectCalendar from '../components/projects/projectDetails/ProjectCalendar.vue';
import ProjectInvoice from '../components/projects/projectDetails/ProjectInvoice.vue'

export default {
    name: 'SettingsLayout',
    created() {
        // console.log(this.user);
        
    },
    components: {
        ProjectOverview,
        ProjectBoards,
        ProjectMembers,
        ProjectCalendar,
        ProjectInvoice,
        ProjectTasks
    },
    props: {
        user: Object
    },
    data: () => ({
        currentTabComponent: "ProjectOverview",
        tabsList: [
            {   
                id: 'Overview',
                component: 'ProjectOverview'
            },
            {   
                id: 'Boards',
                component: 'ProjectBoards'
            },
            {   
                id: 'Tasks',
                component: 'ProjectTasks'
            },
            {   
                id: 'Tracker',
                component: 'ProjectTracker'
            },
            {   
                id: 'Calendar',
                component: 'ProjectCalendar'
            },
            {   
                id: 'Invoices',
                component: 'ProjectInvoice'
            },
            {   
                id: 'Files',
                component: 'ProjectOverview'
            },
        ],
        selectedIndex: 0
    }),
    computed: {

    },
    methods: {
        getCurrentTab(value, index) {
            this.currentTabComponent = value;
            this.selectedIndex = index;
        }
    }
}
</script>