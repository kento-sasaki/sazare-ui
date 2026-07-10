import { defineConfig } from '@pandacss/dev'
import { colors, fonts, fontSizes, fontWeights, lineHeights } from '@sazare-ui/tokens'

export default defineConfig({
  preflight: true,
  include: ['./src/**/*.{ts,tsx}'],
  exclude: [],
  presets: ['@pandacss/preset-panda'],
  jsxFramework: 'react',
  theme: {
    extend: {
      tokens: {
        fonts,
        fontSizes,
        fontWeights,
        lineHeights,
        colors,
      },
    },
  },
  outdir: 'styled-system',
})
