<template>
  <div class="nav-sidebar" :class="classes">
    <div
      v-if="!noSearch"
      class="search"
    >
      <el-input
        v-model="searchString"
        class="search-input"
        :placeholder="t('components.nav.sidebar.search')"
        :clearable="true"
      >
        <template #prefix>
          <el-icon v-if="!collapsed" class="el-input__icon">
            <font-awesome-icon :icon="['fa', 'search']"/>
          </el-icon>
        </template>
      </el-input>
    </div>
    <template
      v-if="filteredItems.length > 0"
    >
      <NavSidebarList
        v-if="type === 'list'"
        :active-key="activeKey"
        :items="filteredItems"
        @select="onSelectList"
      />
      <NavSidebarTree
        v-else-if="type === 'tree'"
        :active-key="activeKey"
        :items="filteredItems"
        :show-checkbox="showCheckbox"
        :default-checked-keys="defaultCheckedKeys"
        :default-expanded-keys="defaultExpandedKeys"
        :default-expand-all="defaultExpandAll"
        @select="onSelectTree"
        @check="onCheckTree"
      />
    </template>
    <Empty
      v-else
    />
  </div>
</template>
<script lang="ts">
import {computed, defineComponent, PropType, ref} from 'vue';
import {ElMenu} from 'element-plus';
import variables from '@/styles/variables.scss';
import NavSidebarList from '@/components/nav/NavSidebarList.vue';
import NavSidebarTree from '@/components/nav/NavSidebarTree.vue';
import Empty from '@/components/empty/Empty.vue';
import {useI18n} from 'vue-i18n';
import {emptyArrayFunc} from '@/utils/func';

export const navSidebarContentProps = {
  items: {
    type: Array as PropType<NavItem[]>,
    default: emptyArrayFunc,
  },
  activeKey: {
    type: String,
  },
  showCheckbox: {
    type: Boolean,
    default: false,
  },
};

export default defineComponent({
  name: 'NavSidebar',
  components: {
    NavSidebarList,
    NavSidebarTree,
    Empty,
  },
  props: {
    type: {
      type: String as PropType<NavSidebarType>,
      default: 'list',
    },
    collapsed: {
      type: Boolean,
    },
    showActions: {
      type: Boolean,
    },
    ...navSidebarContentProps,
    defaultCheckedKeys: {
      type: Array as PropType<string[]>,
      default: emptyArrayFunc,
    },
    defaultExpandedKeys: {
      type: Array as PropType<string[]>,
      default: emptyArrayFunc,
    },
    defaultExpandAll: {
      type: Boolean,
      default: false,
    },
    noSearch: {
      type: Boolean,
      default: false,
    }
  },
  emits: [
    'select',
    'check',
  ],
  setup(props: NavSidebarProps, {emit}) {
    // i18n
    const {t} = useI18n();

    const toggling = ref(false);
    const searchString = ref('');
    const navMenu = ref<typeof ElMenu | null>(null);
    const toggleTooltipValue = ref(false);

    const filteredItems = computed<NavItem[]>(() => {
      const items = props.items as NavItem[];
      if (!searchString.value) return items;
      return items.filter(d => d.title?.toLocaleLowerCase().includes(searchString.value.toLocaleLowerCase()));
    });

    const classes = computed(() => {
      const {collapsed} = props;
      const cls = [];
      if (collapsed) cls.push('collapsed');
      return cls;
    });

    const onSelectList = (index: number) => {
      emit('select', filteredItems.value[index]);
    };

    const onSelectTree = (item: NavItem) => {
      emit('select', item);
    };

    const onCheckTree = (item: NavItem, checked: boolean, items: NavItem[]) => {
      emit('check', item, checked, items);
    };

    const scroll = (id: string) => {
      const idx = filteredItems.value.findIndex(d => d.id === id);
      if (idx === -1) return;
      const {navSidebarItemHeight} = variables;
      const navSidebarItemHeightNumber = Number(navSidebarItemHeight.replace('px', ''));
      if (!navMenu.value) return;
      const $el = navMenu.value.$el as HTMLDivElement;
      $el.scrollTo({
        top: navSidebarItemHeightNumber * idx,
      });
    };

    return {
      toggling,
      searchString,
      navMenu,
      toggleTooltipValue,
      filteredItems,
      classes,
      onSelectList,
      onSelectTree,
      onCheckTree,
      scroll,
      t,
    };
  },
});
</script>
<style scoped lang="scss">
@import "../../styles/variables.scss";

.nav-sidebar {
  height: 100%;
  position: relative;
  width: $navSidebarWidth;
  border-right: 1px solid $navSidebarBorderColor;
  background-color: $navSidebarBg;

  &.collapsed {
    margin: 10px 0;
    width: 0;
    border: none;

    .search {
      position: relative;
    }
  }

  .search {
    position: relative;
    height: $navSidebarSearchHeight;
    box-sizing: content-box;
    border-bottom: 1px solid $navSidebarBorderColor;

    .search-input {
      width: 100%;
      height: 100%;
      border: none;
      padding: 0;
      margin: 0;
    }

    .search-suffix {
      position: absolute;
      top: 0;
      right: 0;
      display: inline-flex;
      align-items: center;
      height: 40px;
      width: 25px;
      color: $navSidebarItemActionColor;
      cursor: pointer;
    }
  }

  .toggle-expand {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    display: flex;
    align-items: center;
    z-index: 100;
    cursor: pointer;

    &:hover {
      opacity: 0.7;
    }

    .wrapper {
      height: 24px;
      width: 24px;
      background-color: $infoPlainColor;
      border: 1px solid $infoColor;
      border-bottom-right-radius: 5px;
      border-top-right-radius: 5px;
      border-left: none;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
<style scoped>
.nav-sidebar > .search >>> .el-input__inner {
  border: none;
  height: 100%;
}

.nav-sidebar.collapsed > .search >>> .el-input__inner {
  padding: 0;
  width: 0;
}
</style>
