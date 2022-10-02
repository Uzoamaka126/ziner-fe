<template>
  <!-- Main Body layout -->
    <div style="height: 100%; padding-right: 25px; padding-left: 25px; padding-top: 2rem">
        <div class="row__header--item align-items-center justify-content-between hidden-xs" style="display: flex;">
            <div class="row__left">
                <div class="text--color-dark text--medium">{{ invoices.length }} {{ computeInvoiceDisplay}}</div>
            </div>

            <!-- others -->
            <div class="row__right">
                <div class="positionRelative mr--10">
                    <button @click="createNewInvoice()" class="btn btn--primary btn--sm align-items-center" style="display: flex">
                        <span class="flex ">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" style="fill: #fff;transform: ;msFilter:;">
                                <path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path>
                            </svg>
                        </span>
                        <span>New Invoice</span>
                    </button>
                </div>
                <div class="filter__actions--list">
                    <main-filter :filter="filter" />
                    <sort-filter :filter="displayType" @setType="setDisplayType" />
                </div>
                <!-- <button-icon @click="downloadInvoices" icon="download" :disabled="downloadButtonIsDisabled" class="btn--default btn--sm btn--flex">Download</button-icon> -->
            </div>
        </div>

        <template v-if="loading">
            <div class="loaderContainer">
                <div class="loader"></div>
            </div>
        </template>

        <template v-else>
            <div v-show="invoices.length > 0">
                <table class="table root mt--80">
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
                            <td class="first">{{ invoice.clientEmail }}</td>
                            <td>{{ invoice.currency }} {{ formatMoney(invoice.amount) }}</td>
                            <td>{{ invoice.invoiceNo }}</td>
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
                                        <router-link 
                                            class="dropdown-item cursor-pointer text--xs text--link" 
                                            :to="{ name:'details-invoice-view', params:{ id: invoice._id }}"
                                            style="display: block;"
                                        >
                                            View invoice
                                        </router-link>
                                    </li>
                                    <li><p class="dropdown-item cursor-pointer text--xs">Download as PDF</p></li>
                                    <li v-if="invoice.status === 'draft'"><p class="dropdown-item cursor-pointer text--xs">View invoice</p></li>
                                    <li><p class="dropdown-item cursor-pointer text--xs text--color-warning" data-bs-toggle="modal" data-bs-target="#deleteInvoice">Delete invoice</p></li>
                                </ul>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

             <div v-show="!invoices.length">
                <empty-page 
                    :title="'You have not created any invoice yet.'" 
                    :subtitle="'Your invoices will show up here when you create them.'" 
                    :iconName="'invoice'"
                    :width="'60px'"
                    :height="'60px'"
                />
            </div>
        </template>
        
        <!-- <pagination data="invoices-list" :pageNumber="noOfPages" /> -->

        <!-- modals -->
        <confirm-deletion-modal :type="'invoice'" :action="deleteInvoice" :reset="resetCurrentInvoice" />
    </div>
</template>

<script>
import EmptyPage from '../shared/emptyPage/EmptyPage.vue'
import { dummyInvoicesData } from '../../utils/dummy';
import ConfirmDeletionModal from '../shared/modals/ConfirmDeletion.vue';
import { formatDateStrings, sortList } from '../../utils/others';
import MainFilter from '../shared/filter/Main';
import SortFilter from '../shared/filter/Sort';


export default {
    name: 'InvoiceList',
      created() {
    // const queryParams = this.$route.query;
    // this.fetchInvoices( queryParams );
    },

    components: {
        EmptyPage,
        ConfirmDeletionModal,
        MainFilter,
        SortFilter
    },
    data () {
        return {
            loading: false,
            filter: {
                dueDate: {
                //   to: last30Days.to,
                //   from: last30Days.from,
                //   rangeText: getDateRange( last30Days.from, last30Days.to ),
                },
                status: {
                    values: [],
                    items: { due: "Due", paid: "Paid", issued: "Issued", draft: "Draft" },
                },
                title: ''
            },
            filterType: '',
            invoices: dummyInvoicesData,
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
            displayType: '',
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

        computeInvoiceDisplay() {
            return this.invoices.length > 1 ? 'Invoices' : 'Invoice'
        }
    },

    methods: {
        downloadInvoices() {
        //   const params = {
        //     from: this.filter.dueDate.from,
        //     to: this.filter.dueDate.to,
        //     status: this.filter.status.values.length ? this.filter.status.values.join(",") : undefined,
        //     download: 1,
        //   }

        //   const url = createQueryString( `v2/invoices`, params )
        //   this.$http.get( url ).then(({ ok, data }) => {
        //     const filename = data.data.file;
        //     if( filename === "N/A" ) return toast.red( "File Not Available: Cannot download invoices." );
        //     toast.green( "Fetching Download..." );
        //     return pollDownload( `v2/downloads/${filename}/status`, this.invoices.length );
        //   })
        //   .catch( e => {
        //     console.log( e );
        //   })
        },

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

        formatDateTime (date) {
        return formatDateStrings(date)
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

        setDisplayType(val) {
            this.displayType = val
        },

        sortInvoices () {
            sortList(this.displayType, this.invoices, 'clientEmail')
        }
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
.mx-datepicker-popup { 
  left: 0px;
}
</style>
