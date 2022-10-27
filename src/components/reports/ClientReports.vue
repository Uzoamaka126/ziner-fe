<template>
    <div>
        <div class="home__wrap--item">
            <div class="header__item--wrap">
                <div class="header" style="border-bottom: 0;">
                    <div style="display: flex; align-items: center">
                        <span class="header--text">Clients Report</span>
                    </div>
                </div>
            </div>
            <div class="home--content">
                <div class="home--content__wrap">
                    <column-chart 
                    loading="Loading..." 
                    :data="[['Sun (11/10/12)', 32], ['Mon', 46], ['Tue', 28], ['Wed', 30], ['Thur', 4]]"></column-chart>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import IconSvg from "../shared/icons/Icon-Svg.vue";
import { createdWorkspaces } from '../../utils/dummy'

export default {
    name: 'ClientReports',
    created() {
        // console.log(this.user);
        // if(this.user && this.user.isRecentlyCreated === true) {
        //     this.setShowOnboardingModal('show');
        // }
    },
    props: {
        user: Object
    },
    data () {
        return {
            createdWorkspaces: createdWorkspaces,
        }
    },
    computed: {
    },
    components: {
        'icon-svg': IconSvg,
    },
    methods: {
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    @import '../../assets/scss/pages/home.scss';
</style>
