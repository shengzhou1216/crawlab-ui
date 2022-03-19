<template>
  <div class="metric-dashboard">
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
      <div class="top">
        <div class="filters">
          <DateTimeRangePicker
            :model-value="dateRange"
            @change="onDateRangeChange"
          />
        </div>
      </div>
      <div class="chart-list">
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
    </div>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, PropType, ref, watch} from 'vue';
import NavSidebar from '@/components/nav/NavSidebar.vue';
import {emptyArrayFunc, voidFunc} from '@/utils/func';
import LineChart from '@/components/chart/LineChart.vue';
import {cloneArray} from '@/utils/object';
import dayjs from 'dayjs';
import DateTimeRangePicker from '@/components/date/DateTimeRangePicker.vue';

export default defineComponent({
  name: 'MetricDashboard',
  components: {
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
      type: Function as PropType<MetricDataFunc>,
      default: voidFunc,
    },
    dateRange: {
      type: Object as PropType<DateRange>,
      default: () => {
        return {
          end: dayjs(),
          start: dayjs().subtract(1, 'hour'),
        } as DateRange;
      },
    },
  },
  emits: [
    'date-range-change',
  ],
  setup(props: MetricDashboardProps, {emit}) {
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

    const onDateRangeChange = (value: DateRange) => {
      emit('date-range-change', value);
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
    };
  }
});
</script>

<style lang="scss" scoped>
@import "../../styles/variables";

.metric-dashboard {
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
      .filters {
      }
    }
  }
}
</style>
