<template>
    <div>
        <!-- search list -->
        <form class="bd-search position-relative" style="margin-right: 0.825rem;">
            <span class="algolia-autocomplete" style="position: relative; display: inline-block; direction: ltr;">
                <input 
                    type="search" 
                    class="form-control" 
                    id="search-input" 
                    placeholder="Search..." 
                    aria-label="Search for..." 
                    v-model="reactiveValue"
                    data-bd-docs-version="5.1" 
                    spellcheck="false" 
                    role="combobox" 
                    aria-autocomplete="list" 
                    aria-expanded="false" 
                    aria-owns="algolia-autocomplete-listbox-0" 
                    dir="auto" 
                    style="position: relative; vertical-align: top;"
                    @keyup.enter="runSearchFilter"
                    :class="{ 'leftPadding': showIcon, 'noIconShow': !showIcon }"
                >
                <span v-if="showIcon" role="listbox" id="algolia-autocomplete-listbox-0" style="position: absolute; top: 5px; z-index: 100; left: 5px;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: #dee2e6;transform: ;msFilter:;">
                        <path d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z"></path>
                    </svg>
                </span>
            </span>
        </form>
    </div>
</template>

<script>
export default {
    name: 'SearchInput',
    created() {
        
    },
    model: {
        prop: "value",
        event: "change",
    },
    props: {
        value: { type: String, default: '' },
        showIcon: { type: Boolean, default: true }
    },
    data () {
       return {
           reactiveValue: this.value || ''
       }
    },
    methods: {
        clearSearch() {
            this.reactiveValue = ''
        },

    },
    watch: {
        reactiveValue( newVal ) {
            this.$emit( "change", newVal )
        }
    }
}
</script>

<style lang="scss" scoped>
   .leftPadding {
       padding-left: 2rem;
       font-size: 14px;
   }
   .noIconShow {
       padding-top: 0.2rem;
        padding-bottom: 0.2rem;
        font-size: 12px !important;
   }
</style>