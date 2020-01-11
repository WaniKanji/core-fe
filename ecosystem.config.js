const instances = process.env.WEB_CONCURRENCY || 2;
const maxMemory = process.env.WEB_MEMORY || 512;

console.log(`Starting server with ${instances} instances.`);
console.log(`You should see ${instances} random numbers logged.`);

module.exports = {
  apps: [
    {
      name: 'wanikanji-fe',
      instances,
      exec_mode: 'cluster',
      script: './build/server.js',
      wait_ready: true,
      listen_timeout: 3000,
      kill_timeout: 1600,
      max_memory_restart: `${maxMemory / instances - 100}M`,
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};
