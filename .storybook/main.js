const path = require('path');

module.exports = {
  stories: ['./../packages/component/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-storysource',
    '@storybook/addon-controls',
  ],
  babel: async (options) => ({
    plugins: [['@babel/plugin-proposal-decorators', { legacy: true }]],
  }),
  webpackFinal: async (config, { configType }) => {
    config.module.rules.push({
      test: /\.ts$/,
      use: ['awesome-typescript-loader'],
      include: path.resolve(__dirname, '../'),
    });
    return config;
  },
};
