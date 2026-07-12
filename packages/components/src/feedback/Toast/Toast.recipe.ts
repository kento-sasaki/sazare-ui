import { defineSlotRecipe } from '@pandacss/dev'

export const toastRecipe = defineSlotRecipe({
  className: 'toast',
  description: 'The styles for the Toast component',
  slots: ['root', 'title', 'description', 'closeTrigger'],
  base: {
    root: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: 'sm',
      borderRadius: 'md',
      padding: 'md',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.15)',
    },
    title: {
      fontSize: 'sm',
      fontWeight: 'bold',
      margin: 0,
    },
    description: {
      fontSize: 'sm',
      margin: 0,
    },
    closeTrigger: {
      flexShrink: 0,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '{spacing.md}',
      height: '{spacing.md}',
      border: 'none',
      bg: 'transparent',
      cursor: 'pointer',
      color: 'inherit',
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
