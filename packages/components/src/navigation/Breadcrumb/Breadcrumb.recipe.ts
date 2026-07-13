import { defineSlotRecipe } from '@pandacss/dev'

export const breadcrumbRecipe = defineSlotRecipe({
  className: 'breadcrumb',
  description: 'The styles for the Breadcrumb component',
  slots: ['nav', 'list', 'item', 'link', 'current'],
  base: {
    list: {
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: 'xs',
      listStyle: 'none',
      padding: 0,
      margin: 0,
    },
    item: {
      display: 'flex',
      alignItems: 'center',
      gap: 'xs',
      fontSize: 'md',
      // セパレータは装飾目的のみのためDOMノードを増やさず疑似要素で表現する
      '&:not(:last-child)::after': {
        content: '"/"',
        color: 'text.disabled',
      },
    },
    link: {
      color: 'text.link',
      textDecoration: 'underline',
      // Ark UIを使わないプレーンな<a>のため、focus-visible疑似クラスで判定する
      '&:focus-visible': {
        outline: '2px solid {colors.action.solid}',
        outlineOffset: '2px',
      },
    },
    current: {
      color: 'text.default',
    },
  },
})
