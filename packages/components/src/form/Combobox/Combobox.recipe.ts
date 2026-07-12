import { defineSlotRecipe } from '@pandacss/dev'

export const comboboxRecipe = defineSlotRecipe({
  className: 'combobox',
  description: 'The styles for the Combobox component',
  slots: [
    'root',
    'label',
    'control',
    'input',
    'trigger',
    'positioner',
    'content',
    'item',
    'itemText',
    'itemIndicator',
  ],
  base: {
    root: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'xs',
    },
    label: {
      fontSize: 'md',
      fontWeight: 'bold',
      color: 'text.default',
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
      // FormControl(#38)は自前labelを持つコンポーネントとは組み合わせないが、
      // Combobox単体でも視覚フィードバックが成立するようにする（Select/TextInputと同じ理由）
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
      width: '{spacing.sm}',
      height: '{spacing.sm}',
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
      gap: '{spacing.xs}',
      minWidth: 'var(--reference-width)',
      maxHeight: '16rem',
      overflowY: 'auto',
      borderRadius: 'md',
      border: '1px solid',
      borderColor: 'border.default',
      bg: 'text.white',
      padding: 'xs',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
    },
    item: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 'sm',
      borderRadius: 'sm',
      paddingInline: 'sm',
      paddingBlock: 'xs',
      fontSize: 'md',
      color: 'text.default',
      cursor: 'pointer',
      _highlighted: {
        bg: 'border.default',
      },
      _disabled: {
        cursor: 'not-allowed',
        color: 'text.disabled',
      },
    },
    itemText: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
    itemIndicator: {
      display: 'inline-flex',
      flexShrink: 0,
      color: 'action.solid',
      width: '{spacing.sm}',
      height: '{spacing.sm}',
    },
  },
  // 実行時propsから解決される状態（highlighted/invalid等）のCSSも静的解析では
  // 生成されないため、全variantを強制生成する（Select/Checkbox/RadioGroupと同じ理由）
  staticCss: ['*'],
})
