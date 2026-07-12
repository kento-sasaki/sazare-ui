// Buttonのborder-radiusに必要な最小限のトークンのみを定義する。
// 他の用途は後続コンポーネントが必要とする時点で追加する（ADR 0004のYAGNI方針）。
// 値はv0.1のdraft運用（要件16番）に基づく初期値であり、Storybookで確認しながら調整可能。

export const radii = {
  sm: { value: '4px' },
  md: { value: '6px' },
  // 完全な円形にするためのトークン。Spinnerで使用
  full: { value: '9999px' },
}
