import { defineSlotRecipe } from '@pandacss/dev'

export const accordionRecipe = defineSlotRecipe({
  className: 'accordion',
  description: 'The styles for the Accordion component',
  slots: ['root', 'item', 'itemTrigger', 'itemContent', 'itemIndicator'],
  base: {
    item: {
      borderBottom: '1px solid',
      borderColor: 'border.default',
    },
    itemTrigger: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      paddingBlock: 'sm',
      fontSize: 'md',
      color: 'text.default',
      cursor: 'pointer',
      '&:disabled': {
        cursor: 'not-allowed',
        color: 'text.disabled',
      },
      '&[data-focus]': {
        outline: '2px solid {colors.action.solid}',
        outlineOffset: '-2px',
      },
    },
    itemContent: {
      paddingBlock: 'sm',
      color: 'text.secondary',
    },
    itemIndicator: {
      transition: 'transform 0.2s',
      '&[data-state="open"]': {
        transform: 'rotate(180deg)',
      },
    },
  },
  // 実行時propsから解決される状態（open/closed/disabled/focus等）のCSSも静的解析では
  // 生成されないため、全variantを強制生成する（SegmentedControl/RadioGroupと同じ理由）
  staticCss: ['*'],
})
