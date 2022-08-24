<template>
    <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
        <div class="offcanvas-header">
            <!-- <h5 class="offcanvas-title" id="offcanvasRightLabel">Offcanvas</h5> -->
            <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
           <div class="invoice__preview--wrap">
               <div class="width--100">
                   <div class="invoice__preview--contents">
                        <div class="invoice__preview--header">
                            <h1>Invoice</h1>
                            <div>
                                <p>uzoamaka Anyanwu</p>
                                <p>uzoamaka@gmail.cpm</p>
                                <p>09063950225</p>
                            </div>
                       </div>
                       <div class="invoice__preview--card">
                           <div class="top">
                                <div class="left">
                                    <div class="left--item">
                                        <h6>Billed to</h6>
                                        <div>
                                            <p>Uzoamaka Test</p>
                                            <p>uzoamaka@test.com</p>
                                            <p>22, Taofeek, Gbabgaa</p>
                                            <p>Lagos, Nigeria</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="right">
                                    <div class="right--item mt--10">
                                        <h6>Invoice Number</h6>
                                            <p>#444444</p>
                                    </div>
                                    <div class="right--item mt--10">
                                        <h6>Due Created</h6>
                                            <p>April 24th 2022</p>
                                    </div>
                                    <div class="right--item mt--10">
                                        <h6>Due Date</h6>
                                            <p>May 3rd 2022</p>
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
export default {
    name: 'PreviewInvoice',
    props: ['items'],
    data() {
        return {
            clients: [],
            reactiveSelection: this.selection,
            dropDownIsShown: false,
            loading: false,
            typingInput: null,
        }
    },

    computed: {},

    watch: {
        selection(newVal) {
            this.reactiveSelection = newVal;
        },
        reactiveSelection( newVal ) {
            this.$emit( "change", newVal )
            this.$emit('input', newVal)
        }
    },

    methods: {},

    created() {},
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
