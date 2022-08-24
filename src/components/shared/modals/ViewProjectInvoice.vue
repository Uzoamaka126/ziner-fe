<template>

 <div class="modal fade" id="viewProjectInvoice" tabindex="-1" aria-labelledby="viewProjectInvoiceLabel" aria-hidden="true">
    <div class="modal-dialog" style="max-width: 600px;">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="deleteClientLabel">Invoice Details</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="invoice__wrap">
                    <div class="main__content">
                        <div class="panel">    
                            <div class="panel__content">
                                <div style="margin-top: 1rem;">
                                    <div class="row hidden-xs" style="padding-bottom: 1rem; padding-top: 0.8rem;">  
                                        <div class="row__left">
                                            <div class="row__item flex align-items-center">
                                                <div style="color: #57584e;" class="text--bold">Invoice #43542</div>
                                                <span class="badge rounded-pill btn--danger ml--20">Not paid</span>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Amount info -->
                                    <div class="row invoice__row block">
                                        <div class="form__row__left mb--20">
                                            <div class="invoice__client">
                                                <div class="invoice__client--bio">
                                                    <p class="title font-medium">Amount</p>
                                                    <p class="sub-title text--sm">NGN 200.000</p>
                                                </div>
                                                <div class="invoice__client--bio">
                                                    <p class="title font-medium">Date Sent</p>
                                                    <p class="sub-title text--sm">2nd November 2021</p>
                                                </div>
                                                <div class="invoice__client--bio">
                                                    <p class="title font-medium">Due date</p>
                                                    <p class="sub-title text--sm">26th December 2021</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Client info -->
                                    <div class="row invoice__row block">
                                        <div class="form__row__left mb--20">
                                            <div class="invoice__client">
                                                <div class="invoice__client--bio">
                                                    <p class="title font-medium">Client Name</p>
                                                    <p class="sub-title text--sm">Client X</p>
                                                </div>
                                                <div class="invoice__client--bio">
                                                    <p class="title font-medium">Phone Number</p>
                                                    <p class="sub-title text--sm">090000000000</p>
                                                </div>
                                                <div class="invoice__client--bio">
                                                    <p class="title font-medium">Email</p>
                                                    <p class="sub-title text--sm">amaka@gmail.com</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row invoice__row block">
                                        <div class="invoice__details--item mb--20">
                                            <div class="invoice__details--text text--sm">
                                                Test Item 1
                                            </div>
                                            <div class="invoice__details--text text--sm">
                                                <span>NGN 200.00</span>
                                                <span style="color: #a4a59a;"> x1</span>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Add Item + computation -->
                                    <div class="row invoice__row block">
                                        <div class="flex align-items-center form__row width--100">
                                            <div class="form__row__right width--100 mb--20">
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
                                        <div class="invoice__details--item mb--20">
                                            <div class="invoice__details--text text--sm">
                                                Total
                                            </div>
                                            <div class="invoice__details--text">
                                                <span class="text--sm">NGN 200.00</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- footer -->
            <div class="modal-footer">
                <button type="button" class="btn btn--secondary mr--10 btn--sm" data-bs-dismiss="modal" aria-label="Close" @click="resetCurrentInvoice()">Close</button>
            </div>
        </div>
    </div>
 </div>
</template>

<script>
export default {
    name: 'ProjectInvoiceDetails',
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
    },

    created() {},
}
</script>

<style lang="scss" scoped>
    .row {
        padding: 0px 15px !important;
    }
    .row.hidden-xs {
        border-bottom: 1px solid #f5f5f5;
        margin-bottom: 2rem;
    }
    .row.invoice__row  {
        border-bottom: 1px solid #f5f5f5;
        margin-bottom: 1rem;
        padding-bottom: 1.5rem;
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
    .form__row__left {
        max-width: 100% !important;
    }
</style>