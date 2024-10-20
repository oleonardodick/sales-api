module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  testEnvironment: 'node',
  testRegex: '\\.e2e\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
  },
  collectCoverage: false, // Para gerar relatórios de cobertura de código
  coverageDirectory: './coverage',
  coveragePathIgnorePatterns: ['/node_modules/'],
  globalSetup: '<rootDir>/test/testSetup.ts',
  globalTeardown: '<rootDir>/test/testTeardown.ts',
};

//   "globalSetup": "<rootDir>/test/testSetup.ts",
//   "globalTeardown": "<rootDir>/test/testTeardown.ts"
