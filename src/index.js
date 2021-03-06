import http from 'http';

let app = require('./server').default;

const server = http.createServer(app);

let currentApp = app;

const serverPort = process.env.PORT || 3000;
console.log(serverPort);

server.listen(serverPort, '0.0.0.0', error => {
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
