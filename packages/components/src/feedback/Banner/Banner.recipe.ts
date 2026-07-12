import { defineSlotRecipe } from '@pandacss/dev'

export const bannerRecipe = defineSlotRecipe({
  className: 'banner',
  description: 'The styles for the Banner component',
  slots: ['root', 'content', 'title', 'body', 'closeTrigger'],
  base: {
    root: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: 'sm',
      borderRadius: 'md',
      padding: 'md',
    },
    content: {
      flex: '1',
      display: 'flex',
      flexDirection: 'column',
      gap: 'xs',
    },
    title: {
      fontSize: 'sm',
      fontWeight: 'bold',
      margin: 0,
    },
    body: {
      fontSize: 'sm',
    },
    closeTrigger: {
      flexShrink: 0,
    },
  },
  variants: {
    tone: {
      neutral: { root: { bg: 'feedback.neutral.bg', color: 'feedback.neutral.text' } },
      success: { root: { bg: 'feedback.success.bg', color: 'feedback.success.text' } },
      warning: { root: { bg: 'feedback.warning.bg', color: 'feedback.warning.text' } },
      error: { root: { bg: 'feedback.error.bg', color: 'feedback.error.text' } },
      info: { root: { bg: 'feedback.info.bg', color: 'feedback.info.text' } },
    },
  },
  defaultVariants: {
    tone: 'neutral',
  },
  // 実行時propsから解決されるtone状態のCSSは静的解析では生成されないため、全variantを強制生成する
  staticCss: ['*'],
})
