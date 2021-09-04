import {RouteRecordRaw} from 'vue-router';
import {TAB_NAME_OVERVIEW} from '@/constants/tab';

const endpoint = 'tags';

export default [
  {
    name: 'TagList',
    path: endpoint,
    component: require('@/views/tag/list/TagList.vue'),
  },
  {
    name: 'TagDetail',
    path: `${endpoint}/:id`,
    redirect: to => {
      return {path: to.path + '/overview'};
    },
    component: require('@/views/tag/detail/TagDetail.vue'),
    children: [
      {
        path: TAB_NAME_OVERVIEW,
        component: require('@/views/tag/detail/tabs/TagDetailTabOverview.vue'),
      },
    ]
  }
] as Array<RouteRecordRaw>;
