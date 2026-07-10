// テキストのセマンティックカラーのみを定義する（SmartHR UIのText color（TEXT_BLACK/TEXT_WHITE/
// TEXT_GREY/TEXT_DISABLED/TEXT_LINK）相当）。装飾色（primary/success/warning等）は
// 後続コンポーネントが必要とする時点で追加する（ADR 0004のYAGNI方針）。
// 値はv0.1のdraft運用（要件16番）に基づく初期値であり、Storybookで確認しながら調整可能。

export const colors = {
  text: {
    default: { value: '#1F2937' },
    white: { value: '#FFFFFF' },
    secondary: { value: '#6B7280' },
    disabled: { value: '#9CA3AF' },
    link: { value: '#2563EB' },
  },
}
