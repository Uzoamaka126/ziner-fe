<template>
    <div>
        <main-modal 
            :showModal="showOnboardingModal" 
            :title="'New Workspace'" 
            :isCloseButton="false" 
            :closeFn="closeFn"
            :isShowHeader="false"
        >
            <div class="modal__wrapper--onboarding">
                <div class="modal--section__left">
                    <div class="left--wrapper" style="padding-top: 1rem;">
                        <template v-if="count === 2">
                            <create-workspace 
                                :count="count" 
                                :increaseStep="increaseStep"
                                :isNew="false"
                            ></create-workspace>
                        </template>
                        <template v-if="count === 3">
                            <invite-team-members 
                                :count="count"
                                :decreaseStep="decreaseStep"
                            >
                            </invite-team-members>
                        </template>
                    </div>
                </div>
            <div class="modal--section__right">
                <button type="button" class="close" @click="closeFn()">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" style="fill: rgba(160, 158, 167, 1);transform: ;msFilter:;">
                        <path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path>
                    </svg>
                </button>
            </div>
            </div>
        </main-modal>
    </div>
</template>

<script>
import MainModal from './MainModal.vue';
import CreateWorkspace from '../../clients/CreateWorkspace.vue';
import InviteTeamMembers from '../../clients/InviteTeamMembers.vue';

export default {
    name: 'OnboardingModal',
    components: {
        'main-modal': MainModal,
        'create-workspace': CreateWorkspace,
        'invite-team-members': InviteTeamMembers
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
        },
        closeFn() {
            this.$store.commit('showCreateWorkspaceModal', false)
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
    }
    .modal--section__left, .modal--section__right {
        width: 50%;
    }
    .modal--section__left {
        margin: 0px auto 16px;
        min-height: 700px;
    }
    .left--wrapper {
        width: 70%;
        margin-bottom: 16px;
        margin-bottom: 5rem;
        margin-left: auto;
        margin-right: auto;

        p {
            font-size: 14px;
        }
    }
    .modal--section__right {
        background-image: url('../../../assets/img/workspace-bg.svg');
        background-size: cover;
        position: relative;

        .close {
            top: 20px;
            margin-top: unset;
            position: absolute;
            right: 20px;
        }
    }
</style>
