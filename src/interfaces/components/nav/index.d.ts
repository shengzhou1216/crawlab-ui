interface NavItem<T = any> extends TreeNode<NavItem<T>> {
  id: string;
  title?: string;
  subtitle?: string;
  data?: T;
  icon?: string[] | string;
  tooltip?: string;
  emphasis?: boolean;
  style?: any;
}
