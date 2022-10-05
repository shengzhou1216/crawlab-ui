export declare global {
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
      restart: string;
      cancel: string;
      confirm: string;
      copy: string;
      create: string;
      hide: string;
      start: string;
      stop: string;
      clear: string;
      apply: string;
      search: string;
      install: string;
      uninstall: string;
      viewLogs: string;
      viewData: string;
      viewFiles: string;
      uploadFiles: string;
      export: string;
      configure: string;
      update: string;
    };
    messageBox: {
      confirm: {
        delete: string;
        restart: string;
        cancel: string;
        stop: string;
        install: string;
        start: string;
        deleteSelected: string;
      };
    };
    message: {
      success: {
        delete: string;
        restart: string;
        copy: string;
        start: string;
        save: string;
        upload: string;
        install: string;
        uninstall: string;
        startInstall: string;
        startUninstall: string;
      };
      info: {
        cancel: string;
        stop: string;
      };
      error: {
        login: string;
      };
    };
    notification: {
      loggedOut: string;
    },
    tabs: {
      overview: string;
      spiders: string;
      schedules: string;
      tasks: string;
      files: string;
      git: string;
      data: string;
      settings: string;
      logs: string;
      dependencies: string;
    };
    status: {
      unassigned: string;
      unknown: string;
      invalid: string;
      currentlyUnavailable: string;
      unauthorized: string;
      loading: string;
    };
    mode: {
      default: string;
      other: string;
    };
    placeholder: {
      empty: string;
    };
  }
}
