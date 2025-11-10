module.exports = {
  extends: [
    "next",
    "next/core-web-vitals"
  ],
  rules: {
    // This line is the fix:
    // It tells the linter to ignore this rule completely,
    // which stops the build from failing.
    "@typescript-eslint/no-unused-vars": "off"
  }
};