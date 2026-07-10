---
status: accepted
date: 2026-07-11
---

# ADR 0003: リリース・バージョニング戦略

## コンテキスト

[0002](./0002-package-distribution-model.md) で sazare-ui は npm レジストリへ private 公開することを決定した。これに伴い、バージョン採番・CHANGELOG生成・publish タイミングをどう自動化するかを決める必要がある。また [0004](./0004-package-structure.md) で pnpm workspace による monorepo 構成（`packages/tokens` / `packages/components`）を採用しており、複数パッケージのバージョンを協調して管理できる仕組みが必要。

## 決定ドライバー（評価軸）

1. pnpm workspace（複数パッケージ）でのバージョン管理のしやすさ
2. ソロ開発での運用負荷（手動ステップの少なさ）
3. CHANGELOG の自動生成

## 検討した選択肢

| 選択肢 | 強み | 弱み |
|---|---|---|
| Changesets | PRごとに changeset ファイルで変更内容を記録し、CHANGELOG自動生成・バージョンバンプを自動化。pnpm monorepo での事実上の標準 | 導入時に一定のセットアップが必要 |
| 手動 semver + `npm publish` 手実行 | 導入コストがほぼゼロ | パッケージが複数（tokens/react）になると手動でのバージョン協調が煩雑になり、ヒューマンエラーが起きやすい |

## 決定

**Changesets** を採用する。PRごとに changeset ファイルを追加し、CI（[0005](./0005-ci-scope.md)）で main マージ後に自動的にバージョンバンプ・CHANGELOG生成・npm publish を行うフローを組む。

初期バージョンは各パッケージとも **`0.1.0`** から開始する（`1.0.0` にはしない）。sazare-ui は要件16番の通り「必要なコンポーネント・トークンを一通り実装し、Storybookの`draft`タグを付けて後から調整する」段階であり、安定した公開APIを約束できる状態ではないため、pre-1.0（`0.x`）で運用する。

## 影響・懸念（未解決事項）

- Changesets の具体的な CI ワークフロー（`changesets/action` 等の採用可否）は CI 構築時に詰める。
- パッケージ間の依存バージョン範囲（`workspace:*` から publish 時にどう解決するか）は実装時に確認する。

## 参考

- [0002: パッケージ配布モデル](./0002-package-distribution-model.md)
- [0004: パッケージ構成](./0004-package-structure.md)
- [Changesets](https://github.com/changesets/changesets)
