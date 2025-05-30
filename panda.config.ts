// panda.config.ts
import { defineConfig } from '@pandacss/dev'

export default defineConfig({
  // CSSを生成する対象のファイル
  include: ['./src/**/*.{js,jsx,ts,tsx}'],

  // CSSを生成しないファイルを除外
  exclude: [],

  // 基本的なプリセットを使用
  presets: ['@pandacss/preset-panda'],

  // ここでデザインシステムの設定を定義！
  theme: {
    extend: {
      tokens: {
        // 色の定義（ミニマルなデザイン原則に合わせて）
        colors: {
          // メインのアクセントカラー
          primary: { value: '#EF4444' }, // 少し落ち着いた赤系
          // サブカラー (もし必要なら)
          secondary: { value: '#3B82F6' }, // 青系
          // 背景色
          background: { value: '#F9FAFB' }, // ごく薄いグレー
          // 基本のテキスト色
          text: { value: '#1F2937' }, // 濃い目のグレー
          // 状態色（成功、警告、エラーなど）
          success: { value: '#10B981' }, // 緑
          warning: { value: '#F59E0B' }, // オレンジ
          error: { value: '#EF4444' },   // 赤
        },
        // スペーシングの定義（広めの余白、8pxの倍数）
        spacing: {
          '0': { value: '0px' },
          '1': { value: '0.25rem' }, // 4px
          '2': { value: '0.5rem' },  // 8px
          '3': { value: '0.75rem' }, // 12px
          '4': { value: '1rem' },    // 16px
          '5': { value: '1.25rem' }, // 20px
          '6': { value: '1.5rem' },  // 24px
          '8': { value: '2rem' },    // 32px
          '10': { value: '2.5rem' }, // 40px
          '12': { value: '3rem' },   // 48px
          '16': { value: '4rem' },   // 64px
          '20': { value: '5rem' },   // 80px
        },
        // タイポグラフィの定義（可読性とミニマルさを意識）
        fontSizes: {
          xs: { value: '0.75rem' }, // 12px
          sm: { value: '0.875rem' }, // 14px
          base: { value: '1rem' }, // 16px
          lg: { value: '1.125rem' }, // 18px
          xl: { value: '1.25rem' }, // 20px
          '2xl': { value: '1.5rem' }, // 24px
          '3xl': { value: '1.875rem' }, // 30px
          '4xl': { value: '2.25rem' }, // 36px
        },
        lineHeights: {
          tight: { value: '1.25' },
          normal: { value: '1.5' },
          relaxed: { value: '1.625' },
        },
        fontWeights: {
          normal: { value: '400' },
          medium: { value: '500' },
          bold: { value: '700' },
        },
        // 影（控えめに）
        shadows: {
          subtle: { value: '0 1px 3px rgba(0,0,0,0.08)' }, // ほんのりとした影
          medium: { value: '0 4px 6px rgba(0,0,0,0.1)' } // 少し強めの影
        }
      },
      // その他のカスタム設定（例: ボーダー半径など）
      // borderRadius: {
      //   md: { value: '0.375rem' }, // 6px
      //   lg: { value: '0.5rem' }   // 8px
      // }
    },
  },

  // Reactを使うことを明示
  jsxFramework: 'react',
})
