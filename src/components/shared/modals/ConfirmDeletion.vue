<template>
    <div class="modal fade" :id="computeModalId" tabindex="-1" :aria-labelledby="computeModalAriaLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="deleteClientLabel">Delete {{ type }}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                <form @submit.prevent="" class="form--workspace__create mb--20">
                    <div class="form__item">
                        <div class="mb-3">
                            <p>Are you sure you want to delete this {{ type }}?</p>
                        </div>
                    </div>
                </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn--secondary mr--10 btn--sm" data-bs-dismiss="modal" aria-label="Close" @click="reset()">Cancel</button>
                    <button type="button" class="btn btn--danger btn--sm" @click="action()">Delete</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'ConfirmDeletion',
    props: ['action', 'type', 'reset'],
    data: () => ({
        loading: false,
        attributes: {
            'client': {
                name: 'client',
            },
            'tag': {
                name: 'tag',
            },
            'project': {
                name: 'project',
            },
            'invoice': {
                name: 'invoice',
            }
        }
    }),
    computed: {
        computeModalType() {
            return this.attributes[this.type]
        },
        computeModalId() {
            return 'delete' + this.type.charAt(0).toUpperCase() + this.type.slice(1);
        },
        computeModalAriaLabel() {
            return 'delete' + this.type.charAt(0).toUpperCase() + this.type.slice(1) + 'Label'
        }
    },
}
</script>