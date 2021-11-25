<template>
  <div class="nav-tabs">
    <el-menu
        :default-active="activeKey"
        mode="horizontal"
        @select="onSelect"
    >
      <el-menu-item
          v-for="item in items"
          :key="item.id"
          :class="item.emphasis ? 'emphasis' : ''"
          :index="item.id"
          :style="item.style"
      >
        <el-tooltip :content="item.tooltip" :disabled="!item.tooltip">
          <template v-if="!!item.icon">
            <font-awesome-icon :icon="item.icon"/>
          </template>
          <template v-else>
            {{ t(item.title) }}
          </template>
        </el-tooltip>
      </el-menu-item>
      <div class="extra">
        <slot name="extra">
        </slot>
      </div>
    </el-menu>
  </div>
</template>
<script lang="ts">
import {defineComponent} from 'vue';
import {useI18n} from 'vue-i18n';

export default defineComponent({
  name: 'NavTabs',
  props: {
    items: Array,
    activeKey: String,
  },
  setup(props, {emit}) {
    const {t} = useI18n();

    const onSelect = (index: string) => {
      emit('select', index);
    };

    return {
      onSelect,
      t,
    };
  },
});
</script>
<style lang="scss" scoped>
@import "../../styles/variables.scss";

.nav-tabs {
  .el-menu {
    display: flex;
    height: calc(#{$navTabsHeight} + 1px);

    .el-menu-item {
      height: $navTabsHeight;
      line-height: $navTabsHeight;

      &.emphasis {
        color: $infoColor;
        border-bottom: none;
      }
    }

    .extra {
      position: absolute;
      right: 0;
      height: $navTabsHeight;
      line-height: $navTabsHeight;
    }
  }
}
</style>
