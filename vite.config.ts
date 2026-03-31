import { defineConfig } from 'vite-plus'

export default defineConfig({
  fmt: {
    singleQuote: true,
    semi: false,
    trailingComma: 'none',
    endOfLine: 'lf',
    sortImports: {},
    sortTailwindcss: {
      attributes: [':class']
    }
  },
  lint: {
    plugins: ['typescript', 'unicorn', 'oxc', 'vue', 'import'],
    env: { browser: true, es2022: true },
    categories: {
      correctness: 'error',
      suspicious: 'warn'
    },
    options: { typeAware: false, typeCheck: false },
    rules: {
      'no-console': 'warn',
      'unicorn/filename-case': 'off',
      'import/no-unassigned-import': ['warn', { allow: ['**/*.css'] }]
    },
    ignorePatterns: ['**/dist/**']
  }
})
