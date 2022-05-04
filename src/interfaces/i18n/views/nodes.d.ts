interface LViewsNodes {
  table: {
    columns: {
      name: string;
      nodeType: string;
      status: string;
      ip: string;
      mac: string;
      hostname: string;
      runners: string;
      enabled: string;
      tags: string;
      description: string;
    };
  };
  navActions: LNavActions;
  notice: {
    create: {
      title: string;
      content: string;
      link: {
        label: string;
        url: string;
      };
    };
  };
}
