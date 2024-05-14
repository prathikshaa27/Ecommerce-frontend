const { addWebpackAlias } = require('customize-cra');
const path = require('path');

module.exports = function override(config, env) {
  return addWebpackAlias({
    '@components': path.resolve(__dirname, 'src/components'),
    '@product': path.resolve(__dirname, 'src/products'),
    '@services': path.resolve(__dirname, 'src/services'),
    '@users': path.resolve(__dirname, 'src/users'),

  })(config);
};
