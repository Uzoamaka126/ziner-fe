<template>
    <div>
        <tabs :list="tabs">
            <template v-slot="slotProps">
                <tab :isActive="slotProps.data.component === 'Overview'" :title="'Overview'">
                    <project-overview 
                        :data="{
                             _id: currentProject._id,
                            title: currentProject.title,
                            status: currentProject.status,
                            deadline: currentProject.deadline,
                            tags: currentProject.tags
                        }" 
                        :loading="loadingState" 
                    /> 
                </tab>
                <!-- v-slot="{ name, isActive, ff }, item" -->
                <tab :isActive="slotProps.data.component === 'Boards'" :title="'Boards'">
                     <project-boards />
                </tab>
                <tab :isActive="slotProps.data.component === 'Tasks'" :title="'Tasks'">
                    <project-tasks 
                        :tasks="currentProject.tasks" 
                        :loading="loadingState" 
                        :projectId="currentProject._id" 
                        :userId="currentProject._id" 
                    />
                </tab>
                <tab :isActive="slotProps.data.component === 'Members'" :title="'Members'">
                    <project-members />
                </tab>
                <tab :isActive="slotProps.data.component === 'Calendar'" :title="'Calendar'">
                    <project-calendar />
                </tab>
                <tab :isActive="slotProps.data.component === 'Invoices'" :title="'Invoices'">
                    <project-invoice />
                </tab>
            </template>
        </tabs>
    </div>
</template>

<script>
import projects from '../assets/js/projects.json'
import Tabs from '../components/shared/tabsTwo/Tabs'
import Tab from '../components/shared/tabsTwo/Tab'
import ProjectOverview from '../components/projects/projectDetails/ProjectOverview';
import ProjectBoards from '../components/projects/projectDetails/ProjectBoards.vue';
import ProjectMembers from '../components/projects/projectDetails/ProjectMembers.vue';
import ProjectTasks from '../components/projects/projectDetails/ProjectTasks.vue';
import ProjectCalendar from '../components/projects/projectDetails/ProjectCalendar.vue';
import ProjectInvoice from '../components/projects/projectDetails/ProjectInvoice.vue'
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
        ProjectOverview,
        ProjectBoards,
        ProjectMembers,
        ProjectCalendar,
        ProjectInvoice,
        ProjectTasks,
        Tabs,
        Tab
    },
    props: {
        user: Object
    },
    data () {
        return {
            title: '',
            currentTabComponent: "Overview",
            tabsList: projectUtils.tabList,
            selectedIndex: 0,
            projects: projects,
            currentProject: {
                _id: '',
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
            currentProps: undefined,
            tabs: projectUtils.tabList
        }
    },
    computed: {},
    methods: {
        getCurrentTab(value, index, name) {
            this.currentTabComponent = value;
            this.selectedIndex = index;
        },

        transformStr(str) {
            const transformedStr = others.toLowerCaseTransform(str)
            console.log({ transformedStr });
            return transformedStr
        },

        handleFetchProject() {
            this.loadingState = 'loading';
            const id = this.$route.params.id;
            
            const project = this.projects.find(item => item._id === id);

            setTimeout(() => {
                this.title = project?.title || '',
                this.currentProject = {
                    _id: project._id,
                    title: project?.title || '',
                    status: project?.status || '',
                    deadline: project?.deadline || '',
                    tags: project?.tags || [],
                    tasks: project?.tasks || [],
                    invoices: project?.invoices || []
                }
                
                this.loadingState = 'success';
            }, 2000)
        },

        computeProps() {
            this.currentProps = projectUtils.calculateProps(this.currentTabComponent, this.currentProject)
        }
    },
     watch: {
        '$route': 'handleFetchProject',
        
        title(newVal, oldVal) {
            if (newVal !== oldVal) {
                this.computeProps()
            }
        }
    }
}
</script>