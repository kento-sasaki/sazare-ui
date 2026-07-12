import { defineRecipe } from '@pandacss/dev'

export const badgeRecipe = defineRecipe({
  className: 'badge',
  description: 'The styles for the Badge component',
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    borderRadius: 'sm',
    paddingInline: 'sm',
    paddingBlock: 'xs',
    fontSize: 'xs',
    fontWeight: 'medium',
    lineHeight: 'none',
    whiteSpace: 'nowrap',
    // feedback.*.bgはBanner/Toastのような広い面積向けに選定した淡い色のため、
    // Badgeのような小面積では背景だけだと輪郭が視認しづらい。同色系のborderで縁取り、
    // 淡い背景のままでも境界がはっきり見えるようにする
    borderWidth: '1px',
    borderStyle: 'solid',
  },
  variants: {
    tone: {
      neutral: {
        bg: 'feedback.neutral.bg',
        color: 'feedback.neutral.text',
        borderColor: 'feedback.neutral.text',
      },
      success: {
        bg: 'feedback.success.bg',
        color: 'feedback.success.text',
        borderColor: 'feedback.success.text',
      },
      warning: {
        bg: 'feedback.warning.bg',
        color: 'feedback.warning.text',
        borderColor: 'feedback.warning.text',
      },
      error: {
        bg: 'feedback.error.bg',
        color: 'feedback.error.text',
        borderColor: 'feedback.error.text',
      },
      info: {
        bg: 'feedback.info.bg',
        color: 'feedback.info.text',
        borderColor: 'feedback.info.text',
      },
    },
  },
  defaultVariants: {
    tone: 'neutral',
  },
  // 実行時propsから解決されるtone状態のCSSは静的解析では生成されないため、全variantを強制生成する
  staticCss: ['*'],
})
