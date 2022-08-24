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
            <!-- top header -->
            <div class="flex align-items-center justify-content-between">
                <!-- project count -->
                <div class="list--count">
                    <p>{{ projects.length }} project{{ projects.length > 1 ? 's' : '' }}</p>
                </div>
                <div class="flex align-items-center">
                    <main-filter :filter="filter" @filterProjects="filterProjects" />
                    <sort-filter :filter="displayType" @setType="setDisplayType" />
                </div>
            </div>
            <!-- Content -->
            <template v-if="projects.length > 0">
                <div style="display: flex; margin-top: 2.5rem;">
                    <table class="table table-hover root">
                        <thead>
                            <tr>
                                <th class="first header">Project title</th>
                                <th class="header">Client</th>
                                <th class="header">Status</th>
                                <th class="header">Deadline</th>
                                <th class="header">No. of Tasks</th>
                                <th class="header">No. of Invoices</th>
                                <th class="header"></th>
                            </tr>
                        </thead>
                        <tbody v-for="project in projects" :key="project.id">
                            <span>
                                <td class="flex align-items-center">
                                    <span class="project--item__dot" :style="{ 'background-color': project.color }"></span>
                                    <span>{{ project.title }}</span>
                                    </td>
                                <td>{{ project.client }}</td>
                                <td>{{ project.status }}</td>
                                <td>{{ formatProjectDateTime(project.time) }}</td>
                                <td>{{ project.tasks }}</td>
                                <td>{{ project.invoices.length }}</td>
                                <td  aria-expanded="false">
                                    <div data-bs-toggle="dropdown">
                                        <div class="icon cursor-pointer" tabindex="-1" title="More options">
                                            <svg class="css-17keszd-EnhancedContextMenuIcon e16olzom2" width="4" height="12" viewBox="0 0 4 16">
                                                <path fill="#95899b" fill-rule="evenodd" d="M0 2a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm0 12a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm0-6a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"></path>
                                            </svg>
                                        </div>
                                    </div>
                                    <ul class="dropdown-menu dropdown-menu--tag" aria-labelledby="tagActions">
                                        <li class="cursor-pointer">
                                            <router-link :to="{name:'project-details', params:{ id:project.id }}" class="dropdown-item block width-100 text--xs">Edit</router-link>
                                        </li>
                                        <li class="cursor-pointer">
                                            <p class="dropdown-item text--xs text--color-warning" data-bs-toggle="modal" data-bs-target="#deleteProject">Delete</p>
                                        </li>
                                    </ul>
                                </td>
                            </span>
                        </tbody>
                    </table>
                </div>
            </template>
            <template v-else-if="isSearched && !projects.length">
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
        <confirm-deletion-modal :type="'project'" :action="handleDeleteProject" :reset="resetSelectedProject" />
    </div>
</template>

<script>
import CreateProjectModal from '../shared/modals/CreateProject'
import MainFilter from '../shared/filter/Main';
import SortFilter from '../shared/filter/Sort';
import ConfirmDeletionModal from '../shared/modals/ConfirmDeletion';
import { formatDateTime } from '../../utils/others';
import IconSvg from '../shared/icons/Icon-Svg.vue';
import Pagination from '../shared/pagination/Index.vue';
import EmptyPage from '../shared/emptyPage/EmptyPage.vue';


export default {
    name: 'ProjectLayout',
    created() {
    },
    props: {
        user: Object
    },
    components: {
        CreateProjectModal,
        MainFilter,
        ConfirmDeletionModal,
        SortFilter,
        IconSvg,
        Pagination,
        EmptyPage
    },
    data () {
        return {
            projects: [
                {
                    id: '1',
                    title: 'Twitter Landing page',
                    client: 'Twitter',
                    status: 'pending',
                    time: new Date('Sun Mar 31 2022 21:25:37 GMT+0100 (West Africa Standard Time)'),
                    tasks: 6,
                    invoices: ["https:///", 'htps:///www'],
                    color: '#d94182'
                },
                {
                    id: '2',
                    title: 'Netlify Deployment',
                    client: 'Netlify',
                    status: 'pending',
                    time: new Date('Thu Mar 10 2022 21:25:37 GMT+0100 (West Africa Standard Time)'),
                    tasks: 10,
                    invoices: ["https:///", 'htps:///www'],
                    color: '#9e5bd9'
                }
            ],
            displayType: 'A - Z',
            currentProject: {},
            loadingState: 'default',
            pageData: {
                currentPage: 0,
                totalPages: 0,
                pageSize: 0,
                pageNumber: 0,
                url: '',
                isPaginationExist: false,
                total: 0
            },
            isSearched: false,
            filter: {
                download: false,
                status: {
                    types: {
                        "pending": "Pending", 
                        "due": "Due", 
                        "on-hold": 'OnHold',
                        'completed': 'Completed'
                    },
                    selected: [],
                },
                client: this.$route.query.client || undefined,
                title: this.$route.query.title || undefined,
            },
        }
    },
    computed: {
    },
    methods: {
        buildQueryString(query = {}) {
            return {
                status: query.status || (this.filter.status.selected.length === 1 ? this.filter.status.selected.join(",") : undefined),                
                client: query.client || this.filter.client,
                title: query.title || this.filter.title,
                page: query.page || this.pageData.pageNumber,
            }
        },

        updateFilterData(query) {
            switch (query) {
                case query.status:
                    this.filter.status.selected = query.status.split(",");
                case query.client:
                    this.filter.client = query.client;
                case query.title:
                    this.filter.title = query.title;
            }
        },

        formatProjectDateTime(date) {
            if(date) {
                return formatDateTime(date)
            } else {
                return 'None'
            }
        },

        setDisplayType(val) {
            this.displayType = val
        },

        filterProjects () {
            const params = this.buildQueryString();
            this.$router.replace({ name: 'projects', query: params });
        },

        sortProjects() {
            if (this.displayType === 'A - Z') {
                this.projects.sort((a, b) => {
                    var lowerName = a.title.toLowerCase(); // ignore upper and lowercase
                    var higherName = b.title.toLowerCase();

                    if (lowerName < higherName) {
                        return -1;
                    }
                    if (lowerName > higherName) {
                        return 1;
                    }

                    return 0;
                }) 
            } else {
                this.projects.sort((a, b) => {
                    var lowerName = a.title.toLowerCase(); // ignore upper and lowercase
                    var higherName = b.title.toLowerCase();

                    if (lowerName < higherName) {
                        return 1;
                    }
                    if (lowerName > higherName) {
                        return -1;
                    }

                    return 0;
                }) 
            }
        },

        resetSelectedProject() {
            this.project = {}
        },

        startDelete(data) {
            this.currentProject = data;
            $("#deleteProject").modal("show");
        },

        handleDeleteProject() {
            this.projects = this.projects.filter(item => item.id !== this.currentProject.id);
            this.currentProject = {}
            $("#deleteProject").modal("hide");
        },

        handleAddProject(data) {
            // make API call here
            this.loadingState = 'addProjectLoading';

            setTimeout(() => {
                this.loadingState = 'addClientSuccess';
                this.projects.push(data);
                $("#createProject").modal("hide");
            }, 10000)
            // createNewClient(data).then(res => {
            //     this.loadingState = 'success';
            //     $("#createClient").modal("hide");

            //     this.handleFetchProjects()
            // }).catch(err => {
            //     console.log(err)
            // })
        },

        handleFetchProjects(routeData) {
            // this.loadingState = 'loading';
            let pageQueryObj = {
                paginationNum: this.$route.query.page || 1,
                download: this.$route.query.download,
                limit: this.$route.query.limit
            }

            if (routeData.query.client || routeData.query.title || routeData.query.status) {
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
        },
        checkIfQueryParamsExists() {
            switch (this.$route.query) {
                case this.$route.query.status:
                    this.isSearched = true;
                case this.$route.query.client:
                    this.isSearched = true;
                case this.$route.query.title:
                    this.isSearched = true;
                default:
                    this.isSearched = false;
            }
        }
    },
    watch: {
        displayType(newType, oldType) {
            if(newType !== oldType) {
                this.sortProjects()
            }
        },
        '$route': 'checkIfQueryParamsExists'
    }
}
</script>

<style lang="scss" scoped>
    .dropdown-menu {
        min-width: 5rem !important;
    }
</style>