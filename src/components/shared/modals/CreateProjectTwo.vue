<template>
    <div class="modal fade" id="createProject" tabindex="-1" aria-labelledby="createProjectLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="createProjectLabel">Create a new project </h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
            <form @submit.prevent="" class="form--workspace__create mb--20">
                <div class="form__item">
                    <label for="name" class="form-label">Title</label>
                    <input type="text" class="form-control form-control-sm" v-model="title" id="name" placeholder="Design for project X" required>
                </div>
                 <div class="form__item">
                    <label for="name" class="form-label">Client</label>
                    <select class="form-select" aria-label="Default select example" v-model="client" required>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>
                </div>
                 <div class="form__item">
                    <label for="name" class="form-label">Tags</label>
                    <multi-select v-model="selectedTagsValue" :options="tags" mode="tags" :close-on-select="true" :searchable="true" :create-option="true"></multi-select>
                </div>
                <div class="form__item width--100">
                    <label for="">Set a deadline</label>
                    <v-date-picker v-model="deadline" class="width--100">
                        <template #default="{ inputValue, inputEvents }">
                            <input class="px-3 py-1 border rounded width--100" :value="inputValue" v-on="inputEvents" required />
                        </template>
                    </v-date-picker>
                </div>
            </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn--secondary btn--sm" data-bs-dismiss="modal">Cancel</button>
                <button type="button" class="btn btn--primary btn--sm" :disabled="isCreateBtnDisabled">Create project</button>
            </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'CreateProjectTwo',
    props: [],
    data () {
        return {
           title: '',
            client: '',
            tags: ['design', 'onboarding', 'seo', 'frontend'],
            deadline: '',
            selectedTagsValue: null
        }
    },
    computed: {
        isCreateBtnDisabled() {
            if(!this.title || !this.client || !this.tags.length || !this.client || !this.deadline) {
                return true
            } else {
                return false
            }
        }
    },
    methods: {
    }
}
</script>

<style src="@vueform/multiselect/themes/default.css">

</style>