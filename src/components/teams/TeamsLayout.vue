<template>
    <div style="height: 100%; padding-right: 25px; padding-left: 25px; padding-top: 2rem">
         <!-- top header -->
        <div class="flex align-items-center justify-content-between">
            <!-- Client count -->
            <div class="list--count">
                <p>3 Team members(s)</p>
            </div>
            <div class="filter__actions--list">
                <!-- search list -->
                <form class="bd-search position-relative" style="margin-right: 0.825rem;">
                    <span class="algolia-autocomplete" style="position: relative; display: inline-block; direction: ltr;">
                        <input 
                            type="search" 
                            class="form-control" 
                            id="search-input" 
                            placeholder="Search clients..." 
                            aria-label="Search docs for..." 
                            autocomplete="off" 
                            data-bd-docs-version="5.1" 
                            spellcheck="false" 
                            role="combobox" 
                            aria-autocomplete="list" 
                            aria-expanded="false" 
                            aria-owns="algolia-autocomplete-listbox-0" dir="auto" 
                            style="position: relative; vertical-align: top; font-size: 14px; padding-left: 2rem;">
                            <span role="listbox" id="algolia-autocomplete-listbox-0" style="position: absolute; top: 5px; z-index: 100; left: 5px;">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: #dee2e6;transform: ;msFilter:;">
                                <path d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z"></path>
                            </svg>
                        </span>
                    </span>
                </form>
                <div class="btn-group">
                    <button class="btn text--xs mr--10 filter--btn btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Sort by
                    </button>
                    <ul class="dropdown-menu filter__dropdown-menu">
                        <li><p class="dropdown-item text--xs">A - Z</p></li>
                        <li><p class="dropdown-item text--xs">Z - A</p></li>
                    </ul>
                </div>
                <div class="btn-group">
                    <button class="btn text--xs filter--btn btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Filter by
                    </button>
                    <ul class="dropdown-menu filter__dropdown-menu">
                        <li><p class="dropdown-item text--xs">Industry</p></li>
                        <li><p class="dropdown-item text--xs">Theme</p></li>
                        <li><p class="dropdown-item text--xs">Tags</p></li>
                    </ul>
                </div>
            </div>
        </div>
        <!-- Content -->
        <div style="display: flex; margin-top: 2.5rem;">
            <table class="table table-hover root">
                <thead>
                    <tr>
                    <th class="first header">Name</th>
                    <th class="header">Client</th>
                    <th class="header">Status</th>
                    <th class="header">Time</th>
                    <th class="header">No on team</th>
                    <th class="header">Invoice</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Mark</td>
                        <td>Twitter</td>
                        <td>Pending</td>
                        <td>0h</td>
                        <td>1</td>
                        <td>None</td>
                    </tr>
                    <tr>
                        <td>Mark</td>
                        <td>Twitter</td>
                        <td>Pending</td>
                        <td>0h</td>
                        <td>1</td>
                        <td>Available</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- modal -->
         <create-project-modal 
            :toggleCreateProjectModalal="toggleCreateProjectModalal" 
            :showCreateBoardModal="showCreateBoardModal"
        />
    </div>
</template>

<script>
import { createdWorkspaces } from '../../utils/dummy'
import IconSvg from '../shared/icons/Icon-Svg.vue';
import CreateProjectModal from '../shared/modals/CreateProject.vue'

export default {
    name: 'WorkspaceLayout',
    created() {
        // console.log(this.user);
        if(this.user && this.user.isRecentlyCreated === true) {
            this.setShowOnboardingModal('show');
        }
    },
    props: {
        user: Object
    },
    data: () => ({
        createdWorkspaces: createdWorkspaces,
        showCreateBoardModal: false,

    }),
    components: {
        IconSvg,
        CreateProjectModal
    },
    computed: {
    },
    methods: {
        toggleCreateProjectModal(value) {
            if(value === 'show') {
                this.showCreateProjectModal = true;
            } else if (value === 'hide') {
                this.showCreateProjectModal = false;
            } else {
                this.showCreateProjectModal = false;
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
        box-sizing: border-box;
        height: 226px;
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
            // background-color: #fff;
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
        top: 0;
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
        left: 0px;
        // transform: translate3d(0px, -116px, 0px);
        right: auto;
    left: 0;
    z-index: 1000;
    float: left;
    border: 1px solid rgba(0,0,0,.15);
    border-radius: .25rem;
        // inset: unset !important;
        // right: unset !important;
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
</style>