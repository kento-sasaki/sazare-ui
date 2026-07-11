import { defineRecipe } from '@pandacss/dev'

export const textInputRecipe = defineRecipe({
  className: 'textInput',
  description: 'The styles for the TextInput component',
  base: {
    display: 'inline-block',
    width: '100%',
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
    // FormControl(#38)がaria-invalidを注入する構成を想定し、TextInput単体でも
    // 視覚フィードバックが成立するようにする
    '&[aria-invalid="true"]': {
      borderColor: 'border.danger',
      // 外側の_focus（outline: 'none'）だけだとinvalid×focus時に枠線色がaction.solidで
      // 上書きされ、フォーカスの視覚化（WCAG 2.4.7）が失われる。invalid時はborderColorを
      // ここで再指定して維持しつつoutlineで補う（詳細度・ソース順の両面で外側の_focusに
      // 勝つ必要があるため、borderColorの再指定を省略しない）
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
  // 全variantを強制生成する（Button/Checkbox/Switch等と同じ理由）
  staticCss: ['*'],
})
