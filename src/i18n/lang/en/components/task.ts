const task: LComponentsTask = {
  status: {
    label: {
      pending: 'Pending',
      running: 'Running',
      finished: 'Finished',
      error: 'Error',
      cancelled: 'Cancelled',
      abnormal: 'Abnormal',
      unknown: 'Unknown',
    },
    tooltip: {
      pending: 'Task is pending in the queue',
      running: 'Task is currently running',
      finished: 'Task finished successfully',
      error: 'Task ended with an error:',
      cancelled: 'Task has been cancelled',
      abnormal: 'Task ended abnormally',
      unknown: 'Unknown task status',
    },
  },
};

export default task;
