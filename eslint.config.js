const js = require('@eslint/js');
const globals = require('globals');

module.exports = [
  {
    ignores: ['node_modules/**', 'cypress/evidence/**', 'cypress/reports/**']
  },
  js.configs.recommended,
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.mocha,
        assert: 'readonly',
        chai: 'readonly',
        cy: 'readonly',
        Cypress: 'readonly',
        expect: 'readonly'
      }
    },
    rules: {
      'no-console': 'warn'
    }
  }
];
