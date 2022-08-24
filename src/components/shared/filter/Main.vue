<template>
    <div class="btn-group">
        <button 
            class="btn text--xs mr--10 filter--btn btn-sm dropdown-toggle" 
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
                <!-- project title -->
                <div class="accordion-item">
                    <!-- checkbox -->
                    <div class="accordion-header width--100 align-items-center" style="display: flex;" id="panelsStayOpen-headingOne">
                        <div class="accordion-button form-check form-check-title" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                            <input 
                                class="form-check-input" 
                                type="checkbox" 
                                id="flexCheckCheckedOne" 
                                v-model="projectTitleInputCheck"
                            />
                            <label class="form-check-label text--xs ml--5" for="flexCheckCheckedOne">
                                Title
                            </label>
                        </div>
                    </div>
                    <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingOne">
                        <div class="accordion-body" style="padding-top: 0.5rem">
                            <InputSearch :showIcon="false" />                
                        </div>
                    </div>
                </div>
                <!-- client name -->
                <div class="accordion-item">
                    <!-- checkbox -->
                    <div class="accordion-header width--100 align-items-center" id="panelsStayOpen-headingTwo">
                        <div class="accordion-button form-check form-check-title" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="true" aria-controls="panelsStayOpen-collapseTwo">
                            <input 
                                class="form-check-input" 
                                type="checkbox" 
                                id="flexCheckCheckedTwo"
                                v-model="clientNameInputCheck"
                            />
                            <label class="form-check-label text--xs ml--5" for="flexCheckCheckedTwo">
                                Client name
                            </label>
                        </div>
                    </div>
                    <div id="panelsStayOpen-collapseTwo" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingTwo">
                        <div class="accordion-body">
                            <InputSearch :showIcon="false" />                          
                        </div>
                    </div>
                </div>
                <!-- status -->
                <div class="accordion-item">
                    <div class="accordion-header width--100 align-items-center" id="panelsStayOpen-headingThree">
                        <div class="accordion-button form-check form-check-title" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="true" aria-controls="panelsStayOpen-collapseThree">
                            <input 
                                class="form-check-input" 
                                type="checkbox" 
                                id="flexCheckCheckedThree" 
                                v-model="projectStatusInputCheck"
                            />
                            <label class="form-check-label text--xs ml--5" for="flexCheckCheckedThree">
                                Status
                            </label>
                        </div>
                    </div>
                    <div id="panelsStayOpen-collapseThree" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingThree">
                        <div class="accordion-body">
                          <filter-status />                      
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import InputSearch from './InputSearch'
export default {
    name: 'MainFilter',
    created() {
        
    },
    components: {
        InputSearch,
    },
    model: {
        prop: "value",
        event: "change",
    },
    props: ['filter'],
    data () {
       return {
           reactiveTitle: this.filter.title || undefined,
           reactiveClientName: this.filter.client || undefined,
           reactiveStatus: this.filter.status || undefined,
           clientNameInputCheck: false,
           projectTitleInputCheck: false,
           projectStatusInputCheck: false
       }
    },
    methods: {
        clearSearch() {
            // clear all custom filter data and close it
            this.clientNameInputCheck = false,
            this.projectTitleInputCheck = false,
            this.projectStatusInputCheck = false
        },
        handleFilter() {
            this.$emit("filterProjects")
        }

    },
    watch: {}
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