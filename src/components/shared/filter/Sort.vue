<template>
    <div class="btn--filter">
        <div class="dropdown">
            <button 
                class="btn text--xs filter--btn btn-sm dropdown-toggle" 
                type="button" 
                aria-expanded="false"
                id="sortFilter"
                data-bs-toggle="dropdown" 
                data-bs-auto-close="outside" 
            >
            Sort by
            </button>
            <ul class="dropdown-menu dropdown-menu--tag" aria-labelledby="sortFilter" id="sortFilterList">
                <li v-for="(item, index) in displayTypeList" :key="index" class="dropdown-item cursor-pointer text--xs" @click="setDisplayType(item)">{{ item }}</li>
            </ul>
        </div>
    </div>
</template>

<script>
import IconSvg from '../../shared/icons/Icon-Svg.vue';

export default {
    name: 'SortFilter',
    components: {
        IconSvg
    },
    props: ['filter'],
    data () {
        return {
            displayTypeList: ['A - Z', 'Z - A'],
        }
    },
    methods: {
        setDisplayType(val) {
           this.$emit('setType', val)
           setTimeout(() => {
                document.getElementById('sortFilter').classList.remove('show')
                document.getElementById('sortFilterList').classList.remove('show')
           }, 100)
        }
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