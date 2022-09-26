<template>
    <div class="col-sm-10">
        <template v-if="type === 'projects'">
            <div class="form-check" v-for="status in projectStatusEnum">
                <input class="form-check-input" type="checkbox" :value="status" :id="`flexCheckChecked-${status}`">
                <label class="form-check-label" :for="`flexCheckChecked-${status}`">
                    {{ status }}
                </label>
            </div>
        </template>
        <template v-if="type === 'invoices'">
            <div class="form-check" v-for="status in invoiceStatusEnum">
                <input class="form-check-input" type="checkbox" :value="status" :id="`flexCheckChecked-${status}`">
                <label class="form-check-label" :for="`flexCheckChecked-${status}`">
                    {{ status }}
                </label>
            </div>
        </template>
    </div> 
</template>

<script>
import { projectStatusEnum, invoiceStatusEnum} from '../../../utils/dummy.js'
export default {
    name: 'SearchInput',
    created() {
        
    },
    model: {
        prop: "value",
        event: "change",
    },
    props: {
        type: { type: String, default: () => {} },
    },
    data () {
       return {
           projectStatusEnum: projectStatusEnum,
           invoiceStatusEnum: invoiceStatusEnum,
       }
    },
    methods: {
        // clearStatuses() {
        //     this.reactiveOnHoldStatus = undefined;
        //     this.reactiveDueStatus = undefined;
        //     this.reactiveCompletedStatus = undefined;
        //     this.reactivePendingStatus = undefined;
        // },

    },
    watch: {
        reactiveValue( newVal ) {
            this.$emit( "change", newVal )
        },
    }
}
</script>

<style lang="scss" scoped>
   
</style>