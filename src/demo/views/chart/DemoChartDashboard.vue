<template>
  <DemoLayout active-name="metric-dashboard">
    <el-tab-pane name="metric-dashboard" label="Metric Dashboard">
      <MetricDashboard
        :metrics="metrics"
        :metric-data-func="metricDataFunc"
      >
      </MetricDashboard>
    </el-tab-pane>
  </DemoLayout>
</template>

<script lang="ts">
import {defineComponent, ref, onBeforeMount} from 'vue';
import DemoLayout from '@/demo/layouts/DemoLayout.vue';
import MetricDashboard from '@/components/chart/MetricDashboard.vue';
import dayjs from 'dayjs';

export default defineComponent({
  name: 'DemoChartDashboard',
  components: {
    DemoLayout,
    MetricDashboard,
  },
  setup() {
    const getNavItemFromMetric = (d: any): NavItem => {
      return {
        id: d.label,
        title: d.label,
        children: d.children?.map((subD: any) => getNavItemFromMetric(subD)),
      } as NavItem;
    };

    const getMetrics = (): NavItem[] => {
      const dataStr = '{"status":"ok","message":"success","data":[{"label":"up","children":[{"label":"up","children":[{"label":"up","children":[{"label":"up"}]}]}]},{"label":"performance","children":[{"label":"node","children":[{"label":"cpu","children":[{"label":"percent_combined"},{"label":"percent_per_cpu"}]},{"label":"disk","children":[{"label":"free"},{"label":"io_read_bytes"},{"label":"io_read_count"},{"label":"io_read_time"},{"label":"io_write_bytes"},{"label":"io_write_count"},{"label":"io_write_time"},{"label":"total"},{"label":"used"},{"label":"used_percent"}]},{"label":"mem","children":[{"label":"available"},{"label":"total"},{"label":"used"},{"label":"used_percent"}]},{"label":"net","children":[{"label":"io_bytes_recv"},{"label":"io_bytes_sent"},{"label":"io_dropin"},{"label":"io_dropout"},{"label":"io_errin"},{"label":"io_errout"},{"label":"io_fifoin"},{"label":"io_fifoout"},{"label":"io_packets_recv"},{"label":"io_packets_sent"}]}]}]},{"label":"scrape","children":[{"label":"duration","children":[{"label":"seconds","children":[{"label":"scrape_duration_seconds"}]}]},{"label":"samples","children":[{"label":"post","children":[{"label":"metric_relabeling"}]},{"label":"scraped","children":[{"label":"scrape_samples_scraped"}]}]},{"label":"series","children":[{"label":"added","children":[{"label":"scrape_series_added"}]}]}]}],"error":""}';
      const data = JSON.parse(dataStr);
      return data.data.map((d: any) => getNavItemFromMetric(d));
    };

    const metrics = ref<NavItem[]>([]);

    onBeforeMount(() => {
      metrics.value = getMetrics();
    });

    const metricDataFunc = ref<MetricDataFunc>(async () => {
      const data = [] as StatsResult[];
      for (let i = 0, date = dayjs().subtract(30, 'minute'); i < 30; i++, date = date.add(1, 'minute')) {
        data.push({
          date: date.unix() * 1e3,
          value: Math.random() * 100,
        });
      }
      return data;
    });

    return {
      metrics,
      metricDataFunc,
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
