<template>
  <DemoLayout active-name="metric-dashboard">
    <el-tab-pane name="metric-dashboard" label="Metric Dashboard">
      <MetricDashboard
        :metric-data-func="metricDashboardFunc"
        @row-click="onMetricDashboardRowClick"
      />
    </el-tab-pane>
    <el-tab-pane name="metric-list" label="Metric List">
      <MetricList
        :metrics="metrics"
        :metric-data-func="metricListDataFunc"
        :date-range="dateRange"
        :duration="duration"
        @date-range-change="onDateRangeChange"
        @duration-change="onDurationChange"
      />
    </el-tab-pane>
  </DemoLayout>
</template>

<script lang="ts">
import {defineComponent, ref, onBeforeMount} from 'vue';
import DemoLayout from '@/demo/layouts/DemoLayout.vue';
import MetricList from '@/components/metric/MetricList.vue';
import useRequest from '@/services/request';
import dayjs from 'dayjs';
import MetricDashboard from '@/components/metric/MetricDashboard.vue';

const {
  get,
} = useRequest();

export default defineComponent({
  name: 'DemoMetric',
  components: {
    MetricDashboard,
    DemoLayout,
    MetricList,
  },
  setup() {
    const dateRange = ref<RangeItem>({
      key: 'past-1h',
      value: () => {
        return {
          start: dayjs().subtract(1, 'hour'),
          end: dayjs()
        };
      }
    });
    const onDateRangeChange = (value: RangeItem) => {
      dateRange.value = value;
    };
    const duration = ref<string>('1m');
    const onDurationChange = (value: string) => {
      duration.value = value;
    };

    const getNavItemFromMetric = (d: any): NavItem => {
      return {
        id: d.value,
        title: d.label,
        children: d.children?.map((subD: any) => getNavItemFromMetric(subD)),
      } as NavItem;
    };

    const metrics = ref<NavItem[]>([]);
    const getMetrics = async () => {
      const res = await get('/metrics/names', {
        group: true,
        query: '^performance:node:.*',
        // query: '^performance:mongo:.*',
      });
      const namespace = res.data.map((d: any) => getNavItemFromMetric(d))[0];
      const subSystem = namespace?.children?.[0];
      metrics.value = subSystem?.children;
    };
    onBeforeMount(() => {
      getMetrics();
    });

    const metricListDataFunc = ref<MetricListDataFunc>(async (metric: string) => {
      const dateRangeValue = typeof dateRange.value.value === 'function' ? dateRange.value.value() : dateRange.value.value;
      const res = await get('/metrics/query-range', {
        query: `avg(${metric})`,
        start: dateRangeValue?.start?.unix(),
        end: dateRangeValue?.end?.unix(),
        duration: duration.value,
      });
      return res.data?.[0]?.values?.map((d: [number, string | number]) => {
        return {
          date: d[0] * 1e3,
          value: Number(d[1]),
        };
      });
      // const data = [] as StatsResult[];
      // for (let i = 0, date = dayjs().subtract(30, 'minute'); i < 30; i++, date = date.add(1, 'minute')) {
      //   data.push({
      //     date: date.unix() * 1e3,
      //     value: Math.random() * 100,
      //   });
      // }
      // return data;
    });

    const metricDashboardFunc = ref<MetricDashboardDataFunc>(async () => {
      const res = await get('/metrics/snapshots');
      return res.data || [];
    });

    const onMetricDashboardRowClick = (row: MetricSnapshot) => {
      console.debug(row);
    };

    return {
      metricDashboardFunc,

      metrics,
      metricListDataFunc,
      onMetricDashboardRowClick,
      dateRange,
      onDateRangeChange,
      duration,
      onDurationChange,
    };
  }
});
</script>

<style lang="scss" scoped>
</style>

<style scoped>
.demo-layout >>> .el-tabs {
  display: flex;
  flex-direction: column;
}

.demo-layout >>> .nav-sidebar {
  border-right: none;
}
</style>
