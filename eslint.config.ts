import * as path from 'node:path'
import js from '@eslint/js'
import stylistic from '@stylistic/eslint-plugin'
import importPlugin from 'eslint-plugin-import'
import reactPlugin from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import sortKeysFix from 'eslint-plugin-sort-keys-fix'
import tsSortKeys from 'eslint-plugin-typescript-sort-keys'
import tseslint from 'typescript-eslint'
import globals from 'globals'

export default [
  // Ignore common build and dependency folders
  {
    ignores: ['dist', 'build', 'node_modules']
  },

  // Base JavaScript recommended rules
  js.configs.recommended,

  // TypeScript ESLint recommended rules (parser + plugin)
  ...tseslint.configs.recommended,

  // Project-specific configuration and rules
  {
    languageOptions: {
      ecmaVersion: 'latest',
      parserOptions: {
        // Enable JSX parsing in TS/TSX
        ecmaFeatures: { jsx: true }
      },
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node
      }
    },
    plugins: {
      '@stylistic': stylistic as any,
      import: importPlugin as any,
      react: reactPlugin as any,
      'react-hooks': reactHooks as any,
      'sort-keys-fix': sortKeysFix as any,
      'typescript-sort-keys': tsSortKeys as any
    },
    rules: {
      // Stylistic/common
      '@stylistic/indent': ['warn', 2],
      '@stylistic/quote-props': ['error', 'as-needed'],
      // TypeScript
      '@typescript-eslint/no-unused-vars': 'warn',
      // Imports
      'import/order': [
        'error',
        {
          alphabetize: { order: 'asc' },
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          pathGroups: [
            {
              group: 'sibling',
              pattern: './**/*.scss',
              position: 'after'
            }
          ]
        }
      ],
      'no-console': 'warn',
      'no-undef': ['error'],
      'no-unused-vars': 'warn',
      quotes: ['warn', 'single'],
      // React
      'react/jsx-uses-react': 'off',

      
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      semi: ['warn', 'never'],

      // Sorting helpers
      'sort-keys-fix/sort-keys-fix': ['warn', 'asc', { natural: false }],
      'typescript-sort-keys/interface': 'warn',
      'typescript-sort-keys/string-enum': 'warn'
    },
    settings: {
      'import/external-module-folders': ['node_modules', 'node_modules/@types'],
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx', '.scss', '.svg', '.png', '.jpg']
      },
      'import/resolver': {
        typescript: {
          project: path.resolve('./tsconfig.json')
        }
      },
      react: {
        version: 'detect'
      }
    }
  },

  // Disable core no-undef for TypeScript files (handled by TS compiler)
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      'no-undef': 'off'
    }
  },

  // JSON overrides
  {
    files: ['*.json'],
    rules: {
      '@stylistic/quote-props': 'off',
      'comma-dangle': ['error', 'never'],
      quotes: ['warn', 'double'],
      // JSON files are bare object expressions; disable expression-only checks
      'no-unused-expressions': 'off',
      '@typescript-eslint/no-unused-expressions': 'off'
    }
  }
]
