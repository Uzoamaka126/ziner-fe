<template>
    <div class="invoice__wrap">
        <div class="main__content">
            <div class="panel">    
                <div class="panel__content">
                  <div style="margin-top: 1rem; padding-bottom: 3rem;">
                    <div class="page__row--header">  
                        <div class="row__left">
                            <div class="row__item flex align-items-center">
                                <div style="color: #57584e;" class="text--bold">Invoice #{{ invoice.invoiceNo }}</div>
                                <span class="badge rounded-pill btn--danger ml--20" :class="[statusMap[invoice.status]]">{{ invoice.status }}</span>
                            </div>
                        </div>
                        <!-- invoice button actions -->
                        <div class="row__right invoice__single--btns">
                            <div class="row__item positionRelative" v-if="invoice.status === 'Draft'">
                                <button class="btn btn--secondary btn--sm">Edit</button>
                            </div>
                            <div class="row__item positionRelative" v-if="invoice.status !== 'Draft'">
                                <button class="btn btn--primary btn--sm" data-bs-toggle="modal" data-bs-target="#markInvoiceAsPaid">Mark as paid</button>
                            </div>
                            <div class="row__item positionRelative" v-if="invoice.status !== 'Draft'">
                                <button class="btn btn--secondary btn--sm" @click="duplicateInvoice()">Duplicate</button>
                            </div>
                            <div class="row__item positionRelative">
                                <button class="btn btn--danger btn--sm" data-bs-toggle="modal" data-bs-target="#deleteInvoice">Delete</button>
                            </div>
                        </div>
                    </div>

                    <!-- Payment info -->
                     <div class="row invoice__section--item">
                        <div class="col-12 mb--5">
                            <p class="text--bold text--color-dark">Payment Info</p>
                        </div>
                        <div class="col-12">
                            <div class="invoice__row invoice__item">
                                <div class="form__row__left invoice__item--payment">
                                <div class="invoice__client">
                                        <div class="invoice__client--bio">
                                            <p class="title">Amount</p>
                                            <p class="invoice__details--text">{{ invoice.currency}} {{ computedTotal }}</p>
                                        </div>
                                        <div class="invoice__client--bio">
                                            <p class="title">Date Sent</p>
                                            <p class="invoice__details--text">{{ formatDate(invoice.createdAt)}}</p>
                                        </div>
                                        <div class="invoice__client--bio">
                                            <p class="title">Date Created</p>
                                            <p class="invoice__details--text">{{ formatDate(invoice.createdAt)}}</p>
                                        </div>
                                        <div class="invoice__client--bio">
                                            <p class="title">Due date</p>
                                            <p class="invoice__details--text">{{ formatDate(invoice.dueDate) }}</p>
                                        </div>
                                </div>
                                </div>
                            </div>
                        </div>
                     </div>

                    <!-- Client info -->
                    <div class="row invoice__section--item">
                        <div class="col-12 mb--5">
                            <p class="text--bold text--color-dark">Client Info</p>
                        </div>
                        <div class="col-12">
                            <div class="invoice__row invoice__item ">
                                <div v-if="isClientLoading && !client" class="col-12 mb--5">
                                    <p class="text-faded text--sm">Loading client information...</p>
                                </div>
                                <div v-else-if="!isClientLoading && !client" class="col-12 mb--5">
                                    <p class="text--sm">No client information is available for this invoice</p>
                                </div>
                                <div v-else class="form__row__left">
                                    <div class="invoice__client">
                                        <div class="invoice__client--bio">
                                            <p class="title">Client Name</p>
                                            <p class="invoice__details--text">{{ client.name }}</p>
                                        </div>
                                        <div class="invoice__client--bio">
                                            <p class="title">Phone Number</p>
                                            <p class="invoice__details--text">{{ client.phoneNumber }}</p>
                                        </div>
                                        <div class="invoice__client--bio">
                                            <p class="title">Email</p>
                                            <p class="invoice__details--text">{{ invoice.clientEmail }}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Item info -->
                      <div class="row invoice__section--item">
                        <div class="col-12 mb--5">
                            <p class="text--bold text--color-dark">Invoice items Info</p>
                        </div>
                        <div class="col-12">
                            <div class="invoice__row invoice__item">
                                <div class="invoice__details--item mb--10" v-for="item in items">
                                    <div class="invoice__details--text">
                                        {{ item.itemName }}
                                    </div>
                                    <div class="invoice__details--text">
                                        <span class="text--medium">{{ invoice.currency}} {{ formatMoney(item.itemPrice)}}</span>
                                        <span style="color: #687385;"> x{{ item.itemQuantity }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                      </div>

                    <!-- Others -->
                    <div class="row invoice__section--item">
                        <div class="col-12 mb--5">
                            <p class="text--bold text--color-dark">Others</p>
                        </div>
                        <div class="col-12">
                            <div class="invoice__row invoice__item">
                                <div class="flex align-items-center form__row width--100">
                                    <div class="form__row__right width--100">
                                        <div class="invoice__details--item mt--10 mb--10 flex align-items-center">
                                            <div class="invoice__compile--label">Subtotal:</div>
                                            <div class="invoice__compile--value ml--20 text--medium">{{ invoice.currency}} {{ formatMoney(computedSubTotal) }}</div>
                                        </div>
                                        <div class="invoice__details--item">
                                            <div class="invoice__compile--label">Tax:</div>
                                            <div class="invoice__compile--value ml--20 text--medium">{{ formatMoney(computedTaxes) }}%</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Total -->
                    <div class="row invoice__section--item">
                        <div class="col-12 mb--5">
                            <p class="text--bold text--color-dark">Total</p>
                        </div>
                        <div class="col-12">
                            <div class="invoice__row invoice__item">
                                <div class="invoice__details--item">
                                    <div class="invoice__details--text">
                                        Total
                                    </div>
                                    <div class="invoice__details--text">
                                        <span class="text--medium">{{ invoice.currency}} {{ computedTotal }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                  </div>
                </div>
            </div>
        </div>

         <!-- modals -->
        <confirm-deletion-modal :type="'invoice'" @delete="deleteInvoice" @reset="resetCurrentInvoice" />
        <mark-invoice-as-paid  @markInvoiceAsPaid="markInvoiceAsPaid" />
        <toast-el />
    </div>
</template>

<script>
import ConfirmDeletionModal from '../shared/modals/ConfirmDeletion.vue';
import MarkInvoiceAsPaid from '../shared/modals/MarkInvoiceAsPaid.vue';
import ToastEl from '../shared/toast/index.vue';
import { myToast } from '../../utils/toast'
import { dummyInvoicesData } from '../../utils/dummy';
import clientsList from '../../assets/js/clients.json'
import { formatDateStrings, formatAmount } from '../../utils/others';


export default {
    name: 'InvoiceDetails',
    components: {
        ConfirmDeletionModal,
        MarkInvoiceAsPaid,
        ToastEl
    },
    created() {
        this.fetchInvoice(this.$route.params.id)
    },

    data() {
        return {
            config: {
                dueDate: {
                    date: undefined,
                    isEmpty: false,
                },
                number: {
                    decimal: '.',
                    thousands: ',',          // The currency name or symbol followed by a space.
                    prefix: "",
                    suffix: '',
                    precision: 0,
                    masked: false
                },
                percentage: {
                    decimal: '.',
                    thousands: ',',          // The currency name or symbol followed by a space.
                    prefix: "%",
                    suffix: '',
                    precision: 2,
                    masked: false
                },
            },
            invoice: null,
            invoices: dummyInvoicesData,
            client: null,
            clientsList: clientsList,
            isClientLoading: false,
            items: [],
            statusMap: {
                'Draft': "tag--blue",
                'Blocked': "tag--purple",
                'Paid': "tag--green",
                'Due': "tag--red",
                'Issued': "tag--yellow",
                'Rejected': "tag--grey",
            },
            tax: []
        }
    },

    computed: {
        moneyConfig() {
            return {
                decimal: '.',
                thousands: ',',
                prefix: this.invoice.currency + " ",
                suffix: '',
                precision: 2,
                masked: false,
            }
        },
        computedSubTotal() {
            if (this.items.length > 0) {
                const transformArr = this.items.map(item => item.itemPrice * item.itemQuantity)
               const sumItemsArr = transformArr.reduce((previousValue, currentValue) => previousValue + currentValue, 0);
                return sumItemsArr
            } else {
                return 0
            }
        },
        computedTaxes() {
            let taxCount = 0;
            if (this.tax.length > 0) {
                for (var i = 0; i < this.tax.length; i++) {
                    if (this.tax[i].taxValue) {
                        taxCount = this.tax[i].taxValue + taxCount
                    }
                }
            }
            return taxCount
        },
        computedTotal () {
            return this.formatMoney((this.computedTaxes * this.computedSubTotal) + this.computedSubTotal);
        }
    },

    methods: {
        formatDate(date) {
            return formatDateStrings(date) || 'N/A'
        },
        formatMoney: function (x) {
            return formatAmount(x)
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

        fetchInvoice(id) {
            // const queryString = `v2/invoices/${ this.refNo }/?include_customer=1`;
            // this.$http.get(queryString).then(({ ok, data }) => {
            //     if (ok !== true) return;
            //     this.invoice = data.data;
            //     if( this.invoice.status === 'paid' ) return this.$router.push({ name: "not-found" });
            //     this.loading = false;
            // })
            // .catch( error => {
            //     console.log( error.data.message );
            //     this.$router.push({ name: "not-found" })
            // })
            const filteredInvoice = this.invoices.find(item => item.invoiceNo === id)
            this.invoice = !filteredInvoice ? null : filteredInvoice;
            this.items = filteredInvoice.meta.items
            this.tax = filteredInvoice.meta.tax

            this.fetchClientInfo()
        },

        fetchClientInfo() {
            this.isClientLoading = true
            console.log('this.invoice.clientId', this.invoice.clientId);
            setTimeout(() => {
                if (this.invoice.clientId) {
                    console.log('this.invoice.clientId', this.invoice.clientId);
                    const client = this.clientsList.find(item => item._id === this.invoice.clientId)
                    console.log({ client }, this.invoice.clientId);
                    this.client = !client ? null : client
                }
                this.isClientLoading = false
            }, 2000)
        },

        resetCurrentInvoice() {
            this.invoice = {}
        },

        markInvoiceAsPaid() {},

        duplicateInvoice() {
            myToast('An error occurred', 'Unable to duplicate invoice', 'red').show()
        },

        editInvoice() {}
    },
    watch: {}
}
</script>

<style lang="scss" scoped>
    .row.hidden-xs {
        border-bottom: 1px solid #f5f5f5;
        margin-bottom: 2rem;
    }

    .form__row__left {
        max-width: 500px;
    }

    .invoice__single--btns {
        .row__item {
            padding-right: 0px !important;
        }
    }
</style>