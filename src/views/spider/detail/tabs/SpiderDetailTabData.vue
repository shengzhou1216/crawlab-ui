<template>
  <div class="spider-detail-tab-data">
    <ResultList
      :id="spider.col_id"
      :data-source-id="spider.data_source_id"
      no-actions
      embedded
    />
  </div>
</template>
<script lang="ts">
import {computed, defineComponent, onBeforeMount, onBeforeUnmount} from 'vue';
import {useRoute} from 'vue-router';
import {useStore} from 'vuex';
import {FILTER_OP_EQUAL} from '@/constants/filter';
import ResultList from '@/views/data/list/ResultList.vue';
import useSpider from '@/components/spider/spider';
import useSpiderDetail from '@/views/spider/detail/useSpiderDetail';

export default defineComponent({
  name: 'SpiderDetailTabTasks',
  components: {
    ResultList,
  },
  setup() {
    // route
    const route = useRoute();

    // store
    const ns = 'spider';
    const store = useStore();

    // id
    const id = computed<string>(() => route.params.id as string);

    const {
      form: spider,
    } = useSpider(store);

    const {
      activeId,
    } = useSpiderDetail();

    // set table list filter before mount
    onBeforeMount(() => {
      // set filter
      store.commit(`task/setTableListFilter`, [{
        key: 'spider_id',
        op: FILTER_OP_EQUAL,
        value: id.value,
      }]);
    });

    // get form data before mount
    onBeforeMount(async () => {
      if (!spider.value.col_id) {
        await store.dispatch(`${ns}/getById`, activeId.value);
      }
    });

    onBeforeUnmount(() => {
      store.commit(`task/resetTableListFilter`);
      store.commit(`task/resetTableData`);
    });

    return {
      spider,
    };
  },
});
</script>

<style scoped>
.spider-detail-tab-data >>> .el-table {
  border: none;
}
</style>
