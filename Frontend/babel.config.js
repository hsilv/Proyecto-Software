/* eslint-disable no-undef */
module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    '@babel/preset-react',
    '@babel/preset-modules',
  ],
  plugins: [
    ["@babel/plugin-proposal-decorators", { "decoratorsBeforeExport": true }],
  ]
};
