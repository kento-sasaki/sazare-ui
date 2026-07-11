import { defineRecipe } from '@pandacss/dev'

export const textRecipe = defineRecipe({
  className: 'text',
  description: 'The styles for the Text component',
  base: {
    fontFamily: 'body',
    lineHeight: 'normal',
    margin: 0,
  },
})
