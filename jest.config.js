module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  testEnvironment: 'node',
  testRegex: '.*\\.spec\\.ts$', // Testes unitários usam o sufixo .spec.ts
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
  },
  collectCoverage: false, // Para gerar relatórios de cobertura de código
  coverageDirectory: './coverage',
  coveragePathIgnorePatterns: ['/node_modules/'],
};
