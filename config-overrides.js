const { addWebpackAlias } = require('customize-cra');
const path = require('path');

module.exports = function override(config, env) {
  return addWebpackAlias({
    '@components': path.resolve(__dirname, 'src/components'),
    '@services': path.resolve(__dirname, 'src/services'),
  })(config);
};
