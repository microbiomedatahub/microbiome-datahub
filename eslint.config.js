import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import eslintReact from '@eslint-react/eslint-plugin'
import reactHooks from 'eslint-plugin-react-hooks'
import globals from 'globals'
import stylistic from '@stylistic/eslint-plugin'

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  { ignores: ['node_modules', 'dist', '.idea'] },
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      ...eslintReact.configs.recommended.plugins,
      ...reactHooks.configs.flat.recommended.plugins,
      '@stylistic': stylistic,
      '@typescript-eslint': tseslint.plugin,
    },
    settings: {
      ...eslintReact.configs.recommended.settings,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    rules: {
      ...eslintReact.configs.recommended.rules,

      // React Hooks (classic rules as error, new strict rules as warn)
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react-hooks/set-state-in-effect': 'warn',
      'react-hooks/use-memo': 'warn',

      // Style
      'linebreak-style': ['error', 'unix'],
      '@stylistic/quotes': ['error', 'single'],
      '@stylistic/comma-dangle': ['error', 'only-multiline'],
      '@stylistic/semi': ['error', 'never'],
      '@stylistic/indent': ['error', 2],

      // TypeScript
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-unused-expressions': ['warn', { allowTernary: true }],
    },
  },
]
