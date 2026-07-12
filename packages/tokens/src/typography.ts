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
  // Badge/Toast等の小さいラベル・通知テキスト用。Heading/Text用のsm以上のスケールでは
  // 大きすぎるため、feedbackカテゴリ実装（Issue #42〜#46）で新規追加した
  xs: { value: '0.75rem' },
  sm: { value: '1.125rem' },
  md: { value: '1.25rem' },
  lg: { value: '1.5rem' },
  xl: { value: '1.875rem' },
  '2xl': { value: '2.25rem' },
  '3xl': { value: '3rem' },
}

export const fontWeights = {
  normal: { value: '400' },
  // Badge等、boldほど強調せず本文よりは強めにしたいラベルテキスト用。
  // feedbackカテゴリ実装（Issue #42〜#46）で新規追加した
  medium: { value: '500' },
  semibold: { value: '600' },
  bold: { value: '700' },
}

export const lineHeights = {
  // Badge等、単一行のラベルで行間を詰めたい場合用。feedbackカテゴリ実装で新規追加した
  none: { value: '1' },
  tight: { value: '1.25' },
  normal: { value: '1.5' },
}
