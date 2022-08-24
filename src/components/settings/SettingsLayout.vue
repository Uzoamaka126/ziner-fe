<template>
    <div style="height: 100%" class="main">
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
    </div>
</template>

<script>
import SettingsProfile from './SettingsProfile.vue';
import SettingsDisplay from './SettingsDisplay.vue';
import Tabs from '../shared/tabs/Tabs.vue';
import Tab from '../shared/tabs/Tab.vue';


export default {
    name: 'SettingsLayout',
    created() {
        // console.log(this.user);
        
    },
    components: {
        SettingsProfile,
        SettingsDisplay,
        Tabs,
        Tab
    },
    props: {
        user: Object
    },
    data: () => ({
        currentTabComponent: "SettingsProfile",
        tabsList: [
            {   
                id: 'Profile',
                component: 'SettingsProfile'
            },
            {   
                id: 'Display',
                component: 'SettingsDisplay'
            },
            {   
                id: 'Account Settings',
                component: 'Account Settings'
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .main {
        padding-top: 30px;
    }

</style>

<!-- <tabs>
            <tab title="Profile" titleSlot="lll">

            </tab>
            <tab title="Display" titleSlot="bbb"></tab>
            <tab title="Account Settings"></tab>
        </tabs> -->