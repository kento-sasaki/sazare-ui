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

import { cardRecipe } from './src/data-display/Card/Card.recipe'
import { tableRecipe } from './src/data-display/Table/Table.recipe'
import { badgeRecipe } from './src/feedback/Badge/Badge.recipe'
import { bannerRecipe } from './src/feedback/Banner/Banner.recipe'
import { spinnerRecipe } from './src/feedback/Spinner/Spinner.recipe'
import { toastRecipe } from './src/feedback/Toast/Toast.recipe'
import { buttonRecipe } from './src/form/Button/Button.recipe'
import { checkboxRecipe } from './src/form/Checkbox/Checkbox.recipe'
import { checkboxGroupRecipe } from './src/form/CheckboxGroup/CheckboxGroup.recipe'
import { comboboxRecipe } from './src/form/Combobox/Combobox.recipe'
import { datePickerRecipe } from './src/form/DatePicker/DatePicker.recipe'
import { fileUploadRecipe } from './src/form/FileUpload/FileUpload.recipe'
import { formControlRecipe } from './src/form/FormControl/FormControl.recipe'
import { iconButtonRecipe } from './src/form/IconButton/IconButton.recipe'
import { radioButtonRecipe } from './src/form/RadioButton/RadioButton.recipe'
import { radioGroupRecipe } from './src/form/RadioGroup/RadioGroup.recipe'
import { segmentedControlRecipe } from './src/form/SegmentedControl/SegmentedControl.recipe'
import { selectRecipe } from './src/form/Select/Select.recipe'
import { switchRecipe } from './src/form/Switch/Switch.recipe'
import { textareaRecipe } from './src/form/Textarea/Textarea.recipe'
import { textInputRecipe } from './src/form/TextInput/TextInput.recipe'
import { accordionRecipe } from './src/navigation/Accordion/Accordion.recipe'
import { breadcrumbRecipe } from './src/navigation/Breadcrumb/Breadcrumb.recipe'
import { linkRecipe } from './src/navigation/Link/Link.recipe'
import { paginationRecipe } from './src/navigation/Pagination/Pagination.recipe'
import { stepperRecipe } from './src/navigation/Stepper/Stepper.recipe'
import { tabsRecipe } from './src/navigation/Tabs/Tabs.recipe'
import { dialogRecipe } from './src/overlay/Dialog/Dialog.recipe'
import { drawerRecipe } from './src/overlay/Drawer/Drawer.recipe'
import { dropdownMenuRecipe } from './src/overlay/DropdownMenu/DropdownMenu.recipe'
import { tooltipRecipe } from './src/overlay/Tooltip/Tooltip.recipe'
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
      keyframes: {
        spin: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
      },
      recipes: {
        button: buttonRecipe,
        iconButton: iconButtonRecipe,
        textarea: textareaRecipe,
        textInput: textInputRecipe,
        spinner: spinnerRecipe,
        badge: badgeRecipe,
        heading: headingRecipe,
        text: textRecipe,
        link: linkRecipe,
        card: cardRecipe,
      },
      slotRecipes: {
        checkbox: checkboxRecipe,
        checkboxGroup: checkboxGroupRecipe,
        combobox: comboboxRecipe,
        datePicker: datePickerRecipe,
        fileUpload: fileUploadRecipe,
        formControl: formControlRecipe,
        radioButton: radioButtonRecipe,
        radioGroup: radioGroupRecipe,
        segmentedControl: segmentedControlRecipe,
        select: selectRecipe,
        // "switch"はJavaScriptの予約語のため、生成される styled-system/recipes/switch.ts の
        // named export（変数宣言）が構文エラーになる。recipeのキー名のみswitchFieldに変える
        // （CSSクラス名は Switch.recipe.ts 側の className: 'switch' のままでよい）
        switchField: switchRecipe,
        banner: bannerRecipe,
        toast: toastRecipe,
        breadcrumb: breadcrumbRecipe,
        dialog: dialogRecipe,
        drawer: drawerRecipe,
        dropdownMenu: dropdownMenuRecipe,
        tooltip: tooltipRecipe,
        tabs: tabsRecipe,
        pagination: paginationRecipe,
        accordion: accordionRecipe,
        stepper: stepperRecipe,
        table: tableRecipe,
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
