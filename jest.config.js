/** @type {import('jest').Config} */
import './__mocks__/importMetaMock.js';
export default {
  verbose: true,
  preset: "ts-jest",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.tsx?$": ["ts-jest", { isolatedModules: true }],
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': '<rootDir>/__mocks__/styleMock.js',
    "^~/(.+)": "<rootDir>/src/$1",
  },
//   setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
};
