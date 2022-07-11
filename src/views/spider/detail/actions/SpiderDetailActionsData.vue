<template>
  <NavActionGroup>
    <NavActionFaIcon
      :icon="['fa', 'database']"
      :tooltip="t('components.spider.actions.data.tooltip.dataActions')"
    />
    <NavActionItem
      v-export="colName"
    >
      <FaIconButton
        :icon="['fa', 'download']"
        :tooltip="t('components.spider.actions.data.tooltip.export')"
        type="primary"
        id="export-btn"
        class-name="export-btn"
      />
    </NavActionItem>
  </NavActionGroup>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue';
import {useI18n} from 'vue-i18n';
import NavActionGroup from '@/components/nav/NavActionGroup.vue';
import NavActionItem from '@/components/nav/NavActionItem.vue';
import FaIconButton from '@/components/button/FaIconButton.vue';
import NavActionFaIcon from '@/components/nav/NavActionFaIcon.vue';
import {ExportTypeCsv} from '@/constants/export';
import {useStore} from 'vuex';

export default defineComponent({
  name: 'SpiderDetailActionsData',
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
    const {
      spider: spiderState,
    } = store.state as RootStoreState;

    // spider
    const colName = () => spiderState.form.col_name as string;

    // export type
    const exportType = ref<ExportType>(ExportTypeCsv);

    return {
      exportType,
      colName,
      t,
    };
  },
});
</script>

<style lang="scss" scoped>

</style>
