import { defineSlotRecipe } from '@pandacss/dev'

export const checkboxRecipe = defineSlotRecipe({
  className: 'checkbox',
  description: 'The styles for the Checkbox component',
  slots: ['root', 'control', 'indicator', 'label', 'group'],
  base: {
    group: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'sm',
    },
    root: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 'sm',
      cursor: 'pointer',
      _disabled: {
        cursor: 'not-allowed',
        opacity: 0.5,
      },
    },
    control: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      // widthとheightはsizesトークンカテゴリを参照するプロパティのため、sazare-uiが独自定義していない
      // sizesスケール（Panda既定プリセットの値）に誤って解決されないよう、spacingトークンを
      // 明示的な参照構文（{spacing.md}）で指定する
      width: '{spacing.md}',
      height: '{spacing.md}',
      borderRadius: 'sm',
      border: '1px solid',
      borderColor: 'border.default',
      bg: 'text.white',
      // Ark UIはchecked/indeterminateどちらもdata-state属性で表現するため、
      // 塗りつぶし背景は両状態で共通のスタイルにする
      _checked: {
        bg: 'action.solid',
        borderColor: 'action.solid',
      },
      _indeterminate: {
        bg: 'action.solid',
        borderColor: 'action.solid',
      },
    },
    // 表示/非表示自体はArk UIのCheckbox.Indicatorがhidden属性で制御するため、
    // ここでは見た目（色・サイズ）のみを定義する
    indicator: {
      color: 'text.white',
      width: '100%',
      height: '100%',
    },
    label: {
      fontSize: 'md',
      color: 'text.default',
    },
  },
  // 実行時propsから解決される状態（checked等）のCSSも静的解析では生成されないため、
  // 全variantを強制生成する（Button/Text/Headingと同じ理由）
  staticCss: ['*'],
})
