import { defineSlotRecipe } from '@pandacss/dev'

export const radioGroupRecipe = defineSlotRecipe({
  className: 'radio-group',
  description: 'The styles for the RadioGroup component',
  slots: ['root', 'groupLabel'],
  base: {
    root: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'sm',
    },
    groupLabel: {
      fontSize: 'md',
      fontWeight: 'bold',
      color: 'text.default',
    },
  },
  // 実行時propsから解決される状態のCSSも静的解析では生成されないため、
  // 全variantを強制生成する（Checkbox/CheckboxGroup/Button/Text/Headingと同じ理由）
  staticCss: ['*'],
})
