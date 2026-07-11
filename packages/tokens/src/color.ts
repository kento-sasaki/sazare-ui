// テキストのセマンティックカラーのみを定義する（SmartHR UIのText color（TEXT_BLACK/TEXT_WHITE/
// TEXT_GREY/TEXT_DISABLED/TEXT_LINK）相当）。
// 値はv0.1のdraft運用（要件16番）に基づく初期値であり、Storybookで確認しながら調整可能。

export const colors = {
  text: {
    default: { value: '#1F2937' },
    white: { value: '#FFFFFF' },
    secondary: { value: '#6B7280' },
    disabled: { value: '#9CA3AF' },
    link: { value: '#2563EB' },
  },
  // Buttonの主要アクション（solid背景・outlineボーダー/文字色）用の装飾色。
  // 色相は主要コンシューマーmabikiの藍(Ai)パレットの色相を踏襲しつつ、トークン名・値はsazare-ui固有に汎用化した
  action: {
    solid: { value: '#2F4C6B' },
    solidHover: { value: '#233A54' },
  },
  // Checkbox/Switch等のコントロール系コンポーネントの枠線・トラックに使うニュートラルな装飾色
  // （ADR 0013と同じ調達方針）。text.*のグレースケール（#1F2937/#6B7280/#9CA3AF）と
  // 明度が連続するよう中間階調を選んだ
  border: {
    default: { value: '#D1D5DB' },
  },
}
