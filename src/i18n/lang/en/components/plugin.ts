const plugin: LComponentsPlugin = {
  form: {
    installType: 'Install Type',
    autoStart: 'Auto Start',
    name: 'Name',
    installUrl: 'Install URL',
    installPath: 'Install Path',
    command: 'Command',
    description: 'Description',
  },
  installType: {
    name: 'Name',
    git: 'Git',
    local: 'Local'
  },
  settings: {
    title: 'Settings',
    installSource: 'Install Source',
    tips: {
      installSource: 'You can select Install Source as "Gitee" to speed up plugin installation if you are in Mainland China.'
    }
  },
};

export default plugin;
