<template>
    <div class="modal fade" id="editTag" tabindex="-1" aria-labelledby="editTagLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="editTagLabel">Edit tag </h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
            <form @submit.prevent="" class="form--workspace__create mb--20">
                <div class="form__item">
                    <div>
                        <label for="name" class="form-label">Name</label>
                        <input type="text" class="form-control form-control-sm" v-model="reactiveTagName" id="name">
                    </div>
                    <p class="text-mute text--xxs text--info mt-1" v-if="reactiveTagNameLength < 3">Tag should be no less than three words </p>
                </div>
            </form>
            </div>
            <div class="modal-footer flex items-center">
                <button type="button" class="btn btn--secondary btn--sm" data-bs-dismiss="modal" aria-label="Close" @click="reset">Cancel</button>
                <button type="button" class="btn btn--primary btn--sm" :disabled="reactiveTagNameLength < 3">Save</button>
            </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'EditTag',
    props: {
        currentTagDetails: { type: Object, required: true, default: () => {}},
        tagName: { type: String, default: undefined || '' },
    }, 
    model: {
        prop: "value",
        event: "change",
    },
    data () {
       return {
           reactiveTagName: this.tagName
       }
    },
    computed: {
        reactiveTagNameLength() {
            if (!this.reactiveTagName && !this.reactiveTagName.length) {
                return 0
            } else {
                return this.reactiveTagName.length
            }
        }
    },
    methods: {
        reset() {
            this.$emit("resetCurrentTagDetails");
        },
    },
    watch: {
        tagName( newVal ) {
            this.reactiveTagName = newVal;
         },

        reactiveTagName( newVal ) {
            this.$emit( "change", newVal )
        }
    }
}
</script>