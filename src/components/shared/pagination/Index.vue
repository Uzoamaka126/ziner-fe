<template>
    <div class="flex align-items-center mt--30">
        <span class="mr--35">Total number of {{ type }}: {{ paginationData.total }}</span>
        <nav aria-label="Page navigation example">
            <ul class="pagination">
                <li class="page-item" :class="{ 'disabled': isFirstPage() }" @click="changePaginationNum(1)">
                    <a class="page-link" href="#" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>
                <li class="page-item" v-for="page in paginationData.totalPages" :key="page">
                    <a 
                        class="page-link" 
                        href="#"
                        :class="{ 'active': paginationData.currentPage === page}"
                        @click="changePaginationNum(page)"
                    >
                        <!-- @click="setPageOnUrlParams(page)" -->
                        {{ page }}
                    </a>
                </li>
                <li class="page-item" :class="{ 'disabled': isLastPage() }" @click="changePaginationNum(paginationData.totalPages)">
                    <a class="page-link" href="#" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
import { assembleQueryList } from '../../../utils/others'
export default {
    name: "Pagination",
    data() {
        return {

        }
    },
    created() {
        console.log("this.paginationData:", this.paginationData);
    },
    props: ['paginationData', 'type'],
    computed: {
        paginationDataComputed() {
            return {
                currentPage: typeof this.paginationData
            }
        },
    },
    methods: {
        isFirstPage(){
            return this.paginationData.currentPage === 1
        },
        isLastPage(){
            return this.paginationData.currentPage === this.paginationData.totalPages
        },
        getPaginationCount(number){
            let pageNumbers = this.paginationTop + number;

            console.log({
                'pageNumbers': pageNumbers, 
                'this.paginationTop:': this.paginationTop, 
                'number:': number
            });
            if (pageNumbers > this.paginationData.totalPages){
                return false;
            }
            return pageNumbers;
        },
        formatCount: function (x) {
            return (x) ? x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : x;
        },
        serialize(obj) {
            let str = [];
            for (let p in obj)
                if (obj.hasOwnProperty(p)) {
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                }
            return str.join("&");
        },
        setPageOnUrlParams(page){
            let pageObject = {
                paginationNum: page == null ? this.paginationData.currentPage : page,
                limit: 10,
            };

            let currentRoute = this.$route.path;

            let queryParam = this.serialize(assembleQueryList(this.$route, pageObject));
            this.$router.replace(`${currentRoute}?${queryParam}`)
        },
       changePaginationNum(page) {
           this.$emit("handlePaginationNumChange", page)
       }
    }
}
</script>

<style lang="scss" scoped>
    .page-link {
        &.active {
            z-index: 3;
            color: #0a58ca;
            background-color: #e9ecef;
            outline: 0;
            box-shadow: 0 0 0 0.25rem rgb(13 110 253 / 25%);
        }
    }
</style>