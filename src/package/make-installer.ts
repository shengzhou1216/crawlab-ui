import type {App, Plugin} from 'vue';

const makeInstaller = (items: [string, Plugin][] = []) => {
  const apps: App[] = [];

  const install = (app: App) => {
    if (apps.includes(app)) return;
    apps.push(app);

    items.forEach(([name, component]) => {
      component.install = (app: App) => {
        app.component(`${name}`, component);
      };
    });
  };

  return {
    install,
  };
};

export default makeInstaller;
