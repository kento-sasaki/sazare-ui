import { defineSlotRecipe } from '@pandacss/dev'

export const datePickerRecipe = defineSlotRecipe({
  className: 'datePicker',
  description: 'The styles for the DatePicker component',
  slots: [
    'root',
    'control',
    'input',
    'trigger',
    'positioner',
    'content',
    'viewControl',
    'navTrigger',
    'rangeText',
    'table',
    'tableHeader',
    'tableCell',
    'tableCellTrigger',
  ],
  base: {
    root: {
      display: 'inline-flex',
      flexDirection: 'column',
    },
    control: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 'sm',
      width: '100%',
      borderRadius: 'md',
      border: '1px solid',
      borderColor: 'border.default',
      bg: 'text.white',
      paddingInline: 'md',
      paddingBlock: 'sm',
      _focusWithin: {
        borderColor: 'action.solid',
      },
      // FormControl(#38)がaria-invalidを注入する構成を想定し、DatePicker単体でも
      // 視覚フィードバックが成立するようにする（TextInput/Selectと同じ理由）
      '&[data-invalid]': {
        borderColor: 'border.danger',
        _focusWithin: {
          borderColor: 'border.danger',
          outline: '2px solid {colors.border.danger}',
          outlineOffset: '1px',
        },
      },
      '&[data-disabled]': {
        cursor: 'not-allowed',
        opacity: 0.5,
      },
    },
    input: {
      flex: '1',
      minWidth: '0',
      border: 'none',
      outline: 'none',
      bg: 'transparent',
      fontFamily: 'body',
      fontSize: 'md',
      color: 'text.default',
    },
    trigger: {
      display: 'inline-flex',
      flexShrink: 0,
      alignItems: 'center',
      justifyContent: 'center',
      color: 'text.secondary',
      cursor: 'pointer',
      width: '{spacing.md}',
      height: '{spacing.md}',
      _disabled: {
        cursor: 'not-allowed',
        opacity: 0.5,
      },
    },
    positioner: {
      zIndex: 1,
    },
    content: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'sm',
      borderRadius: 'md',
      border: '1px solid',
      borderColor: 'border.default',
      bg: 'text.white',
      padding: 'sm',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
    },
    viewControl: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 'sm',
    },
    navTrigger: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '{spacing.lg}',
      height: '{spacing.lg}',
      borderRadius: 'sm',
      color: 'text.default',
      cursor: 'pointer',
      _hover: {
        bg: 'border.default',
      },
      _disabled: {
        cursor: 'not-allowed',
        opacity: 0.5,
      },
    },
    rangeText: {
      fontSize: 'md',
      fontWeight: 'bold',
      color: 'text.default',
    },
    table: {
      borderCollapse: 'collapse',
    },
    tableHeader: {
      fontSize: 'sm',
      fontWeight: 'bold',
      color: 'text.secondary',
      padding: 'xs',
    },
    tableCell: {
      padding: '0',
      textAlign: 'center',
    },
    tableCellTrigger: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '{spacing.lg}',
      height: '{spacing.lg}',
      borderRadius: 'sm',
      fontSize: 'md',
      color: 'text.default',
      cursor: 'pointer',
      _hover: {
        bg: 'border.default',
      },
      '&[data-today]': {
        fontWeight: 'bold',
      },
      '&[data-selected]': {
        bg: 'action.solid',
        color: 'text.white',
      },
      '&[data-disabled]': {
        cursor: 'not-allowed',
        color: 'text.disabled',
      },
      '&[data-outside-range]': {
        color: 'text.disabled',
      },
    },
  },
  // 実行時propsから解決される状態（selected/today/invalid等）のCSSも静的解析では
  // 生成されないため、全variantを強制生成する（Checkbox/RadioGroup/Select/TextInputと同じ理由）
  staticCss: ['*'],
})
