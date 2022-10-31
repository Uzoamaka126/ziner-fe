<template>
   <div>
        <div class="nav__section__content__group ">
            <div class="nav__section--item nav__section--item--sub">
                <div class="workspace-link" :to="{name:'workspaces'}" style="min-width: 60%;">  
                    <span class="nav__section__content__group__title ml--0">Operations</span>
                </div>
            </div>
            <div class="home--content__wrap">
                <router-link 
                    v-for="link in links" 
                    :to="{ name: `${link.name}-view` }" 
                    class="nav__section--item" 
                    :class="{ 'active': activeName === link.name }"
                >
                    <icon-svg 
                        fill="rgba(66, 82, 110)" 
                        class="nav__icon" 
                        icon-position="left"
                        :name="link.iconName" 
                        :style="{ fill: 'rgba(66, 82, 110)' }"
                        :width="'24px'"
                    />   
                    <span class="nav__section__content__group__title text-capitalize">{{ link.name }}</span>
                </router-link>
            </div>
        </div>
   </div>
</template>

<script>
import IconSvg from "../../shared/icons/Icon-Svg.vue";

export default {
    name: 'OperationsNavigation',
    props: ['activeName'],
    data() {
        return {
            links: [
                { name: 'clients', iconName: 'layer', disabled: false },
                { name: 'projects', iconName: 'folder', disabled: false },
                { name: 'teams', iconName: 'multiple-users', disabled: true },
                { name: 'tags', iconName: 'tag', disabled: false },
                { name: 'invoices', iconName: 'receipt', disabled: false }
            ]
        }
    },
    components: {
        'icon-svg': IconSvg,
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .home--content__wrap {
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        margin-top: 0;
        padding-left: 0;
    }
    .beautifier {
        padding: 10px 15px !important;
        background: #000 !important;
        color: #f2f2f2 !important;
    }
</style>
