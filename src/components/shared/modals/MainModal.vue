<template v-if="showModal && name !== ''">
    <div class="modal fade" :class="{ show: showModal }" >
        <div class="modal__dialog" :class="selectedModalSize" :style="modalStyles">
            <div role="document">
                    <div class="modal__header modal__dialog--header" v-if="isShowHeader">
                        <h2 :style="{ 'font-size': headerSize }">{{ title }}</h2>
                        <button type="button" class="close" style="top: 50px; margin-top: unset;" v-if="isCloseButton" @click="closeFn(false)">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" style="fill: rgba(160, 158, 167, 1);transform: ;msFilter:;">
                                <path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path>
                            </svg>
                        </button>
                    </div>
                <!-- Modal content -->
                <div class="modal__content">
                    <!-- Modal Body -->
                    <div class="modal__body modal__body--pad">
                        <slot name="body"></slot>
                    </div>
                </div>
                <div class="modal__footer">
                    <slot name="footer"></slot>
                </div>
            </div>
        </div>
    </div>        
</template>


<script>
export default {
    name: 'MainModal',
    props: ["showModal", "isCloseButton", "modalSize", "width", "position", 'title', 'closeFn', 'isShowHeader', 'headerSize'],
    computed: {
        selectedModalSize() {
            return {
                'modal__dialog--show': this.showModal,
                'modal__dialog--lg': this.modalSize === 'modal__dialog--lg',
                'modal__dialog--sm': this.modalSize === 'modal__dialog--sm',
                'modal__dialog--md': this.modalSize === 'modal__dialog--md',
            }
        }
    },
    data() {
        return {
            modalStyles: {
                'width': !this.width ? '' : this.width,
                'margin-left': this.position === 'center' ? 'auto' : '',
                'margin-right': this.position === 'center' ? 'auto' : '',
            }
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
