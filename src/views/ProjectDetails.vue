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
                    <!-- <router-view :name="transformStr(currentTabComponent)"/> -->
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
import { toLowerCaseTransform } from '../utils/others'

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
    data () {
        return {
            currentTabComponent: "Overview",
            tabsList: [
                {   
                    id: 'Overview',
                    component: 'Overview',
                    name: 'Overview'
                },
                {   
                    id: 'Boards',
                    component: 'Boards',
                    name: 'Boards'
                },
                {   
                    id: 'Tasks',
                    component: 'Tasks',
                    name: 'asks'
                },
                {   
                    id: 'Tracker',
                    component: 'Tracker',
                    name: 'tracker'
                },
                {   
                    id: 'Calendar',
                    component: 'Calendar',
                    name: 'calendar'
                },
                {   
                    id: 'Invoices',
                    component: 'Invoices',
                    name: 'invoice'
                },
                // {   
                //     id: 'Files',
                //     component: 'ProjectOverview'
                //     name: 'files'
                // },
            ],
            selectedIndex: 0
        }
    },
    computed: {

    },
    methods: {
        getCurrentTab(value, index, name) {
            this.currentTabComponent = tab;
            this.selectedIndex = index;
        },
        transformStr(str) {
            console.log({ str });
            const transformedStr = toLowerCaseTransform(str)
            console.log({ transformedStr });
            return transformedStr
        }
    },
    //  watch: {
    //     getCurrentTab(newView, oldView) {
    //         if(newView !== oldView) {
    //             const component = this.tabsList.findIndex(item => item.name === this.$route.name)
    //             const
    //         }
    //     },
    //     '$route': 'checkIfQueryParamsExists'
    // }
}
</script>