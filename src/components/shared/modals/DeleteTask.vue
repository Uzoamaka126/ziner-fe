<template>
    <div>
        <main-modal 
            :showModal="showModal" 
            :isCloseButton=false 
            :modalSize="'modal__dialog--sm'"
            :width="'620px'"
            :position="'center'"
            :isShowHeader="true"
            :title="'Delete task'"
            :headerSize="'16px'"
        >
            <template #body>
                <div class="modal__wrapper--onboarding mb--45">
                    <div class="modal--section">
                        <div>
                            <div class="form__item">
                                <div class="mb-3">
                                    <p>Are you sure you want to delete this task?</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
            <template #footer>
                <div class="width--100">
                    <button class="btn btn--secondary btn--sm form__footer--btnFirst" type="submit" @click="$emit('reset')">Cancel</button>
                    <button class="btn btn--sm btn--danger" type="submit" @click="$emit('delete')">Delete task</button>
                </div>
            </template>
        </main-modal>
    </div>
</template>

<script>
import MainModal from './MainModal.vue';

export default {
    name: 'DeleteTaskModal',
    components: {
        'main-modal': MainModal,
    },
    props: ["showModal"],
}
</script>