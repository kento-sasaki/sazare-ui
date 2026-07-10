---
status: accepted
date: 2026-07-11
---

# ADR 0011: デザイントークンに対応するpropsはトークンの列挙のみを許容する

## コンテキスト

Heading（Issue #27）に`color`propを追加するにあたり、任意のCSS色文字列（例: `color="#ff0000"`）を許容するか、`packages/tokens`で定義されたセマンティックカラーのキーのみに制約するかを決める必要があった。この決定はcolorに限らず、今後spacing・radius等トークン化された値に対応するpropsを持つ全コンポーネントに適用される原則になる。

## 決定ドライバー（評価軸）

1. デザインの一貫性（自由な値を許容すると、デザインシステムとしての統制が効かなくなる）
2. 型安全性（コンパイル時にtypoやトークン外の値を検出できるか）
3. 参考デザインシステムの実例

## 検討した選択肢

| 選択肢 | 強み | 弱み |
|---|---|---|
| 任意のCSS値を許容（例: `color="#ff0000"`、`color={string}`） | 利用側の自由度が高い | デザインの一貫性が失われる。トークンを定義する意味が薄れる。typoが実行時まで検出できない |
| デザイントークンのキーの列挙型のみ許容 | デザインの一貫性を型システムで強制できる。コンパイル時に不正な値を検出できる | 必要な値がトークルに無い場合はトークン追加が別途必要になる（ただし意図的な制約） |

SmartHR UIのTextコンポーネントは`color`を`TEXT_BLACK` / `TEXT_WHITE` / `TEXT_GREY` / `TEXT_DISABLED` / `TEXT_LINK` / `inherit`という閉じた列挙で制約しており、任意の色文字列は受け付けない実装になっている。

## 決定

**デザイントークンに対応するpropsは、常にトークンキーの列挙型のみを許容し、任意のCSS値は受け付けない。**

Headingの`color`propはSmartHR UIのText color相当として`default` / `white` / `secondary` / `disabled` / `link` / `inherit`の6値とした（`packages/tokens/src/color.ts`のtext系semantic colorに対応）。具体的な値のセットは各コンポーネントの必要に応じて決めてよいが、「トークンの列挙のみを許容し、任意の値を許容しない」という制約自体は全コンポーネント共通の原則とする。

## 影響・懸念（未解決事項）

- 今後spacing・radius等のトークンを追加する際も同じ原則を適用する
- Headingの6値のうち`disabled`/`link`は単体のHeadingでは使用頻度が低い想定だが、他コンポーネント（フォームラベルやリンク付き見出し等）との組み合わせを見越して定義した。実際に不要と判明すれば`packages/tokens`側で調整する

## 参考

- Issue #27（Heading実装、color prop追加）
- SmartHR UI `Text` コンポーネント（`color: TEXT_BLACK | TEXT_WHITE | TEXT_GREY | TEXT_DISABLED | TEXT_LINK | inherit`）
- [0010: Typographyコンポーネントの意味的レベルと見た目サイズの分離](./0010-typography-component-api-pattern.md)
