const task: LComponentsTask = {
  status: {
    label: {
      pending: '待定',
      running: '运行中',
      finished: '已完成',
      error: '错误',
      cancelled: '已取消',
      abnormal: '异常',
      unknown: '未知',
    },
    tooltip: {
      pending: '任务正在队列中待定',
      running: '任务正在运行',
      finished: '任务已成功完成',
      error: '任务发生错误:',
      cancelled: '任务已被取消',
      abnormal: '任务异常终止',
      unknown: '未知任务状态',
    },
  },
};

export default task;
