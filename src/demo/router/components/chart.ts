import {RouteRecordRaw} from 'vue-router';
import DemoLineChart from '@/demo/components/chart/DemoLineChart.vue';
import DemoMetricLineChart from '@/demo/components/chart/DemoMetricLineChart.vue';

const endpoint = '/demo/chart';

export default [
  {
    path: `${endpoint}/line`,
    component: DemoLineChart,
  },
  {
    path: `${endpoint}/metric/line`,
    component: DemoMetricLineChart,
  }
] as Array<RouteRecordRaw>;
