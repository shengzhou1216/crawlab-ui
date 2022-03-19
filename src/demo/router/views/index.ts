import {RouteRecordRaw} from 'vue-router';
import nav from '@/demo/router/views/nav';
import chart from '@/demo/router/views/chart';

export default [
  ...nav,
  ...chart,
] as Array<RouteRecordRaw>;
