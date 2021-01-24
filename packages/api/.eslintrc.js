module.exports = {
  extends: require.resolve('@blabla/scripts/eslint/base'),
  ignorePatterns: ['build/**'],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.ts', '.tsx', '.d.ts'],
        paths: ['src'],
      },
    },
  },
}
