import { defineSlotRecipe } from '@pandacss/dev'

export const stepperRecipe = defineSlotRecipe({
  className: 'stepper',
  description: 'The styles for the Stepper component',
  slots: [
    'root',
    'list',
    'item',
    'trigger',
    'indicator',
    'separator',
    'prevTrigger',
    'nextTrigger',
  ],
  base: {
    root: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'md',
    },
    list: {
      display: 'flex',
      alignItems: 'center',
    },
    item: {
      display: 'flex',
      alignItems: 'center',
      flex: '1',
      '&:last-child': {
        flex: 'initial',
      },
    },
    trigger: {
      display: 'flex',
      alignItems: 'center',
      gap: 'xs',
      fontSize: 'md',
      color: 'text.secondary',
      cursor: 'pointer',
      '&[data-current]': {
        color: 'text.default',
        fontWeight: 'bold',
      },
      '&[data-focus]': {
        outline: '2px solid {colors.action.solid}',
        outlineOffset: '-2px',
      },
    },
    indicator: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: '6',
      minHeight: '6',
      borderRadius: 'full',
      border: '1px solid',
      borderColor: 'border.default',
      color: 'text.secondary',
      '&[data-current]': {
        borderColor: 'action.solid',
        color: 'text.white',
        bg: 'action.solid',
      },
      '&[data-complete]': {
        borderColor: 'action.solid',
        color: 'action.solid',
      },
    },
    separator: {
      flex: '1',
      height: '1px',
      bg: 'border.default',
      marginInline: 'xs',
      '&[data-complete]': {
        bg: 'action.solid',
      },
    },
    prevTrigger: {
      fontSize: 'md',
      color: 'text.default',
      cursor: 'pointer',
      alignSelf: 'flex-start',
      '&:disabled': {
        cursor: 'not-allowed',
        color: 'text.disabled',
      },
    },
    nextTrigger: {
      fontSize: 'md',
      color: 'text.default',
      cursor: 'pointer',
      alignSelf: 'flex-start',
      '&:disabled': {
        cursor: 'not-allowed',
        color: 'text.disabled',
      },
    },
  },
  // 実行時propsから解決される状態（current/complete/disabled/focus等）のCSSも静的解析では
  // 生成されないため、全variantを強制生成する（SegmentedControl/RadioGroupと同じ理由）
  staticCss: ['*'],
})
