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
      // feedbackカテゴリ実装（Issue #42〜#46）でfontSizesにxsを追加した際、
      // HeadingSize = keyof typeof fontSizes（ADR 0011）に自動的に含まれるため、
      // ここにも対応するvariantを追加する（追加しないとTypeScriptの型と食い違う）
      xs: { fontSize: 'xs' },
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
  },
  defaultVariants: {
    size: 'md',
    color: 'default',
  },
  // sizeはasから実行時に解決するため（静的なリテラル引数ではない）、
  // 静的解析だけでは一部のvariantしかCSSが生成されない。全variantを強制生成する。
  staticCss: ['*'],
})
