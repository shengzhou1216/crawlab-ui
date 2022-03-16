import {RouteRecordRaw} from 'vue-router';
import {getStore} from '@/store';
import components from '@/demo/router/components';

export const initDemoRoutes = () => {
  // store
  const store = getStore();
  const state = store.state as RootStoreState;
  const {
    layout: layoutState
  } = state;

  const menuItems = [
    {
      title: 'Demo',
      icon: ['fa', 'laptop'],
      children: [
        {
          title: 'Nav',
          icon: ['fa', 'route'],
          children: [
            {path: '/demo/nav/sidebar/list', title: 'Sidebar List', icon: ['fa', 'list']},
            {path: '/demo/nav/sidebar/tree', title: 'Sidebar Tree', icon: ['fa', 'folder-tree']},
          ]
        }
      ],
    }
  ] as MenuItem[];

  // merge sidebar menu items
  store.commit('layout/setMenuItems', [
    ...layoutState.menuItems,
    ...menuItems,
  ]);
};

export const getDemoRoutes = (): Array<RouteRecordRaw> => {
  return [
    ...components,
  ];
};
