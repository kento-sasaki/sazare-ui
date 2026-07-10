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
    // text系semantic colorのみ許容する（SmartHR UIのText color相当）。任意のCSS色は指定できない
    color: {
      default: { color: 'text.default' },
      white: { color: 'text.white' },
      secondary: { color: 'text.secondary' },
      disabled: { color: 'text.disabled' },
      link: { color: 'text.link' },
      inherit: { color: 'inherit' },
    },
    // spacingトークンのみ許容する。任意のCSS値（px指定等）は指定できない
    marginBottom: {
      none: { marginBottom: 'none' },
      xs: { marginBottom: 'xs' },
      sm: { marginBottom: 'sm' },
      md: { marginBottom: 'md' },
      lg: { marginBottom: 'lg' },
      xl: { marginBottom: 'xl' },
      '2xl': { marginBottom: '2xl' },
    },
  },
  defaultVariants: {
    size: 'md',
    color: 'default',
    marginBottom: 'none',
  },
  // sizeはasから実行時に解決するため（静的なリテラル引数ではない）、
  // 静的解析だけでは一部のvariantしかCSSが生成されない。全variantを強制生成する。
  staticCss: ['*'],
})
