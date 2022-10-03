module.exports = {
  moduleFileExtensions: ["js", "json", "ts"],
  rootDir: ".",
  testRegex: ".spec.ts$",
  transform: {
    // "^.+\\.(t|j)s$": ["ts-jest", { tsconfig: "<rootDir>/tsconfig.spec.json" }],
    "^.+\\.(t|j)s$": "babel-jest",
  },
  testEnvironment: "node",
  // resolver: "bob-the-bundler/jest-resolver.js",
};
