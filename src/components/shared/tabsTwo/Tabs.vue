<template>
    <div class="tabs horizontal ">
        <ul class="tab-list left" role="tabList">
            <li 
                v-for="(tab, index) in tabs"
                :key="tab.id"
                class="tab-list__item"
                tabIndex="0"
                role="tabItem"
                :aria-selected="selectedIndex === index ? true : false"
                @click="getCurrentTab(index)"
            >
            {{ tab.component }}
            </li>
        </ul>
        <slot :data="currentTab"></slot>
    </div>
</template>

<script>
import Tab from './Tab'

export default {
    name: 'Tabs',
    props: ['list', 'slotName'],
    components: {
        Tab
    },
    mounted () {
      this.getCurrentTab(0)
    },
    data() {
        return {
            selectedIndex: 0, // the index of the selected tab,
            tabs: this.list, 
            currentTab: {
                index: 0,
                name: '',
                component: '',
                isActive: false
            }
        }
    },
    methods: {
        getCurrentTab(i) {
            this.selectedIndex = i
            this.tabs.forEach((tab, index) => {
                tab.isActive = (index === i)
                if (index === i) {
                    this.currentTab = {
                        index: index,
                        name: tab.id,
                        component: tab.component,
                        isActive: tab.isActive
                    }
                }
            })
        }
    }
}
</script>