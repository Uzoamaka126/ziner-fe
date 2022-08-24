<template>
    <div class="invoice__wrap">
        <div class="main__content">
            <div class="panel">    
                <div class="panel__content">
                  <div style="margin-top: 1rem; padding-bottom: 3rem;">
                    <div class="row hidden-xs" style="padding-bottom: 1rem; padding-top: 0.8rem;">  
                        <div class="row__left">
                            <div class="row__item flex align-items-center">
                                <div style="color: #57584e;" class="text--bold">Invoice #43542</div>
                                <span class="badge rounded-pill btn--danger ml--20">Not paid</span>
                            </div>
                        </div>
                        <!-- invoice button actions -->
                        <div class="row__right invoice__single--btns">
                            <div class="row__item positionRelative">
                                <button class="btn btn--secondary btn--sm">Edit</button>
                            </div>
                            <div class="row__item positionRelative">
                                <button class="btn btn--primary btn--sm" data-bs-toggle="modal" data-bs-target="#markInvoiceAsPaid">Mark as paid</button>
                            </div>
                            <div class="row__item positionRelative">
                                <button class="btn btn--secondary btn--sm" @click="duplicateInvoice()">Duplicate</button>
                            </div>
                            <div class="row__item positionRelative">
                                <button class="btn btn--danger btn--sm" data-bs-toggle="modal" data-bs-target="#deleteInvoice">Delete</button>
                            </div>
                        </div>
                    </div>

                    <!-- Amount info -->
                    <div class="row invoice__row block">
                        <div class="form__row__left">
                           <div class="invoice__client">
                                <div class="invoice__client--bio">
                                    <p class="title">Amount</p>
                                    <p class="sub-title">NGN 200.000</p>
                                </div>
                                <div class="invoice__client--bio">
                                    <p class="title">Date Sent</p>
                                    <p class="sub-title">2nd November 2021</p>
                                </div>
                                <div class="invoice__client--bio">
                                    <p class="title">Due date</p>
                                    <p class="sub-title">26th December 2021</p>
                                </div>
                           </div>
                        </div>
                    </div>

                    <!-- Client info -->
                    <div class="row invoice__row block">
                        <div class="form__row__left">
                            <div class="invoice__client">
                                <div class="invoice__client--bio">
                                    <p class="title">Client Name</p>
                                    <p class="sub-title">Client X</p>
                                </div>
                                <div class="invoice__client--bio">
                                    <p class="title">Phone Number</p>
                                    <p class="sub-title">090000000000</p>
                                </div>
                                <div class="invoice__client--bio">
                                    <p class="title">Email</p>
                                    <p class="sub-title">amaka@gmail.com</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row invoice__row block">
                        <div class="invoice__details--item">
                          <div class="invoice__details--text">
                              Test Item 1
                          </div>
                          <div class="invoice__details--text">
                              <span>NGN 200.00</span>
                              <span style="color: #a4a59a;"> x1</span>
                          </div>
                        </div>
                    </div>

                    <!-- Add Item + computation -->
                    <div class="row invoice__row block">
                        <div class="flex align-items-center form__row width--100">
                            <div class="form__row__right width--100">
                                <div class="invoice__details--item mt--10 mb--10 flex align-items-center">
                                    <div class="invoice__compile--label">Subtotal:</div>
                                    <div class="invoice__compile--value ml--20">NGN 0.00</div>
                                </div>
                                <div class="invoice__details--item">
                                    <div class="invoice__compile--label">Tax:</div>
                                    <div class="invoice__compile--value ml--20">NGN 0.00</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row invoice__row block">
                        <div class="invoice__details--item">
                            <div class="invoice__details--text">
                                Total
                            </div>
                            <div class="invoice__details--text">
                                <span>NGN 200.00</span>
                            </div>
                        </div>
                    </div>
                  </div>
                </div>
            </div>
        </div>

         <!-- modals -->
        <confirm-deletion-modal :type="'invoice'" :action="deleteInvoice" :reset="resetCurrentInvoice" />
        <mark-invoice-as-paid  @markInvoiceAsPaid="markInvoiceAsPaid" />
        <toast-el />
        <!-- <toast-el :message="'Unable to duplicate invoice'" :type="'error'" :headingTitle="'An error occurred'" /> -->
    </div>
</template>

<script>
import ConfirmDeletionModal from '../shared/modals/ConfirmDeletion.vue';
import MarkInvoiceAsPaid from '../shared/modals/MarkInvoiceAsPaid.vue';
import ToastEl from '../shared/toast/index.vue';
import { myToast } from '../../utils/toast'

export default {
    name: 'InvoiceDetails',
    components: {
        ConfirmDeletionModal,
        MarkInvoiceAsPaid,
        ToastEl
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
            invoice: {}  
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
    },

    methods: {
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

        fetchInvoice() {
            const queryString = `v2/invoices/${ this.refNo }/?include_customer=1`;
            this.$http.get(queryString).then(({ ok, data }) => {
                if (ok !== true) return;
                this.invoice = data.data;
                if( this.invoice.status === 'paid' ) return this.$router.push({ name: "not-found" });
                this.loading = false;
            })
            .catch( error => {
                console.log( error.data.message );
                this.$router.push({ name: "not-found" })
            })
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

    created() {},

    watch: {}
}
</script>

<style lang="scss" scoped>
    .row>* {
    width: auto;
    }
    .row.hidden-xs {
    border-bottom: 1px solid #f5f5f5;
    margin-bottom: 2rem;
    }
    .form__row__left {
    max-width: 500px;
    }
    .row.invoice__row  {
    border-bottom: 1px solid #f5f5f5;
    margin-bottom: 1rem;
    padding-bottom: 1.5rem;
    }
    .invoice__single--btns {
        .row__item {
            padding-right: 0px !important;
        }
    }
    .invoice {
        &__details {
            &--item {
                display: flex;
                justify-content: space-between;
                max-width: 80%;
                width: 80%;

                .invoice__compile--label {
                    color: #57584e;
                }
            }
        }
    }
</style>