import {RouteRecordRaw} from 'vue-router';
import DemoLineChart from '@/demo/views/chart/DemoLineChart.vue';
import DemoChartDashboard from '@/demo/views/chart/DemoChartDashboard.vue';

const endpoint = '/demo/chart';

export default [
  {
    path: `${endpoint}/line`,
    component: DemoLineChart,
  },
  {
    path: `${endpoint}/dashboard`,
    component: DemoChartDashboard,
  }
] as Array<RouteRecordRaw>;
