import { defineSlotRecipe } from '@pandacss/dev'

export const switchRecipe = defineSlotRecipe({
  className: 'switch',
  description: 'The styles for the Switch component',
  slots: ['root', 'control', 'thumb', 'label'],
  base: {
    root: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 'sm',
      cursor: 'pointer',
      _disabled: {
        cursor: 'not-allowed',
        opacity: 0.5,
      },
    },
    // トラック内でthumbを寄せる位置をjustifyContentの切り替えで表現する
    // （translateXの移動距離をトークンだけで計算する必要が無く、Checkboxと同じ
    // トークン参照構文{spacing.xxx}のみで完結できるため）
    control: {
      position: 'relative',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      flexShrink: 0,
      width: '{spacing.xl}',
      height: '{spacing.md}',
      padding: '{spacing.xs}',
      borderRadius: 'full',
      bg: 'border.default',
      _checked: {
        bg: 'action.solid',
        justifyContent: 'flex-end',
      },
      // キーボード操作時のフォーカスをRootではなくControlの枠線で示す
      // （実際にフォーカスを受け取るのはHiddenInputだが、zag-jsがdata-focus-visible属性を
      // Control等の各パーツにも反映するため、Panda標準の_focusVisibleで拾える）
      _focusVisible: {
        outline: '2px solid',
        outlineColor: 'action.solid',
        outlineOffset: '2px',
      },
    },
    thumb: {
      width: '{spacing.sm}',
      height: '{spacing.sm}',
      flexShrink: 0,
      borderRadius: 'full',
      bg: 'text.white',
    },
    label: {
      fontSize: 'md',
      color: 'text.default',
    },
  },
  // 実行時propsから解決される状態（checked等）のCSSも静的解析では生成されないため、
  // 全variantを強制生成する（Checkbox/Button/Text/Headingと同じ理由）
  staticCss: ['*'],
})
