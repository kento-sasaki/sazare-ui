import { defineRecipe } from '@pandacss/dev'

export const badgeRecipe = defineRecipe({
  className: 'badge',
  description: 'The styles for the Badge component',
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    borderRadius: 'full',
    paddingInline: 'sm',
    fontSize: 'sm',
    fontWeight: 'bold',
    lineHeight: 'tight',
  },
  variants: {
    tone: {
      neutral: { bg: 'feedback.neutral.bg', color: 'feedback.neutral.text' },
      success: { bg: 'feedback.success.bg', color: 'feedback.success.text' },
      warning: { bg: 'feedback.warning.bg', color: 'feedback.warning.text' },
      error: { bg: 'feedback.error.bg', color: 'feedback.error.text' },
      info: { bg: 'feedback.info.bg', color: 'feedback.info.text' },
    },
  },
  defaultVariants: {
    tone: 'neutral',
  },
  // 実行時propsから解決されるtone状態のCSSは静的解析では生成されないため、全variantを強制生成する
  staticCss: ['*'],
})
