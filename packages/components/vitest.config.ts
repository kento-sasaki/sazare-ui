import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    name: 'components',
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
  },
})
