module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2020: true,
    es6: true,
    jest: true
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    ecmaFeatures: { jsx: true, impliedStrict: true, },
    project: "./tsconfig.json",
    tsconfigRootDir: "./"
  },
  plugins: ["@typescript-eslint", "react", "prettier", "import"],
  extends: [
    "airbnb",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "plugin:jsx-a11y/recommended",

    "plugin:prettier/recommended",
    "prettier",
    "prettier/@typescript-eslint",
    "prettier/react",
  ],
  rules: {
    "react/jsx-filename-extension": [1, { extensions: [".ts", ".tsx"] }],
    "import/no-unresolved": "error",
    "react/prop-types": "off",
    "react/jsx-props-no-spreading": ["error", { custom: "ignore" }]
  },
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"]
    },
    "import/resolver": {
      typescript: {
        alwaysTryTypes: false,
        directory: '.'
      }
    },
  },
};
