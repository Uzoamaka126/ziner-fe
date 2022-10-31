<template>
    <div>
        <div class="content--header">
            <div class="content--header__left" style="display: flex; align-items: center;">
                <div class="collapse--content"></div>
                <template v-if="!showBackArrowBtn"></template>
                <template v-else>
                    <div class="back--wrap">
                        <router-link class="back--link" :to="`/dashboard/${computeRouteName}`">
                            <icon-svg 
                                class="nav__icon mr--0" 
                                name="left-arrow-alt" 
                                icon-position="left"
                                :style="{ fill: 'rgba(66, 82, 110)' }"
                                :width="'16px'"
                            /> 
                            <span>Back to {{ computeHeaderTitle }}</span>
                        </router-link>
                    </div>
                </template>
            </div>

            <div class="content--header__right">
                <div class="dropdown">
                    <div class="dropdown-toggle cursor-pointer dropdown-toggle--profile" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                    <div class="avatar profile--avatar">
                            UA
                        </div>
                    </div>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <li>
                            <div class="profile__bio align-items-center mt--10 dropdown-item dropdown-custom-item">
                                <span>
                                    <div class="profile__bio--avatar avatar cursor-text">
                                        {{ computeFullName }}
                                    </div>
                                </span>
                                <span>
                                    <!-- <p class="profile__bio--sub cursor-text avatar--text">Uzoamaka Anyanwu</p> -->
                                    <p class="profile__bio--sub cursor-text avatar--text">amakadarosie@gmail.com</p>
                                </span>
                            </div>
                        </li>
                        <li class="header__dropdown--item">
                            <div class="profile__item__link dropdown-item dropdown-custom-item">
                                <p class="profile__bio--title">Sign out</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { routesNameMap } from "../../../../utils/dataHelpers";
import IconSvg from "../../../shared/icons/Icon-Svg.vue";

export default {
    name: 'DashbaordContentHeader',
    props: ['user'],
    components: {
        'icon-svg': IconSvg,
    },
    data() {
        return {
            iconStyles: {
                display: 'flex', 
                'align-items': 'center'
            },
            routeNameMap: routesNameMap
        }
    },
    
    computed: {
        computeRouteName() {
            const routeName = this.$route.name || '';
            return routeName && typeof routeName === 'string' ? this.routeNameMap[routeName]?.toLowerCase() : ''
        },
        computeHeaderTitle() {
            const routeName = this.$route.name || '';
            return routeName && typeof routeName === 'string' ? this.routeNameMap[routeName] : ''
        },
        showBackArrowBtn() {
            return this.$route.params.id || this.$route.name === 'create-invoice-view' ? true : false
        },
        computeFullName() {
            if (this.user) {
                return this.user?.fullName.split(' ')
            } else {
                return 'UA'
            }
        }
    },
    
    watch:{
    //watch for route parameter change and execute method
    },

    methods: {
    }
}
</script>

<style lang="scss" scoped>
    .back--wrap {
        span, a, svg {
            font-weight: 600;
            font-size: 0.75rem;
        }
    }
    .header__dropdown--item {
        border-top: solid 1px #E0E0E0;  
        margin-top: 8px;
        font-size: 0.875rem;        
    }
</style>
