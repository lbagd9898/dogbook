// jest.config.cjs
module.exports = {
  testEnvironment: "jest-environment-jsdom", // simulates a browser environment
  transform: {
    "^.+\\.jsx?$": "babel-jest", // use babel-jest for .js/.jsx files
  },
  moduleFileExtensions: ["js", "jsx"],
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"], // optional RTL matchers
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "\\.(svg|png|jpg|jpeg|gif|webp)$": "<rootDir>/__mocks__/fileMock.js",
  },
};
