import { defineRecipe } from '@pandacss/dev'

export const linkRecipe = defineRecipe({
  className: 'link',
  description: 'The styles for the Link component',
  base: {
    color: 'text.link',
    textDecoration: 'underline',
    '&:focus-visible': {
      outline: '2px solid {colors.action.solid}',
      outlineOffset: '2px',
    },
  },
})
