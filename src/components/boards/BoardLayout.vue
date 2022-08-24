<template>
    <div style="height: 100%">
       board
    </div>
</template>

<script>

export default {
    name: 'BoardLayout',
    created() {
        console.log(this.user);
        if(this.user && this.user.isRecentlyCreated === true) {
            this.setShowOnboardingModal('show');
        }
    },
    props: {
        user: Object
    },
    data: () => ({
        showOnboardingModal: false,
    }),
    components: {
    },
    methods: {
        setShowOnboardingModal(value) {
            if(value === 'show') {
                this.showOnboardingModal = true 
            } else if(value === 'hide') {
                this.showOnboardingModal = false 
            } else {
                this.showOnboardingModal = false 
            }
        },
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
