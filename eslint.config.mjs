import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParserPkg from "@typescript-eslint/parser"; // Default import

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs}"], // Apply the rule for all JS and TS files
    languageOptions: {
      globals: {
        ...globals.browser, // Browser globals
        process: "readonly", // Define 'process' as a global for Node.js
        jest: "readonly", // Define 'jest' as a global for Jest testing
        describe: "readonly", // Define 'describe' as a global for Jest testing
        it: "readonly", // Define 'it' as a global for Jest testing
        expect: "readonly", // Define 'expect' as a global for Jest testing
      },
      parser: tsParserPkg.parser, // Use the TypeScript parser for TS files
    },
    plugins: {
      "@typescript-eslint": tseslint, // Enable TypeScript plugin
    },
    rules: {
      // JavaScript recommended rules
      ...pluginJs.configs.recommended.rules,

      // TypeScript recommended rules
      ...tseslint.configs.recommended.rules,

      // Custom rules (if needed)
      "@typescript-eslint/no-explicit-any": "off", // Example of turning off a rule
    },
  },
];
