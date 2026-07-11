import { defineRecipe } from '@pandacss/dev'

export const buttonRecipe = defineRecipe({
  className: 'button',
  description: 'The styles for the Button component',
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 'md',
    cursor: 'pointer',
    fontFamily: 'body',
    _disabled: {
      cursor: 'not-allowed',
      opacity: 0.5,
    },
  },
  variants: {
    variant: {
      solid: {
        bg: 'action.solid',
        color: 'text.white',
        border: 'none',
        _hover: { bg: 'action.solidHover' },
        // disabled時はhoverでのbg変化を打ち消し、無効化された見た目を一貫させる
        _disabled: { _hover: { bg: 'action.solid' } },
      },
      // sazare-uiにはoutlineのhover背景に使えるニュートラルなsurfaceトークンがまだ無いため、
      // hoverでは背景を変えずボーダー・文字色のみ濃くする（Button.mdxの利用上の注意に追記する）
      outline: {
        bg: 'transparent',
        border: '1px solid',
        borderColor: 'action.solid',
        color: 'action.solid',
        _hover: {
          borderColor: 'action.solidHover',
          color: 'action.solidHover',
        },
        // disabled時はhoverでのボーダー・文字色変化を打ち消す
        _disabled: {
          _hover: { borderColor: 'action.solid', color: 'action.solid' },
        },
      },
    },
    size: {
      sm: { fontSize: 'sm', paddingInline: 'sm', paddingBlock: 'xs' },
      md: { fontSize: 'md', paddingInline: 'md', paddingBlock: 'sm' },
    },
  },
  defaultVariants: {
    variant: 'solid',
    size: 'md',
  },
  // sizeは実行時propsから解決されるため、静的解析だけでは一部のvariantしかCSSが生成されない。
  // 全variantを強制生成する（Text/Headingと同じ理由）
  staticCss: ['*'],
})
