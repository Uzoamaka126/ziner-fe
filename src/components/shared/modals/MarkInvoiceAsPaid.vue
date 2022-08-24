<template>
    <div class="modal fade" id="markInvoiceAsPaid" tabindex="-1" aria-labelledby="markInvoiceAsPaidLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="markInvoiceAsPaidLabel">Update Invoice Status</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                <form @submit.prevent="" class="form--workspace__create mb--20">
                    <div class="form__item">
                        <div class="mb-3 mt--20 text-center">
                            <p>Are you sure you want to mark this invoice as <span class="text--medium">paid</span>?</p>
                            <p class="text--sm mt--10 text--mute">(Note that: this action cannot be undone)</p>
                        </div>
                    </div>
                </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn--secondary mr--10 btn--sm" data-bs-dismiss="modal" aria-label="Close">Cancel</button>
                    <button type="button" class="btn btn--primary btn--sm" @click="handleMarkInvoiceAsPaid()">Mark as paid</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'MarkInvoiceAsPaid',
    data () {
        return {
            loading: 'default',
        }
    },

    methods: {
        handleMarkInvoiceAsPaid () {
            this.$emit( "markInvoiceAsPaid")
        }
    }
}
</script>