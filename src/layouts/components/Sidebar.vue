<template>
  <span
    :class="sidebarCollapsed ? 'collapsed' : ''"
    class="sidebar-toggle"
    @click="toggleSidebar"
    v-track="{
        code: 'click_sidebar_toggle',
        params: {
          collapse: () => sidebarCollapsed,
        }
      }"
  >
    <font-awesome-icon v-if="!sidebarCollapsed" :icon="['fas', 'outdent']"/>
    <font-awesome-icon v-else :icon="['fas', 'indent']"/>
  </span>
  <el-aside :class="sidebarCollapsed ? 'collapsed' : ''" class="sidebar" width="inherit">
    <div class="logo-container">
      <div class="logo">
        <img class="logo-img" alt="logo-img" :src="logo"/>
        <span class="logo-title">Crawlab</span>
        <span class="logo-sub-title">
          <div class="logo-sub-title-block">
            {{ t(systemInfo.edition || '') }}
          </div>
          <div class="logo-sub-title-block">
            {{ systemInfo.version }}
          </div>
        </span>
      </div>
    </div>
    <div class="sidebar-menu">
      <el-menu
        :collapse="sidebarCollapsed"
        :active-text-color="menuActiveText"
        :background-color="menuBg"
        :text-color="menuText"
        :default-active="activePath"
        :default-openeds="openedIndexes"
        @select="onMenuItemClick"
      >
        <template v-for="(item, $index) in menuItems" :key="$index">
          <!--          <SidebarItem :item="item" @click="onMenuItemClick"/>-->
          <SidebarItem :item="item"/>
        </template>
        <div class="plugin-anchor"/>
      </el-menu>
    </div>
  </el-aside>
  <div class="script-anchor"/>
</template>

<script lang="ts">
import {computed, defineComponent} from 'vue';
import {useStore} from 'vuex';
import {useRoute, useRouter} from 'vue-router';
import variables from '@/styles/variables.scss';
import logo from '@/assets/js/svg/logo.js';
import {getPrimaryPath} from '@/utils/path';
import SidebarItem from '@/layouts/components/SidebarItem.vue';
import {useI18n} from 'vue-i18n';
import urljoin from 'url-join';

export default defineComponent({
  name: 'Sidebar',
  components: {
    SidebarItem,
  },
  setup() {
    const router = useRouter();

    const route = useRoute();

    const {t} = useI18n();

    const store = useStore();

    const {
      common: commonState,
      layout: layoutState,
    } = store.state as RootStoreState;

    const storeNamespace = 'layout';

    const sidebarCollapsed = computed<boolean>(() => layoutState.sidebarCollapsed);

    const menuItems = computed<MenuItem[]>(() => store.getters['layout/sidebarMenuItems']);

    const getMenuItemPathMap = (rootPath: string, item: MenuItem): Map<string, string> => {
      const paths = new Map<string, string>();
      const itemPath = item.path?.startsWith('/') ? item.path : urljoin(rootPath, item.path || '');
      paths.set(itemPath, rootPath);
      if (item.children && item.children.length > 0) {
        for (const subItem of item.children) {
          getMenuItemPathMap(itemPath, subItem).forEach((parentPath, path) => {
            paths.set(path, parentPath);
          });
        }
      }
      return paths;
    };

    const allMenuItemPathMap = computed<Map<string, string>>(() => {
      const paths = new Map<string, string>();
      for (const item of menuItems.value) {
        getMenuItemPathMap('/', item).forEach((parentPath, path) => {
          paths.set(path, parentPath);
        });
      }
      return paths;
    });

    const activePath = computed<string>(() => {
      if (allMenuItemPathMap.value.has(route.path)) {
        return route.path;
      }
      return getPrimaryPath(route.path);
    });

    const openedIndexes = computed<string[]>(() => {
      const parentPath = allMenuItemPathMap.value.get(activePath.value);
      if (!parentPath) return [];
      return [parentPath];
    });

    const toggleIcon = computed<string[]>(() => {
      if (sidebarCollapsed.value) {
        return ['fas', 'indent'];
      } else {
        return ['fas', 'outdent'];
      }
    });

    const onMenuItemClick = (index: string, indexPath: string[]) => {
      if (indexPath) router.push(indexPath?.[0]);
    };

    const toggleSidebar = () => {
      store.commit(`${storeNamespace}/setSideBarCollapsed`, !sidebarCollapsed.value);
    };

    const systemInfo = computed<SystemInfo>(() => commonState.systemInfo || {});

    return {
      sidebarCollapsed,
      toggleIcon,
      menuItems,
      logo,
      activePath,
      openedIndexes,
      onMenuItemClick,
      toggleSidebar,
      systemInfo,
      ...variables,
      t,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "../../styles/variables";

.sidebar {
  overflow-x: hidden;
  user-select: none;

  &.collapsed {
    .logo-container,
    .sidebar-menu {
      width: $sidebarWidthCollapsed;
    }
  }

  .logo-container {
    display: inline-block;
    height: $headerHeight;
    width: $sidebarWidth;
    padding-left: 12px;
    padding-right: 20px;
    border-right: none;
    background-color: $menuBg;
    transition: width $sidebarCollapseTransitionDuration;

    .logo {
      display: flex;
      align-items: center;
      height: 100%;

      .logo-img {
        height: 40px;
        width: 40px;
      }

      .logo-title {
        font-family: BlinkMacSystemFont, -apple-system, segoe ui, roboto, oxygen, ubuntu, cantarell, fira sans, droid sans, helvetica neue, helvetica, arial, sans-serif;
        font-size: 28px;
        font-weight: 600;
        margin-left: 12px;
        color: #ffffff;
      }

      .logo-sub-title {
        font-family: BlinkMacSystemFont, -apple-system, segoe ui, roboto, oxygen, ubuntu, cantarell, fira sans, droid sans, helvetica neue, helvetica, arial, sans-serif;
        font-size: 10px;
        height: 24px;
        line-height: 24px;
        margin-left: 10px;
        font-weight: 500;
        color: $menuText;

        .logo-sub-title-block {
          display: flex;
          align-items: center;
          height: 12px;
          line-height: 12px;
        }
      }
    }
  }

  .sidebar-menu {
    width: $sidebarWidth;
    height: calc(100vh - #{$headerHeight});
    margin: 0;
    padding: 0;
    transition: width $sidebarCollapseTransitionDuration;

    .el-menu {
      border-right: none;
      width: inherit !important;
      height: calc(100vh - #{$headerHeight});
      transition: none !important;
    }
  }
}

.sidebar-toggle {
  position: fixed;
  top: 0;
  left: $sidebarWidth;
  display: inline-flex;
  align-items: center;
  width: 18px;
  height: 64px;
  z-index: 5;
  color: $menuBg;
  font-size: 24px;
  margin-left: 10px;
  cursor: pointer;
  transition: left $sidebarCollapseTransitionDuration;

  &.collapsed {
    left: $sidebarWidthCollapsed;
  }
}
</style>
