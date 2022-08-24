<template>
    <button 
        class="btn btn--primary" 
        type="button" 
        :class="classNames" 
        :disabled="isBtnDisabled" 
        :style="{ width: btnSize }" 
        @click="$emit('submit')"
    >
        <span class="spinner-border spinner-border-sm" role="status" style="vertical-align: middle;" aria-hidden="true" v-if="loading"></span>
        <slot v-else></slot>
    </button>
</template>

<script>
import IconSvg from '../icons/Icon-Svg.vue';

export default {
    name: 'PrimaryButton',
    components: {
        IconSvg
    },
    props: {
        loading: { type: Boolean, default: false },
        isBtnDisabled: { type: Boolean, default: false },
        btnSize: { type: String, default: '100%' },
        classNames: { type: String, default: '' },
    },
}
</script>