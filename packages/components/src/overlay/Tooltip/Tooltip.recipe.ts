import { defineSlotRecipe } from '@pandacss/dev'

export const tooltipRecipe = defineSlotRecipe({
  className: 'tooltip',
  description: 'The styles for the Tooltip component',
  // Ark UIのTooltip.Rootはコンテキストプロバイダのみでark.divを描画しないため、
  // rootスロットは持たない（Dialog.recipe.tsと同じ理由）。非モーダルのため
  // backdrop/title/description/closeTriggerに相当するスロットも無い
  slots: ['trigger', 'positioner', 'content'],
  base: {
    trigger: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: 'none',
      bg: 'transparent',
      padding: 0,
      fontSize: 'md',
      color: 'text.default',
      cursor: 'pointer',
      _focusVisible: {
        outline: '2px solid {colors.action.solid}',
        outlineOffset: '2px',
      },
    },
    positioner: {
      zIndex: 1,
    },
    content: {
      borderRadius: 'sm',
      bg: 'text.default',
      color: 'text.white',
      paddingInline: 'sm',
      paddingBlock: 'xs',
      fontSize: 'xs',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
    },
  },
})
