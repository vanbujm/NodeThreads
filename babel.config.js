// Babel configuration
// https://babeljs.io/docs/usage/api/
module.exports = {
  presets: [
    '@babel/env',
  ],
  plugins: [
    ["@babel/plugin-proposal-decorators", { "legacy": true }],
    "@babel/plugin-proposal-function-sent",
    "@babel/plugin-proposal-export-namespace-from",
    "@babel/plugin-proposal-numeric-separator",
    "@babel/plugin-proposal-throw-expressions",

    // Stage 3
    "@babel/plugin-syntax-dynamic-import",
    "@babel/plugin-syntax-import-meta",
    ["@babel/plugin-proposal-class-properties", { "loose": false }],
    "@babel/plugin-proposal-json-strings"
  ],
  ignore: ['node_modules', 'out', '*-compiled.js'],
};