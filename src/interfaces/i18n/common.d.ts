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
  };
  messageBox: {
    message: {
      delete: string;
    };
  };
  tabs: {
    overview: string;
    tasks: string;
  };
}
