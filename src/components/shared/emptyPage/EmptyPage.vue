<template>
  <!-- Main Body layout -->
    <div>
        <div class="page__empty--wrap">
            <!-- image -->
            <div class="page__empty--image">
                <!-- <img :src="imageSrc" :alt="alt" /> -->
                <svg-asset :name="iconName" :width="width" :height="height" />
            </div>
            <div class="page__empty--text">                        
                <h2 class="page__empty--title">{{ title }}</h2>
                <p class="page__empty--subtitle" :class="{'fst-italic': isItalics }">{{ subtitle }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import SvgAsset from '../../shared/icons/SvgAssets.vue';

export default {
    name: 'EmptyPage',
    props: ['title', 'subtitle', 'iconName', 'alt', 'width', 'height', 'isItalics'],
    components: {
        SvgAsset
    }
};
</script>

<style lang="scss" scoped>
    .page__empty {
        &--wrap {
            margin-left: auto;
            margin-right: auto;
            max-width: 550px;
            margin-top: 6rem
        }

        &--image {
            width: 100%;
            display: flex;
            justify-content: center;
            margin-bottom: 1rem;
        }

        &--text {
            text-align: center;
        }

        &--title {
            font-size: 20px;
            color: #1a1f36;
        }
        &--subtitle {
            color: #697386;
            font-size: 14px;
        }
    }  
</style>
