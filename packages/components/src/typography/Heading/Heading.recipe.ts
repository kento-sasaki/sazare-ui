import { defineRecipe } from '@pandacss/dev'

export const headingRecipe = defineRecipe({
  className: 'heading',
  description: 'The styles for the Heading component',
  base: {
    fontFamily: 'heading',
    fontWeight: 'bold',
    lineHeight: 'tight',
    margin: 0,
  },
  variants: {
    size: {
      sm: { fontSize: 'sm' },
      md: { fontSize: 'md' },
      lg: { fontSize: 'lg' },
      xl: { fontSize: 'xl' },
      '2xl': { fontSize: '2xl' },
      '3xl': { fontSize: '3xl' },
    },
  },
  defaultVariants: {
    size: 'md',
  },
  // sizeはasから実行時に解決するため（静的なリテラル引数ではない）、
  // 静的解析だけでは一部のvariantしかCSSが生成されない。全variantを強制生成する。
  staticCss: ['*'],
})
