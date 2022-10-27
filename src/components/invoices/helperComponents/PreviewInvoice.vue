<template>
    <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
        <div class="offcanvas-header">
            <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
           <div class="invoice__preview--wrap">
               <div class="width--100">
                   <div class="invoice__preview--contents">
                        <div class="invoice__preview--header">
                            <h1>Invoice</h1>
                            <div>
                                <p>{{ data.user.fullName }}</p>
                                <p>{{ data.user.email}}</p>
                                <p>{{ data.user.phoneNumber }}</p>
                            </div>
                       </div>
                       <div class="invoice__preview--card">
                           <div class="top">
                                <div class="left">
                                    <div class="left--item">
                                        <h6>Billed to</h6>
                                        <div>
                                            <p>{{ data.client.name }}</p>
                                            <p>{{ data.client.email }}</p>
                                            <p>{{ data.client.phoneNumber }}</p>
                                            <p v-if="data.client.address || data.client.country">{{ data.client.address }}, {{ data.client.country }}</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="right">
                                    <div class="right--item mt--10">
                                        <h6>Invoice Number</h6>
                                            <p v-if="data.invoice.invoiceNo">#{{ data.invoice.invoiceNo }}</p>
                                            <p v-else>Not generated yet</p>
                                    </div>
                                    <div class="right--item mt--10">
                                        <h6>Due Created</h6>
                                            <p>{{ formatDate(data.invoice.date_created) }}</p>
                                    </div>
                                    <div class="right--item mt--10">
                                        <h6>Due Date</h6>
                                            <p>{{ formatDate(data.invoice.due_date) }}</p>
                                    </div>
                                </div>
                           </div>

                           <div class="mt--40 mb--20" style="font-size: 20px; font-weight: 500;">
                               {{ items.length }} {{ items.length > 1 ? 'items' : 'item'}}
                           </div>
                           <table class="table table-light" style="margin-top: 2rem">
                                <thead>
                                    <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Amount</th>
                                    </tr>
                                </thead>
                                <tbody v-for="(item, index) in items" :key="index">
                                    <tr>
                                        <td>{{ item.item_name }}</td>
                                        <td>{{ item.item_quantity }}</td>
                                        <td>{{ item.item_price }}</td>
                                        <td>{{ item.item_unit }}</td>
                                    </tr>
                                </tbody>
                            </table>
                       </div>
                   </div>
               </div>
           </div>
        </div>
    </div>
</template>

<script>
import { formatDateStrings, sortList } from '../../../utils/others';

export default {
    name: 'PreviewInvoice',
    props: ['items', 'data'],
    data() {
        return {
            clients: [],
            loading: false,
        }
    },

    computed: {},
    methods: {
        formatDate(dateString) {
            if (typeof dateString === 'object') {
                let stringDate = dateString.toString()
                return formatDateStrings(stringDate) || 'N/A'
            }
            return dateString && typeof dateString === 'string' ? formatDateStrings(dateString) : 'N/A'
        },
    }
}
</script>

<style lang="scss" scoped>
    .offcanvas-end {
        width: 650px;
    }
    thead {
        border-style: solid !important;
    }
    th {
        padding-left: 10px !important;
    }
</style>
