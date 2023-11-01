module.exports = {
  apps: [{
    name: 'CookApp',
    script: 'index.js',
    env_production: {
      NODE_ENV: 'production',
    },
    env: {
      NODE_ENV: 'production',
    },
  }],
};
