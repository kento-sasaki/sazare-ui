---
status: accepted
date: 2026-07-11
---

# ADR 0009: Storybook サイドバーの整理（auto-title-prefix）

## コンテキスト

v0.1 スコープには約34個のコンポーネントが6カテゴリ（Typography / Form / Feedback / Overlay / Navigation / Data Display）にまたがって存在する（GitHub Issue #27〜#60）。何も設定しなければ Storybook のサイドバーはコンポーネント名がフラットに並ぶだけになり、34件規模ではカテゴリ単位のナビゲーションが失われる。

Storybook は `.storybook/main.ts` の `stories` 設定で、エントリごとに `directory` と `titlePrefix` を指定する **auto-title-prefix** 機能を提供している。マッチした `directory` 以下のファイルパス構造がそのままサイドバーの階層になり、各 story ファイル側で `title` を手書きする必要がない。

## 決定ドライバー（評価軸）

1. 34コンポーネント規模でのサイドバーのナビゲーションしやすさ
2. story ファイルごとに `title` を手書きする保守コストを避けられること
3. 既存の v0.1 コンポーネントカテゴリ区分（会話ログ・GitHub Issue #27〜#60）との一貫性

## 検討した選択肢

| 選択肢 | 強み | 弱み |
|---|---|---|
| カテゴリ別サブディレクトリ + auto-title-prefix | サイドバーが自動的にカテゴリ分けされ、story側の手書きtitleが不要 | コンポーネントのソース配置にカテゴリ階層を導入する必要がある（フラット構成からの変更） |
| フラット構成 + パッケージ単位のtitlePrefixのみ（Components/Tokens の2分類） | ディレクトリ構成がシンプルなまま | 34コンポーネントがサイドバー上でカテゴリ分けされず、規模に応じて探しにくくなる |
| フラット構成 + 各storyファイルに`title`を手書き | ディレクトリ構成は変えなくて済む | コンポーネント追加のたびに`title`の指定・カテゴリ分類の一貫性維持が手動になる |

## 決定

**コンポーネントのソースをカテゴリ別サブディレクトリに分け、`.storybook/main.ts` でカテゴリごとに `titlePrefix` を設定する。**

ディレクトリ構成（`packages/components/src/` 配下、カテゴリ名は kebab-case）:

```
packages/components/src/
  typography/
    Heading/
    Text/
  form/
    Button/
    TextInput/
    ...
  feedback/
    Spinner/
    Toast/
    ...
  overlay/
    Dialog/
    Tooltip/
    ...
  navigation/
    Tabs/
    Link/
    ...
  data-display/
    Table/
    Card/
    ...
```

`.storybook/main.ts` の設定イメージ:

```ts
const config: StorybookConfig = {
  stories: [
    { directory: '../packages/components/src/typography', titlePrefix: 'Typography' },
    { directory: '../packages/components/src/form', titlePrefix: 'Form' },
    { directory: '../packages/components/src/feedback', titlePrefix: 'Feedback' },
    { directory: '../packages/components/src/overlay', titlePrefix: 'Overlay' },
    { directory: '../packages/components/src/navigation', titlePrefix: 'Navigation' },
    { directory: '../packages/components/src/data-display', titlePrefix: 'Data Display' },
  ],
};
```

`packages/tokens` にトークンのドキュメント用 story を置く場合は、`titlePrefix: 'Tokens'` の別エントリを追加する（本ADRのスコープ外、着手時に決める）。

## 影響・懸念（未解決事項）

- 既存の GitHub Issue #27〜#60 の「関連ファイル・コンポーネント」に記載したパス（`packages/components/src/{ComponentName}/...`）は、本決定に合わせてカテゴリ別サブディレクトリのパスに更新する。
- カテゴリをまたぐコンポーネント（将来的に発生した場合）の分類ルールは本ADRでは定めない。

## 参考

- [Storybook — Sidebar & URLs: Auto-title prefixes](https://storybook.js.org/docs/configure/user-interface/sidebar-and-urls#auto-title-prefixes)
- [0004: パッケージ構成](./0004-package-structure.md)
