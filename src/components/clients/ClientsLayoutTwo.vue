<template>
    <div>
        <div style="height: 100%; padding-right: 25px; padding-left: 25px; padding-top: 2rem">
            <template v-if="loadingState === 'loading'">
               <div class="flex justify-content-center align-items-center  mt--40 mb--45">
                    <div class="spinner-border text-primary" role="status" style="color: #5750ec !important">
                        <span class="visually-hidden">Loading...</span>
                    </div>
               </div>
            </template>
            <div class="flex align-items-center justify-content-between">
                <div class="list--count">
                    <p>{{ clients.length }} client{{ clients.length > 1 ? 's' : '' }}</p>
                </div>
                <div class="flex align-items-center">
                    <main-filter :filter="filter" />
                    <sort-filter :filter="displayType" />
                </div>
            </div>
            <!-- Content -->
            <template v-if="clients.length > 0">
                <div style="display: flex; margin-top: 2.5rem;">
                    <table class="table table-hover root">
                        <thead>
                            <tr>
                                <th class="first header">Client name</th>
                                <th class="header">Country</th>
                                <th class="header">Phone number</th>
                                <th class="header">Primary email</th>
                                <th class="header">Address</th>
                                <th class="header">Industry</th>
                                <th class="header"></th>
                            </tr>
                        </thead>
                        <tbody v-for="client in clients" :key="client._id">
                            <span>
                                <td>{{ client.name }}</td>
                                <td>{{ client.country }}</td>
                                <td>{{ client.phoneNumber }}</td>
                                <td>{{ client.emails[0] }}</td>
                                <td>{{ client.address }}</td>
                                <td>{{ !client.organizationType ? '-' : client.organizationType }}</td>
                                <td aria-expanded="false">
                                    <div data-bs-toggle="dropdown">
                                        <div class="icon cursor-pointer" tabindex="-1" title="More options">
                                            <svg class="css-17keszd-EnhancedContextMenuIcon e16olzom2" width="4" height="12" viewBox="0 0 4 16">
                                                <path fill="#95899b" fill-rule="evenodd" d="M0 2a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm0 12a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm0-6a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"></path>
                                            </svg>
                                        </div>
                                    </div>
                                    <ul class="dropdown-menu dropdown-menu--tag" aria-labelledby="tagActions">
                                        <!-- <li class="cursor-pointer" @click="setClientDetails(item)">
                                            <p class="dropdown-item block width-100 text--xs">View</p>
                                        </li> -->
                                        <li class="cursor-pointer">
                                            <router-link 
                                                :to="{ name: 'client-details-view', params:{ id: client._id }}" 
                                                class="dropdown-item block width-100 text--xs"
                                            >
                                                View
                                            </router-link>
                                        </li>
                                        <li class="cursor-pointer">
                                            <p class="dropdown-item text--xs text--color-warning" data-bs-toggle="modal" data-bs-target="#deleteClient">Delete</p>
                                        </li>
                                    </ul>
                                </td>
                            </span>
                        </tbody>
                    </table>
                </div>
            </template>
            <template v-else-if="isSearched && !clients.length">
                <empty-page 
                :title="'No results found'" 
                :subtitle="'Type in another search query and try again'" 
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

        <!-- modal -->
        <create-client-modal @handleAddClient="handleAddClient" :loading="loadingState" />
        <confirm-deletion-modal :type="'client'" :action="handleDeleteClient" :reset="resetCurrentClient" />
    </div>
</template>

<script>
import clientsList from '../../assets/js/clients.json'
import MainFilter from '../shared/filter/Main';
import SortFilter from '../shared/filter/Sort';
import ConfirmDeletionModal from '../shared/modals/ConfirmDeletion';
import IconSvg from '../shared/icons/Icon-Svg.vue';
import Pagination from '../shared/pagination/Index.vue';
import EmptyPage from '../shared/emptyPage/EmptyPage.vue';
import CreateClientModal from '../shared/modals/CreateClient.vue';
import { assembleQueryList, serilaizeQuery } from '../../utils/others';


export default {
    name: 'ClientLayout',
    created() {
    },
    props: {
        user: Object
    },
    components: {
        IconSvg,
        CreateClientModal,
        ConfirmDeletionModal,
        EmptyPage,
        Pagination,
        MainFilter,
        SortFilter,
    },
   data() {
        return {
            isMenuItemHover: '',
            currentClient: {},
            loadingState: 'default',
            pageData: {
                currentPage: 1,
                totalPages: 3,
                pageSize: 0,
                disablePagination: true,
                pageNumber: 0,
                url: '',
                isPaginationExist: false,
                total: 22
            },
            isSearched: false,
            filter: {
                nameQuery: this.$route.query.name || '',
                download: false
            },
            clientsList
        }
    },
    computed: {
        clients() {
            return this.clientsList.slice(0, 10) || []
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
            this.clientsList = this.clientsList.filter(item => item.id !== this.currentClient.id);
            this.currentClient = {}
            $("#deleteClient").modal("hide");
        },

        handleAddClient(data) {
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
    watch: {
        displayType(newType, oldType) {
            if(newType !== oldType) {
                this.sortProjects()
            }
        },
        // '$route': 'checkIfQueryParamsExists'
    }
}
</script>

<style lang="scss" scoped>
    .dropdown-menu {
        min-width: 5rem !important;
    }
</style>