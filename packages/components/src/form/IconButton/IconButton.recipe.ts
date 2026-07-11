import { defineRecipe } from '@pandacss/dev'

export const iconButtonRecipe = defineRecipe({
  className: 'icon-button',
  description: 'The styles for the IconButton component',
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 'md',
    cursor: 'pointer',
    _disabled: {
      cursor: 'not-allowed',
      opacity: 0.5,
    },
  },
  variants: {
    // Buttonのvariantと同じ配色ルールを踏襲する（ADR 0011の対象外、Button.recipe.tsと同じ理由）
    variant: {
      solid: {
        bg: 'action.solid',
        color: 'text.white',
        border: 'none',
        _hover: { bg: 'action.solidHover' },
        _disabled: { _hover: { bg: 'action.solid' } },
      },
      outline: {
        bg: 'transparent',
        border: '1px solid',
        borderColor: 'action.solid',
        color: 'action.solid',
        _hover: {
          borderColor: 'action.solidHover',
          color: 'action.solidHover',
        },
        _disabled: {
          _hover: { borderColor: 'action.solid', color: 'action.solid' },
        },
      },
    },
    // アイコン自体のサイズは利用側のicon要素が持つため、ここでは正方形になるようpaddingのみを揃える
    size: {
      sm: { padding: 'xs' },
      md: { padding: 'sm' },
    },
  },
  defaultVariants: {
    variant: 'solid',
    size: 'md',
  },
  // sizeは実行時propsから解決されるため、静的解析だけでは一部のvariantしかCSSが生成されない。
  // 全variantを強制生成する（Button/Text/Headingと同じ理由）
  staticCss: ['*'],
})
