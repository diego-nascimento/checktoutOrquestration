
export default {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.(t|j)sx?$': ['@swc/jest']
  },
  moduleDirectories: ['node_modules', 'src']
}
