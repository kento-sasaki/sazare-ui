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
  // Checkbox/RadioButton/Switch/TextInput等のコントロール系コンポーネントの枠線・トラックに使う
  // ニュートラルな装飾色（ADR 0013と同じ調達方針）。text.*のグレースケール（#1F2937/#6B7280/#9CA3AF）と
  // 明度が連続するよう中間階調を選んだ
  border: {
    default: { value: '#D1D5DB' },
    // invalid状態（aria-invalid）の枠線色。mabikiのパレットに依存せず、
    // 業界で広く使われる汎用的な赤系（Tailwind red-600相当）を新規選定した
    danger: { value: '#DC2626' },
  },
  // Banner/Badge/StatusLabel/Toast（feedbackカテゴリ）のtone variant用の装飾色。
  // ADR 0013と同じ調達方針（値は業界で広く使われる汎用色を新規選定し、命名・構造はsazare-ui固有の
  // 汎用性を保つ）。text/bgのペアを持つためネスト構造にし、toneの型はkeyof typeof colors.feedbackで
  // 機械的に導出できるようにする（ADR 0011）。各toneのtext/bgペアはWCAG AA（4.5:1）を満たす組み合わせを選定した
  feedback: {
    // Badge/StatusLabelの既定tone。装飾色を持たないグレースケールだが、
    // ADR 0011（トークンpropsはkeyof typeofで機械導出し任意値を混ぜない）に合わせて
    // 他のtoneと同じネスト形状でここに定義する（text.secondaryに近いグレー系を採用）
    neutral: {
      text: { value: '#374151' },
      bg: { value: '#F3F4F6' },
    },
    success: {
      text: { value: '#15803D' },
      bg: { value: '#F0FDF4' },
    },
    warning: {
      text: { value: '#B45309' },
      bg: { value: '#FFFBEB' },
    },
    error: {
      // border.dangerと同系統だが、bg（#FEF2F2）とのコントラスト比がWCAG AA未達（4.41:1）だったため、
      // より濃いTailwind red-700相当（#B91C1C）に調整した（axe-coreのcolor-contrastで検証済み）
      text: { value: '#B91C1C' },
      bg: { value: '#FEF2F2' },
    },
    info: {
      text: { value: '#1D4ED8' },
      bg: { value: '#EFF6FF' },
    },
  },
}
