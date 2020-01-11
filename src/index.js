import http from 'http';

let app = require('./server').default;

const server = http.createServer(app);

let currentApp = app;

const env = process.env.NODE_ENV || 'dev';
const serverPort = process.env.PORT || 3000;
const serverHost = env === 'production' ? '0.0.0.0' : 'localhost';

server.listen(serverPort, serverHost, error => {
  if (error) {
    console.log(error);
  }

  console.log('🚀 started');

  if (process.send) {
    process.send('ready');
  }
});

if (module.hot) {
  console.log('✅  Server-side HMR Enabled!');

  module.hot.accept('./server', () => {
    console.log('🔁  HMR Reloading `./server`...');

    try {
      app = require('./server').default;
      server.removeListener('request', currentApp);
      server.on('request', app);
      currentApp = app;
    } catch (error) {
      console.error(error);
    }
  });
}
