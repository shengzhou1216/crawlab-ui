const git: LComponentsGit = {
  form: {
    remoteUrl: '远程 URL',
    authType: '验证类型',
    username: '用户名',
    password: '密码',
    privateKey: '私钥',
  },
  common: {
    currentBranch: '当前分支',
  },
  actions: {
    title: 'Git 操作',
    label: {
      pull: '拉取',
      commit: '提交',
      checkout: '签出',
    },
    tooltip: {
      pull: '拉取',
      commit: '拉取并推送',
      checkout: '签出',
    },
  },
  tabs: {
    remote: '远程',
    references: '引用',
    logs: '日志',
    changes: '变更',
    ignore: '忽略',
  },
  checkout: {
    type: '类别',
    reference: '引用',
  },
  references: {
    type: {
      branch: '分支',
      tag: '标签',
    },
    table: {
      columns: {
        timestamp: '时间戳',
      }
    }
  },
  logs: {
    table: {
      columns: {
        reference: '引用',
        commitMessage: '提交信息',
        author: '作者',
        timestamp: '时间戳',
      }
    }
  },
  changes: {
    status: {
      untracked: '未跟踪',
      modified: '更新',
      added: '添加',
      deleted: '删除',
      renamed: '重命名',
      copied: '复制',
      updatedButUnmerged: '更新但未合并',
    },
    table: {
      columns: {
        changedFile: '变更文件',
        status: '状态',
      }
    }
  },
  ignore: {
    table: {
      columns: {
        file: '文件',
      }
    }
  }
};

export default git;
