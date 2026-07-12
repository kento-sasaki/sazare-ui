import { defineRecipe } from '@pandacss/dev'

export const spinnerRecipe = defineRecipe({
  className: 'spinner',
  description: 'The styles for the Spinner component',
  base: {
    display: 'inline-block',
    borderRadius: 'full',
    border: '2px solid',
    borderColor: 'border.default',
    borderTopColor: 'action.solid',
    animation: 'spin 0.75s linear infinite',
  },
  variants: {
    size: {
      sm: { width: '{spacing.sm}', height: '{spacing.sm}' },
      md: { width: '{spacing.md}', height: '{spacing.md}' },
      lg: { width: '{spacing.lg}', height: '{spacing.lg}' },
    },
  },
  defaultVariants: {
    size: 'md',
  },
})
