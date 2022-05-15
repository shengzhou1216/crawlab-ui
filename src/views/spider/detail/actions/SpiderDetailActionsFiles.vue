<template>
  <NavActionGroup>
    <NavActionFaIcon
      :icon="['fa', 'laptop-code']"
      :tooltip="t('components.spider.actions.files.tooltip.fileEditorActions')"
    />
    <NavActionItem>
      <FaIconButton
        :icon="['fa', 'upload']"
        :tooltip="t('components.spider.actions.files.tooltip.uploadFiles')"
        type="primary"
        id="upload-btn"
        class-name="upload-btn"
        @click="onClickUpload"
      />
      <FaIconButton
        :icon="['fa', 'cog']"
        :tooltip="t('components.spider.actions.files.tooltip.fileEditorSettings')"
        type="info"
        id="open-settings-btn"
        class-name="open-settings-btn"
        @click="onOpenFilesSettings"
      />
    </NavActionItem>
  </NavActionGroup>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {useStore} from 'vuex';
import {useI18n} from 'vue-i18n';
import {sendEvent} from '@/admin/umeng';
import NavActionGroup from '@/components/nav/NavActionGroup.vue';
import NavActionItem from '@/components/nav/NavActionItem.vue';
import FaIconButton from '@/components/button/FaIconButton.vue';
import NavActionFaIcon from '@/components/nav/NavActionFaIcon.vue';

export default defineComponent({
  name: 'SpiderDetailActionsFiles',
  components: {
    NavActionFaIcon,
    FaIconButton,
    NavActionGroup,
    NavActionItem,
  },
  setup() {
    // i18n
    const {t} = useI18n();

    // store
    const store = useStore();

    const onClickUpload = () => {
      store.commit(`spider/showDialog`, 'uploadFiles');

      sendEvent('click_spider_detail_actions_upload');
    };

    const onOpenFilesSettings = () => {
      store.commit(`file/setEditorSettingsDialogVisible`, true);

      sendEvent('click_spider_detail_actions_files_settings');
    };

    return {
      onClickUpload,
      onOpenFilesSettings,
      t,
    };
  },
});
</script>

<style lang="scss" scoped>

</style>
