import {RouteRecordRaw} from 'vue-router';

const endpoint = 'tokens';

export default [
  {
    name: 'TokenList',
    path: endpoint,
    component: require('@/views/token/list/TokenList.vue'),
  },
] as Array<RouteRecordRaw>;
