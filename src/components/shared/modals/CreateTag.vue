<template>
    <div class="modal fade" id="createTag" tabindex="-1" aria-labelledby="createTagLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="createTagLabel">Add tag </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form @submit.prevent="" class="form--workspace__create mb--20">
                        <div class="form__item">
                            <div class="">
                                <label for="name" class="form-label">Name</label>
                                <input type="text" class="form-control form-control-sm" v-model="tagName" id="name" placeholder="Completed">
                            </div>
                            <p class="text-mute text--xxs text--info mt-1" v-if="tagName.length < 3">Tag should be no less than three words </p>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn--primary btn--sm" :disabled="tagName.length < 3">Create tag</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CreateTag',
    props: [],
    data: () => ({
       tagName: ''
    }),
    computed: {
    },
    methods: {
    }
}
</script>