<template>
        <!-- search list -->
    <div class="col-sm-10">
        <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" checked>
            <label class="form-check-label" for="flexCheckChecked">
                Pending
            </label>
        </div>
        <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" checked>
            <label class="form-check-label" for="flexCheckChecked">
                Due
            </label>
        </div>
        <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" checked>
            <label class="form-check-label" for="flexCheckChecked">
                On-Hold
            </label>
        </div>
        <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" checked>
            <label class="form-check-label" for="flexCheckChecked">
                Completed
            </label>
        </div>
    </div> 
</template>

<script>
export default {
    name: 'SearchInput',
    created() {
        
    },
    model: {
        prop: "value",
        event: "change",
    },
    props: {
        status: { type: Object, default: () => {} },
    },
    data () {
       return {
           reactiveOnHoldStatus: this.status.onHold || undefined,
           reactiveDueStatus: this.status.due || undefined,
           reactiveCompletedStatus: this.status.completed || undefined,
           reactivePendingStatus: this.status.pending || undefined
       }
    },
    methods: {
        clearStatuses() {
            this.reactiveOnHoldStatus = undefined;
            this.reactiveDueStatus = undefined;
            this.reactiveCompletedStatus = undefined;
            this.reactivePendingStatus = undefined;
        },

    },
    watch: {
        reactiveValue( newVal ) {
            this.$emit( "change", newVal )
        },
        reactiveValue( newVal ) {
            this.$emit( "change", newVal )
        },
        reactiveValue( newVal ) {
            this.$emit( "change", newVal )
        },
        reactiveValue( newVal ) {
            this.$emit( "change", newVal )
        }
    }
}
</script>

<style lang="scss" scoped>
   
</style>