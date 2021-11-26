interface LNavActions {
  new: {
    label: string;
    tooltip: string;
  };
}

interface LCommon {
  control: {
    enabled: string;
    disabled: string;
  };
  actions: {
    view: string;
    edit: string;
    clone: string;
    delete: string;
    run: string;
    add: string;
    bookmark: string;
  };
  messageBox: {
    message: {
      delete: string;
    };
  };
  tabs: {
    overview: string;
    spiders: string;
    schedules: string;
    tasks: string;
    files: string;
    git: string;
    data: string;
    settings: string;
  };
}
