import { defineSlotRecipe } from '@pandacss/dev'

export const dividerRecipe = defineSlotRecipe({
  className: 'divider',
  description: 'The styles for the Divider component',
  slots: ['root', 'label'],
  base: {
    root: {
      display: 'flex',
      alignItems: 'center',
      color: 'text.secondary',
      fontSize: 'xs',
    },
    label: {
      paddingInline: 'sm',
    },
  },
  variants: {
    orientation: {
      horizontal: {
        root: {
          flexDirection: 'row',
          width: '100%',
          // ラベル無し時はセパレータ自身が1本の水平線になる。ラベル有り時は
          // 左右2本の::before/::afterでラベルを挟む（rootとlabelの2スロットのみで
          // ラベル有無どちらの見た目も表現できるようにするため）
          '&::before, &::after': {
            content: '""',
            flex: '1',
            height: '1px',
            bg: 'border.default',
          },
        },
      },
      vertical: {
        root: {
          flexDirection: 'column',
          height: '100%',
          '&::before, &::after': {
            content: '""',
            flex: '1',
            width: '1px',
            bg: 'border.default',
          },
        },
      },
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
  },
  // 実行時propsから解決されるorientation状態のCSSは静的解析では生成されないため、全variantを強制生成する
  staticCss: ['*'],
})
