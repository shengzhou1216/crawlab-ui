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
  },
  messageBox: {
    confirm: {
      delete: 'Are you sure to delete?',
      restart: 'Are you sure to restart?',
      cancel: 'Are you sure to cancel?',
    }
  },
  message: {
    success: {
      restart: 'Restarted successfully',
    },
    info: {
      cancel: 'Attempt to cancel'
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
  }
};

export default common;
