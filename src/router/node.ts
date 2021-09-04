import {RouteRecordRaw} from 'vue-router';
import {TAB_NAME_OVERVIEW, TAB_NAME_TASKS} from '@/constants/tab';

const endpoint = 'nodes';

export default [
  {
    name: 'NodeList',
    path: endpoint,
    component: require('@/views/node/list/NodeList.vue'),
  },
  {
    name: 'NodeDetail',
    path: `${endpoint}/:id`,
    redirect: to => {
      return {path: to.path + '/' + TAB_NAME_OVERVIEW};
    },
    component: require('@/views/node/detail/NodeDetail.vue'),
    children: [
      {
        path: TAB_NAME_OVERVIEW,
        component: require('@/views/node/detail/tabs/NodeDetailTabOverview.vue'),
      },
      {
        path: TAB_NAME_TASKS,
        component: require('@/views/node/detail/tabs/NodeDetailTabTasks.vue'),
      }
    ]
  },
] as Array<RouteRecordRaw>;
