const legacy = {
  // 内容
  addNodeInstruction: `
You cannot add nodes directly on the web interface in Crawlab.

Adding a node is quite simple. The only thing you have to do is to run a Crawlab service on your target machine.

For details, please refer to the [Multi-Node Deployment Documentation](https://docs.crawlab.cn/Installation/MultiNode.html).
`,
  auth: {
    loginExpiredMessage: 'You have been logged out, you can cancel to stay on this page, or log in again',
    loginExpiredTitle: 'Confirm logout',
    loginExpiredConfirm: 'Confirm',
    loginExpiredCancel: 'Cancel'
  },
};

const messages: Messages = {
  global: {
    lang: 'English',
    community: 'Community',
  },
  common: {
    control: {
      enabled: 'Enabled',
      disabled: 'Disabled',
    },
    actions: {
      delete: 'Delete',
    },
    messageBox: {
      message: {
        delete: 'Are you sure to delete?'
      }
    }
  },
  views: {
    login: {
      loginForm: {
        username: 'Username',
        password: 'Password',
        confirmPassword: 'Confirm Password',
        email: 'Email',
        signUp: 'Sign Up',
        signIn: 'Sign In',
      },
      forgotPassword: {
        label: 'Forgot Password',
        content: 'Please follow the Reset Password section in the documentation',
      },
      initial: {
        title: 'Initial Username/Password',
      },
      documentation: 'Documentation',
      mobile: {
        warning: 'You are running on a mobile device, which is not optimized yet. Please try with a laptop or desktop.'
      },
      errors: {
        incorrectUsername: 'Please enter the correct username',
        passwordLength: 'Password length should be no shorter than 5',
        passwordSame: 'Two passwords must be the same',
        unauthorized: 'Unauthorized. Please check username and password.',
      }
    },
    home: {
      metrics: {
        nodes: 'Active Nodes',
        projects: 'Projects',
        spiders: 'Spiders',
        schedules: 'Schedules',
        tasks: 'Total Tasks',
        error_tasks: 'Error Tasks',
        results: 'Total Results',
        users: 'Users',
      },
      dailyConfig: {
        title: 'Daily Stats',
      },
      tasksByStatusConfig: {
        title: 'Tasks by Status',
      },
      tasksByNodeConfig: {
        title: 'Tasks by Node',
      },
      tasksBySpiderConfig: {
        title: 'Tasks by Spider',
      }
    },
    nodes: {
      table: {
        columns: {
          name: 'Name',
          nodeType: 'Node Type',
          status: 'Status',
          ip: 'IP',
          mac: 'MAC Address',
          hostname: 'Hostname',
          runners: 'Runners',
          enabled: 'Enabled',
          tags: 'Tags',
          description: 'Description',
        }
      },
    }
  },
  layouts: {
    components: {
      header: {
        logout: 'Logout',
      }
    }
  },
  components: {
    chart: {
      pieChart: {
        noDataAvailable: 'No Data Available',
      }
    },
    table: {
      columns: {
        actions: 'Actions',
      }
    },
    node: {
      nodeType: {
        master: 'Master',
        worker: 'Worker'
      },
      nodeStatus: {
        label: {
          unregistered: 'Unregistered',
          registered: 'Registered',
          online: 'Online',
          offline: 'Offline',
          unknown: 'Unknown',
        },
        tooltip: {
          unregistered: 'Node is waiting to be registered',
          registered: 'Node is registered and wait to be online',
          online: 'Node is currently online',
          offline: 'Node is currently offline',
          unknown: 'Unknown node status',
        }
      },
      nodeRunners: {
        tooltip: {
          unavailable: 'No runners available at this moment',
          running: '{running} out of {max} runners are running',
          available: 'All runners available',
        },
      }
    }
  },
  router: {
    menuItems: {
      home: 'Home',
      nodes: 'Nodes',
      projects: 'Projects',
      spiders: 'Spiders',
      schedules: 'Schedules',
      tasks: 'Tasks',
      users: 'Users',
      tags: 'Tags',
      tokens: 'Tokens',
      plugins: 'Plugins',
    }
  }
};

export default messages;
