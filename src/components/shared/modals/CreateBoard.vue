<template>
    <div>
        <main-modal 
            :showModal="showCreateBoardModal" 
            :isCloseButton=false 
            :modalSize="'modal__dialog--lg'"
            :width="'620px'"
            :position="'center'"
            :isShowHeader="true"
            :title="'Create board'"
        >
            <div class="modal__wrapper--onboarding">
                <div class="modal--section">
                    <div class="">
                        <form @submit.prevent="" class="form--workspace__create mb--20">
                            <div class="form__item">
                                <label for="workspaceTitle" class="form__label">Give your board a name</label>
                                <input name="title" id="workspaceTitle" class="form__input" v-model="board.title" />
                            </div>
                            <div class="form__item">
                                <label for="workspaceTitle" class="form__label">Choose a workspace to put this board in</label>
                               
                            </div>
                            <div class="form__info--warning">
                               <p>You can only create 10 boards per workspace for a free plan.</p>
                               <p>To be able to create more than that, upgrade to a <router-link :to="{ name: 'login' }">premium plan</router-link></p>
                            </div>
                            <div class="form__footer width--100">
                                <button class="btn btn--primary btn--md form__footer--btnFirst" :disabled="isBtnDisabled" type="submit">Create</button>
                                <button class="btn btn--secondary btn--md" type="submit" @click="toggleCreateBoardModal('hide')">Cancel</button>
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
import { createdWorkspaces } from '../../../utils/dummy'
export default {
    name: 'CreateBoardModal',
    components: {
        'main-modal': MainModal,
    },
    props: ["showCreateBoardModal", "toggleCreateBoardModal"],
    data: () => ({
       board: {
           title: '',
           workspace: ''
       },
       createdWorkspaces: createdWorkspaces,
       vueSelectStyles: {
            width: '100%', 
            'margin-right': '0px', 
            'min-height': '35px', 
            'justify-content': 'center', 
            'border': '1px solid #e0e1e4'
       }
    }),
    computed: {
        isBtnDisabled() {
            if(!this.board.title || !this.board.workspace) {
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
