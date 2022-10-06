import {RouteRecordRaw} from 'vue-router';
import NotificationList from '@/views/notification/NotificationList.vue';
import NotificationDetail from '@/views/notification/NotificationDetail.vue';

const endpoint = 'notifications';

export default [
  {
    name: 'NotificationList',
    path: `${endpoint}`,
    component: NotificationList,
  },
  {
    name: 'NotificationDetail',
    path: `${endpoint}/:id`,
    component: NotificationDetail,
  },
] as Array<RouteRecordRaw>;
