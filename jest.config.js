export default {
    preset: 'ts-jest/presets/default-esm',
    testEnvironment: 'jest-environment-jsdom',
    extensionsToTreatAsEsm: ['.ts'],
    transform: {
      '^.+\\.tsx?$': ['ts-jest', { useESM: true }],
    },
    moduleNameMapper: {
      '^(\\.{1,2}/.*)\\.js$': '$1',
      '\\.(css|scss|sass|less)$': 'identity-obj-proxy', // Add this line
    },
  };