import {createRouter as createVueRouter, createWebHashHistory, Router, RouteRecordRaw} from 'vue-router';
import login from '@/router/login';
import home from '@/router/home';
import node from '@/router/node';
import project from '@/router/project';
import spider from '@/router/spider';
import task from '@/router/task';
import schedule from '@/router/schedule';
import user from '@/router/user';
import tag from '@/router/tag';
import token from '@/router/token';
import plugin from '@/router/plugin';
import {initRouterAuth} from '@/router/hooks/auth';
import {initRouterStats} from '@/router/hooks/stats';
import BasicLayout from '@/layouts/BasicLayout.vue';

export const getDefaultRoutes = (): Array<RouteRecordRaw> => [
  ...login,
  {
    path: '/',
    name: 'Root',
    component: BasicLayout,
    children: [
      ...home,
      ...node,
      ...project,
      ...spider,
      ...task,
      ...schedule,
      ...user,
      ...tag,
      ...token,
      ...plugin,
    ],
  },
];

export const getDefaultMenuItems = (): MenuItem[] => [
  {path: '/', title: 'Home', icon: ['fa', 'home']},
  {path: '/nodes', title: 'Nodes', icon: ['fa', 'server']},
  {path: '/projects', title: 'Projects', icon: ['fa', 'project-diagram']},
  {path: '/spiders', title: 'Spiders', icon: ['fa', 'spider']},
  {path: '/schedules', title: 'Schedules', icon: ['fa', 'clock']},
  {path: '/tasks', title: 'Tasks', icon: ['fa', 'tasks']},
  {path: '/users', title: 'Users', icon: ['fa', 'users']},
  {path: '/tags', title: 'Tags', icon: ['fa', 'tag']},
  {path: '/tokens', title: 'Tokens', icon: ['fa', 'key']},
  {path: '/plugins', title: 'Plugins', icon: ['fa', 'plug']},
];

export const createRouter = (routes?: Array<RouteRecordRaw>): Router => {
  const router = createVueRouter({
    history: createWebHashHistory(process.env.BASE_URL),
    routes: routes || getDefaultRoutes(),
  });

  initRouterAuth(router);
  initRouterStats(router);

  return router;
};
