module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    "node": true
  },
  // "extends": ["standard", "plugin:vue/recommended"],
  "extends": ["bitpower"],
  "plugins":[
    "html"
  ],
  parser: "vue-eslint-parser",
  "parserOptions": {
    "parser": "babel-eslint",
    "ecmaVersion": 2018,
    "sourceType": "module",
    "ecmaFeatures": {
      globalReturn: false,
      impliedStrict: true,
      "jsx": true
    }
  },
  "rules": {
    // "semi": "off",
    "no-return-await": "off",
    // "import/no-unresolved": "warn",
    "vue/no-parsing-error": [2, { "x-invalid-end-tag": false }],
    "no-param-reassign": "off",
    "max-len": ["warn", {
      "code": 200,
      "ignoreComments": true,
    }],
    "no-debugger": "off",
    'prefer-destructuring': 'off',
    'prefer-template': 'off',
    'prefer-const': 'off',
    'object-shorthand': 'off',
    'consistent-return': 'off',
    'no-continue': 'off',
    'object-curly-newline': 'off',
    'global-require': 'off',
    'vue/require-component-is': 'off'
    // 'no-param-reassign': 'off',
    // 'brace-style': 'off',
    // "no-return-await": "off"
  }
}