const schedules: LViewsSchedules = {
  table: {
    columns: {
      name: 'Name',
      spider: 'Spider',
      mode: 'Mode',
      cron: 'Cron Expression',
      enabled: 'Enabled',
      entryId: 'Entry ID',
      description: 'Description',
    }
  },
  navActions: {
    new: {
      label: 'New Schedule',
      tooltip: 'Create a new schedule',
    },
    filter: {
      search: {
        placeholder: 'Search schedules',
      }
    }
  }
};

export default schedules;
