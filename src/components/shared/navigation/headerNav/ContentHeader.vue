<template>
 <div>
      <div class="content--header">
        <div class="content--header__left" style="display: flex; align-items: center;">
            <div class="collapse--content">
            </div>
        <div class="workspace--header__title">
        <!-- workspace -->
           <template v-if="getRouterName === 'projectDetails'">
                <nav aria-label="breadcrumb" class="mt--20 ml--20">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item text--sm"><a href="#"></a>
                            <router-link :to="{ name: 'projects-view' }" class="text--sm">  
                                    Projects
                            </router-link>
                        </li>
                        <li class="breadcrumb-item active text--sm" aria-current="page">Single project name</li>
                    </ol>
                </nav>
           </template>
            <template v-if="getRouterName === 'createInvoice' || getRouterName === 'invoiceDetails'">
                <!-- Go back to invoices -->
                <div style="display: flex; margin-top: 1rem;">
                    <router-link :to="{ name: 'invoices-view' }" tag="div" class="page__back--wrap" style="margin-top: 0rem;">
                        <div class="page__back--icon" v-if="getRouterName === 'createInvoice'">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: #5469d4;transform: ;msFilter:;">
                                <path d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z"></path>
                            </svg>
                        </div>
                        <div class="page__back--text">
                            Invoices 
                        </div>
                    </router-link>
                     <template v-if="getRouterName === 'invoiceDetails'">
                        <span class="invoice__breadcrumb--text"> / </span> 
                        <span class="invoice__breadcrumb--text">{{ getRouterName === 'invoiceDetails' ? currentId : ''}}</span>
                    </template>
                </div>
           </template>
        </div>
    </div>

    <div class="content--header__right">
        <div class="header__create" v-if="showHeaderActionButton">
            <button class="btn btn--primary header__btn" data-bs-toggle="modal" :data-bs-target="getMatchingModal">   
                <icon-svg 
                    fill="#fff" 
                    name="add" 
                    icon-position="left"
                    :width="'12px'"
                />  
                <span class="text">Add new {{ getRouterName }}</span>
            </button>
        </div>
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
  <!-- modals -->
    <create-board-modal :toggleCreateBoardModal="toggleCreateBoardModal" :showCreateBoardModal="showCreateBoardModal"></create-board-modal>
    <create-project-modal></create-project-modal>
 </div>
</template>

<script>
// @ is an alias to /src
import IconSvg from "../../../shared/icons/Icon-Svg.vue";
import { createdWorkspaces } from '../../../../utils/dummy';
import CreateBoardModal from '../../modals/CreateBoard.vue';
import CreateProjectModal from '../../modals/CreateProjectTwo.vue';

export default {
    name: 'DashbaordContentHeader',
    
    components: {
        'icon-svg': IconSvg,
        'create-board-modal': CreateBoardModal,
        'create-project-modal': CreateProjectModal,
    },

    created() {
    },

    data: () => ({
        dropdownIsActive: {
            workspaces: false,
            boards: false,
            user: false
        },
        iconStyles: {
        display: 'flex', 
        'align-items': 'center'
        },
        createdWorkspaces: createdWorkspaces,
        showCreateBoardModal: false,
        currentWorkspaceName: '',
    }),
    
    computed: {
        currentId() {
            return this.$route.params.id ? this.$route.params.id : '';
        },
        getRouterName() {
            const routeName = this.$route.name;
            const routeNameMap = {
                'home-view': 'home',
                'projects-view': 'project',
                'clients-view': 'client',
                'settings-view': 'settings',
                'tags-view': 'tag',
                'teams-view': 'team',
                'invoices-view': 'invoicesList',
                'project-details': 'projectDetails',
                'create-invoice-view': 'createInvoice',
                'details-invoice-view': 'invoiceDetails',
            }
            if (routeName) {
                return routeNameMap[routeName]
            } else {
                return null
            }
        },
        getMatchingModal() {
            const routeName = this.$route.name;
            const modalNameMap = {
                'home-view': 'home',
                'projects-view': 'createProject',
                'settings-view': 'settings',
                'teams-view': 'createTeams',
                'invoices-view': 'invoicesList',
                'project-details': 'projectDetails',
            }
            if (routeName) {
                return `#${modalNameMap[routeName]}`
            } else {
                return null
            }
        },
        showHeaderActionButton() {
            if (this.getRouterName === 'project') {
                return true
            } else {
                return false
            }
        }
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
            const path = this.getRouterName
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
  .workspace--header__title {
      display: flex;
      span {
        font-size: 14px;
      }
  }
    ul.breadcrumb {
        list-style: none;
    }
    ul.breadcrumb li {
        display: inline;
    }
    ul.breadcrumb li+li:before {
        padding: 0px 3px 0px 8px;
        color: black;
        content: "/\00a0";
    }
    ul.breadcrumb li a, ul.breadcrumb li span {
        text-decoration: none;
        // color: #6B778C !important;
        color: rgb(23, 43, 77);
        height: auto;
        line-height: inherit;
        padding: 0;
        vertical-align: baseline;
        width: auto;
        font-size: 0.8rem;
    }
    ul.breadcrumb li a:hover {
        color: #0275d8;
        text-decoration: underline;
    }
    .invoice__breadcrumb--text {
        color: #a4a59a; 
        text-transform: capitalize; 
        font-size: 15px; 
        font-weight: 700;
        margin-right: 10px;

        &:first-of-type {
            margin-left: 10px;
        }
    }
</style>
