<template>
    <div class="sidebar--nav__wrap">
        <nav class="nav nav--sidebar" :style="{ width: sidebarWidth }">
            <div class="nav__section">
                <div class="nav__section__content">
                    <div class="nav__section__content__group sidebar--nav__brand">
                        <template v-if="!collapse">
                            <div class="nav__item__logo">
                                <siner-logo :layout="'left'" :padding-left-num="'1'"></siner-logo>
                            </div>
                            <div @click="toggleSidebar()" class="cursor-pointer">
                                <icon-svg 
                                    fill="rgba(125, 136, 157)" 
                                    class="nav__icon" 
                                    name="chevron-left" 
                                    :style="{ fill: 'rgba(125, 136, 157)' }"
                                    :width="'24px'"
                                />  
                            </div>
                        </template>
                        <template v-else>
                            <div @click="toggleSidebar()" class="nav__item__logo cursor-pointer" style="padding-left: 2px; padding-right: 2px; width: 100%;">
                                <icon-svg 
                                    fill="rgba(125, 136, 157)" 
                                    class="nav__icon" 
                                    name="menu" 
                                    icon-position="left"
                                    :style="{ fill: 'rgba(125, 136, 157)' }"
                                    :width="'24px'"
                                />  
                            </div>
                        </template>
                    </div>

                     <div class="nav__section__content__links">
                        <template v-if="!collapse">
                            <home-navigation :activeName="computeRoute()"></home-navigation>
                            <operations-navigation :activeName="computeRoute()"></operations-navigation>
                            <settings-navigation :activeName="computeRoute()"></settings-navigation>
                        </template>
                        <template v-else>
                        </template>
                    </div>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
import Logo from '../Logo.vue';
import IconSvg from "../../shared/icons/Icon-Svg.vue";
import OperationsNavigation from './OperationsNavigation.vue';
import SettingsNavigation from './SettingsNavigation.vue';
import HomeNavigation from './HomeNavigation.vue';
import { routesNameMap } from '../../../utils/dataHelpers';

export default {
    name: 'SideBarLayout',
    components: {
        'siner-logo': Logo,
        IconSvg,
        OperationsNavigation,
        SettingsNavigation,
        HomeNavigation,
    },
    created() {
    },
    watch:{
        //watch for route parameter change and execute method
        '$route': 'computeRoute',
    },
    data() {
        return {
            showOnboardingModal: false,
            showWorkspaceNav: false,
            routeNameMap: routesNameMap
        }
    }, 

    methods: {
        computeRoute() {
            if (this.$route && this.$route.name) {
                return this.routeNameMap[this.$route.name]
            } else {
                return ''
            }
        }
    },
    props: ["toggleSidebar", "collapse", "sidebarWidth"]
}
</script>

<style lang="scss" scoped>
.sidebar--nav__brand {
    margin-left: 0; 
    margin-right: 0;
    height: 60px;
    width: 100%;
    padding-bottom: 0px;
}
</style>
