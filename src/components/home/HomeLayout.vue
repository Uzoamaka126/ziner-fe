<template>
    <div style="height: 100%">
        <div class="home__wrap">
            <div class="home__wrap--item">
                <div class="header__item--wrap">
                    <div class="home__onboarding--btn positionRelative">
                        <button class="btn btn--secondary btn--sm">Start Onboarding Tour</button>
                    </div>
                </div>
                <div class="header__item--wrap">
                    <div class="header" style="border-bottom: 0;">
                        <div style="display: flex; align-items: center">
                            <span @click="hideContent('projects')">
                                <icon-svg 
                                    fill="rgba(107, 119, 140, 1)" 
                                    class="nav__icon cursor-pointer" 
                                    name="arrow-down" 
                                    icon-position="left"
                                    :width="'1rem'"
                                    style="margin-right: 4px;"
                                /> 
                            </span> 
                            <span class="header--text">Projects Report</span>
                        </div>
                    </div>
                </div>
                <div class="home--content" :class="{ hide: isHideProjectsReport }">
                    <div class="home--content__wrap">
                       <column-chart 
                        loading="Loading..." 
                        :data="[['Sun (11/10/12)', 32], ['Mon', 46], ['Tue', 28], ['Wed', 30], ['Thur', 4]]"></column-chart>
                    </div>
                </div>
            </div>

            <!-- home wrap item 2 -->
            <div class="home__wrap--item" style="margin-top: 4rem;">
                <div class="header__item--wrap">
                    <div class="header" style="border-bottom: 0;">
                        <div class="left" style="display: flex; align-items: cemter">
                            <icon-svg 
                                fill="rgba(107, 119, 140, 1)" 
                                class="nav__icon cursor-pointer" 
                                name="arrow-down" 
                                icon-position="left"
                                :width="'1rem'"
                                style="margin-right: 4px;"
                            />  
                                <!-- @click="hideContent('invoices')" -->
                            <span class="header--text">Boards</span>
                        </div>
                    </div>
                </div>
                <div class="home--content">
                    <div class="home--content__wrap">
                       <column-chart 
                        loading="Loading..." 
                        :data="[['Sun (11/10/12)', 32], ['Mon', 46], ['Tue', 28], ['Wed', 30], ['Thur', 4]]"></column-chart>
                    </div>
                </div>
            </div>
        </div>
        <!-- Add onboarding modal -->
         <onboarding-modal 
            :user="{
                id: 1,
                isVerified: true
            }"
            :showOnboardingModal="showOnboardingModal"
        >
        </onboarding-modal>
        
    </div>
</template>

<script>
import OnboardingModal from '../shared/modals/Onboarding.vue';
import IconSvg from "../shared/icons/Icon-Svg.vue";
import { createdWorkspaces } from '../../utils/dummy'

export default {
    name: 'HomeLayout',
    created() {
        // console.log(this.user);
        // if(this.user && this.user.isRecentlyCreated === true) {
        //     this.setShowOnboardingModal('show');
        // }
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
            
        }
    },
    computed: {
    },
    components: {
        'onboarding-modal': OnboardingModal,
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
// 