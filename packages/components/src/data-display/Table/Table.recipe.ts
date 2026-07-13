import { defineSlotRecipe } from '@pandacss/dev'

export const tableRecipe = defineSlotRecipe({
  className: 'table',
  description: 'The styles for the Table component',
  slots: ['root', 'head', 'body', 'row', 'headerCell', 'cell'],
  base: {
    root: {
      width: '100%',
      borderCollapse: 'collapse',
      fontSize: 'md',
    },
    head: {
      borderBottomWidth: '1px',
      borderBottomStyle: 'solid',
      borderBottomColor: 'border.default',
    },
    row: {
      borderBottomWidth: '1px',
      borderBottomStyle: 'solid',
      borderBottomColor: 'border.default',
      '&:last-child': {
        borderBottomWidth: 0,
      },
    },
    headerCell: {
      textAlign: 'left',
      paddingInline: 'sm',
      paddingBlock: 'xs',
      fontWeight: 'semibold',
      color: 'text.secondary',
    },
    cell: {
      textAlign: 'left',
      paddingInline: 'sm',
      paddingBlock: 'xs',
      color: 'text.default',
    },
  },
})
