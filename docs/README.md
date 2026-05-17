# Sazare UI ドキュメント

> ⚠️ **現状について**: このファイルは現時点では「ドキュメント体系の方針記録 + 着手予定一覧」として機能している。全 29 ドキュメントが揃った後、本格的な「全体目次・ナビゲーション」として書き換える予定。

## このドキュメントの位置づけ

本リポジトリ `sazare-ui` のすべてのドキュメントは、Spec-Driven Development (SDD) でデザインシステムを構築するための仕様・原則・プロセスを記録する。

実装に先立って **ドキュメントを徹底的に整備し、曖昧な点をなくしてから実装に入る** ことを基本方針とする。

---

## プロジェクトの位置づけ

sazare-ui は **個人開発専用** の React UI ライブラリだが、**「本格」レベル**で開発する。

- 一次目的: ユーザー自身の個人開発プロジェクトでの再利用
- npm 公開も視野に入れる
- コンポーネント仕様・アクセシビリティ・テスト基準まで詰める
- 「個人用だから雑でいい」ではなく、デザインシステムとしての一貫性・品質を OSS 同等レベルで担保する

---

## SDD アプローチ

### Spec の粒度

**コンポーネント単位で詳細** に書く。各コンポーネントの Spec は以下を網羅する：

- 概要
- Anatomy（構造）
- Props API
- 状態
- バリアント
- アクセシビリティ
- キーボード操作
- 不変条件
- 例外ケース
- 使用例
- **デザイントークンのマッピング**（このコンポーネントで使うトークンを明示）
- **テストシナリオ**（Given/When/Then 形式）

### Spec と実装の一貫性保証

Spec の「状態」「インタラクション」を **手動で 1:1 にテストケースへ翻訳** することで担保する。自動マッピングツールは作らない。

**Why**: Spec→テストの 1:1 翻訳により Spec 違反を機械的に検出可能にする。ツール化は YAGNI。

### デザイン素材

**Figma などのデザインカンプは存在しない**。**言語化された原則とデザイントークンが唯一のビジュアル決定根拠**。

**Why**: カンプ不在のため、トークン・原則の言語化品質が UI 品質を直接左右する。`principles/` と `tokens/` の精度がデザインシステム全体の精度を決める。

---

## ドキュメント体系（全 29 ファイル）

ファイル名は **kebab-case** で統一。レイヤーごとにディレクトリ分割。

```
docs/
├── README.md                              # 全体目次（このファイル）
├── DESIGN.md                              # design.md フォーマット準拠の集約エクスポート（二次的生成、後述）
├── vision.md                              # プロジェクトの目的・成功基準・非ゴール
├── roadmap.md                             # フェーズ計画・優先コンポーネント順
├── principles/                            # 原則レイヤー（言語化の中核）
│   ├── design-principles.md               # ミニマル・余白・装飾抑制の判断基準
│   ├── accessibility.md                   # WCAG 準拠レベル・フォーカス管理・キーボード対応基準
│   ├── api-design.md                      # Props 命名・compound component・asChild・polymorphic 方針
│   └── naming-conventions.md              # コンポーネント名・ファイル名・CSS 変数・Props 名規則
├── tokens/                                # デザイントークン（Figma 不在の代替）
│   ├── color.md                           # プライマリ・セマンティック・グレースケール・コントラスト比根拠
│   ├── typography.md                      # フォントファミリー・サイズスケール・行高・文字間隔
│   ├── spacing.md                         # スペーシングスケールと判断基準
│   ├── radius.md                          # ボーダーラジアススケール
│   ├── shadow.md                          # エレベーション・シャドウ階層
│   ├── breakpoint.md                      # レスポンシブブレークポイント
│   └── motion.md                          # トランジション・イージング
├── components/                            # コンポーネント Spec（SDD の本体）
│   ├── _template.md                       # Spec テンプレート
│   └── *.spec.md                          # 個別 Spec（実装と並行）
├── architecture/                          # アーキテクチャ
│   ├── overview.md                        # レイヤー構造・ディレクトリ構成
│   ├── tech-stack.md                      # 技術選定の理由
│   └── styling.md                         # Panda CSS の使い方・recipe 設計方針
├── quality/                               # 品質保証
│   ├── testing-strategy.md                # 単体・Visual・A11y・E2E テスト方針
│   ├── review-checklist.md                # コンポーネント追加時の DoD
│   └── performance.md                     # バンドルサイズ基準など
├── process/                               # プロセス
│   ├── sdd-workflow.md                    # SDD の運用ルール（Spec → 実装 → テスト）
│   ├── task-workflow.md                   # タスク管理（1 タスク = 1 Issue = 1 ブランチ）
│   ├── contributing.md                    # コンポーネント追加の手順
│   ├── versioning.md                      # SemVer・破壊的変更ポリシー
│   └── release.md                         # リリースフロー・CHANGELOG
└── publish/                               # 公開準備
    └── package-spec.md                    # npm パッケージとしての公開仕様
```

---

## 着手順序

### Phase 0（最優先・15 ファイル）

| #   | ファイル                           | 着手意図                                  |
| --- | ---------------------------------- | ----------------------------------------- |
| 1   | `process/sdd-workflow.md`          | SDD の運用ルール自体を最初に決める        |
| 2   | `process/task-workflow.md`         | タスク管理ルール（Issue・ブランチ）       |
| 3   | `components/_template.md`          | Spec テンプレートを固める                 |
| 4   | `vision.md`                        | 方向性を確定                              |
| 5   | `principles/design-principles.md`  | デザイン判断基準                          |
| 6   | `principles/accessibility.md`      | アクセシビリティ基準                      |
| 7   | `principles/api-design.md`         | API 設計指針                              |
| 8   | `principles/naming-conventions.md` | 命名規則                                  |
| 9   | `tokens/color.md`                  | カラートークン                            |
| 10  | `tokens/typography.md`             | タイポグラフィトークン                    |
| 11  | `tokens/spacing.md`                | スペーシングトークン                      |
| 12  | `tokens/radius.md`                 | ボーダーラジアストークン                  |
| 13  | `tokens/shadow.md`                 | シャドウトークン                          |
| 14  | `tokens/breakpoint.md`             | ブレークポイントトークン                  |
| 15  | `tokens/motion.md`                 | モーショントークン                        |

### Phase 1

`architecture/*`, `quality/*`, `process/contributing.md`, `roadmap.md`

### Phase 2（実装と並行）

`components/*.spec.md`

### Phase 3（公開直前）

`process/versioning.md`, `process/release.md`, `publish/package-spec.md`

---

## Spec テンプレートの確定項目

`components/_template.md` には以下を含める：

1. **標準セット**: 概要 / Anatomy / Props API / 状態 / バリアント / アクセシビリティ / キーボード操作 / 不変条件 / 例外ケース / 使用例
2. **デザイントークンのマッピング**: このコンポーネントで使うトークンを明示
3. **テストシナリオ**: Given/When/Then 形式

「関連コンポーネント・依存」は含めない方針。

---

## DESIGN.md の位置づけ（エクスポート）

`docs/DESIGN.md` は [Google Labs Code の design.md フォーマット](https://github.com/google-labs-code/design.md/blob/main/docs/spec.md) に準拠した、デザインシステム全体の集約ファイル。**一次ソースではなく、二次的に生成されるエクスポート** として位置づける。

### 位置づけ

- **一次ソース**: `tokens/*.md` および `principles/*.md`（これらが唯一の正）
- **DESIGN.md の役割**:
  - Claude 等 AI エージェントへ渡す集約コンテキスト（28 ファイル全部より圧倒的に効率的）
  - Figma 変数 / Tailwind config / `panda.config.ts` への変換ハブ
- **構成**: YAML frontmatter（機械可読なデザイントークン）+ Markdown 本文（人間可読な根拠・ガイドライン）
- **更新タイミング**: `tokens/*.md` または `principles/*.md` に変更があったとき
- **生成方法**: 当面は手動同期。将来的にスクリプト化を検討
- **着手タイミング**: Phase 0 で `tokens/*.md` と `principles/*.md` が確定した後（Phase 1 冒頭）

### Why エクスポート扱い

- `tokens/*.md` の方が「判断基準・根拠」を詳しく書ける（DESIGN.md の YAML は値の羅列）
- 一次ソースを 2 つ持つと整合性管理が破綻するため、`tokens/*.md` を唯一の一次ソースに固定
- DESIGN.md は派生物として「機械可読性」と「ポータビリティ」を確保

### sazare-ui を使う側のドキュメントについて

sazare-ui を使うアプリ側（例: ToDo アプリ）の **プロダクト仕様は sazare-ui リポジトリには置かない**。関心の分離のため、各アプリ側リポジトリで管理する。sazare-ui 側に配布する「Claude 向けスニペット」は、コンポーネント実装が進んでから必要に応じて検討する（現時点では作らない）。

---

## 既存ファイルの扱い

以下の 2 ファイルは **全面リプレース** 対象：

- `docs/designPrinciple.md`（暫定）
- `docs/implementationPlan.md`（暫定）

**削除タイミング**: 新ドキュメントへの内容吸収が完了した時点で削除する。作業中は参考資料として残す。

新体系へのマッピング想定：

- `designPrinciple.md` の「1. 目的とスコープ」→ `vision.md`
- `designPrinciple.md` の「2. デザイン原則」→ `principles/design-principles.md`, `principles/accessibility.md`
- `designPrinciple.md` の「3. 技術スタック」→ `architecture/tech-stack.md`
- `implementationPlan.md` のフェーズ計画 → `roadmap.md`
- `implementationPlan.md` のディレクトリ構造 → `architecture/overview.md`
- `implementationPlan.md` の品質基準 → `quality/review-checklist.md`
- `implementationPlan.md` の npm 公開準備 → `publish/package-spec.md`, `process/release.md`

---

## 技術スタック（既存決定の継承）

- **UI フレームワーク**: React
- **型システム**: TypeScript（strict mode）
- **スタイル**: Panda CSS（ビルド時静的 CSS、ランタイムオーバーヘッドなし）
- **ビルドツール**: Vite（Library Mode で npm パッケージ化）
- **ドキュメンテーション**: Storybook（コンポーネントカタログ）

詳細な選定理由は今後 `architecture/tech-stack.md` に転記する。

---

## ドキュメント作成プロセス

今後ドキュメントを作成していく際は、以下のサイクルで進める：

1. **方向性のヒアリング** — そのドキュメントで何を決めるか、Claude が論点を提示してユーザーと擦り合わせる
2. **ドラフト作成** — 合意した方向性に基づいて Claude がドラフトを書く
3. **レビュー・対話** — 内容を一緒にレビューし、不足や違和感を洗い出す
4. **修正・確定** — 修正を反映して確定版にする

**いきなり完成版を書かない**。対話しながら内容を精緻化していくことを基本とする。

---

## ヒアリング履歴

| 日時       | 内容                                                                                                                                                      |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 2026-05-16 | プロジェクトの位置づけ・SDD アプローチ・ドキュメント体系・Spec テンプレート項目・ファイル命名規則・既存ファイル扱い・着手順序を確定（このファイルに反映） |
