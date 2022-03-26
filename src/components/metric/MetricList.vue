<template>
  <div class="metric-list">
    <div class="sidebar">
      <NavSidebar
        ref="navSidebarRef"
        type="tree"
        :items="metrics"
        show-checkbox
        @check="onCheck"
      />
    </div>

    <div class="content">
      <!--Top-->
      <div class="top">
        <Form label-width="120px">
          <FormItem :label="t('components.metric.filters.timeRange')">
            <DateTimeRangePicker
              :model-value="dateRange"
              @change="onDateRangeChange"
            />
          </FormItem>
          <FormItem :label="t('components.metric.filters.timeUnit')">
            <el-select :model-value="duration" @change="onDurationChange">
              <el-option
                v-for="(op, $index) in durationOptions"
                :key="$index"
                :label="op.label"
                :value="op.value"
              />
            </el-select>
          </FormItem>
        </Form>
      </div>
      <!--./Top-->

      <!--Chart List-->
      <div
        v-if="checkedNormalizedMetrics.length > 0"
        class="chart-list"
      >
        <div
          v-for="(metric, $index) in checkedNormalizedMetrics"
          :key="$index"
          class="metric-chart"
        >
          <LineChart
            height="240px"
            :config="getChartConfig(metric)"
          />
        </div>
      </div>
      <Empty
        v-else
        :description="t('components.metric.empty.noMetricsSelected')"
      />
      <!--./Chart List-->
    </div>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, onBeforeMount, onBeforeUnmount, PropType, ref, watch} from 'vue';
import NavSidebar from '@/components/nav/NavSidebar.vue';
import {emptyArrayFunc, voidFunc} from '@/utils/func';
import LineChart from '@/components/chart/LineChart.vue';
import {cloneArray} from '@/utils/object';
import DateTimeRangePicker from '@/components/date/DateTimeRangePicker.vue';
import FormItem from '@/components/form/FormItem.vue';
import {translate} from '@/utils/i18n';
import Empty from '@/components/empty/Empty.vue';
import Form from '@/components/form/Form.vue';

const t = translate;

export default defineComponent({
  name: 'MetricList',
  components: {
    Form,
    Empty,
    FormItem,
    NavSidebar,
    DateTimeRangePicker,
    LineChart,
  },
  props: {
    metrics: {
      type: Array as PropType<NavItem[]>,
      default: emptyArrayFunc,
    },
    metricDataFunc: {
      type: Function as PropType<MetricListDataFunc>,
      default: voidFunc,
    },
    dateRange: {
      type: Object as PropType<RangeItem>,
      default: () => {
        return {
          key: 'past-1h',
        } as RangeItem;
      }
    },
    duration: {
      type: String,
      default: '5m',
    },
    durationOptions: {
      type: Array as PropType<SelectOption[]>,
      default: () => {
        return [
          {label: t('components.date.units.second', {n: 15}), value: '15s'},
          {label: t('components.date.units.second', {n: 30}), value: '30s'},
          {label: t('components.date.units.minute', {n: 1}), value: '1m'},
          {label: t('components.date.units.minute', {n: 5}), value: '5m'},
          {label: t('components.date.units.minute', {n: 15}), value: '15m'},
          {label: t('components.date.units.hour', {n: 1}), value: '1h'},
        ];
      }
    }
  },
  emits: [
    'date-range-change',
    'duration-change',
  ],
  setup(props: MetricListProps, {emit}) {
    const navSidebarRef = ref();

    const getNormalizedMetrics = (items?: NavItem[]): NavItem[] => {
      let normalizedItems = [] as NavItem[];

      if (items === undefined) {
        items = cloneArray(props.metrics || []);
      }

      items.forEach(item => {
        if (item.children) {
          normalizedItems = normalizedItems.concat(getNormalizedMetrics(item.children));
        } else {
          normalizedItems.push(item);
        }
      });

      return normalizedItems;
    };

    const normalizedMetrics = computed<NavItem[]>(() => getNormalizedMetrics());

    const checkedKeys = ref<string[]>([]);

    const checkedNormalizedMetrics = computed<NavItem[]>(() => normalizedMetrics.value.filter(m => checkedKeys.value.includes(m.id)));

    const chartConfigMap = ref<{ [key: string]: EChartsConfig }>({});

    const getChartConfig = (metric: NavItem): EChartsConfig | undefined => {
      if (!chartConfigMap.value[metric.id]) {
        chartConfigMap.value[metric.id] = {
          option: {
            title: {
              text: metric.id,
            },
            tooltip: {
              axisPointer: {
                type: 'cross',
              }
            },
            grid: {
              top: 50,
              bottom: 30,
              right: 20,
            },
            yAxis: {
              scale: true,
            }
          },
        } as EChartsConfig;
      }
      return chartConfigMap.value[metric.id];
    };

    const updateAllChartData = async () => {
      await Promise.all(checkedNormalizedMetrics.value.map(metric => updateChartData(metric)));
    };

    const updateChartData = async (metric: NavItem) => {
      chartConfigMap.value[metric.id].data = await props.metricDataFunc?.(metric.id) || [];
    };

    const onCheck = (item: NavItem, checked: boolean, items: NavItem[]) => {
      checkedKeys.value = items.map(item => item.id);
    };

    watch(() => checkedNormalizedMetrics.value.map(m => m.value), updateAllChartData);
    watch(() => props.dateRange, updateAllChartData);
    watch(() => props.duration, updateAllChartData);

    // timer
    let handle: number;
    onBeforeMount(() => {
      updateAllChartData();
      handle = setInterval(updateAllChartData, 60 * 1e3);
    });
    onBeforeUnmount(() => {
      clearInterval(handle);
    });

    const onDateRangeChange = (value: RangeItem) => {
      emit('date-range-change', value);
    };
    const onDurationChange = (value: string) => {
      emit('duration-change', value);
    };

    return {
      navSidebarRef,
      normalizedMetrics,
      chartConfigMap,
      checkedNormalizedMetrics,
      getChartConfig,
      updateAllChartData,
      onCheck,
      onDateRangeChange,
      onDurationChange,
      t,
    };
  }
});
</script>

<style lang="scss" scoped>
@import "../../styles/variables";

.metric-list {
  display: flex;
  height: 100%;

  .sidebar {
    height: 100%;
    flex: 0 0;
    border-right: 1px solid $infoLightColor;
  }

  .content {
    height: 100%;
    flex: 1 0;
    overflow-y: auto;

    .top {
      margin: 0;
      padding: 4px 20px;
      border-bottom: 1px solid $infoLightColor;

      .form {
        display: flex;

        .form-item {
          margin-right: 10px;
        }
      }
    }

    .chart-list {
      .metric-chart {
        padding: 10px;
        border-bottom: 1px solid $infoLightColor;
      }
    }
  }
}
</style>

<style scoped>
.metric-list >>> .content .top .form-item .el-form-item {
  margin-bottom: 0;
}
</style>
