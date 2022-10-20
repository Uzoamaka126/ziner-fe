<template>
  <!-- Main Body layout -->
    <div style="height: 100%; padding-right: 25px; padding-left: 25px;">
        <template v-if="loading === 'loading'">
                <div class="flex justify-content-center align-items-center  mt--40 mb--45">
                    <div class="spinner-border text-primary" role="status" style="color: #5f76d3 !important">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
            </template>
            <template v-else>
                <div class="row__header--item align-items-center justify-content-between hidden-xs flex">
                    <div v-show="invoicesCopy.length > 0" class="row__left">
                        <div class="page__result">{{ invoicesCopy.length }} Invoice {{ invoicesCopy.length > 1 ? 's' : ''}}</div>
                    </div>
                        <!-- Don't delete this below - it prevents the content of the right row from moving to the left -->
                    <div class="page__result"></div> 
        
                    <!-- others -->
                    <div class="row__right">
                        <div class="positionRelative mr--10">
                            <button @click="createNewInvoice()" class="btn btn--primary btn--sm align-items-center flex">
                                <span class="flex ">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" style="fill: #fff;transform: ;msFilter:;">
                                        <path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path>
                                    </svg>
                                </span>
                                <span>New Invoice</span>
                            </button>
                        </div>
                        <div v-show="invoicesCopy.length > 1" class="align-items-center" style="display: flex">
                            <main-filter :filter="filter" @filter="filterInvoices" />
                            <sort-filter :filter="displayType" @setType="setDisplayType" />
                        </div>
                    </div>
                </div>
                <div v-if="invoicesCopy.length > 0">        
                    <div>
                        <table class="table root mt--40">
                            <thead>
                                <tr>
                                    <th class="header">Status</th>
                                    <th class="first header">Client email</th>
                                    <th class="header">Amount</th>
                                    <th class="header">Invoice No.</th>
                                    <th class="header">Date Created</th>
                                    <th class="header">Due Date</th>
                                    <th class="header"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="invoice in invoices" :key="invoice.id">
                                    <td>
                                        <span :class="['table__data--main badge', 'tag', invoiceTagMap[invoice.status]]">{{ invoice.status }}</span>
                                    </td>
                                    <td class="first">{{ invoice.client_email }}</td>
                                    <td>{{ invoice.currency }} {{ formatMoney(invoice.amount) }}</td>
                                    <td>{{ invoice.invoice_num }}</td>
                                    <td>{{ formatDateTime(invoice.createdAt) }}</td>
                                    <td>{{ formatDateTime(invoice.dueDate) }}</td>
                                    <td class="dropdown">
                                        <div class=" cursor-pointer" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: #95899b;transform: ;msFilter:;">
                                                <path d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path>
                                            </svg>
                                        </div>
                                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                            <li>
                                                <p class="dropdown-item cursor-pointer text--xs text--link">
                                                    View invoice
                                                </p>
                                            </li>
                                            <li><p class="dropdown-item cursor-pointer text--xs">Download as PDF</p></li>
                                            <li v-if="invoice.status === 'draft'"><p class="dropdown-item cursor-pointer text--xs">Edit invoice</p></li>
                                            <li><p class="dropdown-item cursor-pointer text--xs text--color-warning" data-bs-toggle="modal" data-bs-target="#deleteInvoice">Delete invoice</p></li>
                                        </ul>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
    
                <div v-else>
                    <empty-page 
                        :title="'You have not created any invoices yet.'" 
                        :subtitle="'Your invoices will show up here  when you create them.'" 
                        :iconName="'invoice'"
                        :width="'60px'"
                        :height="'60px'"
                    />
                </div>
            </template>
        
        <!-- <pagination data="invoices-list" :pageNumber="noOfPages" /> -->

        <!-- modals -->
        <confirm-deletion-modal :type="'invoice'" @delete="deleteInvoice" @reset="resetCurrentInvoice" />
    </div>
</template>

<script>
import EmptyPage from '../../shared/emptyPage/EmptyPage.vue'
import ConfirmDeletionModal from '../../shared/modals/ConfirmDeletion.vue';
import MainFilter from '../../shared/filter/Main';
import SortFilter from '../../shared/filter/Sort';

export default {
    name: 'ProjectInvoice',
    components: {
        EmptyPage,
        ConfirmDeletionModal,
        MainFilter,
        SortFilter,
    },
    props: ['invoices', 'loading'],
    data () {
            return {
                filter: {
                    dueDate: {
                    //   to: last30Days.to,
                    //   from: last30Days.from,
                    //   rangeText: getDateRange( last30Days.from, last30Days.to ),
                    },
                    status: {
                    values: [],
                    items: { due:"Due", paid:"Paid", issued:"Issued", draft:"Draft" },
                    },
                },
                filterType: '',
                invoicesCopy: this.invoices,
                /**
                 * Returns the appropriate CSS status tag for each invoice status
                 */
                invoiceTagMap: {
                    draft: "tag--cornsilk",
                    due: "tag--red",
                    paid: "tag--green",
                    issued: "tag--blue",
                },
                downloadButtonIsClicked: false,
                page: {
                    noOfPages: 1,
                    currentPage: 1,
                    totalInvoices: 3,
                    pageIsEmpty: false,
                    noData: false,
                },
                invoice: {},
                displayType: ''
            }
    },

    computed: {
        isFiltered() {
        // Check if query object is not empty
        const obj = this.$route.query;
        return !(Object.keys(obj).length === 0 && obj.constructor === Object)
        },

        downloadButtonIsDisabled: {
        get: function () {
            return this.invoices.length === 0 || this.downloadButtonIsClicked
        },

        set: function( val ) {
            if( val ) this.downloadButtonIsClicked = true;
            else this.downloadButtonIsClicked = false;
        }
        },
    },

    methods: {
        fetchInvoices( queryParams ) {
        // If there are query parameters on page reload, 
        // update the filter dropdown.
        //   if( queryParams ) {
        //     if( queryParams.from ) this.filter.dueDate.from = queryParams.from;
        //     if( queryParams.to ) this.filter.dueDate.to = queryParams.to;
        //     if( queryParams.from && queryParams.to ) this.filter.dueDate.rangeText = getDateRange( queryParams.from, queryParams.to );
        //     if( queryParams.status ) this.filter.status.values.push( ...queryParams.status.split(",") );
        //   }
        
        //   const url = createQueryString( "v2/invoices", queryParams );
        //   return this.$http.get( url ).then( resp  => {
            
        //     // if ( resp.ok !== true ) return;
        //     this.pageNumber = resp.data.data.page_info.current_page;
        //     this.noOfPages = resp.data.data.page_info.total_pages;
        //     this.totalInvoices = resp.data.data.page_info.total;
            
        //     this.invoices = resp.data.data.invoices.map( invoice => {
        //       invoice.invoice_type = invoice.meta.invoice_interval[ 0 ].interval_value;
        //       return invoice
        //     });
        //     this.loading = false;
        //     return resp;
        //   });
        },

        formatDateTime: function (log) {
        // return moment(log, 'YYYY-MM-DD HH:mm:ss').format('Do MMMM YYYY');
        },

        formatMoney: function (x) {
            return (x) ? x.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : x;
        },
        filterInvoices() {
        //   const params = {
        //     from: moment( this.filter.dueDate.from ).format( "YYYY-MM-DD" ) + " 00:00:00",
        //     to: moment( this.filter.dueDate.to ).format( "YYYY-MM-DD" ) + " 23:59:59",
        //     status: this.filter.status.values.length ? this.filter.status.values.join(",") : undefined,
        //   }
        //   this.$router.replace({ name: "invoices-list", query: params });
        },

        clearInvoiceFilter() {
            // this.filter.dueDate.to = last30Days.to;
            // this.filter.dueDate.from = last30Days.from;
            // this.filter.dueDate.rangeText = "By Last 30 days";
            // this.filter.status.values = [];
            this.$router.replace({ name: "invoices-list" });
        },

        createNewInvoice() {
            this.$router.push({ name: 'create-invoice-view' });
        },
        deleteInvoice() {
            this.requestIsDisabled = true;
            this.$http.post( `v2/invoices/${ this.invoice.id }/delete` )
            .then(({ ok, data }) => {
                if( ok === false || data.status !== "success" ) return console.error("Couldn't Delete Invoices for customer.");
                this.requestIsDisabled = false;
                toast.green( "Invoice has been removed successfully." );
                this.$router.push({ name: "invoices-list" });
            })
        
            .catch( error => {
                this.requestIsDisabled = false;
                toast.red( error.data.message );
                console.log( error.data.message );
            });
        },
        resetCurrentInvoice() {
            this.invoice = {}
        },
        filterInvoices () {
            const params = this.buildQueryString();
            this.$router.replace({ name: 'projects', query: params });
        },

        sortInvoices() {
            sortList(this.displayType, this.invoicesCopy, 'title')
        },

        setDisplayType(val) {
            this.displayType = val
        },

    },

    watch: {
        displayType(newType, oldType) {
            if(newType !== oldType) {
                this.sortInvoices()
            }
        },
        // '$route': 'checkIfQueryParamsExists'
    }
};
</script>

<style>
</style>
