import { defineConfig } from '@pandacss/dev'
import {
  colors,
  fonts,
  fontSizes,
  fontWeights,
  lineHeights,
  radii,
  spacing,
} from '@sazare-ui/tokens'

import { buttonRecipe } from './src/form/Button/Button.recipe'
import { checkboxRecipe } from './src/form/Checkbox/Checkbox.recipe'
import { checkboxGroupRecipe } from './src/form/CheckboxGroup/CheckboxGroup.recipe'
import { iconButtonRecipe } from './src/form/IconButton/IconButton.recipe'
import { radioButtonRecipe } from './src/form/RadioButton/RadioButton.recipe'
import { radioGroupRecipe } from './src/form/RadioGroup/RadioGroup.recipe'
import { switchRecipe } from './src/form/Switch/Switch.recipe'
import { headingRecipe } from './src/typography/Heading/Heading.recipe'
import { textRecipe } from './src/typography/Text/Text.recipe'

export default defineConfig({
  // Storybookをリポジトリルートから起動する等、process.cwd()がこのパッケージの
  // ディレクトリと一致しない場合でもinclude/outdirが正しく解決されるよう明示する。
  // Pandaはこの設定ファイルをCJSとしてバンドル・評価するため__dirnameを使う
  // （import.meta.urlはその評価コンテキストでは undefined になる）。
  cwd: __dirname,
  preflight: true,
  include: ['./src/**/*.{ts,tsx}'],
  exclude: [],
  presets: ['@pandacss/preset-panda'],
  jsxFramework: 'react',
  theme: {
    extend: {
      tokens: {
        fonts,
        fontSizes,
        fontWeights,
        lineHeights,
        colors,
        spacing,
        radii,
      },
      recipes: {
        button: buttonRecipe,
        iconButton: iconButtonRecipe,
        heading: headingRecipe,
        text: textRecipe,
      },
      slotRecipes: {
        checkbox: checkboxRecipe,
        checkboxGroup: checkboxGroupRecipe,
        radioButton: radioButtonRecipe,
        radioGroup: radioGroupRecipe,
        // "switch"はJavaScriptの予約語のため、生成される styled-system/recipes/switch.ts の
        // named export（変数宣言）が構文エラーになる。recipeのキー名のみswitchFieldに変える
        // （CSSクラス名は Switch.recipe.ts 側の className: 'switch' のままでよい）
        switchField: switchRecipe,
      },
    },
  },
  // トークン外の値（例: bg: 'red'、fontSize: '123px'）をコンパイルエラーにする。
  // Box/Stack等のレイアウトプリミティブ経由のスタイル調整も含め、常にトークンの値のみを許容する
  // （エスケープハッチ構文`[xxx]`は残るが、既定では拒否される）。
  strictTokens: true,
  outdir: 'styled-system',
  // tsup(esbuild)が.mjs拡張子のディレクトリインデックスを解決できない既知の問題を回避する
  // （Panda公式ドキュメント: guides/component-library.mdx Troubleshooting）。
  outExtension: 'js',
})
