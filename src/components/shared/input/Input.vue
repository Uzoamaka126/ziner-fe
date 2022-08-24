<template>
    <div class="form__item">
        <label class="form__label" :for="id" :class="classStyles">
            <slot name="label">
                {{ label }}
            </slot>
        </label>
        <input 
            class="form-control" 
            :class="
            {
                'ponter-events-none': readonly,
                'border-error-accent': error,
                ...classsNames
            }"
            v-bind="$attrs"
            @input="emitInput"
        />
            <!-- v-on="listeners" -->
            <!-- in v3, inside of $attr, there's still props, attributes, listeners ...etc -->
            <!-- v-bind="{ // vue 2
                ...$attrs,
                ...$props // id, name, placeholder, type, value, readonly, required..etc
            }" -->
    </div>
</template>

<script>
export default {
    name: 'Input',
    inheritAttrs: false,
    emits: ['input'],
    props: {
        autofocus: {
            type: Boolean
        },
        error: {
            type: Boolean
        },
        id: {
            required: true,
            type: String
        },
        label: {
            default: '',
            type: String
        },
        name: {
            default: '',
            type: String
        },
        placeholder: {
            default: '',
            type: String
        },
        readonly: {
            type: Boolean
        },
        disabled: {
            type: Boolean
        },
        type: {
            default: 'text',
            type: String,
            validator: (value) => {
                return [
                    'date',
                    'email',
                    'number',
                    'password',
                    'search',
                    'tel',
                    'text'
                ].includes(value)
            }

        },
        value: {
            default: '',
            type: [Number, String]
        },
        classNames: {
            type: Object,
            default: () => {}
        }
    }
}
</script>