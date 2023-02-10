const typescript = require('@typescript-eslint/eslint-plugin');
const typescriptParser = require('@typescript-eslint/parser');
const prettierConfig = require('eslint-config-prettier');
const pluginImport = require('eslint-plugin-import');
const pluginImportConfig = require('eslint-plugin-import/config/recommended');
const prettierPlugin = require('eslint-plugin-prettier');
const globals = require('globals');

const allJsExtensions = 'js,mjs,cjs';
const allTsExtensions = 'ts,mts,cts';
const allExtensions = ['.js', '.mjs', '.cjs', '.ts', '.mts', '.cts'];

const supportedTsFileTypes = `**/*.{${allTsExtensions}}`;
const supportedFileTypes = `**/*.{${allJsExtensions},${allTsExtensions}}`;

/*
  https://eslint.org/docs/latest/use/configure/rules
  "off" or 0 - turn the rule off
  "warn" or 1 - turn the rule on as a warning (doesn’t affect exit code)
  "error" or 2 - turn the rule on as an error (exit code is 1 when triggered)
*/

/*
  I forbid you to code :)
*/

const baseRules = {
  'no-await-in-loop': 0,

  // eslint rules that not disabled by default via any config
  // use typescript-eslint version
  'no-shadow': 0,
  'no-return-await': 0, // @typescript-eslint/return-await
  'no-use-before-define': 0,
  'no-unused-expressions': 0,
  'padding-line-between-statements': 0,

  'prettier/prettier': 2, // eslint-plugin-prettier

  radix: 2,
  curly: 2,
  eqeqeq: 2,
  'default-case': 2,
  'default-case-last': 2,
  'object-shorthand': 2,
  'require-atomic-updates': 2,

  complexity: [2, 13],
  'max-depth': [2, 4],
  'max-nested-callbacks': [2, 5],
  'max-lines-per-function': [
    2,
    {
      max: 100,
      skipBlankLines: true,
      skipComments: true,
    },
  ],

  'id-match': 2,
  'id-denylist': 2,

  'no-void': ['error', { allowAsStatement: true }],
  'no-eval': 2,
  'no-alert': 2,
  'no-proto': 2,
  'no-labels': 2,
  'no-plusplus': 2,
  'no-lonely-if': 2,
  'no-multi-str': 2,
  'no-extra-bind': 2,
  'no-new-object': 2,
  'no-lone-blocks': 2,
  'no-self-compare': 2,
  'no-useless-call': 2,
  'no-multi-assign': 2,
  'no-new-wrappers': 2,
  'no-octal-escape': 2,
  'no-extend-native': 2,
  'no-nested-ternary': 2,
  'no-param-reassign': 2,
  'no-unreachable-loop': 2,
  'no-negated-condition': 2,
  'no-implicit-coercion': 2,
  'no-constructor-return': 2,
  'newline-per-chained-call': 2,
  'no-promise-executor-return': 2,
  'no-new-native-nonconstructor': 2,
  'no-unmodified-loop-condition': 2,
  'no-constant-binary-expression': 2,

  'prefer-template': 2,
  'prefer-object-spread': 2,
  'prefer-object-has-own': 2,
  'prefer-numeric-literals': 2,
  'prefer-exponentiation-operator': 2,

  'no-return-assign': [2, 'always'],

  'no-console': [
    2,
    {
      allow: ['warn', 'error', 'debug'],
    },
  ],
  'no-sequences': [
    2,
    {
      allowInParentheses: false,
    },
  ],
  'no-else-return': [
    2,
    {
      allowElseIf: false,
    },
  ],
  'no-unneeded-ternary': [
    2,
    {
      defaultAssignment: false,
    },
  ],
  'no-duplicate-imports': [
    2,
    {
      includeExports: true,
    },
  ],
  'no-restricted-syntax': [
    2,
    {
      selector: 'ForInStatement',
      message:
        'for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys, values, entries}, and iterate over the resulting array.',
    },
    {
      selector: "Identifier[name='Reflect']",
      message:
        'Avoid the Reflect API. It is a very low-level feature that has only rare and specific use-cases if building complex and hacky libraries. There is no need to use this feature for any kind of normal development',
    },
    {
      selector: "BinaryExpression[operator='in']",
      message: 'Prefer Object.hasOwn().',
    },
  ],

  'prefer-destructuring': [
    2,
    {
      array: false,
      object: true,
    },
    {
      enforceForRenamedProperties: false,
    },
  ],

  'func-style': [
    2,
    'expression',
    {
      allowArrowFunctions: true,
    },
  ],
  'spaced-comment': [
    2,
    'always',
    {
      line: {
        markers: ['/'],
        exceptions: ['-', '+', '*'],
      },
      block: {
        balanced: true,
      },
    },
  ],
  'array-callback-return': [
    2,
    {
      allowImplicit: true,
      checkForEach: true,
    },
  ],
};

const importRules = {
  'import/named': 0,
  'import/default': 0,
  'import/namespace': 0,
  'import/prefer-default-export': 0,
  'import/no-named-as-default-member': 0,

  'import/no-cycle': 2,
  'import/no-namespace': 2,
  'import/no-unresolved': 2, // eslint-import-resolver-typescript
  'import/no-empty-named-blocks': 2,

  'import/no-useless-path-segments': [
    2,
    {
      noUselessIndex: true,
    },
  ],
  'import/no-duplicates': [
    2,
    {
      'prefer-inline': true,
      considerQueryString: true,
    },
  ],
  'import/no-extraneous-dependencies': [
    2,
    {
      devDependencies: true,
    },
  ],
  'import/order': [
    2,
    {
      groups: [
        'builtin',
        'external',
        'internal',
        'parent',
        'sibling',
        'index',
        'object',
        'type',
        'unknown',
      ],
      pathGroups: [
        {
          pattern: 'webpack',
          group: 'builtin',
          position: 'after',
        },
        {
          pattern: '**webpack**',
          group: 'builtin',
          position: 'after',
        },
        {
          pattern: '@**/**webpack**',
          group: 'builtin',
          position: 'after',
        },
        {
          pattern: '@/components/**/*',
          group: 'internal',
          position: 'after',
        },
        {
          pattern: '@/uikit/**/*',
          group: 'internal',
          position: 'after',
        },
        {
          pattern: '@/assets/**/*',
          group: 'internal',
          position: 'after',
        },
        {
          pattern: './**/*.css',
          group: 'sibling',
          position: 'after',
        },
      ],
      distinctGroup: true,
      'newlines-between': 'always',
      alphabetize: {
        order: 'asc',
        orderImportKind: 'asc',
        caseInsensitive: false,
      },
    },
  ],
};

const typescriptRules = {
  // typescript-eslint/recommended rules
  '@typescript-eslint/no-explicit-any': 2, // default warn
  '@typescript-eslint/triple-slash-reference': [
    'error',
    {
      lib: 'never',
      path: 'never',
      types: 'never',
    },
  ],

  // typescript-eslint/strict rules, default warn
  '@typescript-eslint/prefer-includes': 2,
  '@typescript-eslint/no-throw-literal': 2,
  '@typescript-eslint/no-base-to-string': 2,
  '@typescript-eslint/no-dynamic-delete': 2,
  '@typescript-eslint/unified-signatures': 2,
  '@typescript-eslint/ban-tslint-comment': 2,
  '@typescript-eslint/no-extraneous-class': 2,
  '@typescript-eslint/no-invalid-void-type': 2,
  '@typescript-eslint/prefer-function-type': 2,
  '@typescript-eslint/prefer-optional-chain': 2,
  '@typescript-eslint/prefer-ts-expect-error': 2,
  '@typescript-eslint/no-unnecessary-condition': 2,
  '@typescript-eslint/consistent-type-definitions': 2,
  '@typescript-eslint/prefer-reduce-type-parameter': 2,
  '@typescript-eslint/consistent-indexed-object-style': 2,
  '@typescript-eslint/consistent-generic-constructors': 2,
  '@typescript-eslint/no-unnecessary-boolean-literal-compare': 2,
  '@typescript-eslint/array-type': [
    2,
    {
      default: 'array-simple',
    },
  ],
  '@typescript-eslint/consistent-type-assertions': [
    2,
    {
      assertionStyle: 'as',
      objectLiteralTypeAssertions: 'never',
    },
  ],
  '@typescript-eslint/prefer-nullish-coalescing': [
    2,
    {
      ignoreTernaryTests: false,
      ignoreConditionalTests: false,
      ignoreMixedLogicalExpressions: false,
    },
  ],

  // typescript-eslint/recommended-requiring-type-checking rules
  '@typescript-eslint/restrict-plus-operands': [
    2,
    {
      checkCompoundAssignments: true,
    },
  ],

  '@typescript-eslint/naming-convention': [
    2,
    {
      selector: 'default',
      format: ['strictCamelCase'],
      leadingUnderscore: 'forbid',
      trailingUnderscore: 'forbid',
    },
    {
      selector: 'variable',
      format: ['strictCamelCase', 'UPPER_CASE'],
      modifiers: ['const'],
      types: ['boolean', 'string', 'number'],
      leadingUnderscore: 'forbid',
      trailingUnderscore: 'forbid',
    },
    {
      selector: 'variable',
      types: ['boolean'],
      format: ['PascalCase'],
      prefix: ['is', 'has', 'should', 'can'],
      leadingUnderscore: 'forbid',
      trailingUnderscore: 'forbid',
    },
    {
      selector: 'variable',
      modifiers: ['destructured'],
      format: null,
    },
    {
      selector: 'objectLiteralProperty',
      format: null,
      leadingUnderscore: 'forbid',
      trailingUnderscore: 'forbid',
    },
    {
      selector: 'parameter',
      format: ['strictCamelCase'],
      leadingUnderscore: 'allow',
      trailingUnderscore: 'forbid',
    },
    {
      selector: 'typeLike',
      format: ['PascalCase'],
      leadingUnderscore: 'forbid',
      trailingUnderscore: 'forbid',
    },
  ],

  // rules not included in any configs
  '@typescript-eslint/no-redeclare': 2, // eslint version of rule disabled by eslint:recommended
  '@typescript-eslint/method-signature-style': 2,
  '@typescript-eslint/promise-function-async': 2,
  '@typescript-eslint/switch-exhaustiveness-check': 2,
  '@typescript-eslint/no-confusing-void-expression': 2,
  '@typescript-eslint/no-redundant-type-constituents': 2,
  '@typescript-eslint/explicit-module-boundary-types': 2,
  '@typescript-eslint/consistent-type-imports': [
    2,
    {
      prefer: 'type-imports',
      fixStyle: 'separate-type-imports',
    },
  ],
  '@typescript-eslint/consistent-type-exports': [
    2,
    {
      fixMixedExportsWithInlineTypeSpecifier: true,
    },
  ],
  '@typescript-eslint/strict-boolean-expressions': [
    2,
    {
      allowString: false,
      allowNumber: false,
      allowNullableObject: false,
    },
  ],
  '@typescript-eslint/require-array-sort-compare': [
    2,
    {
      ignoreStringArrays: true,
    },
  ],
  '@typescript-eslint/explicit-function-return-type': [
    2,
    {
      allowExpressions: true,
    },
  ],

  // typescript-eslint version of eslint rules
  // rules not included in any configs
  '@typescript-eslint/no-shadow': [
    2,
    {
      hoist: 'all',
      allow: ['resolve', 'reject', 'done', 'next', 'err', 'error'],
      ignoreTypeValueShadow: true,
      ignoreFunctionTypeParameterNameValueShadow: true,
    },
  ],
  '@typescript-eslint/return-await': [2, 'in-try-catch'], // eslint/no-return-await
  '@typescript-eslint/no-use-before-define': [
    2,
    {
      ignoreTypeReferences: true,
    },
  ],
  '@typescript-eslint/no-unused-expressions': [
    2,
    {
      allowShortCircuit: true,
      allowTernary: true,
      allowTaggedTemplates: true,
    },
  ],
  '@typescript-eslint/padding-line-between-statements': [
    2,
    {
      blankLine: 'always',
      prev: [
        'const',
        'let',
        'case',
        'default',
        'block',
        'block-like',
        'multiline-block-like',
        'interface',
        'type',
      ],
      next: '*',
    },
    {
      blankLine: 'any',
      prev: ['const', 'let'],
      next: ['const', 'let'],
    },
    {
      blankLine: 'always',
      prev: '*',
      next: ['switch', 'while', 'try', 'return', 'if', 'interface', 'type'],
    },
  ],
};

module.exports = [
  'eslint:recommended',
  {
    files: [supportedFileTypes],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
      },
      parser: typescriptParser,
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: ['./tsconfig.json'],
      },
    },
    linterOptions: {
      noInlineConfig: true,
      reportUnusedDisableDirectives: true,
    },
    settings: {
      'import/extensions': allExtensions,
      'import/external-module-folders': ['node_modules'],
      // start eslint-import-resolver-typescript
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.mts', '.cts'],
      },
      // eslint-import-resolver-webpack
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.json',
        },
        webpack: {
          config: './webpack.config.ts',
        },
        node: {
          paths: ['src'],
          extensions: allExtensions,
        },
      },
      // end eslint-import-resolver-typescript
    },
    plugins: {
      import: pluginImport,
      prettier: prettierPlugin,
    },
    rules: {
      ...prettierConfig.rules,
      ...pluginImportConfig.rules,
      ...baseRules,
      ...importRules,
    },
  },
  {
    files: [supportedTsFileTypes],
    plugins: {
      '@typescript-eslint': typescript,
    },
    rules: {
      ...typescript.configs['eslint-recommended'].overrides[0].rules, // TODO: Keep up on changes
      ...typescript.configs.recommended.rules,
      ...typescript.configs['recommended-requiring-type-checking'].rules,
      ...typescript.configs.strict.rules,
      ...typescriptRules,
    },
  },
];
