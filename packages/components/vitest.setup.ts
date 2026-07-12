import '@testing-library/jest-dom/vitest'

// jsdomはResizeObserverを実装していない。Ark UIのSelect等が内部で使う
// @zag-js/dom-queryのresize-observer.jsが`new window.ResizeObserver(...)`を
// 無条件に呼び出すため、ポリフィルが無いとフローティング要素を開くテストが例外で落ちる
class ResizeObserverPolyfill {
  observe() {}
  unobserve() {}
  disconnect() {}
}

globalThis.ResizeObserver = ResizeObserverPolyfill

// jsdomはElement.scrollTo/scrollIntoViewを実装していない。Ark UIのSelectは
// リスト選択時（select.machine.mjsのscrollContentToTop）やキーボード操作でのハイライト移動時に
// これらを呼び出すため、ポリフィルが無いとオプション選択のテストが例外で落ちる
Element.prototype.scrollTo = () => {}
Element.prototype.scrollIntoView = () => {}
