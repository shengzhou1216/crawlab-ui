<template>
  <DetailLayout store-namespace="spider">
    <template #actions>
      <SpiderDetailActionsCommon/>
      <SpiderDetailActionsFiles v-if="activeTabName === 'files'"/>
      <SpiderDetailActionsGit v-if="activeTabName === 'git'"/>
      <SpiderDetailActionsData v-if="activeTabName === 'data'"/>
      <slot name="actions-suffix"/>
    </template>
  </DetailLayout>

  <!-- Dialogs (handled by store) -->
  <UploadSpiderFilesDialog/>
  <!-- ./Dialogs -->
</template>
<script lang="ts">
import {defineComponent, onBeforeMount, onBeforeUnmount} from 'vue';
import {useStore} from 'vuex';
import SpiderDetailActionsFiles from '@/views/spider/detail/actions/SpiderDetailActionsFiles.vue';
import SpiderDetailActionsCommon from '@/views/spider/detail/actions/SpiderDetailActionsCommon.vue';
import DetailLayout from '@/layouts/content/detail/DetailLayout.vue';
import useSpiderDetail from '@/views/spider/detail/useSpiderDetail';
import SpiderDetailActionsGit from '@/views/spider/detail/actions/SpiderDetailActionsGit.vue';
import UploadSpiderFilesDialog from '@/components/spider/UploadSpiderFilesDialog.vue';
import SpiderDetailActionsData from '@/views/spider/detail/actions/SpiderDetailActionsData.vue';

export default defineComponent({
  name: 'SpiderDetail',
  components: {
    DetailLayout,
    SpiderDetailActionsCommon,
    SpiderDetailActionsFiles,
    SpiderDetailActionsGit,
    SpiderDetailActionsData,
    UploadSpiderFilesDialog,
  },
  setup() {
    const ns = 'spider';
    const nsGit = 'git';
    const store = useStore();

    const {
      saveFile,
      saveGit,
    } = useSpiderDetail();

    onBeforeMount(async () => {
      await Promise.all([
        store.dispatch(`project/getAllList`),
      ]);

      store.commit(`${ns}/setAfterSave`, [
        saveFile,
        saveGit,
      ]);
    });

    onBeforeUnmount(() => {
      store.commit(`${ns}/resetGitData`);
      store.commit(`${nsGit}/resetForm`);
    });

    return {
      ...useSpiderDetail(),
    };
  },
});
</script>
<style scoped lang="scss">
</style>
