import { defineSlotRecipe } from '@pandacss/dev'

export const dropdownMenuRecipe = defineSlotRecipe({
  className: 'dropdownMenu',
  description: 'The styles for the DropdownMenu component',
  // Ark UIのMenu.Rootはコンテキストプロバイダのみでark.divを描画しないため、
  // rootスロットは持たない（Dialog.recipe.tsと同じ理由）
  slots: ['trigger', 'positioner', 'content', 'item', 'itemText'],
  base: {
    trigger: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 'sm',
      borderRadius: 'md',
      border: '1px solid',
      borderColor: 'border.default',
      bg: 'text.white',
      paddingInline: 'md',
      paddingBlock: 'sm',
      fontSize: 'md',
      color: 'text.default',
      cursor: 'pointer',
      _focusVisible: {
        outline: 'none',
        borderColor: 'action.solid',
      },
    },
    positioner: {
      zIndex: 1,
    },
    content: {
      display: 'flex',
      flexDirection: 'column',
      gap: '{spacing.xs}',
      minWidth: '10rem',
      borderRadius: 'md',
      border: '1px solid',
      borderColor: 'border.default',
      bg: 'text.white',
      padding: 'xs',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
    },
    item: {
      display: 'flex',
      alignItems: 'center',
      borderRadius: 'sm',
      paddingInline: 'sm',
      paddingBlock: 'xs',
      fontSize: 'md',
      color: 'text.default',
      cursor: 'pointer',
      // SelectのitemスタイルとRecipe構造を揃える（メモリ: ark-ui-single-component-wrap）
      _highlighted: {
        bg: 'border.default',
      },
      _disabled: {
        cursor: 'not-allowed',
        color: 'text.disabled',
      },
    },
    itemText: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
  },
})
