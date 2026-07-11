import { defineSlotRecipe } from '@pandacss/dev'

export const checkboxGroupRecipe = defineSlotRecipe({
  className: 'checkboxGroup',
  description: 'The styles for the CheckboxGroup component',
  slots: ['group'],
  base: {
    group: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'sm',
    },
  },
  // 実行時propsから解決される状態のCSSも静的解析では生成されないため、
  // 全variantを強制生成する（Checkbox/Button/Text/Headingと同じ理由）
  staticCss: ['*'],
})
