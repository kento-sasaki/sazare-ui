import { defineSlotRecipe } from '@pandacss/dev'

export const paginationRecipe = defineSlotRecipe({
  className: 'pagination',
  description: 'The styles for the Pagination component',
  slots: ['root', 'item', 'ellipsis', 'prevTrigger', 'nextTrigger'],
  base: {
    root: {
      display: 'flex',
      alignItems: 'center',
      gap: 'xs',
    },
    item: {
      minWidth: '8',
      paddingInline: 'sm',
      paddingBlock: 'xs',
      fontSize: 'md',
      color: 'text.default',
      cursor: 'pointer',
      '&[data-selected]': {
        color: 'text.white',
        bg: 'action.solid',
        borderRadius: 'sm',
      },
      '&[data-focus]': {
        outline: '2px solid {colors.action.solid}',
        outlineOffset: '-2px',
      },
    },
    ellipsis: {
      paddingInline: 'sm',
      color: 'text.disabled',
    },
    prevTrigger: {
      paddingInline: 'sm',
      paddingBlock: 'xs',
      fontSize: 'md',
      color: 'text.default',
      cursor: 'pointer',
      '&:disabled': {
        cursor: 'not-allowed',
        color: 'text.disabled',
      },
    },
    nextTrigger: {
      paddingInline: 'sm',
      paddingBlock: 'xs',
      fontSize: 'md',
      color: 'text.default',
      cursor: 'pointer',
      '&:disabled': {
        cursor: 'not-allowed',
        color: 'text.disabled',
      },
    },
  },
  // 実行時propsから解決される状態（selected/disabled/focus等）のCSSも静的解析では
  // 生成されないため、全variantを強制生成する（SegmentedControl/RadioGroupと同じ理由）
  staticCss: ['*'],
})
