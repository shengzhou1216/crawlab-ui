import {createApp} from '@/package';

createApp({
  initDemo: process.env.VUE_APP_DEMO === '1',
})
  .then(app => {
    window._app = app;
  });
