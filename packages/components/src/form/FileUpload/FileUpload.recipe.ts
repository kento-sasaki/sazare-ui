import { defineSlotRecipe } from '@pandacss/dev'

export const fileUploadRecipe = defineSlotRecipe({
  className: 'fileUpload',
  description: 'The styles for the FileUpload component',
  slots: [
    'root',
    'dropzone',
    'label',
    'trigger',
    'itemGroup',
    'item',
    'itemName',
    'itemSizeText',
    'itemDeleteTrigger',
  ],
  base: {
    root: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'sm',
    },
    dropzone: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 'sm',
      borderRadius: 'md',
      border: '2px dashed',
      borderColor: 'border.default',
      paddingBlock: 'lg',
      paddingInline: 'md',
      '&[data-dragging]': {
        borderColor: 'action.solid',
      },
      // FormControl(#38)がaria-invalidをtriggerへ注入する構成を想定し、
      // FileUpload単体でも視覚フィードバックが成立するようにする（TextInput/DatePickerと同じ理由）
      '&[data-invalid]': {
        borderColor: 'border.danger',
      },
      '&[data-disabled]': {
        cursor: 'not-allowed',
        opacity: 0.5,
      },
    },
    label: {
      fontSize: 'sm',
      color: 'text.secondary',
    },
    trigger: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 'md',
      border: '1px solid',
      borderColor: 'border.default',
      bg: 'text.white',
      fontFamily: 'body',
      fontSize: 'sm',
      color: 'text.default',
      paddingInline: 'md',
      paddingBlock: 'xs',
      cursor: 'pointer',
      _focusVisible: {
        outline: 'none',
        borderColor: 'action.solid',
      },
      '&[aria-invalid="true"]': {
        borderColor: 'border.danger',
      },
      '&[disabled]': {
        cursor: 'not-allowed',
        opacity: 0.5,
      },
    },
    itemGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'xs',
    },
    item: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 'sm',
      borderRadius: 'sm',
      border: '1px solid',
      borderColor: 'border.default',
      paddingInline: 'sm',
      paddingBlock: 'xs',
      fontSize: 'sm',
    },
    itemName: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      color: 'text.default',
    },
    itemSizeText: {
      flexShrink: 0,
      color: 'text.secondary',
    },
    itemDeleteTrigger: {
      display: 'inline-flex',
      flexShrink: 0,
      alignItems: 'center',
      justifyContent: 'center',
      width: '{spacing.md}',
      height: '{spacing.md}',
      color: 'text.secondary',
      cursor: 'pointer',
      _hover: {
        color: 'text.default',
      },
    },
  },
  // 実行時propsから解決される状態（dragging/invalid等）のCSSも静的解析では生成されないため、
  // 全variantを強制生成する（Checkbox/RadioGroup/Select/DatePickerと同じ理由）
  staticCss: ['*'],
})
