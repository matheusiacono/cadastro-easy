module.exports = {
  extends: 'airbnb-base',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['react'],
  rules: {
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
  },
  settings: {
    react: { pragma: 'createVNode' },
  },
  env: {
    jest: true,
  },
  globals: {
    document: true,
    window: true,
  },
};
