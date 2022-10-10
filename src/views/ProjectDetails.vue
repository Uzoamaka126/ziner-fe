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
import projects from '../assets/js/projects.json'
import Overview from '../components/projects/projectDetails/ProjectOverview';
import Boards from '../components/projects/projectDetails/ProjectBoards.vue';
import Members from '../components/projects/projectDetails/ProjectMembers.vue';
import Tasks from '../components/projects/projectDetails/ProjectTasks.vue';
import Calendar from '../components/projects/projectDetails/ProjectCalendar.vue';
import Invoice from '../components/projects/projectDetails/ProjectInvoice.vue'
import {
    projects as projectUtils,
    others
} from '../utils/index'

export default {
    name: 'ProjectDetails',
    created() {
        this.handleFetchProject()
    },
    components: {
        Overview,
        Boards,
        Members,
        Calendar,
        Invoice,
        Tasks
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
                },
                {   
                    id: 'Boards',
                    component: 'Boards',
                },
                {   
                    id: 'Tasks',
                    component: 'Tasks',
                },
                {   
                    id: 'Tracker',
                    component: 'Tracker',
                },
                {   
                    id: 'Calendar',
                    component: 'Calendar',
                },
                {   
                    id: 'Invoices',
                    component: 'Invoices',
                },
                // {   
                //     id: 'Files',
                //     component: 'ProjectOverview'
                // },
            ],
            selectedIndex: 0,
            projects: projects,
            currentProject: {
                title: '',
                status: '',
                deadline: '',
                tags: [],
                tasks: [],
                invoices: []
            },
            isEditable: false,
            isProjectLoading: false,
            loadingState: 'default',
        }
    },
    computed: {
        computedProps() {
            return projectUtils.calculateProps(this.currentTabComponent, this.currentProject)
        }
    },
    methods: {
        getCurrentTab(value, index, name) {
            this.currentTabComponent = value;
            this.selectedIndex = index;
        },
        transformStr(str) {
            console.log({ str });
            const transformedStr = others.toLowerCaseTransform(str)
            console.log({ transformedStr });
            return transformedStr
        },
        handleFetchProject() {
            this.loadingState = 'loading';
            const id = this.$route.params.id;
            
            const project = this.projects.find(item => item._id === id);
            
            setTimeout(() => {
                this.currentProject = {
                    title: project.title || '',
                    status: project.status || '',
                    deadline: project.deadline || '',
                    tags: project.tags || [],
                    tasks: project.tasks || [],
                    invoices: project.invoices || []
                }
                
                this.loadingState = 'success';
            }, 2000)
        },
    },
     watch: {
        '$route': 'handleFetchProject'
    }
}
</script>