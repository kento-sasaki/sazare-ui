# 技術選定（ゼロベース再評価）

> **ステータス**: ドラフト（検討中 / 2026-05-29）。
> 既存の `designPrinciple.md` / `implementationPlan.md` が前提としていた **Panda CSS 採用を一旦白紙に戻し**、ゼロベースで再評価した記録。最終確定は未了（§9 の検証を経て確定する）。確定後、この文書が技術スタックの一次ソースとなり、暫定記述を supersede する。

## 1. この文書の目的

「Panda CSS を使う」という暫定決定に引きずられず、**制約から逆算して技術スタックを選び直す**。特に、sazare-ui は単なるアプリではなく **npm で公開し他人が使うライブラリ**であるため、その固有制約（消費者側のビルド結合・テーマ上書き・静的CSS配布の可否）を一次の評価軸に含める。

## 2. 前提条件（制約）

| # | 制約 | 出所 |
|---|---|---|
| C1 | **個人開発だが「本格」品質**（OSS 同等の一貫性・テスト・A11y） | `docs/README.md` |
| C2 | **npm 公開を視野**（Vite Library Mode で配布、消費者は別プロジェクト） | `implementationPlan.md` |
| C3 | **React 専用**（マルチFWは要件外） | 確定スタック |
| C4 | **ミニマルなデザイン言語**（余白・装飾抑制） | `designPrinciple.md` |
| C5 | **WCAG 準拠 / 高アクセシビリティ** | `designPrinciple.md` |
| C6 | **Figma カンプ不在** → デザイントークンが唯一のビジュアル決定根拠 | `docs/README.md` |
| C7 | **ソロ開発**（保守リソースが限られる） | `docs/README.md` |
| C8 | SDD（Spec 駆動）で品質を担保 | `sdd-workflow.md` |

## 3. 揺るがない前提（再評価の対象外）

以下は再評価しても結論が変わらないため据え置く。

- **React + TypeScript（strict）** … C3。型はトークンの単一の真実（C6）と相性が良い。
- **Vite（Library Mode）** … C2。ライブラリ配布の標準。
- **Storybook + a11y addon** … C5/C8。カタログ兼 A11y 検証環境。

### 3.1 ハード要件として確定したこと：**ゼロランタイム**

> 調査結論（Obsidian: `Frontend/UIライブラリ/`）より、**ランタイム CSS-in-JS（Emotion / styled-components）は不採用**とする。

**Why**:
- 実行時のスタイル計算・注入による再レンダリングコスト（C1 の品質要件に反する）
- React Server Components / Next.js App Router と致命的に相性が悪く、消費者（C2）の利用環境を狭める
- 2022 年以降、Emotion メンテナ自身を含め業界全体がゼロランタイムへ移行済み

→ L2 候補は**ゼロランタイム系に限定**する。

## 4. レイヤーで分けて考える

UI ライブラリは 3 層に分解できる（詳細は Obsidian ナレッジ `UIライブラリの3レイヤー構造` 参照）。

- **L1 挙動／A11y（ヘッドレス）**: 開閉・キーボード・フォーカス・ARIA。見た目なし。
- **L2 スタイリング**: 見た目を当てる仕組み。
- **L3 配布**: npm 依存型 か コード所有型 か。

L1 と L2 は**相性でペア選定**する必要がある（例: Ark↔Panda、Radix↔Tailwind/CSS）。L3 は C2 より **npm 依存型（コンパイル済みパッケージ配布）** で確定。

## 5. L2（スタイリング）候補の評価

ゼロランタイム系に絞った比較。評価軸に **C2（npm 配布時の消費者結合）** を重く置く。

| 候補 | ゼロRT | 型安全トークン | recipe/variant | npm配布の消費者結合 | 消費者テーマ上書き | エコシステム/参照実装 | ソロ保守 |
|---|---|---|---|---|---|---|---|
| **Panda CSS** | ◎ | ◎ | ◎（recipe/slot recipe） | △ 静的CSS配布 or preset+importMap | ○（CSS変数 or preset） | ◎ Park UI/Chakraエコシステム | ○ codegen 前提 |
| **vanilla-extract** | ◎ | ◎ | ○（recipes + sprinkles） | ◎ ビルド時に**プレーンCSSへ**コンパイルして配布 | ◎ createThemeContract（CSS変数） | △ 小さめ・参照実装少 | △ 手配線多め |
| **CSS Modules (+Sass)** | ◎ | ✗ | ✗（手書き） | ◎ プレーンCSS配布 | △ CSS変数を手運用 | ○ 枯れている | ◎ 単純・長寿命 |
| **Tailwind CSS** | ◎ | △（@theme） | △（CVA等で補う） | ✗ 消費者がTailwind必須 or 衝突しやすいプリフィクス | △ | ◎ shadcn | ○ |
| ~~Emotion/styled~~ | ✗ | ○ | ○ | — | — | — | — （§3.1 で除外） |

### 5.1 npm 配布固有の論点（最重要）

- **Panda**: 配布モードが複数ある（①静的CSS `panda cssgen` を同梱 → 消費者は Panda 不要だが深いテーマ上書きは限定的／②preset を npm 公開し消費者が `importMap` 設定 → 消費者が Panda 必須＝コード所有型寄り）。コンパイル済み npm パッケージ（C2）なら **①静的CSS同梱**が基本線で、これは公式にサポートされた経路。
- **vanilla-extract**: ビルド時に**プレーンな `.css` へ完全コンパイル**し、コンポーネントはハッシュ化クラス名を参照。**消費者は v-e のビルドプラグイン不要**で `import "sazare-ui/styles.css"` するだけ。テーマは `createThemeContract` の CSS 変数で上書き。→ **配布の素直さは最右翼**。
- **Tailwind**: コンパイル済み CSS 同梱は可能だが、消費者の Tailwind とクラス衝突・purge 設計が絡み、**テーマ可能な汎用ライブラリの配布には不向き**（shadcn が npm でなく「コード所有」で配る理由がこれ）。→ C2 と相性が悪く**除外寄り**。

## 6. L1（挙動）候補の評価

| 候補 | A11y品質 | FW | スタイル手段との相性 | 参照実装 | ソロ工数 |
|---|---|---|---|---|---|
| **Ark UI** | ◎（Zag.js 状態機械） | マルチ（React含む） | ◎ Panda と同エコシステム | ◎ **Park UI** が Ark+Panda の実装例 | ◎ 低 |
| **Radix Primitives** | ◎（定番） | React のみ（C3 的にOK） | ○ data-state を任意のL2で | ◎ shadcn（ただしTailwind前提） | ○ |
| **Zag.js 直接** | ◎ | マルチ | ○ | △ | △ 高（Arkの JSX 化を自作） |
| **自前** | △（自作） | — | — | ✗ | ✗ 最高コスト・WCAG維持困難（C5/C7 に反する） |

**結論（L1 の方向性）**: **複雑コンポーネント（Dialog/Select/Combobox/Menu/Tabs/Tooltip/Switch 等）の挙動は自作しない**。C5（WCAG）× C7（ソロ）の組み合わせでは、ヘッドレス基盤に乗るのが唯一現実的。
プレーンな presentational/layout（Button/Text/Stack/Grid/Card/Badge/Alert/Spinner 等）は L1 不要で、semantic HTML + ARIA + L2 で自作する（ハイブリッド運用）。

## 7. スタック（L1+L2 ペア）単位の最終候補

| | Stack A | Stack B | Stack C |
|---|---|---|---|
| L1 | **Ark UI** | **Radix** | **Radix** |
| L2 | **Panda CSS** | **vanilla-extract** | **CSS Modules(+Sass)** |
| 別名 | = Park UI スタック | TS-first 配布重視 | 最小依存・枯れ |
| 強み | エコシステム一貫・参照実装・型安全トークン+recipe・既知のChakraと地続き | プレーンCSS配布が最も素直・CSS変数テーマ・型安全 | 依存最小・長寿命・学習容易 |
| 弱み | npm配布で静的CSS同梱の段取り・codegen・概念量 | 参照実装が乏しく手配線多い・小エコシステム | トークン型安全/recipe を失う・variant手書き |
| 向く人 | 一貫性と速度と保守性を最優先 | プレーンCSS純度と消費者非結合を最優先 | とにかく単純さと依存最小を最優先 |

## 8. 推奨

### 第一推奨：**Stack A（Ark UI + Panda CSS）**

ゼロベースで評価し直しても、この用途では Stack A を推す。決め手（制約との対応）：

1. **参照実装が存在する（C7）**: Park UI が「Ark + Panda + Radix Colors + Lucide」の実例。ソロ開発でゼロから組まず、recipe 構成やコンポーネントラッパを参照/移植できる（global ルールの research & reuse 原則）。
2. **型安全トークン + recipe が最強（C6/C8）**: トークンが唯一の真実という方針に対し、Panda の型安全・autocomplete・slot recipe が最も噛み合う。
3. **A11y を Zag.js に委譲できる（C5）**: 状態機械ベースで WCAG 準拠を維持。
4. **学習コストが最小（C7）**: 既存の Chakra 知識（Style Props / recipe / トークン）がそのまま転用できる。
5. **配布経路が公式サポート済み（C2）**: `panda cssgen` で静的CSSを同梱すれば消費者は Panda 不要。

→ つまり、当初の Panda 採用は**結論としては妥当**だが、本評価により「Panda 単体ではなく **Ark とのペア前提**」「配布は静的CSS同梱」という設計上の含意が明確になった点が差分。

### 次点：**Stack B（Radix + vanilla-extract）**

セクション 9（推奨が覆る条件）に示す条件を最優先するなら Stack B に切り替える価値がある。

### 不採用

- **Tailwind 系**: C2（テーマ可能な npm 配布）と相性が悪い。shadcn 流の「コード所有」配布なら可だが、本プロジェクトはコンパイル済み npm 配布（C2）のため不採用。
- **ランタイム CSS-in-JS**: §3.1 のとおりハード除外。

## 9. 推奨が覆る条件（正直な但し書き）

第一推奨は絶対ではない。次の重み付けなら結論が変わる：

- **「配布物をプレーンCSSに保ち、消費者のビルドツールに一切結合させない」純度を最優先** → **Stack B（vanilla-extract）**。
- **「依存を極小化し、10 年後も確実に動く枯れた構成」を最優先** → **Stack C（CSS Modules）**。ただしトークン型安全と recipe を失う対価を受容できる場合のみ。
- **「Ark の概念量・codegen を負債と感じる」** → Stack B/C。

## 10. 未確定事項と検証計画

- **L1 の最終確定は保留**。`Dialog`（focus trap / ESC / ARIA を含む代表的な複雑コンポーネント）を **「Ark+Panda 版」と「自前版」で薄くプロトタイプ**し、実装量・A11y の作り込み・L2 との噛み合いを実測してから確定する。
- **色トークンの土台**（Radix Colors 採用可否など）は本文書では決めず、`tokens/color.md` 着手時に別途検討する。
- **着手はブロックされない**: L1 非依存の presentational/layout コンポーネントと全トークンは、上記確定を待たずに開始できる。

## 11. 既存ドキュメントへの影響

- `designPrinciple.md` §3「技術スタック」… 本文書で supersede（確定後に追記/削除）。
- `implementationPlan.md`… `useFocusTrap` 等の L1 自作前提は、Stack A/B 採用時は不要になる（Ark/Zag/Radix が提供）。確定後に `roadmap.md` へ反映時に修正。

## 12. 参考

- [Panda CSS — Using Panda in a Component Library](https://panda-css.com/docs/guides/component-library)
- [Panda CSS — FAQ](https://panda-css.com/docs/overview/faq)
- [vanilla-extract — bundling only CSS for a component library (Discussion #1059)](https://github.com/vanilla-extract-css/vanilla-extract/discussions/1059)
- [Park UI](https://park-ui.com/) — Ark + Panda の参照実装
- Obsidian ナレッジ `Frontend/UIライブラリ/`（3レイヤー構造 / 歴史的経緯 / Ark UI / Panda CSS / Radix UI / Zag.js / 各ライブラリ）

## 改訂履歴

| 日時 | 内容 |
| --- | --- |
| 2026-05-29 | ゼロベース再評価の初版ドラフト作成（Issue #25）。第一推奨 Stack A（Ark+Panda）、次点 Stack B（Radix+vanilla-extract）。L1 最終確定は Dialog プロトタイプ後に保留。 |
