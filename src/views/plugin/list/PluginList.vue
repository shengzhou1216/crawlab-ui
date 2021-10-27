<template>
  <ListLayout
      :action-functions="actionFunctions"
      :nav-actions="navActions"
      :pagination="tablePagination"
      :table-columns="tableColumns"
      :table-data="tableData"
      :table-total="tableTotal"
      class="plugin-list"
  >
    <template #nav-actions-extra>
      <div class="filter">
        <FormItem label="Source">
          <el-select v-model="baseUrl" size="small" @change="onBaseUrlChange">
            <el-option
                v-for="op in baseUrlOptions"
                :key="op.value"
                :value="op.value"
                :label="op.label"
            />
          </el-select>
        </FormItem>
      </div>
    </template>
    <template #extra>
      <!-- Dialogs (handled by store) -->
      <CreateEditPluginDialog/>
      <!-- ./Dialogs -->
    </template>
  </ListLayout>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import ListLayout from '@/layouts/ListLayout.vue';
import usePluginList from '@/views/plugin/list/pluginList';
import CreateEditPluginDialog from '@/components/plugin/CreateEditPluginDialog.vue';
import FormItem from '@/components/form/FormItem.vue';

export default defineComponent({
  name: 'PluginList',
  components: {
    FormItem,
    ListLayout,
    CreateEditPluginDialog,
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
