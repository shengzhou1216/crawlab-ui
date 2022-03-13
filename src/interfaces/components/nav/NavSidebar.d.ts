interface NavSidebar {
  scroll: (id: string) => void;
}

type NavSidebarType = 'list' | 'tree';

interface NavSidebarContent {
  activeKey?: string;
  items: NavItem[],
}

interface NavSidebarProps extends NavSidebarContent {
  type: NavSidebarType;
  collapsed?: boolean;
  showActions?: boolean;
}
