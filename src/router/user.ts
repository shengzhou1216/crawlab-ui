import {RouteRecordRaw} from 'vue-router';
import {TAB_NAME_OVERVIEW} from '@/constants/tab';

export default [
  {
    name: 'UserList',
    path: 'users',
    component: require('@/views/user/list/UserList.vue'),
  },
  {
    name: 'UserDetail',
    path: 'users/:id',
    redirect: to => {
      return {path: to.path + '/' + TAB_NAME_OVERVIEW};
    },
    component: require('@/views/user/detail/UserDetail.vue'),
    children: [
      {
        path: TAB_NAME_OVERVIEW,
        component: require('@/views/user/detail/tabs/UserDetailTabOverview.vue'),
      },
    ]
  },
] as Array<RouteRecordRaw>;
