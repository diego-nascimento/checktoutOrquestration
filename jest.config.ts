
export default {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  roots: ['<rootDir>/src'],
  transform: {
    '\\.ts': 'ts-jest'
  },
  preset: 'ts-jest',
  moduleDirectories: ['node_modules', 'src']
}
