<template>
    <div style="height: 100%">
        <div class="home__wrap">
            <div aria-expanded="false">
                <div data-bs-toggle="dropdown">
                    {{ reportItemType }}
                </div>
                <ul class="dropdown-menu dropdown-menu--tag" aria-labelledby="reportTypeItems">
                    <li class="cursor-pointer" v-for="item in reportItemTypes">
                        <router-link :to="{ path: `/dashboard/reports/${item.routeName }`}" class="dropdown-item block width-100 text--xs">{{ item.name }}</router-link>
                    </li>
                </ul>
            </div>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import IconSvg from "../shared/icons/Icon-Svg.vue";
import { createdWorkspaces } from '../../utils/dummy'

export default {
    name: 'HomeLayout',
    created() {
    },
    props: {
        user: Object
    },
    data () {
        return {
            showOnboardingModal: false,
            createdWorkspaces: createdWorkspaces,
            isHideProjectsReport: false,
            isHideInvoiceReport: false,
            reportItemType: 'project',
            reportItemTypes: [
                {
                    name: 'Projects',
                    routeName: 'projects'
                },
                {
                    name: 'Clients',
                    routeName: 'clients'
                },
                {
                    name: 'tasks',
                    routeName: 'tasks'
                },
            ]
            
        }
    },
    computed: {
    },
    components: {
        'icon-svg': IconSvg,
    },
    methods: {
        hideContent(val) {
            if(val === "projects") {
                this.isHideProjectsReport = !this.isHideProjectsReport;
            } else {
                this.isHideInvoiceReport = !this.isHideInvoiceReport;
            }
        },
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    @import '../../assets/scss/pages/home.scss';

    .home__onboarding--btn {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        margin-top: 1rem;
    }
</style>