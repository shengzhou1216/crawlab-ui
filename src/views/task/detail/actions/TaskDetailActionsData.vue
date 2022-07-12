<template>
  <NavActionGroup>
    <NavActionFaIcon
      :icon="['fa', 'database']"
      :tooltip="t('components.spider.actions.data.tooltip.dataActions')"
    />
    <NavActionItem
      v-export="{
        target,
        conditions,
      }"
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
import {computed, defineComponent, ref, watch} from 'vue';
import {useI18n} from 'vue-i18n';
import NavActionGroup from '@/components/nav/NavActionGroup.vue';
import NavActionItem from '@/components/nav/NavActionItem.vue';
import FaIconButton from '@/components/button/FaIconButton.vue';
import NavActionFaIcon from '@/components/nav/NavActionFaIcon.vue';
import {ExportTypeCsv} from '@/constants/export';
import {useStore} from 'vuex';
import useSpider from '@/components/spider/spider';
import useRequest from '@/services/request';
import {FILTER_OP_EQUAL} from '@/constants';

const {
  get,
} = useRequest();

export default defineComponent({
  name: 'TaskDetailActionsData',
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
      task: taskState,
    } = store.state as RootStoreState;

    const {
      allDict: allSpiderDict,
    } = useSpider(store);

    // spider
    const spider = computed(() => allSpiderDict.value.get(taskState.form.spider_id as string));

    // spider collection name
    const colName = ref<string>();
    watch(() => spider.value, async () => {
      if (!spider.value) return;
      const res = await get(`/spiders/${spider.value._id}`);
      colName.value = (res.data as Spider)?.col_name;
    });

    // target
    const target = () => colName.value;

    // conditions
    const conditions = () => [{key: '_tid', op: FILTER_OP_EQUAL, value: taskState.form._id}];

    // export type
    const exportType = ref<ExportType>(ExportTypeCsv);

    return {
      allSpiderDict,
      spider,
      target,
      exportType,
      conditions,
      t,
    };
  },
});
</script>

<style lang="scss" scoped>

</style>
