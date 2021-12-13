const common: LCommon = {
  control: {
    enabled: '已启用',
    disabled: '已禁用',
  },
  actions: {
    view: '查看',
    edit: '编辑',
    clone: '复制',
    delete: '删除',
    run: '运行',
    add: '添加',
    bookmark: '添加书签',
    restart: '重新运行',
    cancel: '取消',
    confirm: '确认',
    copy: '复制',
    create: '创建',
    hide: '隐藏',
    start: '启动',
    stop: '停止',
    clear: '清除',
    apply: '应用',
    search: '搜索',
  },
  messageBox: {
    confirm: {
      delete: '您是否确定删除?',
      restart: '您是否确定重新运行?',
      cancel: '您是否确定取消?',
      stop: '您是否确定停止?',
    }
  },
  message: {
    success: {
      delete: '删除成功',
      restart: '重新运行成功',
      copy: '复制成功',
      start: '启动成功',
      save: '保存成功',
    },
    info: {
      cancel: '尝试取消',
      stop: '尝试停止',
    }
  },
  tabs: {
    overview: '概览',
    spiders: '爬虫',
    schedules: '定时任务',
    tasks: '任务',
    files: '文件',
    git: 'Git',
    data: '数据',
    settings: '设置',
    logs: '日志',
  },
  status: {
    unassigned: '未指定',
    unknown: '未知',
    invalid: '无效',
  },
};

export default common;
