import { defineSlotRecipe } from '@pandacss/dev'

export const selectRecipe = defineSlotRecipe({
  className: 'select',
  description: 'The styles for the Select component',
  slots: [
    'root',
    'label',
    'control',
    'trigger',
    'valueText',
    'indicator',
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
    },
    trigger: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 'sm',
      width: '100%',
      borderRadius: 'md',
      border: '1px solid',
      borderColor: 'border.default',
      bg: 'text.white',
      fontFamily: 'body',
      fontSize: 'md',
      color: 'text.default',
      paddingInline: 'md',
      paddingBlock: 'sm',
      cursor: 'pointer',
      _disabled: {
        cursor: 'not-allowed',
        opacity: 0.5,
      },
      _focusVisible: {
        outline: 'none',
        borderColor: 'action.solid',
      },
      // FormControl(#38)がinvalid propを注入する構成を想定し、Select単体でも
      // 視覚フィードバックが成立するようにする（TextInputと同じ理由）
      '&[aria-invalid="true"]': {
        borderColor: 'border.danger',
        _focusVisible: {
          borderColor: 'border.danger',
          outline: '2px solid {colors.border.danger}',
          outlineOffset: '1px',
        },
      },
    },
    valueText: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
    indicator: {
      display: 'inline-flex',
      flexShrink: 0,
      color: 'text.secondary',
      width: '{spacing.sm}',
      height: '{spacing.sm}',
    },
    // PositionerはArk UIがposition/transformをインラインstyleで制御するため、
    // ここではPortal経由で最前面に出すためのz-indexのみを指定する。
    // 専用のz-indexトークンは未整備のため、今回は直接値に留める（トークン化は別スコープ）
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
  // 実行時propsから解決される状態（highlighted/invalid等）のCSSも静的解析では生成されないため、
  // 全variantを強制生成する（Checkbox/RadioGroup/TextInputと同じ理由）
  staticCss: ['*'],
})
