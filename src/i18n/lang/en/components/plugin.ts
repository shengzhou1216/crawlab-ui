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
  install: {
    title: 'Install Plugin',
    pushedAt: 'Pushed At',
    updatedAt: 'Updated At',
  },
  settings: {
    title: 'Settings',
    installSource: 'Install Source',
    tips: {
      installSource: 'You can select Install Source as "Gitee" to speed up plugin installation if you are in Mainland China.'
    }
  },
  status: {
    label: {
      installing: 'Installing',
      stopped: 'Stopped',
      running: 'Running',
      error: 'Error',
      unknown: 'Unknown',
      installed: 'Installed',
    },
    tooltip: {
      installing: 'Installing plugin',
      stopped: 'Plugin is stopped',
      running: 'Plugin is currently running',
      error: 'Plugin stopped with an error',
      unknown: 'Unknown plugin status',
      installed: 'Plugin is already installed',
    },
    nodes: {
      tooltip: {
        installing: 'Installing Nodes',
        stopped: 'Stopped Nodes',
        running: 'Running Nodes',
        error: 'Error Nodes',
        unknown: 'Unknown Nodes',
      }
    }
  },
};

export default plugin;
