<template>
    <div class="sidebar--nav__wrap">
        <nav class="nav nav--sidebar" :style="{ width: sidebarWidth }">
            <div class="nav__section">
                <div class="nav__section__content">
                    <div class="nav__section__content__group no--border sidebar--nav__brand" style="margin-left: 0; margin-right: 0;">
                        <template v-if="!collapse">
                            <div class="nav__item__logo">
                                <siner-logo :layout="'left'" :padding-left-num="'1'"></siner-logo>
                            </div>
                            <div @click="toggleSidebar()" class="cursor-pointer">
                                <icon-svg 
                                    fill="rgba(125, 136, 157)" 
                                    class="nav__icon" 
                                    name="list-minus" 
                                    icon-position="left"
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
                            <!-- <template v-if="!showWorkspaceNav"> -->
                                <home-navigation></home-navigation>
                                <!-- Operations navigation group -->
                                <operations-navigation></operations-navigation>
                                <!-- <workspace-navigation></workspace-navigation> -->
                                <settings-navigation></settings-navigation>
                            <!-- </template> -->
                            <!-- <template v-else>
                                <workspace-item-navigation></workspace-item-navigation>
                            </template> -->
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
import ClientItemNavigation from './ClientNavigationItem.vue'

export default {
    name: 'SideBarLayout',
    components: {
        'siner-logo': Logo,
        IconSvg,
        OperationsNavigation,
        SettingsNavigation,
        HomeNavigation,
       ClientItemNavigation
    },
    created() {
        this.showWorkspaceNavComputed();
    },
    watch:{
        //watch for route parameter change and execute method
        '$route': 'showWorkspaceNavComputed',
    },
    data: () => ({
        showOnboardingModal: false,
        showWorkspaceNav: false
    }),
    computed: {
        
},
    methods: {
        showWorkspaceNavComputed () {
            if(!JSON.parse(localStorage.getItem('showWorkspaceNav'))) {
                this.showWorkspaceNav = false;
                return false
            } else {
                this.showWorkspaceNav = true;
                return true;
            }
        }
    },
    props: ["toggleSidebar", "collapse", "sidebarWidth"]
}
</script>
