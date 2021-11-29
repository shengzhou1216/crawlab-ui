const plugin: LComponentsPlugin = {
  form: {
    installType: '安装类别',
    autoStart: '自动开始',
    name: '名称',
    installUrl: '安装 URL',
    installPath: '安装路径',
    command: '命令',
    description: '描述',
  },
  installType: {
    name: '名称',
    git: 'Git',
    local: '本地'
  },
  settings: {
    title: '设置',
    installSource: '安装源',
    tips: {
      installSource: '如果您在中国内地，您可以选择安装源为 "Gitee" 来加速插件安装过程'
    }
  },
};

export default plugin;
