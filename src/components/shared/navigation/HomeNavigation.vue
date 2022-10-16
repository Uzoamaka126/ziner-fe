<template>
    <div class="nav__section__content__group">
        <router-link :to="{ name:'reports-view' }" class="nav__section--item">
            <icon-svg 
                fill="rgba(66, 82, 110)" 
                class="nav__icon" 
                name="report" 
                icon-position="left"
                :style="{ fill: 'rgba(66, 82, 110)' }"
                :width="'24px'"
            />   
            <span class="nav__section__content__group__title">Reports</span>
        </router-link>
    </div>
</template>

<script>
import IconSvg from "../../shared/icons/Icon-Svg.vue";

export default {
    name: 'HomeNavigation',
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

<style lang="scss" scoped>
    .nav__section--item {
        padding: 10px;
    }
</style>
