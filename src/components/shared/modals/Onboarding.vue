<template>
    <div>
        <main-modal :showModal="showOnboardingModal" :isCloseButton=false :isShowHeader="false">
            <div class="modal__wrapper--onboarding">
                <div class="modal--section__left">
                    <div class="left--wrapper">
                        <!-- <template v-if="count === 2">
                            <create-workspace 
                                :count="count" 
                                :increaseStep="increaseStep"
                            ></create-workspace>
                        </template> -->
                        <!-- <template v-if="count === 3">
                            <invite-team-members 
                                :count="count"
                                :decreaseStep="decreaseStep"
                            >
                            </invite-team-members>
                        </template> -->
                    </div>
                </div>
            <div class="modal--section__right">

            </div>
            </div>
        </main-modal>
    </div>
</template>

<script>
import MainModal from './MainModal.vue';
// import CreateWorkspace from '../../clients/CreateWorkspace.vue';

export default {
    name: 'OnboardingModal',
    components: {
        'main-modal': MainModal,
        // 'create-workspace': CreateWorkspace,
    },
    props: ["showOnboardingModal"],
    data: () => ({
        count: 2
    }),
    methods: {
        increaseStep() {
            this.count++;
            console.log(this.count);
        },
        decreaseStep() {
            this.count--;
            console.log(this.count);
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .modal__wrapper--onboarding {
        display: flex;
        flex-direction: row;
        min-height: 500px;
        outline: 0;
        overflow: scroll;
        // height: 730px;
        // max-height: 730px;
    }
    .modal--section__left, .modal--section__right {
        width: 50%;
    }
    .modal--section__left {
        padding: 0 24px;
        margin: 64px auto 16px;
    }
    .modal--section__right {
        background-color: #4d46dc;
        padding-top: 112px;
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
