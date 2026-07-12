import { defineSlotRecipe } from '@pandacss/dev'

export const drawerRecipe = defineSlotRecipe({
  className: 'drawer',
  description: 'The styles for the Drawer component',
  // Ark UIのDrawer.Rootはコンテキストプロバイダのみでark.divを描画しないため、
  // Select.recipe.tsとは異なりrootスロットは持たない（Dialog.recipe.tsと同じ理由）
  slots: ['trigger', 'backdrop', 'positioner', 'content', 'title', 'description', 'closeTrigger'],
  base: {
    trigger: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 'sm',
      borderRadius: 'md',
      border: '1px solid',
      borderColor: 'border.default',
      bg: 'text.white',
      paddingInline: 'md',
      paddingBlock: 'sm',
      fontSize: 'md',
      color: 'text.default',
      cursor: 'pointer',
      _focusVisible: {
        outline: 'none',
        borderColor: 'action.solid',
      },
    },
    backdrop: {
      position: 'fixed',
      inset: 0,
      bg: 'rgba(0, 0, 0, 0.5)',
    },
    // 配置propの値（up/down/start/end、論理方向）はArk UI側でdirコンテキストに基づき
    // 物理方向（up/down/left/right）に解決されたうえでdata-swipe-direction属性に反映される
    // （例: dir="ltr"では"end"→"right"）。CSSは物理方向の値をセレクタに使う。
    // これによりdir="rtl"環境でも自動的に左右が反転する（Ark UI側の解決に追従するだけでよい）。
    // swipeGestureは描画していない（Grabber/SwipeAreaはv0.1スコープ外）が、
    // Positioner/ContentへのCSS属性付与自体はswipe機能の有無に関わらず常に行われる
    positioner: {
      position: 'fixed',
      inset: 0,
      display: 'flex',
      zIndex: 1,
      '&[data-swipe-direction="right"]': { justifyContent: 'flex-end' },
      '&[data-swipe-direction="left"]': { justifyContent: 'flex-start' },
      '&[data-swipe-direction="up"]': { alignItems: 'flex-start' },
      '&[data-swipe-direction="down"]': { alignItems: 'flex-end' },
    },
    content: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      gap: 'sm',
      overflowY: 'auto',
      bg: 'text.white',
      padding: 'lg',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
      '&[data-swipe-direction="right"]': { width: '20rem', maxWidth: '90vw', height: '100%' },
      '&[data-swipe-direction="left"]': { width: '20rem', maxWidth: '90vw', height: '100%' },
      '&[data-swipe-direction="up"]': { width: '100%', height: '20rem', maxHeight: '90vh' },
      '&[data-swipe-direction="down"]': { width: '100%', height: '20rem', maxHeight: '90vh' },
    },
    title: {
      fontSize: 'lg',
      fontWeight: 'bold',
      color: 'text.default',
      margin: 0,
    },
    description: {
      fontSize: 'md',
      color: 'text.secondary',
      margin: 0,
    },
    closeTrigger: {
      position: 'absolute',
      top: 'sm',
      right: 'sm',
      flexShrink: 0,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      // WCAG 2.5.8 (Target Size Minimum, AA) の24px基準を満たすため{spacing.lg}(1.5rem=24px)にする
      width: '{spacing.lg}',
      height: '{spacing.lg}',
      border: 'none',
      bg: 'transparent',
      cursor: 'pointer',
      color: 'text.secondary',
    },
  },
  // placementはPandaのvariantsではなく、Ark UIが自動付与するdata-swipe-direction属性への
  // CSS属性セレクタ（上記base内）で実現している。variantsを使わないためstaticCssは不要
})
