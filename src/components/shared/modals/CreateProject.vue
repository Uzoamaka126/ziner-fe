<template>
    <div>
        <main-modal 
            :showModal="showCreateProjectModal" 
            :isCloseButton=false 
            :modalSize="'modal__dialog--lg'"
            :width="'620px'"
            :position="'center'"
            :isShowHeader="true"
            :title="'Create new project'"
            :headerSize="'20px'"
        >
            <div class="modal__wrapper--onboarding">
                <div class="modal--section">
                    <div class="">
                        <form @submit.prevent="" class="form--workspace__create mb--20">
                            <div class="form__item">
                                <div class="mb-3">
                                    <label for="name" class="form-label">Project Name</label>
                                    <input type="text" class="form-control" v-model="clientName" id="name" placeholder="Copy wriring for xyz company">
                                </div>
                            </div>
                            <select class="form-select" aria-label="Default select example">
                                <option selected>Client</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                            <select class="form-select" aria-label="Default select example">
                                <option selected>Theme</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                             <select class="form-select" aria-label="Default select example">
                                <option selected>Tags</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                            <div class="form__footer width--100">
                                <button class="btn btn--secondary btn--md form__footer--btnFirst" type="submit" @click="toggleCreateProjectModal('hide')">Cancel</button>
                                <button class="btn btn--primary btn--md" :disabled="!clientName" type="submit">Create</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main-modal>
    </div>
</template>

<script>
import MainModal from './MainModal.vue';

export default {
    name: 'CreateBoardModal',
    components: {
        'main-modal': MainModal,
    },
    props: ["showCreateProjectModal", "toggleCreateProjectModal"],
    data: () => ({
       clientName: ''
    }),
    computed: {
    },
    methods: {
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .modal__wrapper {
        display: flex;
        flex-direction: row;
        min-height: 500px;
        outline: 0;
        overflow: scroll;
        // height: 730px;
        // max-height: 730px;

        &--onboarding {
            padding-left: 32px;
            padding-right: 32px;
        }
    }
    .modal--section__left, .modal--section__right {
        width: 50%;
    }
    .modal--section__left {
        padding: 0 24px;
        margin: 64px auto 16px;
    }
    .left--wrapper {
        width: 400px;
        margin-bottom: 16px;
        margin-bottom: 5rem;
        // margin-top: 2rem;
        margin-left: auto;
        margin-right: auto;

        p {
            font-size: 14px;
        }
    }
</style>
