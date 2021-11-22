import {LocaleMessageDictionary} from '@intlify/core-base';
import {VueMessageType} from 'vue-i18n';

declare global {
  interface Messages extends LocaleMessageDictionary<VueMessageType> {
    global: {
      lang: string;
      community: string;
    };
    common: {
      control: {
        enabled: string;
        disabled: string;
      };
      actions: {
        delete: string;
      };
      messageBox: {
        message: {
          delete: string;
        };
      };
    };
    views: {
      login: {
        loginForm: {
          username: string;
          password: string;
          confirmPassword: string;
          email: string;
          signUp: string;
          signIn: string;
        };
        forgotPassword: {
          label: string;
          content: string;
        };
        initial: {
          title: string;
        };
        documentation: string;
        mobile: {
          warning: string;
        };
        errors: {
          incorrectUsername: string;
          passwordLength: string;
          passwordSame: string;
          unauthorized: string;
        };
      };
      home: {
        metrics: {
          nodes: string;
          projects: string;
          spiders: string;
          schedules: string;
          tasks: string;
          error_tasks: string;
          results: string;
          users: string;
        };
        dailyConfig: {
          title: string;
        };
        tasksByStatusConfig: {
          title: string;
        };
        tasksByNodeConfig: {
          title: string;
        };
        tasksBySpiderConfig: {
          title: string;
        };
      };
      nodes: {
        table: {
          columns: {
            name: string;
            nodeType: string;
            status: string;
            ip: string;
            mac: string;
            hostname: string;
            runners: string;
            enabled: string;
            tags: string;
            description: string;
          };
        };
      };
    };
    layouts: {
      components: {
        header: {
          logout: string;
        };
      };
    };
    components: {
      chart: {
        pieChart: {
          noDataAvailable: string;
        };
      };
      table: {
        columns: {
          actions: string;
        };
      };
      node: {
        nodeType: {
          master: string;
          worker: string;
        };
        nodeStatus: {
          label: {
            unregistered: string;
            registered: string;
            online: string;
            offline: string;
            unknown: string;
          };
          tooltip: {
            unregistered: string;
            registered: string;
            online: string;
            offline: string;
            unknown: string;
          };
        };
        nodeRunners: {
          tooltip: {
            unavailable: string;
            running: string;
            available: string;
          };
        };
      };
    };
    router: {
      menuItems: {
        home: string;
        nodes: string;
        projects: string;
        spiders: string;
        schedules: string;
        tasks: string;
        users: string;
        tags: string;
        tokens: string;
        plugins: string;
      };
    };
  }
}
