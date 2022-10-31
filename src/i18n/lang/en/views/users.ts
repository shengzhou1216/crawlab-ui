const users: LViewsUsers = {
  table: {
    columns: {
      username: 'Username',
      email: 'Email',
      role: 'Role',
    }
  },
  navActions: {
    new: {
      label: 'New User',
      tooltip: 'Create a new user',
    },
    filter: {
      search: {
        placeholder: 'Search users',
      }
    }
  }
};

export default users;
