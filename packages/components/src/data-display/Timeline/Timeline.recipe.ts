import { defineSlotRecipe } from '@pandacss/dev'

export const timelineRecipe = defineSlotRecipe({
  className: 'timeline',
  description: 'The styles for the Timeline component',
  slots: [
    'root',
    'item',
    'marker',
    'indicator',
    'separator',
    'content',
    'title',
    'meta',
    'description',
  ],
  base: {
    root: {
      display: 'flex',
      flexDirection: 'column',
      listStyle: 'none',
      padding: 0,
      margin: 0,
    },
    item: {
      display: 'flex',
      gap: 'sm',
    },
    marker: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    indicator: {
      width: '2.5',
      height: '2.5',
      borderRadius: 'full',
      bg: 'action.solid',
      flexShrink: 0,
    },
    separator: {
      flex: '1',
      width: '1px',
      bg: 'border.default',
      marginBlock: 'xs',
    },
    content: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5',
      paddingBottom: 'md',
    },
    title: {
      fontSize: 'md',
      fontWeight: 'semibold',
      color: 'text.default',
    },
    meta: {
      fontSize: 'xs',
      color: 'text.secondary',
    },
    description: {
      fontSize: 'sm',
      color: 'text.secondary',
    },
  },
})
