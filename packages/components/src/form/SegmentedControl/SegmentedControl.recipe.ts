import { defineSlotRecipe } from '@pandacss/dev'

export const segmentedControlRecipe = defineSlotRecipe({
  className: 'segmentedControl',
  description: 'The styles for the SegmentedControl component',
  slots: ['root', 'groupLabel', 'track', 'item', 'itemText', 'itemControl', 'indicator'],
  base: {
    root: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'xs',
    },
    groupLabel: {
      fontSize: 'md',
      fontWeight: 'bold',
      color: 'text.default',
    },
    // Ark UIの複合パーツには無い、segment行のレイアウト専用ラッパー（内部実装のみ、
    // 公開propsとしては露出しない）。indicatorのposition:absoluteの基準にする
    track: {
      position: 'relative',
      display: 'inline-flex',
      borderRadius: 'md',
      border: '1px solid',
      borderColor: 'border.default',
      padding: '{spacing.xs}',
      gap: '{spacing.xs}',
    },
    item: {
      position: 'relative',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      paddingInline: 'md',
      paddingBlock: 'sm',
      fontSize: 'md',
      color: 'text.default',
      cursor: 'pointer',
      zIndex: 1,
      '&[data-disabled]': {
        cursor: 'not-allowed',
        color: 'text.disabled',
      },
      '&[data-focus]': {
        outline: '2px solid {colors.action.solid}',
        outlineOffset: '-2px',
      },
    },
    itemText: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
    itemControl: {
      display: 'none',
    },
    indicator: {
      position: 'absolute',
      borderRadius: 'sm',
      bg: 'text.white',
      boxShadow: '0 1px 2px rgba(0, 0, 0, 0.15)',
    },
  },
  // 実行時propsから解決される状態（checked/focus/disabled等）のCSSも静的解析では
  // 生成されないため、全variantを強制生成する（RadioGroup/Selectと同じ理由）
  staticCss: ['*'],
})
