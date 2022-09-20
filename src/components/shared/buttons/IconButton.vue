<template>
    <button 
        class="btn" 
        type="button" 
        :class="classNames" 
        :disabled="isBtnDisabled" 
        :style="{ width: btnSize }" 
        @click="$emit('submit')"
    >
        {{ label }}
        <template v-if="loading">
            <span class="spinner-border spinner-border-sm" role="status" style="vertical-align: middle;" aria-hidden="true"></span>
        </template>

         <template v-else>
            <icon-svg 
                :fill="iconFillColor" 
                :name="iconName" 
                icon-position="right"
                :width="iconWidth"
            />  
        </template>
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
        label: { type: String, default: '' },
        iconName: { type: String, default: '' },
        iconWidth: { type: String, default: '' },
        iconFillColor: {  type: String, default: '' }
    },
}
</script>