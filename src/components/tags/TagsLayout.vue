<template>
    <div>
        <div>
            <div style="height: 100%; padding-right: 25px; padding-left: 25px; padding-top: 2rem">
                <!-- top header -->
                <div class="justify-content-between align-items-center" style="display: flex;">
                    <div class="list--count">
                        <p>{{ tags.length }} Tag{{ tags.length > 1 ? '(s)' : '' }}</p>
                    </div>
                    <div style="display:flex" class="align-items-center">
                        <button class="btn btn--primary header__btn" data-bs-toggle="modal" data-bs-target="#createTag">   
                            <icon-svg 
                                fill="#fff" 
                                name="add" 
                                icon-position="left"
                                :width="'12px'"
                            />  
                            <span class="text">Add new tag</span>
                        </button>
                    
                        <div style="align-self: center;" class="ml--10 cursor-pointer tags--display__btns">
                            <div class="dropdown">
                                <div class="list--view__type" id="viewTag" data-bs-toggle="dropdown" aria-expanded="false">
                                    <span class="text--xs text--upper text--color-normal">{{ workspaceDisplay }}</span>
                                    <span class="positionRelative">
                                        <div>
                                            <icon-svg 
                                                fill="rgba(107, 119, 140, 1)" 
                                                class="nav__icon no--margin__xr" 
                                                name="chevron-down" 
                                                icon-position="left"
                                                :width="'1rem'"
                                            />  
                                        </div>
                                    </span>
                                </div> 
                                <ul class="dropdown-menu dropdown-menu--tag" aria-labelledby="viewTag">
                                    <li class="dropdown-item" @click=" selectDisplayType('tiles')">Tiles</li>
                                    <li class="dropdown-item" @click=" selectDisplayType('list')">List</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div style="display: flex; margin-top: 2.5rem;"> 
                    <div class="tags__view" :class="{ 'tags__view--list': workspaceDisplay === 'list'}">
                        <div class="tags--project dropdown" v-for="(tag) in tags" :key="tag._id">
                            <div 
                                style="display:flex" 
                                :class="{ 'tags__dropdown--list': workspaceDisplay === 'list' }" 
                                class="align-items-center tags--project__item" 
                                id="tagActions" 
                                data-bs-toggle="dropdown" 
                                aria-expanded="false"
                            >
                                <div class="tags--project-text" v-if="tag.name">
                                    <span class="">{{ tag.name.toLowerCase() }}</span>
                                </div>
                                <div class="icon" tabindex="-1" title="More options">
                                    <svg class="css-17keszd-EnhancedContextMenuIcon e16olzom2" width="4" height="12" viewBox="0 0 4 16">
                                        <path fill="#95899b" fill-rule="evenodd" d="M0 2a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm0 12a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm0-6a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"></path>
                                    </svg>
                                </div>
                            </div>
                            <ul class="dropdown-menu dropdown-menu--tag" aria-labelledby="tagActions">
                                <li>
                                    <p class="dropdown-item cursor-pointer text--xs" @click="setCurrentTagDetails(tag)">Edit</p>
                                </li>
                                <li>
                                    <p class="dropdown-item cursor-pointer text--xs text--color-warning" data-bs-toggle="modal" data-bs-target="#deleteTag">Delete</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>        
            </div>
        </div>
            <!-- modal -->
        <create-tag-modal />
        <edit-tag-modal :currentTagDetails="currentTagDetails"  @resetCurrentTagDetails="resetCurrentTagDetails" :tagName="currentTagDetails.name" />
        <confirm-deletion-modal :type="'tag'" :action="handleDeleteTag" />
    </div>
</template>

<script>
import IconSvg from '../shared/icons/Icon-Svg.vue';
import CreateTagModal from '../shared/modals/CreateTag.vue';
import EditTagModal from '../shared/modals/EditTag.vue';
import ConfirmDeletionModal from '../shared/modals/ConfirmDeletion.vue';

export default {
    name: 'TagsLayout',
    created() {
    },
    props: {
        user: Object
    },
    components: {
        IconSvg,
        CreateTagModal,
        'edit-tag-modal': EditTagModal,
        ConfirmDeletionModal
    },
    data () {
        return {
            tags: [
            {
                _id: '62102f08ca0f171b9c4aa048',
                name: 'Finished',
                project_id: '62102f08ca0f171b9c4aa049'
            },
            {
                _id: '62102f08ca0f171b9c4aa048',
                name: 'SEO',
                project_id: '62102f08ca0f171b9c4aa049'
            },
            {
                _id: '62102f08ca0f171b9c4aa048',
                name: 'Onboarding',
                project_id: '62102f08ca0f171b9c4aa049'
            }
            ],
            workspaceDisplay: 'Tiles',
            currentTagDetails: {},
            state: 'default'
      }
    },
    computed: {},
    methods: {
        selectDisplayType(value) {
            this.workspaceDisplay = value
        },
        setCurrentTagDetails(data) {
            this.currentTagDetails = data;
            $("#editTag").modal("show");
        },
        resetCurrentTagDetails() {
            this.currentTagDetails = {};
        },
        fetchTags() {

        },
        handleUpdateTag() {},

        handleDeleteTag(id) {

        },
    }
}
</script>

<style lang="scss" scoped>
    .dropdown-menu--tag {
        min-width: 5rem !important;
        font-size: 14px !important;
    }
    .tags {
        &__view {
            display: flex;
            flex-direction: row;

            &--list {
                flex-direction: column;
            }
        }
        &--display__btns {
            border: 1px solid #eee;
            border-radius: 4px;
            padding: 2px 5px;
        }
        &__dropdown--list {
            justify-content: space-between;
            width: 100%;
        }
    }
</style>