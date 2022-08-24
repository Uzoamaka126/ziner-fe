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
export default {
    name: 'TabComp',
    created() {
        // console.log(this.user);
        
    },
    components: {
    },
    props: {
        user: Object,
        tabsList: Array,
        currentTabComponent: String
    },
    data: () => ({
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