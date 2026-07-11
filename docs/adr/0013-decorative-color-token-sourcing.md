---
status: draft
date: 2026-07-11
---

# ADR 0013: 装飾色トークンは主要コンシューマーの色相を参照しつつ汎用的な命名で調達する

## コンテキスト

Button（Issue #29）の実装にあたり、solid/outline variant に使う装飾色（primary相当）が必要になった。`packages/tokens/src/color.ts` には `colors.text.*`（テキストのセマンティックカラー）しか定義されておらず、装飾色トークンは「装飾色（primary/success/warning等）は後続コンポーネントが必要とする時点で追加する」として意図的に未定義のまま残されていた。Button がその最初の「後続コンポーネント」に該当し、どのような色を・どう調達し・どう命名するかを決める必要があった。

## 決定ドライバー（評価軸）

1. 主要コンシューマー mabiki（個人開発アプリ）のブランドイメージとの一貫性
2. sazare-ui は mabiki 専用ではなく汎用のデザインシステムであるため、特定コンシューマー固有の概念に依存しすぎないこと
3. v0.1 draft 運用における新規リサーチ・調整コストの低さ
4. 既存トークン（`text.link` 等）との整合性・独立性

## 検討した選択肢

| 選択肢 | 強み | 弱み |
|---|---|---|
| 既存 `text.link`(#2563EB) をそのまま流用 | 新規トークン不要、実装コスト最小 | mabiki のブランドイメージ（藍）と無関係な色になる |
| 参考デザインシステム（SmartHR UI / DADS 等）の primary 色を新規調査 | 業界標準に沿える | 調査コストが掛かり、mabiki との一貫性もない |
| mabiki の藍(Ai)パレットをトークン名・値ともにそのまま移植 | mabiki との一貫性が最大、実装が速い | mabiki 固有の概念（紙色に馴染むテキスト色、`ai`/`ai-deep` 命名）を持ち込み、汎用デザインシステムとしての独立性を損なう |
| 色相の値のみ mabiki の藍パレットを流用し、トークン名・関連トークン（on-action テキスト等）は sazare-ui 固有に汎用化 | mabiki のイメージを継承しつつ、汎用デザインシステムとして独立して成立する | mabiki 側の値が変わっても sazare-ui 側は自動追従しない（意図的な疎結合として許容） |

## 決定

**色相の値のみ mabiki の藍パレットを流用し、トークン名・関連トークンは sazare-ui 固有に汎用化する。**

- `colors.action.solid`(#2F4C6B) / `colors.action.solidHover`(#233A54) という汎用名のトークンを新設し、色相の値のみ mabiki の藍(Ai)パレット（`ai` / `ai-deep`）を流用した
- solid 上のテキスト色は新規トークンを増やさず、既存の `colors.text.white`(#FFFFFF) を流用した。mabiki 固有の「紙色に馴染むテキスト色」（`text-on-accent` = `paper-raised`）の概念は持ち込まない
- mabiki 固有のトークン命名（`ai` / `ai-deep`）は採用せず、sazare-ui の既存命名規則（`colors.<category>.<variant>`）に合わせて `action.solid` / `action.solidHover` とした

## 影響・懸念（未解決事項）

- 既存の `text.link`(#2563EB) とは別系統の色として併存し、今回は統合しない。同一UI上で「リンクの青」と「ボタンの藍」が異なる色相になる不整合は、将来的な整理課題として残る
- 今後 success / warning 等の装飾色を追加する際も同じ原則（値は必要に応じて参照元から借用してよいが、命名・トークン構造は sazare-ui 固有の汎用性を保つ）を適用する
- mabiki 側でパレットが変更された場合、sazare-ui 側は自動追従しない（意図的な疎結合のトレードオフ）

## 参考

- Issue #29（Button 実装）
- mabiki `DESIGN.md`（藍(Ai)パレットの参照元。`/Users/sasakitkento/Dev/mabiki/DESIGN.md`）
- [0011: デザイントークンに対応するpropsはトークンの列挙のみを許容する](./0011-token-constrained-props.md)
- [0004: パッケージ構成](./0004-package-structure.md)（YAGNI、必要になった時点でトークンを追加する方針）
