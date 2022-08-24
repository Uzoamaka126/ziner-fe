<template>
    <div class="modal fade" id="deleteClient" tabindex="-1" aria-labelledby="deleteClientLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="deleteClientLabel">Delete client</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                <form @submit.prevent="" class="form--workspace__create mb--20">
                    <div class="form__item">
                        <div class="mb-3">
                            <p>Are you sure you want to delete this client?</p>
                        </div>
                    </div>
                </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn--secondary mr--10 btn--sm" data-bs-dismiss="modal" aria-label="Close">Cancel</button>
                    <button type="button" class="btn btn--danger btn--sm" @click="handleDeleteClient()">Delete client</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'DeleteClient',
    props: ['handleDeleteClient'],
    data: () => ({
        loading: false
    }),
}
</script>