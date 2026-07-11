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
      },
    },
  },
  defaultVariants: {
    variant: 'solid',
  },
})
