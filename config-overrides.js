const path = require('path');
const environment = process.env.NODE_ENV || 'development';

module.exports = function override(config) {
  config.resolve = {
    ...config.resolve,
    alias: { AppConfig: path.join(__dirname, `/src/config/${environment}.js`) },
  };

  return config;
};
