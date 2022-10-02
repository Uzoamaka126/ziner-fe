<template>
    <div class="btn--filter btn-group mr--10">
        <button 
            class="btn text--xs btn-sm dropdown-toggle" 
            type="button" 
            aria-expanded="false"
            id="dropdownMenuClickableInside" 
            data-bs-toggle="dropdown" 
            data-bs-auto-close="outside" 
        >
            Filter by
        </button>
        <div class="dropdown-menu filter__dropdown-menu">
            <!-- action items -->
        <div class="action--btns__wrap">
            <button class="action--btns__clear action--btns">Clear</button>
            <button class="action--btns__run action--btns">Run</button>
        </div>
            <div class="accordion" id="accordionPanelsStayOpenExample">
                <div class="accordion-item" v-if="routeName === 'projects'">
                    <div class="accordion-header width--100 align-items-center" style="display: flex;" id="panelsStayOpen-headingOne">
                        <div class="accordion-button form-check form-check-title" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                            <input 
                                class="form-check-input" 
                                type="checkbox" 
                                v-model="projectTitle"
                            />
                            <label class="form-check-label text--xs ml--5" for="flexCheckCheckedOne">
                                Project title
                            </label>
                        </div>
                    </div>
                    <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingOne">
                        <div class="accordion-body" style="padding-top: 0.5rem">
                            <InputSearch :showIcon="false" />                
                        </div>
                    </div>
                </div>
                <!-- clients -->
                <template v-if="routeName === 'clients'">
                    <div class="accordion-item">
                        <div class="accordion-header width--100 align-items-center" id="clientNamePanel">
                            <div class="accordion-button form-check form-check-title" type="button" data-bs-toggle="collapse" data-bs-target="#clientNamePanelStayOpen-Collapse" aria-expanded="true" aria-controls="clientNamePanelStayOpen-Collapse">
                                <input 
                                    class="form-check-input" 
                                    type="checkbox" 
                                    id="clientName"
                                    v-model="clientName"
                                />
                                <label class="form-check-label text--xs ml--5" for="clientName">
                                    Client name
                                </label>
                            </div>
                        </div>
                        <div id="clientNamePanelStayOpen-Collapse" class="accordion-collapse collapse" aria-labelledby="clientNamePanel">
                            <div class="accordion-body">
                                <InputSearch :showIcon="false" />                          
                            </div>
                        </div>
                    </div>
                    <!-- country -->
                    <div class="accordion-item">
                        <div class="accordion-header width--100 align-items-center" id="countryPanel">
                            <div class="accordion-button form-check form-check-title" type="button" data-bs-toggle="collapse" data-bs-target="#countryPanelStayOpen-Collapse" aria-expanded="true" aria-controls="countryPanelStayOpen-Collapse">
                                <input 
                                    class="form-check-input" 
                                    type="checkbox" 
                                    id="flexCheckCheckedTwo"
                                    v-model="country"
                                />
                                <label class="form-check-label text--xs ml--5" for="flexCheckCheckedTwo">
                                    Client country
                                </label>
                            </div>
                        </div>
                        <div id="countryPanelStayOpen-Collapse" class="accordion-collapse collapse" aria-labelledby="countryPanel">
                            <div class="accordion-body">
                                <InputSearch :showIcon="false" />                          
                            </div>
                        </div>
                    </div>

                    <!-- industry -->
                    <div class="accordion-item">
                        <div class="accordion-header width--100 align-items-center" id="clientIndustryPanel">
                            <div class="accordion-button form-check form-check-title" type="button" data-bs-toggle="collapse" data-bs-target="#clientIndustryPanelStayOpen-Collapse" aria-expanded="true" aria-controls="clientIndustryPanelStayOpen-Collapse">
                                <input 
                                    class="form-check-input" 
                                    type="checkbox" 
                                    id="flexCheckCheckedTwo"
                                    v-model="industry"
                                />
                                <label class="form-check-label text--xs ml--5" for="flexCheckCheckedTwo">
                                    Industry
                                </label>
                            </div>
                        </div>
                        <div id="clientIndustryPanelStayOpen-Collapse" class="accordion-collapse collapse" aria-labelledby="clientIndustryPanel">
                            <div class="accordion-body">
                                <InputSearch :showIcon="false" />                          
                            </div>
                        </div>
                    </div>
                </template>

                <!-- invoices -->
                <template v-if="routeName === 'invoices'">
                    <div class="accordion-item">
                        <div class="accordion-header width--100 align-items-center" id="panelsStayOpen-headingTwo">
                            <div class="accordion-button form-check form-check-title" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="true" aria-controls="panelsStayOpen-collapseTwo">
                                <input 
                                    class="form-check-input" 
                                    type="checkbox" 
                                    v-model="filter.title"
                                />
                                <label class="form-check-label text--xs ml--5" for="flexCheckCheckedTwo">
                                    Invoice Title
                                </label>
                            </div>
                        </div>
                        <div id="panelsStayOpen-collapseTwo" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingTwo">
                            <div class="accordion-body">
                                <InputSearch :showIcon="false" />                          
                            </div>
                        </div>
                    </div>
                    <!-- country -->
                    <div class="accordion-item">
                        <div class="accordion-header width--100 align-items-center" id="panelsStayOpen-headingTwo">
                            <div class="accordion-button form-check form-check-title" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="true" aria-controls="panelsStayOpen-collapseTwo">
                                <input 
                                    class="form-check-input" 
                                    type="checkbox" 
                                    v-model="currency"
                                />
                                <label class="form-check-label text--xs ml--5" for="flexCheckCheckedTwo">
                                    Currency
                                </label>
                            </div>
                        </div>
                        <div id="panelsStayOpen-collapseTwo" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingTwo">
                            <div class="accordion-body">
                                <InputSearch :showIcon="false" />                          
                            </div>
                        </div>
                    </div>

                    <!-- industry -->
                    <div class="accordion-item">
                        <div class="accordion-header width--100 align-items-center" id="panelsStayOpen-headingTwo">
                            <div class="accordion-button form-check form-check-title" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="true" aria-controls="panelsStayOpen-collapseTwo">
                                <input 
                                    class="form-check-input" 
                                    type="checkbox" 
                                    v-model="invoiceNo"
                                />
                                <label class="form-check-label text--xs ml--5" for="flexCheckCheckedTwo">
                                    Invoice No
                                </label>
                            </div>
                        </div>
                        <div id="panelsStayOpen-collapseTwo" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingTwo">
                            <div class="accordion-body">
                                <InputSearch :showIcon="false" />                          
                            </div>
                        </div>
                    </div>
                </template>

                <!-- status -->
                <div class="accordion-item" v-if="routeName === 'projects' || routeName === 'invoices'">
                    <div class="accordion-header width--100 align-items-center" id="panelsStayOpen-headingThree">
                        <div class="accordion-button form-check form-check-title" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="true" aria-controls="panelsStayOpen-collapseThree">
                            <input 
                                class="form-check-input" 
                                type="checkbox" 
                                id="flexCheckCheckedThree" 
                                v-model="status"
                            />
                            <label class="form-check-label text--xs ml--5" for="flexCheckCheckedThree">
                                Status
                            </label>
                        </div>
                    </div>
                    <div id="panelsStayOpen-collapseThree" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingThree">
                        <div class="accordion-body">
                          <filter-status :type="routeName" />                      
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import InputSearch from './InputSearch'
import FilterStatus from './Status.vue'

export default {
    name: 'MainFilter',
    created() {
        
    },
    components: {
        InputSearch,
        FilterStatus
    },
    model: {
        prop: "value",
        event: "change",
    },
    props: ['filter'],
    computed: {
        routeName() {
            if (this.$route.path.includes('clients')) {
                return 'clients'
            } else if (this.$route.path.includes('projects')) {
                return 'projects'
            } else if (this.$route.path.includes('tags')) {
                return 'tags'
            } else if (this.$route.path.includes('invoices')) {
                return 'invoices'
            } else {
                return ''
            }
        },
        // isFilterBtnDisabled() {
        //     if (this.filter.country)
        // }
    },
    data () {
       return {
           status: this.filter.status || '',

           projectTitle: this.filter.projectTitle || '',
           favourite: this.filter.favourite || '',
           deadline: this.filter.deadline || '',

           clientName: this.filter.clientName || '',
           industry: this.filter.industry || '',
           country: this.filter.country || '',

           currency: this.filter.currency || '',
           datePaid: this.filter.datePaid || '',
           invoiceNo: this.filter.invoiceNo || '',
           download: this.filter.download || '',
       }
    },
    methods: {
        clearSearch() {
            this.clientNameInputCheck = false,
            this.projectTitleInputCheck = false,
            this.projectStatusInputCheck = false
        },
        handleFilter() {
            this.$emit("filterProjects")
        }

    },
    watch: {

    }
}
</script>

<style lang="scss" scoped>
    .form-check-input:checked {
        background-color: #596dde;
        border-color: #596dde;
    }
    .form-check-title {
        display: flex;
        align-items: end;
        width: 100% !important;

    }
    .dropdown-menu.show {
        transform: translate3d(-10px, 30px, 0px) !important;
        width: 300px !important;
        inset: 0px 0px auto auto !important;
        padding: 0px !important;
        box-shadow: inset 0 -1px rgba(235, 238, 241, 0) !important;
        background-color: #f6f8fa !important;
   }
   .form-check-input {
       margin-left: 0 !important; 
       padding-right: 8px; 
       padding-left: 8px; 
       padding-top: 8px; 
       padding-bottom: 8px; 
       min-height: 10px; 
       width: 12px; 
       height: 12px
   }
</style>