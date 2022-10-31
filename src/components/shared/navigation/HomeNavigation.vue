<template>
    <div class="nav__section__content__group">
        <router-link to="/dashboard/reports" class="nav__section--item pr--10" :class="{ 'active': activeName === 'reports' }">
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
    props: ['activeName'],
    components: {
        'icon-svg': IconSvg
    },
}
</script>
