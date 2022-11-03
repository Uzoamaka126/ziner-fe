<template>
    <main-modal 
        :showModal="showModal" 
        :isCloseButton=false 
        :modalSize="'modal__dialog--lg'"
        :width="'620px'"
        :position="'center'"
        :isShowHeader="true"
        :title="actionType === 'add' ? 'Add a new tag' : 'Edit tag'"
        :headerSize="'16px'"
    >
        <template #body>
            <div class="modal__wrapper--onboarding mb--45">
                <div class="modal--section">
                    <div>
                        <form @submit.prevent="" class="form--workspace__create mb--20">
                            <div class="form__item">
                                <div class="">
                                    <label for="name" class="form-label">Name</label>
                                    <input type="text" class="form-control form-control-sm" v-model="form.tagName" id="name" placeholder="Completed">
                                </div>
                                <p class="text-mute text--xxs text--info mt-1" v-if="form.tagName.length < 3">Tag name should be more than three words </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </template>
        <template #footer>
            <div class="width--100">
                <button class="btn btn--secondary btn--md form__footer--btnFirst" @click="closeModal()">Cancel</button>
                <primary-button 
                    :loading="loading" 
                    :type="'submit'" 
                    :isBtnDisabled="isBtnDisabled" 
                    :classNames="'btn--md'"
                    @submit="submit"
                >
                {{ actionType === 'add' ? 'Create tag' : 'Save' }}
                </primary-button>
            </div>
        </template>
        </main-modal>
</template>

<script>
import MainModal from '@/components/shared/modals/MainModal'
import PrimaryButton from '@/components/shared/buttons/PrimaryButton'

export default {
    name: 'CreateOrEditTag',
    props: ['actionType', 'tagData', 'showModal'],
    components: {
        MainModal,
        PrimaryButton
    },
    data() {
        return {
            form : {
                _id: '',
                tagName: ''
            },
            loading: false
        }
    },
    computed: {
        isBtnDisabled() {
            return !this.form.tagName ? true : false
        }
    },
    methods: {
        prefillForm() {
            this.form = {
                _id: this.tagData._id || '',
                tagName: this.tagData.name || '',
            };
        },
        handleAddTag() {},
        handleEditTag() {},
        submit() {
            if (this.actionType === 'add') {
                this.handleAddTag()
            } else {
                this.handleEditTag()
            }
        },
        closeModal() {
            this.form = {
                _id: '',
                tagName: ''
            }
            this.$emit('cancel')
        }
    },
    watch: {
        tagData: "prefillForm"
    }
}
</script>