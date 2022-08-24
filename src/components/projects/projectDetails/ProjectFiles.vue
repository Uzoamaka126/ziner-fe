<template>
    <div style="height: 100%">
        <div>
            Feature coming soon!
        </div>
    </div>
</template>

<script>
import IconSvg from '../../shared/icons/Icon-Svg.vue';
import { formatDateTime } from '../../../utils/others'

export default {
    name: 'ProjectOverview',
    created() {
    },
    components: {
        IconSvg
    },
    props: {
        user: Object
    },
    data(){
        return {
            title: '',
            projectDetails: {
                title: '',
                status: 'pending',
                deadline: new Date('Thu Mar 10 2022 21:25:37 GMT+0100 (West Africa Standard Time)'),
                tags: []
            },
            overviewActions: {
                isEditableTitle: false,
                isEditableStatus: false,
                isEditableDeadline: false
            }
        }
    },
    computed: {
        computedDeadlineDate() {
            if(this.projectDetails.deadline) {
                return formatDateTime(this.projectDetails.deadline)
            } else {
                return 'None'
            }
        }
    },
    methods: {
        startEditProjectDetails (actionVal) {
            this.overviewActions[actionVal] = true;
        },
        cancelEditProjectDetails (actionVal) {
            this.overviewActions[actionVal] = false;
        },
        handleEditProjectDetails(actionVal) {
            const payload = {
                ...this.projectDetails
            }

            // if successful
            this.overviewActions[actionVal] = false;
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .form {
        max-width: 600px;
        padding: 30px;
        height: auto;
    }
    .password__change {
        border-top: 2px solid #eee;
        margin-top: 1.5rem;
        padding-top: 2rem;
    }
    input[disabled] {
        background-color: #fafbfc;
        cursor: not-allowed;
    }
    textarea {
        min-height: 70px;
    }
    label {
        font-size: 0.8rem;
    }
</style>
