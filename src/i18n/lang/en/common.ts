const common: LCommon = {
  control: {
    enabled: 'Enabled',
    disabled: 'Disabled',
  },
  actions: {
    view: 'View',
    edit: 'Edit',
    clone: 'Clone',
    delete: 'Delete',
    run: 'Run',
    add: 'Add',
    bookmark: 'Bookmark',
    restart: 'Restart',
    cancel: 'Cancel',
    confirm: 'Confirm',
    copy: 'Copy',
    create: 'Create',
    hide: 'Hide',
    start: 'Start',
    stop: 'Stop',
  },
  messageBox: {
    confirm: {
      delete: 'Are you sure to delete?',
      restart: 'Are you sure to restart?',
      cancel: 'Are you sure to cancel?',
      stop: 'Are you sure to stop?',
    }
  },
  message: {
    success: {
      delete: 'Deleted successfully',
      restart: 'Restarted successfully',
      copy: 'Copied successfully',
      start: 'Started successfully',
    },
    info: {
      cancel: 'Attempt to cancel',
      stop: 'Attempt to stop',
    }
  },
  tabs: {
    overview: 'Overview',
    spiders: 'Spiders',
    schedules: 'Schedules',
    tasks: 'Tasks',
    files: 'Files',
    git: 'Git',
    data: 'Data',
    settings: 'Settings',
    logs: 'Logs',
  },
  status: {
    unassigned: 'Unassigned',
    unknown: 'Unknown',
    invalid: 'Invalid',
  },
};

export default common;
