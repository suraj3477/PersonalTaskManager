module.exports = {
  preset: 'jest-expo',
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  transform: {
    "^.+\\.[tj]sx?$": "babel-jest",
  },
  transformIgnorePatterns: [
    "node_modules/(?!react-native|my-project|react-native-button|@react-native|uuid-random)",
  ],
  testPathIgnorePatterns: [
    "/node_modules/",
    "/android/",
    "/ios/"
  ],
};
