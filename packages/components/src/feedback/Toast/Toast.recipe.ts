import { defineSlotRecipe } from '@pandacss/dev'

export const toastRecipe = defineSlotRecipe({
  className: 'toast',
  description: 'The styles for the Toast component',
  slots: ['root', 'title', 'description', 'closeTrigger'],
  base: {
    root: {
      position: 'relative',
      display: 'flex',
      alignItems: 'flex-start',
      gap: 'sm',
      borderRadius: 'md',
      padding: 'md',
      minWidth: '18rem',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
      // Ark UIのToast.RootはgetRootProps()経由でposition: absoluteと--x/--y/--opacity/--z-index等の
      // CSS変数をインラインstyleとして自動付与するが、それらを実際のCSSプロパティにマッピングする
      // recipe側の定義が無いと、全トーストが同一座標に重なって表示される。translate/opacityに
      // 割り当てることで重なりを解消すると同時に、マウント/dismiss時のフェード+スライドも実現する
      translate: 'var(--x) var(--y)',
      opacity: 'var(--opacity)',
      zIndex: 'var(--z-index)',
      transitionProperty: 'translate, opacity',
      transitionDuration: '0.35s',
      transitionTimingFunction: 'cubic-bezier(0.21, 1.02, 0.73, 1)',
    },
    title: {
      fontSize: 'xs',
      fontWeight: 'semibold',
      margin: 0,
    },
    description: {
      fontSize: 'xs',
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
