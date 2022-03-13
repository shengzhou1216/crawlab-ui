<template>
  <div class="nav-menu">
    <el-tree
      :data="items"
      node-key="id"
      :props="{
        label: 'title',
        children: 'children',
        class: getClass,
      }"
      @node-click="onNodeClick"
    >
      <template #default="{data}">
        <span class="title">
          {{ data.title }}
        </span>
      </template>
    </el-tree>
  </div>
</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue';
import {emptyArrayFunc} from '@/utils/func';

export default defineComponent({
  name: 'NavSidebarTree',
  props: {
    activeKey: {
      type: String,
    },
    items: {
      type: Array as PropType<NavItem[]>,
      default: emptyArrayFunc,
    }
  },
  emits: [
    'select',
  ],
  setup(props: NavSidebarTreeProps, {emit}) {
    const onNodeClick = (item: NavItem) => {
      emit('select', item);
    };

    const getClass = (item: NavItem): string | undefined => {
      if (item.id === props.activeKey) {
        return 'active';
      } else {
        return;
      }
    };

    return {
      onNodeClick,
      getClass,
    };
  },
});
</script>

<style lang="scss" scoped>
.nav-menu {
}
</style>
<style scoped>
.nav-menu >>> .el-tree-node {
  font-size: 14px;
  cursor: pointer;
}

.nav-menu >>> .el-tree-node > .el-tree-node__content {
  height: 48px;
}

.nav-menu >>> .el-tree-node > .el-tree-node__content:hover {
  background-color: #ecf5ff !important;
}

.nav-menu >>> .el-tree-node.active > .el-tree-node__content,
.nav-menu >>> .el-tree-node > .el-tree-node__content:hover {
  color: #409eff;
}

.nav-menu >>> .el-tree-node:focus > .el-tree-node__content,
.nav-menu >>> .el-tree-node:hover > .el-tree-node__content {
  background: inherit;
}
</style>
