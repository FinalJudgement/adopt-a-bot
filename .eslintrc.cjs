module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
  ],
  ignorePatterns: [
    "dist",
    ".eslintrc.cjs",
    "index.cjs",
    "/db/client.cjs",
    "/db/customer_robots.cjs",
    "/db/customers.cjs",
    "/db/index.cjs",
    "/db/robot_stasks.cjs",
    "/db/robots.cjs",
    "/db/seed.cjs",
    "/db/tasks.cjs",
  ],
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  settings: { react: { version: "18.2" } },
  plugins: ["react-refresh"],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
  },
};
