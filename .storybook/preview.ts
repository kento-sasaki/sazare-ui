import '../packages/components/src/styles.css'

import type { Preview } from '@storybook/react-vite'

// Storybookのコア計装機能（Actions/Interactionsパネル用）は`HTMLElement.prototype.focus`を
// getter/setterへ書き換え、Ark UI（`@zag-js/focus-visible`）も同じプロトタイプメソッドを
// 独自に書き換えようとする。両者が競合すると、zag-jsが`win.HTMLElement.prototype.focus`を
// プロトタイプ経由で直接読み取った際にStorybook側のgetterが`this`を実要素だと仮定した
// `this.ownerDocument`アクセスを行い、`TypeError: Illegal invocation`が発生してArk UIの
// popper位置計算が中断される（フローティング要素が画面外に固定されたままになる）。
// `focus`をconfigurable: falseの通常データプロパティとして固定すると、両者のdefineProperty呼び出しは
// 自身のtry/catchで無害に失敗し、ネイティブのfocus実装がそのまま維持される。
// 副作用はStorybookのActions/Interactionsパネルにおける「focus呼び出しのスパイ」機能が
// 無効化されることのみ（フォーカスの実際の移動自体には影響しない）。
if (typeof HTMLElement !== 'undefined') {
  const nativeFocus = HTMLElement.prototype.focus
  try {
    Object.defineProperty(HTMLElement.prototype, 'focus', {
      value: nativeFocus,
      writable: true,
      configurable: false,
      enumerable: false,
    })
  } catch {
    // 既に非configurableな場合は何もしない
  }
}

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    options: {
      storySort: {
        method: 'alphabetical',
      },
    },
  },
}

export default preview
