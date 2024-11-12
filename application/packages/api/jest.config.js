/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+.tsx?$": ["ts-jest", {}],
  },
  collectCoverageFrom: ["src/**/*.ts"],
  coveragePathIgnorePatterns: ["/src/index.ts", "/src/__tests__/"],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: -5,
    },
  },
  modulePathIgnorePatterns: ["<rootDir>/src/__tests__/"],
};
