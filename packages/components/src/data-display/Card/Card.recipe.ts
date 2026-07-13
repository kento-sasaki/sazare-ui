import { defineRecipe } from '@pandacss/dev'

export const cardRecipe = defineRecipe({
  className: 'card',
  description: 'The styles for the Card component',
  base: {
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'border.default',
    borderRadius: 'md',
    padding: 'md',
  },
})
