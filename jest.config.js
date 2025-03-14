export default {
  transform: {
    '^.+\\.(ts|tsx)$': 'babel-jest',
    '^.+\\.css$': 'jest-transform-css',
  },
  testEnvironment: 'jest-environment-jsdom',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
};