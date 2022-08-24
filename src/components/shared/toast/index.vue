<template>
    <div class="toast-container position-absolute top-0 end-0 p-3" id="toastPlacement">
        <div class="toast" id="sharedToastEl" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header">
                <span class="message-toast" :class="{ 'red' : type === 'error', 'green' : type === 'success', '': !type }"></span>
                <strong class="me-auto" id="toastTitle"></strong>
                <!-- <strong class="me-auto" id="toastTitle">{{ headingTitle ? headingTitle : '' }}</strong> -->
            </div>
            <div class="toast-body" id="toastMessage">
                <!-- {{ message ? message : '' }} -->
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'Toast',
    props: ['message', 'type', 'headingTitle'],
};
</script>

<style lang="scss" scoped>
    .message-toast {
        width: 20px;
        height: 20px;
        border-radius: 0.25rem!important;
        margin-right: 0.5rem!important;
        font-size: 1.125rem;

        &.red {
            background: #f1616f
        }
        &.green {
            background: #05c987;
        }
    }
    
</style>
