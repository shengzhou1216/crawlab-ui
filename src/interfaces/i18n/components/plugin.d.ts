interface LComponentsPlugin {
  form: {
    installType: string;
    autoStart: string;
    name: string;
    installUrl: string;
    installPath: string;
    command: string;
    description: string;
  };
  installType: {
    name: string;
    git: string;
    local: string;
  };
  install: {
    title: string;
    pushedAt: string;
    updatedAt: string;
  };
  settings: {
    title: string;
    installSource: string;
    tips: {
      installSource: string;
    };
  };
  status: {
    label: {
      installing: string;
      stopped: string;
      running: string;
      error: string;
      unknown: string;
      installed: string;
    };
    tooltip: {
      installing: string;
      stopped: string;
      running: string;
      error: string;
      unknown: string;
      installed: string;
    };
    nodes: {
      tooltip: {
        installing: string;
        stopped: string;
        running: string;
        error: string;
        unknown: string;
      }
    }
  };
}
