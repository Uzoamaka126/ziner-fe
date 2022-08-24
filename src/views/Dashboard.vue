<template>
    <div style="height: 100%">
        <!-- <button class="btn btn--sm btn--default" @click="setShowOnboardingModal('show')">Modify Chargeback</button> -->
        <dashboard-layout></dashboard-layout>
    </div>
</template>

<script>
import Dashboard from '../components/shared/navigation/DashboardLayout.vue';

export default {
    name: 'Dashboard',
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
        'dashboard-layout': Dashboard
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
