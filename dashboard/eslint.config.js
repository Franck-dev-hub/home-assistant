import js from "@eslint/js";
import globals from "globals";
import vue from "eslint-plugin-vue";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{js,mjs,vue}"],
    extends: [
      js.configs.recommended,
      vue.configs["flat/recommended"],
    ],
    languageOptions: {
      ecmaVersion: "latest",
      globals: globals.browser,
      sourceType: "module",
    },
    rules: {
      "no-unused-vars": ["error", { varsIgnorePattern: "^[A-Z_]" }],
      "quotes": ["error", "double"],
      "semi": ["error", "always"],
      "vue/multi-word-component-names": "off",
    },
  },
]);