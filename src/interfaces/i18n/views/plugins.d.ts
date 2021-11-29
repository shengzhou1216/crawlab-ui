interface LViewsPlugins {
  table: {
    columns: {
      name: string;
      status: string;
      processId: string;
      description: string;
    };
  };
  navActions: LNavActionsPlugins;
}

interface LNavActionsPlugins extends LNavActions {
  settings: {
    label: string;
    tooltip: string;
  };
}
