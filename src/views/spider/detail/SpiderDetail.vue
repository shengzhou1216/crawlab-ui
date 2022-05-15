<template>
  <DetailLayout store-namespace="spider">
    <template #actions>
      <SpiderDetailActionsCommon/>
      <SpiderDetailActionsFiles v-if="activeTabName === 'files'"/>
      <SpiderDetailActionsGit v-if="activeTabName === 'git'"/>
      <slot name="actions-suffix"/>
    </template>
  </DetailLayout>

  <!-- Dialogs (handled by store) -->
  <UploadSpiderFilesDialog/>
  <!-- ./Dialogs -->
</template>
<script lang="ts">
import {defineComponent} from 'vue';
import SpiderDetailActionsFiles from '@/views/spider/detail/actions/SpiderDetailActionsFiles.vue';
import SpiderDetailActionsCommon from '@/views/spider/detail/actions/SpiderDetailActionsCommon.vue';
import DetailLayout from '@/layouts/content/detail/DetailLayout.vue';
import useSpiderDetail from '@/views/spider/detail/spiderDetail';
import SpiderDetailActionsGit from '@/views/spider/detail/actions/SpiderDetailActionsGit.vue';
import UploadSpiderFilesDialog from '@/components/spider/UploadSpiderFilesDialog.vue';

export default defineComponent({
  name: 'SpiderDetail',
  components: {
    SpiderDetailActionsGit,
    DetailLayout,
    SpiderDetailActionsCommon,
    SpiderDetailActionsFiles,
    UploadSpiderFilesDialog,
  },
  setup() {
    return {
      ...useSpiderDetail(),
    };
  },
});
</script>
<style scoped lang="scss">
</style>
