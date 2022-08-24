<template>
    <div style="height: 100%">
        <settings-layout></settings-layout>
    </div>
</template>

<script>
import Settings from '../components/settings/SettingsLayout.vue';

export default {
    name: 'Settings',
    created() {
        // console.log(this.user);
        if(this.user && this.user.isRecentlyCreated === true) {
            this.setShowOnboardingModal('show');
        }
    },
    props: {
        user: Object
    },
    data: () => ({
        
    }),
    components: {
        'settings-layout': Settings
    },
    methods: {
        
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
