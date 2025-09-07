# Sazare UI 実装計画

## 1. プロジェクト概要

本計画は `docs/designPrinciple.md` に記載されたデザイン原則に基づき、個人開発用UIライブラリ「Sazare UI」の実装および**npm パッケージとして公開**するための計画書です。

### 技術スタック（確認済み）

- **UIライブラリフレームワーク**: React 19.1.0
- **スタイル**: Panda CSS (@pandacss/dev 0.53.7)
- **型システム**: TypeScript 5.8.3
- **ビルドツール**: Vite 6.3.5
- **ドキュメンテーション**: Storybook 9.0.1

## 2. 実装フェーズ

### フェーズ1: デザインシステムの基盤構築

#### 1.1 デザイントークンの定義・拡充

- **対象ファイル**: `panda.config.ts`（推定）
- **実装内容**:
  - カラーパレット（プライマリ、セカンダリ、グレースケール）
  - タイポグラフィ（フォントサイズ、行高、文字間隔）
  - スペーシングシステム（余白、マージン、パディング）
  - ボーダーラジアス
  - シャドウ（控えめなスタイル）
  - ブレークポイント

#### 1.2 アクセシビリティ設定

- **実装内容**:
  - WCAG準拠のコントラスト比設定
  - フォーカス可視化スタイル
  - セマンティックカラー定義（error, warning, success, info）

### フェーズ2: 基本UIコンポーネントの実装

#### 2.1 既存コンポーネントの改良

- **Button** （既存）
  - 現在の実装を維持・改良
  - アクセシビリティ対応の強化
  - バリアント追加（必要に応じて）

#### 2.2 新規基本コンポーネントの実装

以下の順序で実装：

1. **Typography**
   - `Text`
   - 統一されたフォントスタイル適用

2. **Input系コンポーネント**
   - `Input`, `Textarea`, `Select`
   - バリデーション状態の表示
   - Label, HelperText, ErrorMessageの統合

3. **Feedback系コンポーネント**
   - `Alert`, `Toast`
   - 各種状態（success, error, warning, info）

4. **Navigation系コンポーネント**
   - `Link`, `Breadcrumb`
   - キーボードナビゲーション対応

5. **Layout系コンポーネント**
   - `Container`, `Stack`, `Grid`
   - レスポンシブ対応

#### 2.3 Storiesの作成

- 各コンポーネントの `.stories.tsx` ファイル作成
- アクセシビリティテスト（@storybook/addon-a11y）の設定
- 使用例、バリアント、状態の網羅

### フェーズ3: 複合コンポーネントの実装

#### 3.1 Form系コンポーネント

- `FormField` (Input + Label + HelperText + ErrorMessage)
- `FormGroup`, `FormSection`
- バリデーション状態管理

#### 3.2 Overlay系コンポーネント

- `Modal`, `Drawer`
- フォーカストラップ、ESCキーでの閉じる機能
- アニメーション（控えめ）

#### 3.3 Data Display系コンポーネント

- `Card`, `Badge`, `Avatar`
- `Table`（基本的なソート・フィルタ機能）

#### 3.4 Feedback系コンポーネント

- `ProgressBar`, `Spinner`
- `Skeleton`（ローディング状態）

### フェーズ4: ユーティリティとHooks

#### 4.1 カスタムHooks

- `useDisclosure` (モーダル開閉管理)
- `useLocalStorage`
- `useFocusTrap`

#### 4.2 ユーティリティ関数

- クラス名結合関数
- アクセシビリティヘルパー

### フェーズ5: テスト・品質保証

#### 5.1 テスト環境整備

- Vitest + @vitest/browser の活用
- Visual Regression Testing (Playwright)
- Accessibility Testing の自動化

#### 5.2 品質チェック

- ESLint設定の最適化
- TypeScript strict mode対応
- パフォーマンス監視

### フェーズ6: ドキュメンテーション・エクスポート

#### 6.1 Storybook完成

- Design System Overview ページ
- コンポーネントガイドライン
- 使用例集

#### 6.2 パッケージ化準備

- ビルド設定最適化
- 型定義ファイル生成
- Tree-shaking対応

### フェーズ7: NPM パッケージ公開準備

#### 7.1 パッケージ設定

- **package.json の最適化**:
  - `private: true` を削除
  - `main`, `module`, `types` フィールドの設定
  - `exports` フィールドでモダンなエクスポート対応
  - `peerDependencies` の適切な設定（React, React-DOM）
  - `files` フィールドでビルド成果物のみを含める
  - パッケージメタデータ（description, keywords, author, license等）

#### 7.2 ビルド環境整備

- **Library Mode でのVite設定**:
  - エントリーポイントの設定
  - 外部依存関係の除外設定
  - 複数フォーマット出力（ESM, CJS, UMD）
  - CSS分離（Panda CSS生成物）
- **型定義の自動生成**:
  - `typescript` の `declaration: true` 設定
  - `.d.ts` ファイルのバンドル

#### 7.3 品質・互換性確保

- **Peer Dependencies の検証**:
  - React 16.8+ 対応確認
  - React 18/19 での動作検証
- **Bundle Size の最適化**:
  - Tree-shaking 対応確認
  - 不要な依存関係の除去
  - Bundle Analyzer での分析
- **Cross-platform テスト**:
  - 異なるNode.jsバージョンでのビルド確認
  - 異なるプロジェクト環境での動作確認

#### 7.4 ドキュメンテーション整備

- **README.md の充実**:
  - インストール方法
  - 基本的な使用方法
  - デザインシステムの説明
  - コンポーネント一覧とリンク
- **CHANGELOG.md の作成**:
  - セマンティックバージョニング準拠
  - 変更履歴の記録フォーマット確立
- **API ドキュメント**:
  - コンポーネント props の詳細説明
  - 使用例のコードサンプル

#### 7.5 CI/CD パイプライン構築

- **GitHub Actions 設定**:
  - プルリクエスト時の自動テスト
  - `main` ブランチへのマージ時の自動ビルド
  - タグ作成時の自動npm公開
- **リリースフロー確立**:
  - `npm version` コマンドでの自動バージョン管理
  - Git タグとの連携
  - リリースノートの自動生成

### フェーズ8: 初回公開・運用開始

#### 8.1 プレリリース

- **npm パッケージ名の確認**:
  - NPM レジストリでの名前重複チェック
  - スコープ付きパッケージ検討（例: `@username/sazare-ui`）
- **Beta版公開**:
  - `npm publish --tag beta` での限定公開
  - 他プロジェクトでの動作検証

#### 8.2 正式公開

- **v1.0.0 リリース**:
  - Stable API の確定
  - `npm publish` での正式公開
- **Storybook デプロイ**:
  - Chromatic, Netlify等でのホスティング
  - 公開URLの README への記載

#### 8.3 継続的メンテナンス計画

- **Issue管理**:
  - GitHub Issues でのバグ報告・機能要望受付
  - Issue テンプレートの作成
- **更新計画**:
  - 定期的なセキュリティアップデート
  - React新版への対応計画
  - 破壊的変更の管理方針

## 3. ディレクトリ構造（推奨）

```
src/
├── components/           # UIコンポーネント
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.stories.tsx
│   │   └── index.ts
│   ├── Input/
│   ├── Modal/
│   └── index.ts         # 全体エクスポート
├── hooks/               # カスタムHooks
├── utils/               # ユーティリティ関数
├── tokens/              # デザイントークン定義
└── types/               # 型定義
```

## 4. 実装優先度

### 高優先度（即座に着手）

1. デザイントークンの整備
2. Button コンポーネントの完成度向上
3. Typography系コンポーネント
4. Input系コンポーネント

### 中優先度

1. Layout系コンポーネント
2. Feedback系コンポーネント
3. Form系コンポーネント

### 中高優先度

1. パッケージ化準備（Library Mode ビルド設定）
2. NPM公開用 package.json 設定

### 低優先度（余裕があれば）

1. 複雑なData Display系コンポーネント
2. 高度なアニメーション
3. CI/CD パイプライン自動化

## 5. 品質基準

### デザイン原則の遵守

- **ミニマルデザイン**: 余白重視、装飾控えめ
- **高アクセシビリティ**: WCAG準拠、キーボードナビゲーション
- **一貫性**: デザイントークン活用、統一されたAPI設計

### 技術基準

- TypeScript strict mode
- 100% TypeScript coverage
- Storybookでの全コンポーネント文書化
- ESLint/Prettier準拠

## 6. NPM パッケージ公開への技術的考慮事項

### 6.1 パッケージ名候補

- `sazare-ui` (既に使用されている可能性有り)
- `@<username>/sazare-ui` (スコープ付き、推奨)
- その他の候補名検討

### 6.2 ライセンス選択

- MIT License (推奨: オープンソースライブラリの標準)
- Apache 2.0 License
- その他検討

### 6.3 必須対応項目（公開前）

1. **セキュリティ**: 依存関係の脆弱性チェック
2. **パフォーマンス**: バンドルサイズ最適化
3. **互換性**: 複数React版での動作確認
4. **アクセシビリティ**: WCAG準拠確認

## 7. 次のアクション

### 短期（1-2週間）

1. `panda.config.ts` の確認・改良
2. デザイントークンの具体的定義
3. Buttonコンポーネントの改良
4. package.json のライブラリ向け初期設定

### 中期（1-2ヶ月）

1. Typography コンポーネントの実装開始
2. Vite Library Mode の設定
3. 型定義ファイル生成設定

### 長期（3-6ヶ月）

1. 主要コンポーネント実装完了
2. beta版でのプレリリース
3. v1.0.0 での正式公開

この計画に基づき、段階的にSazare UIライブラリを構築し、最終的にnpmパッケージとして他のプロジェクトで再利用可能な形で公開します。
