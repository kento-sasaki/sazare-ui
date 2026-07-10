import { defineConfig } from '@pandacss/dev'
import { colors, fonts, fontSizes, fontWeights, lineHeights, spacing } from '@sazare-ui/tokens'

import { headingRecipe } from './src/typography/Heading/Heading.recipe'

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
      },
      recipes: {
        heading: headingRecipe,
      },
    },
  },
  outdir: 'styled-system',
  // tsup(esbuild)が.mjs拡張子のディレクトリインデックスを解決できない既知の問題を回避する
  // （Panda公式ドキュメント: guides/component-library.mdx Troubleshooting）。
  outExtension: 'js',
})
