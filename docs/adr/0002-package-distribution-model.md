---
status: accepted
date: 2026-07-11
---

# ADR 0002: パッケージ配布モデル

## コンテキスト

sazare-ui は React 専用の UI ライブラリ／デザインシステムであり、[mabiki](https://github.com/kento-sasaki/mabiki)（個人開発のバレットジャーナル風アプリ、pnpm monorepo）がこれを利用する想定の唯一のコンシューマーである。mabiki は既に自身のアプリ内に Radix UI + Tailwind CSS v4 + CVA によるコンポーネント実装と Storybook を持つが、この事実は [0001](./0001-headless-ui-and-styling-stack.md) の技術スタック選定の評価軸には含めない方針とした。技術スタックとは独立に、sazare-ui のコードをどうやって mabiki に届けるか（配布モデル）を決める必要がある。

## 決定ドライバー（評価軸）

1. requirement.md が sazare-ui を明確に「ライブラリ」と呼んでいること（コピー所有型ではなくimport型を想定）
2. バージョン管理・CI での build/publish パイプラインを正式に組めること
3. mabiki 以外の将来のアプリ・npm 公開への拡張余地

## 検討した選択肢

| 選択肢 | 強み | 弱み |
|---|---|---|
| npm レジストリへ公開（private） | 通常の `npm install` で消費でき、Changesets 等の標準的なリリースフローと相性が良い。sazare-ui と mabiki を別リポジトリのまま維持できる | publish パイプラインの構築が必要 |
| pnpm workspace で monorepo 化（mabiki に取り込む、または逆） | publish 不要で即座に変更が反映される | sazare-ui を独立したリポジトリとして管理したい現在の方針と矛盾する |
| pnpm link でローカル開発、将来的に publish へ移行 | 初期のイテレーション速度を優先できる | 暫定措置であり、いずれ本決定と同じ選択に移行する必要がある |

## 決定

**npm レジストリへ private 公開**し、mabiki からは通常の dependency として `npm install` で取得する。sazare-ui と mabiki は別リポジトリのまま維持する。

## 影響・懸念（未解決事項）

- private レジストリの実体（GitHub Packages か npmjs の private scope か）は未決定。CI 構築時に決める。
- 公開範囲（将来 public 化するか）は本ADRのスコープ外。

## 参考

- [0001: ヘッドレスUI + スタイリングの技術スタック](./0001-headless-ui-and-styling-stack.md)
