const nextJest = require("next/jest");

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files
  dir: "./",
});

const customJestConfig = {
  // Setup file that runs before each test file
  setupFilesAfterEnv: ["./jest.setup.ts"],
  // Adjust module alias mapping if needed
  moduleNameMapper: {
    "^@/components/(.*)$": "./components/$1",
  },
  // Specify the test environment that will be used for testing
  testEnvironment: "jest-environment-jsdom",
};

module.exports = createJestConfig(customJestConfig);
