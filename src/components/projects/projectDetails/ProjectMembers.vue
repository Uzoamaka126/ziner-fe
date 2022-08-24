<template>
    <div style="height: 100%; padding-right: 50px; padding-left: 50px; padding-top: 1rem">
         <div class="flex align-items-center mt--20 justify-content-between">
            <div class="heading">
                <p class="title">
                {{ 
                    (members.length === 0 || members.length > 1)
                    ? members.length + ' ' + 'Workspace Members' 
                    : members.length + ' ' + 'Workspace Member' 
                }}
                </p>
                <p class="sub-title">Members of a workspace can view, create and join all boards on that workspace.</p>
            </div>
            <div class="flex align-items-center cursor-pointer">
                <span class="">
                    <icon-svg 
                        fill="#576b8c" 
                        class="nav__icon mr--0" 
                        name="add" 
                        icon-position="left"
                        :width="'14px'"
                        :height="'14px'"
                    /> 
                </span>
                <span class="text--xs" style="color: #172b4d; font-weight: 500;">New member</span>
            </div>
        </div>
        <!-- boards functionalities header -->
        <div class="flex align-center justify-content-between mt--20">
            <div class="form__item mr--15 mb--0 justify-content-end" style="min-width: 30%">
                <input 
                    style="padding-top: 6px; padding-bottom: 6px;" 
                    class="" v-model="search.value" 
                    placeholder="Search members by name" 
                />
            </div>
            <div class="flex align-center">
                <span class="form__item mr--15 mb--0">
                    <label for="" class="label__sort">Sort by</label>
                    
                </span>
                <span class="form__item">
                    <label for="" class="label__filter">Filter by</label>
                </span>
            </div>
        </div>
        <!-- table -->
        <div class="mt--40 mb--20">
            <div style="display: flex;" v-for="member in members" :key="member.id">
                <div class="member__item" >
                    <div class="member--left">
                        <div class="member__names--avatar">
                            <span class="member__names--initials">AA</span>
                        </div>
                        <div class="member__names--details">
                            <p class="full-name">{{ member.name }}</p>
                            <p class="username">@{{ member.email }}</p>
                        </div>
                    </div>
                    <div class="member--right">
                        <div class="member--right__boards">
                            <button class="btn--ghost">2 boards on this workspace</button>
                        </div>
                        <div class="member--right__admin member--right__badge badge" :class="{ 'blue': badgeBgColor(member.type) === 'blue' }">{{ member.type }}</div>
                        <div class="member--right__actions">
                            <button class="btn--ghost view--more">View more</button>
                            <!-- if the user is an admin, they should be able to view this -->
                            <span class="ml--15 cursor-pointer">
                                <icon-svg 
                                    fill="rgba(194, 200, 212, 1)" 
                                    class="nav__icon" 
                                    name="edit" 
                                    icon-position="left"
                                    :width="'24px'"
                                    :height="'24px'"
                                /> 
                            </span>
                            <span class="cursor-pointer">
                                <icon-svg 
                                    fill="rgba(194, 200, 212, 1)" 
                                    class="nav__icon mr--0" 
                                    name="delete" 
                                    icon-position="left"
                                    :width="'24px'"
                                    :height="'24px'"
                                /> 
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { createdWorkspaces } from '../../../utils/dummy'
import IconSvg from '../../shared/icons/Icon-Svg.vue';
import { mapState } from 'vuex';

export default {
    name: 'ProjectMembers',
    watch:{
    //watch for route parameter change and execute method
    },
    created() {
        // if(this.user && this.user.isRecentlyCreated === true) {
        //     this.setShowOnboardingModal('show');
        // }
        this.fetchWorkspaceMembers();
        // console.log(this.fetchWorkspaceMembers);
    },
    data: () => ({
        createdWorkspaces: createdWorkspaces.boards,
        isMenuItemHover: '',
        search: {
            active: false,
            value: ''
        },
        sortValue: '',
        filterValue: '',
        members: null
    }),
    components: {
        IconSvg,
    },
    props: ['currentWorkspaceItem'],
    computed: {
        ...mapState(['workspace']),
    },
    methods: {
         badgeBgColor(type) {
            if(type === 'Member') {
                return 'blue'
            } else {
                return 'green'
            }
        },
        showMenuIconOnHover(name) {
            if(name === null) {
                // this.isMenuItemHover = '';
                // this.isMenuDropdownShow = '';
                return
            } else {
                const getWorkspaceItem = this.createdWorkspaces.find(item => item.name === name)
                if (getWorkspaceItem.name) {
                this.isMenuItemHover = getWorkspaceItem.name;
                }
            }
        },
        fetchWorkspaceMembers() {
            const currentWorkspace = JSON.parse(localStorage.getItem("workspaceDetails"));
            if(currentWorkspace.members) {
                this.members = currentWorkspace.members;
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .home--content__wrap {
        display: flex;
        flex-wrap: wrap;
    }
    .workspace--theme--img {
        height: 120px;
        width: 120px;
        border-radius: 20px;
    }
    .home--content--item {
        border-radius: 30px;
        height: 226px;
        min-width: 152px;
        width: 152px;
        align-items: center;
        display: flex;
        flex-flow: column;
        position: relative;
        transition-duration: .4s;
        margin-right: 1.8rem;

         &:hover {
            transform: translate3d(0, 4px, 0);
        }
    }
    .create--workspace {

        &__wrap {
            cursor: pointer;
        }
        &__img {
            background: transparent;
            border: 1px solid rgba(193, 163, 249, 0.25);
            box-shadow: 0 0.03px .1px 0 rgba(0, 0, 0, 0.12);
            span {
                margin-right: 4px;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 100%;
                height: 100%;
            }
        }
    }
    .menu__wrap--icon {
        border: 1px solid red;
        height: 24px;
        position: absolute;
        right: 0;
        z-index: 1000;
        top: 8px;
        opacity: 0;
        right: 8px;
        transition: opacity .4s;

        &.show {
            opacity: 1;
        }
    }

    .dropdown--menu {
        max-width: 500px;
        min-width: 180px;
        font-size: 14px;
        left: 0 !important;
        z-index: 99999;
        position: absolute;
        will-change: transform;
        top: 0px;
        right: auto;
        float: left;
        border: 1px solid rgba(0,0,0,.15);
        border-radius: .25rem;
    }
    .theme-display--preview {
        border-radius: 3px;
        height: 24px;
        width: 24px;
        background: antiquewhite;
        margin-right: 5px;
    }
    .dropdown__item__link {
        padding: 8px 10px 8px 10px;
    }
    .heading {
        font-size: 18px;
        line-height: 30px;

         p {
            &.title {
                font-weight: 600;
            }
            &.sub-title {
                font-size: 14px;
            }
        }
    }

</style>