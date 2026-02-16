import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import react from 'eslint-plugin-react'
import globals from 'globals'
import stylistic from '@stylistic/eslint-plugin'

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  { ignores: ['node_modules', 'dist', '.idea'] },
  {
    files: ['**/*.ts', '**/*.tsx'],
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
    plugins: {
      react,
        '@stylistic': stylistic,
        '@typescript-eslint': tseslint.plugin,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      // React
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',

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
