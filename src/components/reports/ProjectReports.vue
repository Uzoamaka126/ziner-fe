<template>
    <div style="height: 100%">
        <div class="home__wrap--item">
            <div class="header__item--wrap">
                <div class="header" style="border-bottom: 0;">
                    <div style="display: flex; align-items: center">
                        <span class="header--text">Projects Report</span>
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

/* plotting createdAt vs projects.length || number of projects done per month
    there'll be a function to getWeek aka get all projects from x date to y date


    const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    var xcv = arrty.map(item => {
        const getMonthPerItem = new Date(item.createdAt).getMonth();
        return {
            id: item._id,
            month: months[getMonthPerItem],
            title: item.title
        }
    })
*/

export default {
    name: 'ProjectReports',
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
