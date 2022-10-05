import {RouteRecordRaw} from 'vue-router';
import DependencySettings from '@/views/env/deps/DependencySettings.vue';
import DependencyPython from '@/views/env/deps/python/DependencyPython.vue';
import DependencyNode from '@/views/env/deps/node/DependencyNode.vue';

const endpoint = 'env';

export default [
  {
    name: 'EnvDeps',
    path: `${endpoint}/deps`,
    redirect: to => {
      return {path: to.path + '/settings'};
    }
  },
  {
    name: 'EnvDepsSettings',
    path: `${endpoint}/deps/settings`,
    component: DependencySettings,
  },
  {
    name: 'EnvDepsPython',
    path: `${endpoint}/deps/python`,
    component: DependencyPython,
  },
  {
    name: 'EnvDepsNode',
    path: `${endpoint}/deps/node`,
    component: DependencyNode,
  }
] as Array<RouteRecordRaw>;
