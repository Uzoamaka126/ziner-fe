<template>
    <div style="height: 100%">
        <div>
           <div class="report__wrap">
                <div class="report__left">
                    <h4 class="text--bold text--md text--capitalize">{{ reportItemType }}</h4>
                </div>
                <div aria-expanded="false" class="report__right">
                    <div data-bs-toggle="dropdown" class="flex">
                        <span class="text-capitalize">{{ reportItemType }}</span>
                        <span class="icon ml--5 cursor-pointer" tabindex="-1">
                            <icon-svg
                                :name="'custom-arrow-down'"
                                :width="'16px'"
                                :fill="'#95899b'"
                            /> 
                        </span>
                    </div>
                    <ul class="dropdown-menu dropdown-menu--tag" aria-labelledby="reportTypeItems">
                        <li class="cursor-pointer" v-for="item in reportItemTypes">
                            <span class="dropdown-item block width-100 text--xs" @click="setReportType(item.routeName)">{{ item.name }}</span>
                        </li>
                    </ul>
                </div>
           </div>
            <!-- <router-view></router-view> -->
            <project-reports v-if="reportItemType === 'projects'"></project-reports>
            <client-reports v-if="reportItemType === 'clients'"></client-reports>
            <task-reports v-if="reportItemType === 'tasks'"></task-reports>
        </div>
    </div>
</template>

<script>
import IconSvg from "../shared/icons/Icon-Svg.vue";
import ProjectReports from './ProjectReports'
import ClientReports from './ClientReports'
import TaskReports from './TaskReports'

export default {
    name: 'ReportsLayout',
    created() {
    },
    components: {
        IconSvg,
        ProjectReports,
        ClientReports,
        TaskReports,
    },
    props: {
        user: Object
    },
    data () {
        return {
            isHideProjectsReport: false,
            reportItemType: 'projects',
            reportItemTypes: [
                { name: 'Projects', routeName: 'projects' },
                { name: 'Clients', routeName: 'clients' },
                { name: 'Tasks', routeName: 'tasks' },
            ]
        }
    },
    methods: {
       setReportType(type) {
        if (!type) return
        this.reportItemType = type
        // this.$router.push(`/dashboard/reports/${type}`)
       }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    @import '../../assets/scss/pages/home.scss';

    .report__wrap {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 1rem;
        padding-left: 20px;
        padding-right: 20px;
    }
</style>