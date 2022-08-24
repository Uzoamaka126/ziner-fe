<template>
 <div>
      <div class="content--header">
        <div class="workspace--header__title">
        <!-- workspace -->
            <div class="row__item positionRelative">
                 <span>
                    <icon-svg 
                    fill="rgb(52, 69, 99)" 
                    name="chevron-left" 
                    icon-position="left"
                    :width="'1.5rem'"
                    style="{ display: flex; align-items: center }"
                />  
                </span>
                <span class="">Back</span>
            </div>
        </div>
    </div>
 </div>
</template>

<script>
// @ is an alias to /src
import IconSvg from "../../../shared/icons/Icon-Svg.vue";

export default {
  name: 'WorkspaceHeader',
  components: {
    'icon-svg': IconSvg,
  },
  data: () => ({
  }),
  computed: {
      getRouterName() {
          console.log(this.$router.options.history.location);
      }
  },
  props: [""],
  methods: {

  }
}
</script>

<style lang="scss" scoped>
  .home {
    height: 100%;
  }
  .workspace--header__title {
      display: flex;
      span {
        font-size: 14px;
      }
  }
  .nav--dropdown--text {
      display: flex;
      align-items: center;

    span {
        display: flex;
    }
  }
  .dropdown__content--group--avatar {
      .avatar-wrap {
        font-size: 18px;
        height: 40px;
        width: 40px;
        line-height: 40px;
        align-items: center;
        background-color: #DFE1E6;
        background-position: center center;
        background-repeat: no-repeat;
        background-size: cover;
        border: 0;
        border-radius: 100%;
        box-sizing: border-box;
        color: #172B4D;
        display: inline-flex;
        margin-right: 12px;
    }

    .avatar--text {
        &:first-of-type {
            margin-top: 4px;
            max-width: 230px;
        }
        &:last-of-type {
            font-size: 9pt;
            color: #B3BAC5;
            display: block;
            text-overflow: ellipsis;
            overflow: hidden;
            max-width: 230px;
        }
    }
  }
</style>
