<template>
    <button 
        class="btn flex" 
        type="button" 
        :class="[classNames, type]" 
        :disabled="isDisabled" 
        :style="{ width: btnSize }" 
        @click="$emit('submit')"
    >
        <span class="spinner-border spinner-border-sm" role="status" style="vertical-align: middle;" aria-hidden="true" v-if="loading"></span>
        <slot v-else></slot>
        {{ label }}
    </button>
</template>

<script>
import IconSvg from '../icons/Icon-Svg.vue';

export default {
    name: 'OutlineButton',
    components: {
        IconSvg
    },
    props: {
        loading: { type: Boolean, default: false },
        isDisabled: { type: Boolean, default: false },
        btnSize: { type: String, default: '' },
        classNames: { type: String, default: '' },
        outlineType: { type: String, default: '' },
        label: { type: String, default: '' }
    },
    data() {
        return {
            type: `btn--outline__${this.outlineType}`,
        }
    }
}
</script>