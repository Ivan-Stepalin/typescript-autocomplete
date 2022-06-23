/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  passWithNoTests: true,
  moduleNameMapper: {
    '\\.(scss|css|jpg|png|gif)$': '<rootDir>/tests/file.mock.js'
  }
};
