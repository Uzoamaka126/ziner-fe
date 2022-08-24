<template>
    <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" >Cancel</button>
        <button type="button" class="btn btn-primary">{{ actionTitle }}</button>
    </div>
</template>

<script>
export default {
    name: 'ModalButton',
    props: {
        actionTitle: { type: String, required: true },
        clickHandler: { type: Function, default: undefined },
    },
    data: () => ({
        clientName: '',
        isLoading: false
    }),
    components: {
        
    },
    computed: {
    },
    methods: {
        
        
}
</script>

<style lang="scss" scoped>
   
</style>