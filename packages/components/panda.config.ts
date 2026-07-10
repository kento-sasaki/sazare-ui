import { defineConfig } from '@pandacss/dev'
import { colors, fonts, fontSizes, fontWeights, lineHeights } from '@sazare-ui/tokens'

import { headingRecipe } from './src/typography/Heading/Heading.recipe'

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
      recipes: {
        heading: headingRecipe,
      },
    },
  },
  outdir: 'styled-system',
})
