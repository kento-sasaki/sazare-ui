import { defineRecipe } from '@pandacss/dev'

export const textareaRecipe = defineRecipe({
  className: 'textarea',
  description: 'The styles for the Textarea component',
  base: {
    display: 'inline-block',
    width: '100%',
    resize: 'vertical',
    borderRadius: 'md',
    border: '1px solid',
    borderColor: 'border.default',
    fontFamily: 'body',
    color: 'text.default',
    _disabled: {
      cursor: 'not-allowed',
      opacity: 0.5,
    },
    _focus: {
      outline: 'none',
      borderColor: 'action.solid',
    },
    // FormControl(#38)がaria-invalidを注入する構成を想定し、Textarea単体でも
    // 視覚フィードバックが成立するようにする（TextInputと同じ理由）
    '&[aria-invalid="true"]': {
      borderColor: 'border.danger',
      // 外側の_focus（outline: 'none'）だけだとinvalid×focus時に枠線色がaction.solidで
      // 上書きされ、フォーカスの視覚化（WCAG 2.4.7）が失われる。invalid時はborderColorを
      // ここで再指定して維持しつつoutlineで補う
      _focus: {
        borderColor: 'border.danger',
        outline: '2px solid {colors.border.danger}',
        outlineOffset: '1px',
      },
    },
  },
  variants: {
    size: {
      sm: { fontSize: 'sm', paddingInline: 'sm', paddingBlock: 'xs' },
      md: { fontSize: 'md', paddingInline: 'md', paddingBlock: 'sm' },
    },
  },
  defaultVariants: {
    size: 'md',
  },
  // sizeは実行時propsから解決されるため、静的解析だけでは一部のvariantしかCSSが生成されない。
  // 全variantを強制生成する（TextInput等と同じ理由）
  staticCss: ['*'],
})
