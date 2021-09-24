module.exports = {
  preset: 'ts-jest',
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': '<rootDir>/.storybook/__mocks__/styleMock.js',
  },
  testEnvironment: 'jsdom',
  transform: {
    // transform files with ts-jest
    '^.+\\.(js|ts)$': 'ts-jest',
  },
  testPathIgnorePatterns: ['/cypress/'],
  transformIgnorePatterns: [
    // allow lit-html transformation
    'node_modules/(?!lit-html)',
  ],
  globals: {
    'ts-jest': {
      tsconfig: {
        // allow js in typescript
        allowJs: true,
      },
    },
  },
};
