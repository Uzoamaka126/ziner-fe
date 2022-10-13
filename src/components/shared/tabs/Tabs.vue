<script>
import {
  onMounted,
  onBeforeUnmount,
  ref,
  watch,
  toRefs,
  h,
} from "vue";

export default {
  name: "Tabs",
  props: {
    defaultIndex: {
      default: 0,
      type: Number,
    },
    resetTabs: {
      type: Boolean,
      default: false,
    },
    direction: {
      type: String,
      default: "horizontal",
        validator(value) {
            return ["horizontal", "vertical"].includes(value);
        },
    },
    position: {
      type: String,
      default: "left",
        // validator(value) {
        //     return ["start", "end", "center"].includes(value);
        // },
    },
    reverse: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  emits: {
    tabChanged(index) {
      return index !== undefined || index !== null;
    },
  },

  setup(props, { emit, slots }) {
    const { defaultIndex, resetTabs, position, direction, reverse } = toRefs(props);

    const selectedIndex = ref(0);
    const tabs = ref([]);
    const _tabItems = ref([]);
    
    console.log({
      'tabs': tabs,
      'tabsValue': tabs.value
    });

    const onTabKeyDown = (e) => {
      if (e.ctrlKey || e.metaKey) {
        if (parseInt(e.key) - 1 in tabs.value) {
          e.preventDefault();
          switchTab(e, parseInt(e.key) - 1, tabs.value[parseInt(e.key) - 1]);
        }
      }
    };

    const reset = () => {
      selectedIndex.value = 0;
    };

    const switchTab = (_, index, isDisabled) => {
      console.log('switchTab', {
        '_': _,
        'index': index,
        'isDisabled': isDisabled
      });
      if (!isDisabled) {
        selectedIndex.value = index;
        emit("tabChanged", index);
      }
    };

    onMounted(() => {
      document.addEventListener("keydown", onTabKeyDown);
    });

    onBeforeUnmount(() => {
      document.removeEventListener("keydown", onTabKeyDown);
    });

    watch(defaultIndex, (newValue) => {
      if (newValue !== selectedIndex.value) {
        selectedIndex.value = newValue;
      }
    });

    watch(resetTabs, (newValue, oldValue) => {
      if (newValue === true) reset();
    });

    return () => {
      _tabItems.value = (slots)
        .default()
        .filter((component) => component.type.name === "Tab");

      const tabList = [];
      _tabItems.value.forEach((tab, index) => {
        const _tabProps = tab.props;

        const content = _tabProps["title-slot"]
          ? (slots)
              .default()
              .filter(
                (item) =>
                  item.type === "template" &&
                  item.props.name === _tabProps["title-slot"]
              )[0].children
          : _tabProps.title;
        const isDisabled =
          _tabProps.disabled === true || _tabProps.disabled === "";
        tabs.value[index] = isDisabled;

        tabList.push(
          h(
            "li",
            {
              class: "tab-list__item",
              tabIndex: "0",
              role: "tabItem",
              "aria-selected": selectedIndex.value === index ? "true" : "false",
              "aria-disabled": isDisabled ? "true" : "false",
              onClick: (e) => {
                switchTab(e, index, isDisabled);
              },
            },
            content
          )
        );
      });

      const _tabsList = h(
        "ul",
        { class: `tab-list ${position.value}`, role: "tabList" },
        tabList
      );

      return h(
        "div",
        {
          class: `tabs ${direction.value} ${reverse.value ? "reverse" : ""}`,
          role: "tabs",
        },
        [
          _tabsList,
          h("div", { class: "tab" }, _tabItems.value[selectedIndex.value]),
        ]
      );
    };
  },
};

</script>

<style lang="scss">

</style>
