<template>
  <ClListLayout
    class="plugin-list"
    :action-functions="actionFunctions"
    :nav-actions="navActions"
    :table-pagination="tablePagination"
    :table-columns="tableColumns"
    :table-data="tableData"
    :table-total="tableTotal"
  >
    <template #extra>
      <!-- Dialogs (handled by store) -->
      <InstallPluginDialog v-if="activeDialogKey === 'install'"/>
      <SettingsPluginDialog v-if="activeDialogKey === 'settings'"/>
      <!-- ./Dialogs -->
    </template>
  </ClListLayout>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import ClListLayout from '@/layouts/content/list/ListLayout.vue';
import usePluginList from '@/views/plugin/list/pluginList';
import InstallPluginDialog from '@/components/plugin/InstallPluginDialog.vue';
import SettingsPluginDialog from '@/components/plugin/SettingsPluginDialog.vue';

export default defineComponent({
  name: 'PluginList',
  components: {
    InstallPluginDialog,
    SettingsPluginDialog,
    ClListLayout,
  },
  setup() {
    return {
      ...usePluginList(),
    };
  }
});
</script>

<style lang="scss" scoped>
.plugin-list {
  .filter {
    height: 100%;
    display: flex;
    align-items: center;
  }
}
</style>

<style scoped>
.plugin-list >>> .filter .el-form-item {
  display: flex;
  align-items: center;
  margin: 0 0 0 10px;
  padding: 0;
}
</style>
