module.exports = {
  stories: ['./../packages/component/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: '@storybook/web-components',
  core: {
    builder: 'webpack5',
  },
};
