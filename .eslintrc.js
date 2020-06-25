module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2020: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    ecmaFeatures: { jsx: true },
    project: "./tsconfig.json",
    tsconfigRootDir: "./"
  },
  plugins: ["@typescript-eslint", "react", "prettier", "import"],
  extends: [
    "airbnb",
    "plugin:@typescript-eslint/recommended",
    "import",
    "plugin:react/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",

    "plugin:jsx-a11y/recommended",

    // Prettier plugin and recommended rules
    "plugin:prettier/recommended",
    "prettier",
    "prettier/@typescript-eslint",
    "prettier/react",
  ],
  rules: {
    "react/jsx-filename-extension": [1, { extensions: [".ts", ".tsx"] }],
    // "import/extensions": "off",
    "import/no-unresolved": "error",
    "react/prop-types": "off",
    "react/jsx-props-no-spreading": ["error", { custom: "ignore" }],
    // Include .prettierrc.js rules
    "prettier/prettier": ["error" /* , {}, { usePrettierrc: true } */],
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
