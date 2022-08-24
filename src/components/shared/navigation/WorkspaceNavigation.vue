<template>
    <!-- <div class="nav__section__content__group "> -->
        <div class="nav__section--item nav__section--item--sub">
            <div class="">
                <router-link class="workspace-link" :to="{name:'workspaces'}" style="min-width: 60%;">  
                    <span class="nav__section__content__group__title ml--0">Workspaces</span>
                </router-link>
                <span class="cursor-pointer" @click="createNewWorkspace()">
                    <icon-svg 
                    fill="rgba(66, 82, 110)" 
                    class="nav__icon" 
                    name="add" 
                    :style="{ fill: 'rgba(66, 82, 110)' }"
                    :width="'0.8rem'"
                    /> 
                </span>
            </div>
            <div class="home--content__wrap">
                <div 
                    class="home--content--item cursor-pointer"
                    v-for="(item, index) in createdWorkspaces" 
                    :key="index"
                >
                    <span
                        @click="goToWorkspace(item.name, item.id, item)"
                        class="nav__workspace--link"
                    >
                        <div class="workspace--theme--img"></div>
                        <span class="flex flex-column">
                            <span class="text--color-dark text--sm text--bold mt--5">{{ item.name }}</span>
                            <span class="text--xs text--normal text--color-normal" style="margin-top: 3px;">{{ item.type }}</span>
                        </span>
                    </span>
                </div>
            </div>
    </div>
</template>

<script>
import IconSvg from "../../shared/icons/Icon-Svg.vue";
import { createdWorkspaces } from '../../../utils/dummy'

export default {
    name: 'WorkspaceNavigation',
     watch:{
        //watch for route parameter change and execute method
        '$route': 'clearOnUnMount',
    },
    components: {
        'icon-svg': IconSvg
    },
    created() {
        console.log(this.$route.path);
    },
    data: () => ({
        createdWorkspaces: createdWorkspaces,
        activeWorkspace: ''
    }),
    computed: {
        computeCreatedWorkspaces () {
            return this.createdWorkspaces.slice(0, 2)
        },
    },
    methods: {
        createNewWorkspace() {
            // this.$store.dispatch('viewCreateWorkspaceModal', true);
            this.$store.commit('showCreateWorkspaceModal', true);
        },
        getHyphenatedPath(str) {
            return str.replace(/\s/g, "-").toLowerCase();
        },
        goToWorkspace(name, id, data) {
            const refinedPathName = name.replace(/\s/g, "-").toLowerCase();
            // this.activeWorkspace = name
            localStorage.setItem('workspaceId', id);
            localStorage.setItem('workspaceDetails', JSON.stringify(data));
            localStorage.setItem('showWorkspaceNav', true);
            this.$router.push({ name: 'workspace-detail-view', params: { name: refinedPathName } })
        },
        clearOnUnMount() {
            const path = this.$route.path;
            if (!path.includes('workspaces/')) {
                this.activeWorkspace = ''
            } 
            // else {
            //     const id = localStorage.getItem('workspaceId');
            //     const findWorkspaceObj = createdWorkspaces.find(item => item.id === id);
            //     if(findWorkspaceObj) {
            //         this.activeWorkspace = findWorkspaceObj.name
            //     }
            // }
        }
    },
    mounted() {
        const id = localStorage.getItem('workspaceId');
        const findWorkspaceObj = createdWorkspaces.find(item => item.id === id);
        if(findWorkspaceObj) {
            this.activeWorkspace = findWorkspaceObj.name
        }
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
