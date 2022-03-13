import {RouteRecordRaw} from 'vue-router';
import DemoNavSidebarList from '@/demo/components/nav/DemoNavSidebarList.vue';
import DemoNavSidebarTree from '@/demo/components/nav/DemoNavSidebarTree.vue';

const endpoint = '/demo/nav';

export default [
  {
    path: `${endpoint}/sidebar/list`,
    component: DemoNavSidebarList,
  },
  {
    path: `${endpoint}/sidebar/tree`,
    component: DemoNavSidebarTree,
  },
] as Array<RouteRecordRaw>;
