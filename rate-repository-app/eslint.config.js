// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require("eslint-config-expo/flat");
const jest = require('eslint-plugin-jest');

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ["dist/*"],
  },
  {
    files: ['**/*.test.{js,jsx}'],
    ...jest.configs['flat/recommended'],
  },
]);
