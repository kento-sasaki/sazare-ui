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
        heading: headingRecipe,
        text: textRecipe,
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
