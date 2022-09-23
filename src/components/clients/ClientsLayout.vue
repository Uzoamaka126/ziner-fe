<template>
    <div>
        <div style="height: 100%; padding-right: 50px; padding-left: 50px; padding-top: 2rem">
            <template v-if="loadingState === 'loading'">
               <div class="flex justify-content-center align-items-center  mt--40 mb--45">
                    <div class="spinner-border text-primary" role="status" style="color: #5750ec !important">
                        <span class="visually-hidden">Loading...</span>
                    </div>
               </div>
            </template>
            <template v-else>
                <div class="flex align-items-center justify-content-between width-100">
                    <div class="list--count">
                        <p v-if="this.clientsList.length > 0">{{ this.clientsList.length }} {{ this.clientsList.length > 1  ? 'clients' : 'client'}}</p>
                    </div>
                    <div class="filter__actions--list">
                        <form class="bd-search positionRelative" style="margin-right: 0.825rem;" @submit.prevent>
                            <div class="input-group">
                                <span class="algolia-autocomplete positionRelative">
                                    <input 
                                        aria-label="Search docs for..." 
                                        spellcheck="false" 
                                        role="combobox" 
                                        type="text" 
                                        class="form-control form-control-sm" 
                                        placeholder="type in a name" 
                                        aria-describedby="basic-addon2" 
                                        v-model="filter.nameQuery" 
                                        required
                                        aria-autocomplete="list" 
                                        aria-expanded="false" 
                                        aria-owns="algolia-autocomplete-listbox-0" 
                                        dir="auto" 
                                        style="height: 100%" 
                                    >
                                        <span v-if="filter.nameQuery.length > 0" class="search-clear" @click="resetFilter" role="listbox" id="algolia-autocomplete-listbox-0">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style="fill: #dee2e6;transform: ;msFilter:;"><path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path></svg>
                                        </span>
                                </span>
                                <!-- <div>
                                    <input>
                                </div> -->
                                <span class="input-group-text cursor-pointer text--sm" :class="{ 'disabled': !filter.nameQuery}" id="basic-addon2" @click="handleFilter">Search</span>
                            </div>
                        </form>
                        <button class="btn btn--primary header__btn" data-bs-toggle="modal" data-bs-target="#createClient">   
                            <icon-svg 
                                fill="#fff" 
                                name="add" 
                                icon-position="left"
                                :width="'12px'"
                            />  
                            <span class="text">Add new client</span>
                        </button>
                    </div>
                </div>
                <!-- Content -->
                <div style="margin-top: 2.5rem;" class="width--100 justify-content-center">
                    <template v-if="clients.length > 0">
                        <div>
                            <div class="home--content__wrap" >
                                <div class="home--content--item positionRelative" v-for="(item, index) in clients" :key="index">
                                    <div class="list-options mb--20">
                                        <div 
                                            class="workspace--theme--img" 
                                            @mouseenter="showMenuIconOnHover(item.name)"
                                            @mouseleave="showMenuIconOnHover(null)"
                                            :id="item.name"
                                        ></div>
                                        <span class="flex flex-column">
                                            <span class="text--color-dark text--sm text--bold mt--5 text-center client--name">{{ item.name }}</span>
                                        </span>
                                        <!-- overlay contents -->
                                        <div class="list__overlay">
                                            <div class="list__overlay-text-wrap">
                                                <div style="display: flex; align-items: center; width: 100%; justify-content: center;" @click="setClientDetails(item)">
                                                    <icon-svg 
                                                        fill="rgba(194, 200, 212, 1)" 
                                                        class="nav__icon mr--0" 
                                                        name="edit" 
                                                        icon-position="left"
                                                        :width="'12px'"
                                                        :height="'12px'"
                                                    /> 
                                                    <p class="text text--xs">Edit</p>
                                                </div>
                                                <div style="display: flex; align-items: center" @click="startDelete(item)">
                                                    <icon-svg 
                                                        fill="rgba(194, 200, 212, 1)" 
                                                        class="nav__icon mr--0" 
                                                        name="delete" 
                                                        icon-position="left"
                                                        :width="'12px'"
                                                        :height="'12px'"
                                                    /> 
                                                    <p class="text text--xs">Delete</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                           <!-- pagination -->
                           <template v-if="pageData.totalPages > 1">
                                <pagination :type="'clients'" :paginationData="pageData" @handlePaginationNumChange="handlePaginationNumChange" />
                           </template>
                        </div>
                    </template>
                    <template v-else-if="isSearched && !clients.length">
                            <empty-page 
                            :title="'No results found'" 
                            :subtitle="'Type in another name and try again'" 
                            :iconName="'search'"
                            :width="'60px'"
                            :height="'60px'"
                            :isItalics="true"
                        />
                    </template>
                    <template v-else>
                        <empty-page 
                            :title="'You have not created any clients yet.'" 
                            :subtitle="'Your clients will be displayed here as soon as you add them.'" 
                            :iconName="'client'"
                            :width="'60px'"
                            :height="'60px'"
                        />
                    </template>
                </div>
            </template>
        </div>

        <!-- modal -->
        <create-client-modal @handleAddClient="handleAddClient" :loading="loadingState" />
        <confirm-deletion-modal :type="'client'" :action="handleDeleteClient" :reset="resetCurrentClient" />
        <client-details-modal :currentClientDetails="currentClient" :clientName="currentClient.name"  @resetCurrentClient="resetCurrentClient" />
    </div>
</template>

<script>
import { createdWorkspaces } from '../../utils/dummy';
import clientsList from '../../assets/js/clients.json'
import IconSvg from '../shared/icons/Icon-Svg.vue';
import Pagination from '../shared/pagination/Index.vue';
import EmptyPage from '../shared/emptyPage/EmptyPage.vue';
import CreateClientModal from '../shared/modals/CreateClient.vue';
import ConfirmDeletionModal from '../shared/modals/ConfirmDeletion.vue';
import ClientDetailsModal from '../shared/modals/ViewClient.vue';
import { assembleQueryList, serilaizeQuery } from '../../utils/others';

export default {
    name: 'ClientLayout',
    created() {
        this.handleFetchClients(this.$route);
         // watch the params of the route to fetch the data again
        // this.$watch(
        //     () => this.$route,
        //     () => {
        //         this.handleFetchClients(this.$route)
        //     },
        // // fetch the data when the view is created and the data is
        // // already being observed
        // { immediate: true }
        // )
    },
    // watch: {
    //     '$route': 'handleFetchClients',
    // },
    data() {
        return {
            createdWorkspaces: createdWorkspaces,
            isMenuItemHover: '',
            currentClient: {},
            loadingState: 'default',
            pageData: {
                currentPage: 0,
                totalPages: 0,
                pageSize: 0,
                disablePagination: true,
                pageNumber: 0,
                url: '',
                isPaginationExist: false,
                total: 0
            },
            isSearched: false,
            filter: {
                nameQuery: this.$route.query.name || '',
                download: false
            },
            clientsList: clientsList
        }
    },
    components: {
        IconSvg,
        CreateClientModal,
        ConfirmDeletionModal,
        ClientDetailsModal,
        EmptyPage,
        Pagination
    },
    computed: {
        clients() {
            if (this.pageData.currentPage === 1) {
                 return this.clientsList.slice(0, 10) || []
            } else {
                let numToStartSlice = 10 * this.pageData.currentPage - 10
                let numToEndSlice = 10 * this.pageData.currentPage
                return this.clientsList.slice(numToStartSlice, numToEndSlice) || []
            }
        }
    },
    methods: {
        showMenuIconOnHover(name) {
            if(name === null) {
                return
            } else {
                const client = this.clients.find(item => item.name === name)
                if (client.name) {
                this.isMenuItemHover = client.name;
                }
            }
        },

        resetCurrentClient() {
            this.currentClient = {};
            // $("#clientDetails").modal("hide");
        },

        setClientDetails(data) {
            this.currentClient = data;
            $("#clientDetails").modal("show");
        },

        startDelete(data) {
            this.currentClient = data;
            $("#deleteClient").modal("show");
        },

        handleDeleteClient() {
            this.createdWorkspaces = this.createdWorkspaces.filter(item => item.id !== this.currentClient.id);
            this.currentClient = {}
            $("#deleteClient").modal("hide");
        },

        handleAddClient(data) {
            // make API call here
            this.loadingState = 'addClientLoading';

            setTimeout(() => {
                this.loadingState = 'addClientSuccess';
                this.clientsList.push(data);
                $("#createClient").modal("hide");
            }, 10000)
            // createNewClient(data).then(res => {
            //     this.loadingState = 'success';
            //     $("#createClient").modal("hide");

            //     this.handleFetchClients()
            // }).catch(err => {
            //     console.log(err)
            // })
        },

        handleFetchClients(routeData) {
            // this.loadingState = 'loading';
            let pageQueryObj = {
                paginationNum: this.$route.query.page || 1,
                download: this.$route.query.download,
                limit: this.$route.query.limit
            }

            if (routeData.query.name) {
                this.isSearched = true
            }

            // download
            if (assembleQueryList(routeData, pageQueryObj).download === true) {
                this.filter.download = true;
            }

            // dummy data
            this.pageData.currentPage = 1
            this.pageData.total = 24
            this.pageData.totalPages = Math.ceil(this.pageData.total / 10)
            this.pageData.pageSize = 10;

            // fetchClients(assembleQueryList(routeData, pageQueryObj))
            //     .then(response => {
            //         this.loadingState = 'success';
            //         if (this.download) {

            //         } else {
            //             this.clients = response.data.info;
            //             this.page.currentPageNum = response.data.pageDetails.currentPage
            //             this.totalClients = response.data.pageDetails.totalPages
            //             this.pageData.currentPage = response.data.pageDetails.currentPage
            //             this.pageData.totalPages = response.data.pageDetails.totalPages
            //             this.pageData.pageSize = response.data.pageDetails.pageSize
            //             this.pageData.total = response.data.pageDetails.total

            //             window.localStorage('clients-list', JSON.stringify(response.data.info))
            //             window.localStorage('noOfClients', JSON.stringify(response.data.pageDetails.totalPages))
            //         }
            //     })
            //     .catch(error => {
            //         this.loadingState = 'failed';
            //         throw new Error(error.message)
            //     })
        }, 
        
        handleFilter() {
            let queryString = {};
            const handleStripPageLimit = () => {
                if (typeof this.$route.query.page !== 'undefined') {
                    delete queryString.page
                }

                if (typeof this.$route.query.limit !== 'undefined') {
                    delete queryString.limit
                }
            }

            if (typeof this.filter.nameQuery !== 'undefined' && this.filter.nameQuery !== '') {
                handleStripPageLimit()
                queryString.name = this.filter.nameQuery
            }

            queryString.name = this.filter.nameQuery

            let currentRoutePath = this.$route.path;
            let queryParams = serilaizeQuery(queryString)
            console.log('queryParams:', queryParams);

            this.$router.replace(`${currentRoutePath}?${queryParams}`)
        },
        resetFilter() {
            let currentRoutePath = this.$route.path;

            this.filter = {
                nameQuery: ''
            }
            this.$router.replace({ path: `${currentRoutePath}` })
        },
        handlePaginationNumChange(num) {
            if (num) {
                console.log('num:', num);
                this.pageData.currentPage = num
            } else {
                this.pageData.currentPage = 1
            }
        }
    },
}
</script>

<style lang="scss" scoped>
    .home--content__wrap {
        display: flex;
        flex-wrap: wrap;
    }
    .workspace--theme--img {
        height: 80px;
        width: 120px;
        border-radius: 10px;
    }
    .home--content--item {
        border-radius: 30px;
        box-sizing: border-box;
        height: auto;
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
    .search-clear {
        position: absolute; 
        top: 5px; 
        z-index: 100; 
        right: 5px;
        cursor: pointer;
    }
    .client--name {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .list-options {
        max-width: 120px;
    }
</style>