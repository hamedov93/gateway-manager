module.exports = {
  testEnvironment: 'node',
  testEnvironmentOptions: {
    NODE_ENV: 'test',
  },
  restoreMocks: true,
  coveragePathIgnorePatterns: ['node_modules', 'app/config', 'app/index.js', 'tests', 'ui'],
  coverageReporters: ['text', 'lcov', 'clover', 'html'],
  moduleNameMapper: {
    '^@root(.*)$': '<rootDir>$1',
    '^@app(.*)$': '<rootDir>/app$1',
    '^@models(.*)$': '<rootDir>/app/models$1',
    '^@services(.*)$': '<rootDir>/app/services$1',
  },
};
