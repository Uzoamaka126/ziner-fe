<template>
    <div class="nav__section__content__group ">
        <div class="nav__section--item nav__section--item--sub">
            <div class="workspace-link" :to="{name:'workspaces'}" style="min-width: 60%;">  
                <span class="nav__section__content__group__title ml--0">Track</span>
            </div>
        </div>
        <div class="home--content__wrap">
            <router-link :to="{ name:'workspaces' }" class="nav__section--item">
                <icon-svg 
                    fill="rgba(66, 82, 110)" 
                    class="nav__icon" 
                    icon-position="left"
                    name="layer" 
                    :style="{ fill: 'rgba(66, 82, 110)' }"
                    :width="'24px'"
                />   
                <span class="nav__section__content__group__title">Tracker</span>
            </router-link>
        </div>
    </div>
</template>

<script>
import IconSvg from "../../shared/icons/Icon-Svg.vue";

export default {
    name: 'TrackNavigation',
     watch:{
        //watch for route parameter change and execute method
        '$route': 'clearOnUnMount',
    },
    components: {
        'icon-svg': IconSvg,
    },
    created() {
        console.log(this.$route.path);
    },
    data: () => ({
        activeWorkspace: ''
    }),
    computed: {
    },
    methods: {
        getHyphenatedPath(str) {
            return str.replace(/\s/g, "-").toLowerCase();
        },
        
    },
    mounted() {
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .workspace-link.active {
        span {
            color: #5750ec;
            font-weight: 600;
        }
    }
    .nav__workspace--link {
        padding: 10px;
        display: flex;
        align-items: center;

        &.active, &:hover {
            color: #5750ec;
            font-weight: 600;
            background-color: #e4e9fd;
        }
    }
    .nav__section__content__group {
        overflow-x: scroll;
        max-height: 200px;
    }
    .home--content__wrap {
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        margin-top: 0;
        padding-left: 0;
    }
    .workspace--theme--img {
        width: 1rem;
        height: 1rem;
    }
</style>
