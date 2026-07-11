---
status: accepted
date: 2026-07-11
---

# ADR 0012: コンポーネントはclassName/styleを受け付けず、レイアウト合成はBox/Stackを介する

## コンテキスト

Heading（Issue #27）にclassNameを受け取りPanda生成クラスとマージする実装があったが、これを見直したいという議論が発生した。ADR 0011でcolor・marginBottom等のpropsはデザイントークンの列挙のみを許容するよう制約したが、`className`（および`style`）propが並存する限り、利用側はこの制約を完全に迂回して任意のCSSで見た目を上書きできてしまう。この決定はHeadingに限らず、今後の全コンポーネントに適用する原則として決めておく。

## 決定ドライバー（評価軸）

1. デザインシステムとしての一貫性の担保（トークン制約の実効性）
2. レイアウト合成（複数要素の配置・余白調整等）の現実的なニーズにどう応えるか
3. 「完全な防止」が原理的に不可能な中で、コンポーネントAPIの責務としてどこまでを担うか（`style`prop・利用側のグローバルCSSでの子孫セレクタ上書き等はコンポーネントAPIの範囲外であり別問題）

## 検討した選択肢

| 選択肢 | 強み | 弱み |
|---|---|---|
| className/styleを許容し続ける（現状維持） | 利用側の柔軟性が最大。追加実装コストゼロ | ADR 0011のトークン制約が実質的に無意味化する。任意のCSSで見た目を上書きできてしまう |
| className/styleを公開propsから排除し、デザイントークン制約済みのpropsのみを公開APIとする | デザインの一貫性を型システムで担保できる | 個別コンポーネントのpropsでは網羅しきれないレイアウト要求（複数要素の配置・gap等）に対応できなくなる |

## 決定

**className/styleを全コンポーネントの公開propsから排除する。**

- `HeadingProps`は`Omit<ComponentPropsWithRef<'h2'>, ... | 'className' | 'style'>`とし、`className`/`style`を受け付けない
- レイアウト合成（複数要素の配置・余白・gap等）は、Panda CSSが自動生成する`Box`/`Stack`プリミティブ（`packages/components/src/layout/`配下で再export）を介して行う
- `packages/components/panda.config.ts`に`strictTokens: true`を設定し、Box/Stackのstyle props（`padding`/`gap`等）もトークン値のみに制約する（エスケープハッチ構文`[xxx]`は残るが、既定では任意値がコンパイルエラーになる）

この制約はTypeScriptの型レベルでのみ強制され、実行時のバリデーションは行わない。ADR 0011の他のトークン制約propsと同じ思想であり、TypeScriptを介さない意図的なバイパスまでは防げない。

## 影響・懸念（未解決事項）

- Box/Stack以外のレイアウトプリミティブ（Flex/Grid等、Pandaは他に約16種類を自動生成する）は現時点では公開しない。必要になった時点で追加する（YAGNI、ADR 0004）
- Box/StackはPanda自身が生成・テスト済みの実装であるため、sazare-ui側では独自のユニットテストを作成しない。ドキュメント目的の最小限のStorybook story（`Layout/Stack`）のみ用意する
- Box/Stack自体は（Panda生成の`HTMLStyledProps`由来で）`className`を保持している。これはHeading等「sazare-uiが見た目を所有するコンポーネント」と、Box/Stack「汎用レイアウトプリミティブ」とで役割が異なるため矛盾ではない
- 既存コンシューマー（mabiki）が将来的にBox/Stackでも対応できないレイアウト要求に直面した場合は、新しいレイアウトプリミティブの追加や対象コンポーネントへの新規prop追加で対応し、className単位での個別許可はしない

## 参考

- Issue #27（Heading実装）
- [0011: デザイントークンに対応するpropsはトークンの列挙のみを許容する](./0011-token-constrained-props.md)
- Panda CSS `strictTokens`（[Writing Styles](https://panda-css.com/docs/concepts/writing-styles)）
