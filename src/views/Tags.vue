<template>
    <div style="height: 100%">
        <tags-layout></tags-layout>
    </div>
</template>

<script>
import Tags from '../components/tags/TagsLayout.vue';

export default {
    name: 'Tags',
    created() {
    },
    props: {
       
    },
    data: () => ({
        
    }),
    components: {
        'tags-layout': Tags
    },
    methods: {
        
    }
}
</script>