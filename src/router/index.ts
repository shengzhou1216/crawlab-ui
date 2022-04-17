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
import misc from '@/router/misc';
import {initRouterAuth} from '@/router/hooks/auth';
import {initRouterStats} from '@/router/hooks/stats';
import NormalLayout from '@/layouts/NormalLayout.vue';
import {ROUTER_ROOT_NAME_ROOT} from '@/constants/router';

export const getDefaultRoutes = (): Array<RouteRecordRaw> => [
  ...login,
  {
    path: '/',
    redirect: '/home',
    name: ROUTER_ROOT_NAME_ROOT,
    component: NormalLayout,
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
      ...misc,
    ],
  },
];

export const getDefaultSidebarMenuItems = (): MenuItem[] => {
  return [
    {path: '/home', title: 'router.menuItems.home', icon: ['fa', 'home']},
    {path: '/nodes', title: 'router.menuItems.nodes', icon: ['fa', 'server']},
    {path: '/projects', title: 'router.menuItems.projects', icon: ['fa', 'project-diagram']},
    {path: '/spiders', title: 'router.menuItems.spiders', icon: ['fa', 'spider']},
    {path: '/schedules', title: 'router.menuItems.schedules', icon: ['fa', 'clock']},
    {path: '/tasks', title: 'router.menuItems.tasks', icon: ['fa', 'tasks']},
    {path: '/users', title: 'router.menuItems.users', icon: ['fa', 'users']},
    {path: '/tags', title: 'router.menuItems.tags', icon: ['fa', 'tag']},
    {path: '/tokens', title: 'router.menuItems.tokens', icon: ['fa', 'key']},
    {path: '/plugins', title: 'router.menuItems.plugins', icon: ['fa', 'plug']},
  ];
};

export const getDefaultHiddenMenuItems = (): MenuItem[] => {
  const items = [
    {path: '/misc/disclaimer', title: 'router.menuItems.misc.disclaimer', icon: ['fa', 'file-signature']},
    {path: '/misc/my-settings', title: 'router.menuItems.misc.mySettings', icon: ['fa', 'user-cog']},
  ] as MenuItem[];
  return items.map(d => {
    d.hidden = true;
    return d;
  });
};

export const getDefaultMenuItems = (): MenuItem[] => {
  return [
    ...getDefaultSidebarMenuItems(),
    ...getDefaultHiddenMenuItems(),
  ];
};

export const getRootRoute = (routes: Array<RouteRecordRaw>): RouteRecordRaw | undefined => {
  return routes.find(r => r.name === ROUTER_ROOT_NAME_ROOT);
};

export const getRouteByName = (routes: Array<RouteRecordRaw>, name: string): RouteRecordRaw | undefined => {
  for (const route of routes) {
    if (route.name === name) {
      return route;
    }
    if (route.children) {
      const subRoute = getRouteByName(route.children, name);
      if (subRoute) {
        return subRoute;
      }
    }
  }
  return;
};

export const replaceRouteByName = (routes: Array<RouteRecordRaw>, name: string, component: any) => {
  const route = getRouteByName(routes, name);
  if (route) {
    route.component = component;
  }
};

export const addRoutes = (route: RouteRecordRaw, routes: Array<RouteRecordRaw>): void => {
  if (!route.children) {
    route.children = [];
  }
  route.children = route.children.concat(routes);
};

export const createRouter = (rootRoutes?: Array<RouteRecordRaw>, routes?: Array<RouteRecordRaw>, allRoutes?: Array<RouteRecordRaw>): Router => {
  // all routes
  if (!allRoutes) {
    allRoutes = getDefaultRoutes();
  }

  // add routes
  if (routes) {
    allRoutes = allRoutes.concat(routes);
  }

  // add root routes
  if (rootRoutes) {
    const rootRoute = getRootRoute(allRoutes);
    if (rootRoute) {
      addRoutes(rootRoute, rootRoutes);
    }
  }

  // history
  const history = createWebHashHistory(process.env.BASE_URL);

  // router
  const router = createVueRouter({
    history,
    routes: allRoutes,
  });

  // initialize
  initRouterAuth(router);
  initRouterStats(router);

  return router;
};

let _router: Router;

export const getRouter = (rootRoutes?: Array<RouteRecordRaw>, routes?: Array<RouteRecordRaw>, allRoutes?: Array<RouteRecordRaw>): Router => {
  if (!_router) {
    _router = createRouter(rootRoutes, routes, allRoutes);
  }
  return _router;
};
