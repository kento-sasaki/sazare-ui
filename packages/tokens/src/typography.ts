// Heading（typographyカテゴリ）実装に必要な最小限のトークンのみを定義する。
// 他カテゴリ（spacing/radius/shadow等）は後続コンポーネントが必要とする時点で追加する（ADR 0004、YAGNI）。
// 値はv0.1の draft 運用（要件16番）に基づく初期値であり、Storybookで確認しながら調整可能。

export const fonts = {
  heading: {
    value: 'ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif',
  },
  body: {
    value: 'ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif',
  },
}

export const fontSizes = {
  sm: { value: '1.125rem' },
  md: { value: '1.25rem' },
  lg: { value: '1.5rem' },
  xl: { value: '1.875rem' },
  '2xl': { value: '2.25rem' },
  '3xl': { value: '3rem' },
}

export const fontWeights = {
  normal: { value: '400' },
  semibold: { value: '600' },
  bold: { value: '700' },
}

export const lineHeights = {
  tight: { value: '1.25' },
  normal: { value: '1.5' },
}

export const colors = {
  text: { value: '#1F2937' },
}
