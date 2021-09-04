import {RouteRecordRaw} from 'vue-router';
import {TAB_NAME_OVERVIEW, TAB_NAME_SPIDERS} from '@/constants/tab';

const endpoint = 'projects';

export default [
  {
    name: 'ProjectList',
    path: endpoint,
    component: require('@/views/project/list/ProjectList.vue'),
  },
  {
    name: 'ProjectDetail',
    path: `${endpoint}/:id`,
    redirect: to => {
      return {path: to.path + '/overview'};
    },
    component: require('@/views/project/detail/ProjectDetail.vue'),
    children: [
      {
        path: TAB_NAME_OVERVIEW,
        component: require('@/views/project/detail/tabs/ProjectDetailTabOverview.vue'),
      },
      {
        path: TAB_NAME_SPIDERS,
        component: require('@/views/project/detail/tabs/ProjectDetailTabSpiders.vue'),
      },
    ]
  },
] as Array<RouteRecordRaw>;
