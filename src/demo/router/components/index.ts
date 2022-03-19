import {RouteRecordRaw} from 'vue-router';
import nav from '@/demo/router/components/nav';
import chart from '@/demo/router/components/chart';

export default [
  ...nav,
  ...chart,
] as Array<RouteRecordRaw>;
