import { defineSlotRecipe } from '@pandacss/dev'

export const formControlRecipe = defineSlotRecipe({
  className: 'formControl',
  description: 'The styles for the FormControl component',
  slots: ['root', 'label', 'helperText', 'errorText'],
  base: {
    root: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'xs',
    },
    label: {
      fontSize: 'md',
      fontWeight: 'bold',
      color: 'text.default',
    },
    helperText: {
      fontSize: 'sm',
      color: 'text.secondary',
    },
    errorText: {
      fontSize: 'sm',
      color: 'border.danger',
    },
  },
  // helperText/errorTextの表示切り替えは実行時propsで決まるため、静的解析だけでは
  // 一部のスロットしかCSSが生成されない。全スロットを強制生成する（Select/TextInputと同じ理由）
  staticCss: ['*'],
})
