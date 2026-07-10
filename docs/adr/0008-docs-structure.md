---
status: accepted
date: 2026-07-11
---

# ADR 0008: docs 構造

## コンテキスト

sazare-ui は元々 SDD（Spec-Driven Development）方針のもと `docs/` 配下に29ファイルの体系（`vision.md` / `principles/*` / `tokens/*` / `components/*.spec.md` / `architecture/*` / `quality/*` / `process/*` / `publish/*`）を計画していたが、2026-07-10 のコミットでこれを全て解体し `docs/requirement.md` 一本の箇条書きに再構成した。今後 docs をどこまで肥大化させるかを決める必要がある。

## 決定ドライバー(評価軸)

1. 29ファイル体系を解体した経緯・意図との一貫性
2. ソロ開発における文書メンテナンスコスト
3. 要件12番「意思決定はADRを作成してドキュメントを残したい」との整合性

## 検討した選択肢

| 選択肢 | 強み | 弱み |
|---|---|---|
| `requirement.md` + `docs/adr/` のみ | 文書が肥大化しない。コンポーネント仕様はStorybookのStory/Docsページに一本化でき、実装とドキュメントの乖離が起きにくい | コンポーネントの詳細な状態・インタラクション仕様までは文書に残らない |
| 最低限の `components/*.spec.md` を復活 | コンポーネントごとの詳細仕様（状態・インタラクション・A11y要件）を文書として残せる | 実装と仕様の二重管理になり、29ファイル体系を解体した意図と矛盾する |

## 決定

**`docs/requirement.md` + `docs/adr/` のみ** とする。コンポーネント仕様はコード自体と Storybook の Story / Docs ページに委ね、別途の spec.md は作らない。意思決定の記録は ADR に一本化する。

## 影響・懸念（未解決事項）

- Storybook 側のドキュメント充実度（Docs ページの記述量）に関する基準は本ADRでは定めない。

## 参考

- [0001: ヘッドレスUI + スタイリングの技術スタック](./0001-headless-ui-and-styling-stack.md)
