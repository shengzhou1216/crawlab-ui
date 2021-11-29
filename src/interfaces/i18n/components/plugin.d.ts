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
  settings: {
    title: string;
    installSource: string;
    tips: {
      installSource: string;
    };
  };
}
