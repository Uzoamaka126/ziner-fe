<template>
    <div class="nav__section__content__group">
        <router-link :to="{ name:'settings-view' }" class="nav__section--item">
            <icon-svg 
                fill="rgba(66, 82, 110)" 
                class="nav__icon" 
                name="settings-2" 
                :style="{ fill: 'rgba(66, 82, 110)' }"
                :width="'24px'"
            />   
            <span class="nav__section__content__group__title">Settings</span>
        </router-link>
    </div>
</template>

<script>
import IconSvg from "../../shared/icons/Icon-Svg.vue";

export default {
    name: 'SettingsNavigation',
    components: {
        'icon-svg': IconSvg
    },
    data: () => ({
    }),
    computed: {
        // df () {
        //     return this.showOnboardingModal
        // }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .nav__section--item {
        display: flex;
        align-items: center;
        color: #42526e;
        // margin-bottom:9px;
        padding-left:10px;
    }
    .nav__section--item--sub {
        display: flex;
        justify-content: space-between;
        align-items: center;
        text-transform: uppercase;
        
        span {
            font-size: 12px;
        }
    }
</style>
