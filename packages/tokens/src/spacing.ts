// Headingのmargin調整に必要な最小限のspacingトークンのみを定義する。
// 他の用途（padding/gap等）は後続コンポーネントが必要とする時点で追加する（ADR 0004のYAGNI方針）。
// 値はv0.1のdraft運用（要件16番）に基づく初期値であり、Storybookで確認しながら調整可能。

export const spacing = {
  none: { value: '0' },
  xs: { value: '0.25rem' },
  sm: { value: '0.5rem' },
  md: { value: '1rem' },
  lg: { value: '1.5rem' },
  xl: { value: '2rem' },
  '2xl': { value: '3rem' },
}
