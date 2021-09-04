import {RouteRecordRaw} from 'vue-router';
import {TAB_NAME_DATA, TAB_NAME_LOGS, TAB_NAME_OVERVIEW} from '@/constants/tab';

const endpoint = 'tasks';

export default [
  {
    name: 'TaskList',
    path: endpoint,
    component: require('@/views/task/list/TaskList.vue'),
  },
  {
    name: 'TaskDetail',
    path: `${endpoint}/:id`,
    redirect: to => {
      return {path: to.path + '/overview'};
    },
    component: require('@/views/task/detail/TaskDetail.vue'),
    children: [
      {
        path: TAB_NAME_OVERVIEW,
        component: require('@/views/task/detail/tabs/TaskDetailTabOverview.vue'),
      },
      {
        path: TAB_NAME_LOGS,
        component: require('@/views/task/detail/tabs/TaskDetailTabLogs.vue'),
      },
      {
        path: TAB_NAME_DATA,
        component: require('@/views/task/detail/tabs/TaskDetailTabData.vue'),
      },
    ]
  },
] as Array<RouteRecordRaw>;
