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
    clear: 'Clear',
    apply: 'Apply',
    search: 'Search',
    install: 'Install',
    viewLogs: 'View Logs',
    viewData: 'View Data',
    viewFiles: 'View Files',
    uploadFiles: 'Upload Files',
  },
  messageBox: {
    confirm: {
      delete: 'Are you sure to delete?',
      restart: 'Are you sure to restart?',
      cancel: 'Are you sure to cancel?',
      stop: 'Are you sure to stop?',
      install: 'Are you sure to install?',
      start: 'Are you sure to start?',
      deleteSelected: 'Are you sure to delete selected items?',
    }
  },
  message: {
    success: {
      delete: 'Deleted successfully',
      restart: 'Restarted successfully',
      copy: 'Copied successfully',
      start: 'Started successfully',
      save: 'Saved successfully',
      upload: 'Uploaded successfully',
    },
    info: {
      cancel: 'Attempt to cancel',
      stop: 'Attempt to stop',
    },
    error: {
      login: 'Login failed',
    },
  },
  notification: {
    loggedOut: 'You have been logged-out, please login again.'
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
    currentlyUnavailable: 'Currently unavailable',
    unauthorized: 'Unauthorized',
  },
  mode: {
    default: 'Default',
  },
  placeholder: {
    empty: 'Empty',
  },
};

export default common;
