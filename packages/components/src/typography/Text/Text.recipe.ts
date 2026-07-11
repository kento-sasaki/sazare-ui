import { defineRecipe } from '@pandacss/dev'

export const textRecipe = defineRecipe({
  className: 'text',
  description: 'The styles for the Text component',
  base: {
    fontFamily: 'body',
    lineHeight: 'normal',
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
    weight: {
      normal: { fontWeight: 'normal' },
      semibold: { fontWeight: 'semibold' },
      bold: { fontWeight: 'bold' },
    },
  },
  defaultVariants: {
    size: 'md',
    color: 'default',
    weight: 'normal',
  },
  // 全variantを静的解析に依存せず強制生成する（Headingと同じ理由: 値が実行時propsから解決されるため）
  staticCss: ['*'],
})
