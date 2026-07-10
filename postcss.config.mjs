import path from 'node:path'

export default {
  plugins: {
    '@pandacss/dev/postcss': {
      configPath: path.resolve(process.cwd(), 'packages/components/panda.config.ts'),
    },
    autoprefixer: {},
  },
}
