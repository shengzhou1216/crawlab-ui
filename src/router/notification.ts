import {RouteRecordRaw} from 'vue-router';
import NotificationList from '@/views/notification/list/NotificationList.vue';
import NotificationDetail from '@/views/notification/detail/NotificationDetail.vue';
import {TAB_NAME_OVERVIEW, TAB_NAME_TRIGGERS, TAB_NAME_TEMPLATE} from '@/constants';
import NotificationDetailTabOverview from '@/views/notification/detail/tabs/NotificationDetailTabOverview.vue';
import NotificationDetailTabTriggers from '@/views/notification/detail/tabs/NotificationDetailTabTriggers.vue';
import NotificationDetailTabTemplate from '@/views/notification/detail/tabs/NotificationDetailTabTemplate.vue';

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
    redirect: to => {
      return {path: to.path + '/' + TAB_NAME_OVERVIEW};
    },
    component: NotificationDetail,
    children: [
      {
        path: TAB_NAME_OVERVIEW,
        component: NotificationDetailTabOverview,
      },
      {
        path: TAB_NAME_TRIGGERS,
        component: NotificationDetailTabTriggers,
      },
      {
        path: TAB_NAME_TEMPLATE,
        component: NotificationDetailTabTemplate,
      },
    ],
  },
] as Array<RouteRecordRaw>;
