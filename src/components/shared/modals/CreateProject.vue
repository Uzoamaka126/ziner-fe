<template>
    <div>
        <main-modal 
            :showModal="showCreateProjectModal" 
            :isCloseButton=false 
            :modalSize="'modal__dialog--lg'"
            :width="'620px'"
            :position="'center'"
            :isShowHeader="true"
            :title="'Add a new project'"
            :headerSize="'16px'"
        >
            <template #body>
                <div class="modal__wrapper--onboarding mb--45">
                    <div class="modal--section">
                        <div>
                            <form @submit.prevent="" class="form--workspace__create mb--20">
                                <div class="form__item mb--10">
                                    <div class="mb-3">
                                        <label for="name" class="form-label">Project Title</label>
                                        <input type="text" class="form-control" v-model="form.title" id="title" placeholder="Copy wriring for xyz company">
                                    </div>
                                </div>
                                <div class="modal__form--row">
                                    <div class="modal__form--item m-w-100">
                                        <label for="name" class="form-label">Select one or more labels</label>
                                        <vue-multi-select 
                                            v-model="form.selectedTags"
                                            :options="tags"
                                            :multiple="true"
                                            :close-on-select="true"
                                            placeholder="Search or add label"
                                            label="name"
                                            track-by="id"
                                            tag-placeholder="Add this as a new label"
                                            :taggable="true"
                                            @tag="addTag"
                                        ></vue-multi-select>
                                    </div>
                                </div>
                                <div class="modal__form--row">
                                    <div class="modal__form--item m-w-100">
                                        <label for="name" class="form-label">Set a deadline for this project <span class="text-faded text--xs">(optional)</span></label>
                                        <v-date-picker v-model="form.deadline">
                                            <template #default="{ inputValue, inputEvents }">
                                                <input class="px-3 py-1 border rounded due_date form-control" :value="inputValue" v-on="inputEvents" />
                                            </template>
                                        </v-date-picker>
                                    </div>
                                </div>
                                <div class="modal__form--row">
                                    <div class="modal__form--item">
                                        <label for="name" class="form-label">Status</label>
                                        <select class="form-select" aria-label="Default select example" v-model="form.status">
                                            <option v-for="status in statuses" :key="status" :value="status">{{ status }}</option>
                                        </select>
                                    </div>
                                    <div class="modal__form--item">
                                        <label for="name" class="form-label">Mark this project as important?</label>
                                        <select class="form-select" aria-label="Default select example" v-model="form.isFavourite">
                                            <option value="0">No</option>
                                            <option value="1">Yes</option>
                                        </select>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </template>
            <template #footer>
                <div class="width--100">
                    <button class="btn btn--secondary btn--md form__footer--btnFirst" type="submit" @click="handleCancel">Cancel</button>
                    <button class="btn btn--primary btn--md" :disabled="!isFormFilled" type="submit">Add project</button>
                </div>
            </template>
        </main-modal>
    </div>
</template>

<script>
import MainModal from './MainModal.vue';
import { PROJECT_STATUSES } from '../../../utils/enums'

export default {
    name: 'CreateProjectModal',
    components: {
        'main-modal': MainModal,
    },
    props: ["showCreateProjectModal", "toggleCreateProjectModal"],
    data: () => ({
       statuses: PROJECT_STATUSES,
       form: {
        title: '',
        status: '',
        deadline: '',
        isFavourite: false,
        selectedTags: []
       },
       tags: [
            { id: 1, name: 'design' },
            { id: 2, name: 'web' },
            { id: 3, name: 'android' },
            { id: 4, name: 'mobile' },
            { id: 5, name: 'marketing' },
        ]
    }),
    computed: {
        isFormFilled() {
            if (!this.form.title || !this.form.status) {
                return false
            } else {
                return true
            }
        }
    },
    methods: {
        addTag(newTag) {
            const tag = {
                id: Math.floor((Math.random() * 10000000)),
                name: newTag,
            }
            this.tags.push(tag)
            this.form.selectedTags.push(tag)
        },
        handleCancel() {
            this.form = {
                title: '',
                status: '',
                deadline: '',
                isFavourite: false,
                selectedTags: []
            }
            this.$emit( "cancel");
        }
    }
}
</script>

<style scoped lang="scss">
    .modal__wrapper--onboarding {
        padding-left: 32px;
        padding-right: 32px;
    }
</style>
