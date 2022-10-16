<template>
    <div>
        <div class="content--header">
            <div class="content--header__left" style="display: flex; align-items: center;">
                <div class="collapse--content"></div>
                <template  v-if="!showBackArrowBtn">
                    <!-- <div class="back--wrap">
                        <span class="back--link cursor-text">
                            <span>{{ computeHeaderTitle }}</span>
                        </span>
                    </div> -->
                </template>
                <div class="back--wrap" v-else>
                    <router-link class="back--link" :to="`/dashboard/${computeRouteName}`">
                        <icon-svg 
                            class="nav__icon mr--0" 
                            name="left-arrow-alt" 
                            icon-position="left"
                            :style="{ fill: 'rgba(66, 82, 110)' }"
                            :width="'16px'"
                        /> 
                        <span>Back to {{ computeHeaderTitle }}</span>
                    </router-link>
                </div>
            </div>

            <div class="content--header__right">
                <div class="header__create" style="height: 100%; display: flex; justify-content: center; align-items: center;">
                    <icon-svg 
                        fill="rgb(52, 69, 99)" 
                        name="info" 
                        icon-position="left"
                        :width="'1.5rem'"
                        :styles="iconStyles"
                    />  
                </div>
                <div class="dropdown">
                    <div class="dropdown-toggle cursor-pointer dropdown-toggle--profile" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                    <div class="avatar profile--avatar">
                            UA
                        </div>
                    </div>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <li>
                            <div class="profile__bio align-items-center mt--10 dropdown-item dropdown-custom-item">
                                <span>
                                    <div class="profile__bio--avatar avatar cursor-text">
                                        UA
                                    </div>
                                </span>
                                <span>
                                    <p class="profile__bio--sub cursor-text avatar--text">Uzoamaka Anyanwu</p>
                                    <p class="profile__bio--sub cursor-text avatar--text">amakadarosie@gmail.com</p>
                                </span>
                            </div>
                        </li>
                        <!-- <li>
                            <div class="profile__item__link dropdown-item dropdown-custom-item">
                                <a class="profile__bio--title">Personal Settings</a>
                            </div>
                        </li>
                        <li>
                            <div class="profile__item__link dropdown-item dropdown-custom-item">
                                <a class="profile__bio--title">Explore the dashboard</a>
                            </div>
                        </li> -->
                        <li>
                            <div class="profile__item__link dropdown-item dropdown-custom-item">
                                <p class="profile__bio--title">Sign out</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import IconSvg from "../../../shared/icons/Icon-Svg.vue";

export default {
    name: 'DashbaordContentHeader',
    
    components: {
        'icon-svg': IconSvg,
    },

    created() {},

    data() {
        return {
            dropdownIsActive: {
                workspaces: false,
                boards: false,
                user: false
            },
            iconStyles: {
            display: 'flex', 
            'align-items': 'center'
            },
            showCreateBoardModal: false,
            currentWorkspaceName: '',
            routeNameMap: {
                'home-view': 'Home',
                'projects-view': 'Projects',
                'clients-view': 'Clients',
                'client-details-view': 'Clients',
                'settings-view': 'Settings',
                'tags-view': 'Tags',
                'invoices-view': 'Invoices',
                'project-details-view': 'Projects',
                'create-invoice-view': 'Invoices',
                'invoice-details-view': 'Invoices',
            }
        }
    },
    
    computed: {
        computeRouteName() {
            const routeName = this.$route.name || '';
            return routeName && typeof routeName === 'string' ? this.routeNameMap[routeName]?.toLowerCase() : ''
        },
        computeHeaderTitle() {
            const routeName = this.$route.name || '';
            return routeName && typeof routeName === 'string' ? this.routeNameMap[routeName] : ''
        },
        showBackArrowBtn() {
            return this.$route.params.id || this.$route.name === 'create-invoice-view' ? true : false
        },
    },
    
    watch:{
    //watch for route parameter change and execute method
    },

    methods: {
        toggleDropdown(name, index) {
            console.log(name, index);
            var getDropdownClass = document.getElementsByClassName("dropdown");
            for (var i = 0; i < getDropdownClass.length; i++) {
                console.log(i, index);
                if(i === index) {
                    console.log(i, index, name, getDropdownClass[i].id);
                    // if(getDropdownClass[i])
                    if(name === getDropdownClass[i].id) {
                        this.dropdownIsActive[getDropdownClass[i].id] = !this.dropdownIsActive[getDropdownClass[i].id]
                    }
                }
            }
        },
        toggleCreateBoardModal(value) {
            const path = this.computeRouteName
            // let's take a look at the path first
            // if (path === )
            if(value === 'show') {
                this.showCreateBoardModal = true;
            } else if (value === 'hide') {
                this.showCreateBoardModal = false;
            } else {
                this.showCreateBoardModal = false;
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .back--wrap {
        span, a, svg {
            font-weight: 600;
            font-size: 0.75rem;
        }
    }
</style>
