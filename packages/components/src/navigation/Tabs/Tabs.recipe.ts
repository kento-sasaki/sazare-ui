import { defineSlotRecipe } from '@pandacss/dev'

export const tabsRecipe = defineSlotRecipe({
  className: 'tabs',
  description: 'The styles for the Tabs component',
  slots: ['root', 'list', 'trigger', 'content', 'indicator'],
  base: {
    list: {
      position: 'relative',
      display: 'flex',
      gap: 'sm',
      borderBottom: '1px solid',
      borderColor: 'border.default',
    },
    trigger: {
      paddingInline: 'md',
      paddingBlock: 'sm',
      fontSize: 'md',
      color: 'text.secondary',
      cursor: 'pointer',
      '&[data-selected]': {
        color: 'text.default',
        fontWeight: 'bold',
      },
      '&[data-disabled]': {
        cursor: 'not-allowed',
        color: 'text.disabled',
      },
      '&[data-focus]': {
        outline: '2px solid {colors.action.solid}',
        outlineOffset: '-2px',
      },
    },
    content: {
      paddingBlock: 'md',
    },
    indicator: {
      bottom: 0,
      height: '2px',
      bg: 'action.solid',
    },
  },
  // 実行時propsから解決される状態（selected/disabled/focus等）のCSSも静的解析では
  // 生成されないため、全variantを強制生成する（SegmentedControl/RadioGroupと同じ理由）
  staticCss: ['*'],
})
