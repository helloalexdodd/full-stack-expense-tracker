module.exports = {
  extends: ['airbnb', 'plugin:prettier/recommended'],
  env: {
    commonjs: true,
    es6: true,
    jest: true,
    node: true,
  },
  plugins: ['prettier', 'no-loops'],
  rules: {
    'prettier/prettier': ['error'],
    'no-underscore-dangle': [2, { allow: ['_id'] }],
    'object-curly-newline': 'off',
    'consistent-return': 0,
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['controllers', './lib/controllers'],
          ['models', './lib/models'],
          ['middleware', './lib/middleware'],
          ['routes', './lib/routes'],
          ['logger', './logger'],
        ],
      },
    },
  },
};
