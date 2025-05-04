const {
    defineConfig,
} = require("eslint/config");

const tsParser = require("@typescript-eslint/parser");
const globals = require("globals");
const prettier = require("eslint-plugin-prettier");
const _import = require("eslint-plugin-import");

const {
    fixupPluginRules,
    fixupConfigRules,
} = require("@eslint/compat");

const js = require("@eslint/js");

const {
    FlatCompat,
} = require("@eslint/eslintrc");

const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

module.exports = defineConfig([{
    languageOptions: {
        parser: tsParser,
        ecmaVersion: 2018,
        sourceType: "module",
        parserOptions: {},

        globals: {
            ...globals.node,
        },
    },

    plugins: {
        import: fixupPluginRules(_import),
    },

    extends: fixupConfigRules(compat.extends(
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:prettier/recommended",
        "plugin:import/recommended",
        "plugin:import/typescript",
    )),

    rules: {
        "prettier/prettier": "warn",
        "@typescript-eslint/no-explicit-any": "warn",
        "@typescript-eslint/no-unused-vars": "warn",
        "no-console": "error",
        "no-nested-ternary": "error",
        "max-depth": ["error", 3],
        "max-params": ["error", 6],
        complexity: ["error", 7],

        "@typescript-eslint/explicit-function-return-type": ["error", {
            allowedNames: ["*.controller*"],
        }],

        "sort-imports": ["error", {
            ignoreCase: false,
            ignoreDeclarationSort: true,
            ignoreMemberSort: false,
            memberSyntaxSortOrder: ["none", "all", "multiple", "single"],
            allowSeparatedGroups: true,
        }],

        "import/no-unresolved": "error",

        "import/order": ["error", {
            groups: [
                "builtin",
                "external",
                "internal",
                ["sibling", "parent"],
                "index",
                "unknown",
            ],

            "newlines-between": "always",
        }],
    },

    settings: {
        "import/resolver": {
            typescript: {
                project: "./tsconfig.json",
            },
        },
    },
}, {
    files: ["**/*controller.ts", "**/*controller.js"],

    rules: {
        "@typescript-eslint/explicit-function-return-type": "off",
    },
}, {
    files: ["**/index.ts"],

    rules: {
        "eol-last": "off",
    },
}]);