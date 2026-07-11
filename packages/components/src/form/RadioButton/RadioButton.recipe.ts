import { defineSlotRecipe } from '@pandacss/dev'

export const radioButtonRecipe = defineSlotRecipe({
  className: 'radio-button',
  description: 'The styles for the RadioButton/RadioGroup component',
  slots: ['root', 'groupLabel', 'item', 'itemControl', 'itemText'],
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
    item: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 'sm',
      cursor: 'pointer',
      _disabled: {
        cursor: 'not-allowed',
        opacity: 0.5,
      },
    },
    itemControl: {
      position: 'relative',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      // widthとheightはsizesトークンカテゴリを参照するため、spacingトークンを
      // 明示的な参照構文（{spacing.md}）で指定する（Checkbox.recipe.tsと同じ理由）
      width: '{spacing.md}',
      height: '{spacing.md}',
      borderRadius: 'full',
      border: '1px solid',
      borderColor: 'border.default',
      // 選択中は::afterで中央に塗りつぶしのドットを描画する（Ark UIのItemControlは
      // 中身を持たない単一のdivのため、Indicatorに相当する表現をCSS側で持つ）
      _after: {
        content: '""',
        display: 'none',
        width: '50%',
        height: '50%',
        borderRadius: 'full',
        bg: 'action.solid',
      },
      _checked: {
        borderColor: 'action.solid',
        _after: {
          display: 'block',
        },
      },
    },
    itemText: {
      fontSize: 'md',
      color: 'text.default',
    },
  },
  // 実行時propsから解決される状態（checked等）のCSSも静的解析では生成されないため、
  // 全variantを強制生成する（Checkbox/Button/Text/Headingと同じ理由）
  staticCss: ['*'],
})
