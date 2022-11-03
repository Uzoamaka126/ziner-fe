<template>
    <div class="nav__section__content__group">
        <router-link :to="{ name:'settings-view' }" class="nav__section--item" :class="{ 'active': activeName === 'settings' }">
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
    props: ['activeName'],
    components: {
        'icon-svg': IconSvg
    },
}
</script>
