# デザインシステム調査

[Issue #77](https://github.com/kento-sasaki/sazare-ui/issues/77) に基づき、一般的なデザインシステムに必要とされる要素（トークン体系・コンポーネント設計原則・アクセシビリティ基準・ドキュメント運用）を、公開されている参考実装と一般的な理論の両面から調査した記録。ここでの調査結果を踏まえ sazare-ui にとっての取捨選択を行った結論は [Foundations > Design Principles](../packages/components/src/foundations/DesignPrinciples.mdx)（Storybook）にまとめている。

## 参考実装の調査結果

### Sansan One Design System

- **トークン体系**: Primitive Tokens と Semantic Tokens の2層構造。Figma Tokens（Tokens Studio）でトークンを作成し、Style Dictionary経由でTypeScript/CSSファイルに変換して実装チームに配布する。現在進行形でPrimitive Tokens自体の見直しとSemantic Tokenのバリエーション再検討を行っている（トークン命名の使いやすさ改善が課題として言及されている）
- **コンポーネント設計原則**: 明文化された原則として「難しくしない（Not making it difficult）」「一貫性がある（Having consistency）」「汎用性がある（Having versatility）」の3つを掲げる。コンポーネント実装にはArk UI（ヘッドレスUIライブラリ）を採用し、アクセシビリティ実装コストを下げつつ迅速なコンポーネント作成を可能にしている
- **アクセシビリティ基準**: One Design Systemが満たすべきアクセシビリティ要件を整理し順次実装予定という段階（「整備中」）。具体的なWCAG準拠レベルの明記は確認できなかった。ライティングガイドラインとtextlintルールセットの配布も行っている
- **ドキュメント運用**: Storybookで公開。Bill One / Contract Oneのプロダクトデザイン・開発チームが共同で作成・保守している
- 出典: https://ui.one-design-system.sansan.com/ （公開ページの情報が薄く、主にSansan Tech Blogで補完）、https://buildersbox.corp-sansan.com/entry/2025/01/27/130000

### デジタル庁デザインシステム (DADS)

- **トークン体系**: カラートークンは4層構造。①キーカラー（プライマリー/セカンダリー/ターシャリー/バックグラウンド）②共通カラー（白〜黒のニュートラルカラー階調、テキスト・境界線・背景に使用）③機能カラー（リンクカラー＝未訪問/訪問済、ステートカラー＝デフォルト/ホバー/アクティブ）④セマンティックカラー（サクセス=緑、エラー=赤、警告=黄/オレンジ、各明度バリエーション付き）。色相を保てばブランドごとに明度・彩度を調整できる設計。トークンはJSON（Style Dictionary）で構築されnpmパッケージとしてリリースされる
- **コンポーネント設計原則**: 具体的な設計方針の明文化は今回の調査範囲では確認できなかった。ただしコンポーネント単位で個別の「アクセシビリティ」サブページ（例: `/components/heading/accessibility/`）を持つ運用が特徴的
- **アクセシビリティ基準**: WCAG 2.2 / WCAG 2.1、WAI-ARIAを国際的な勧告として参照。具体的な数値基準として「テキスト・文字画像と背景のコントラスト比 4.5:1以上」を明記。フォームのアクセシブル認証等WCAG 2.2の新基準にも言及。全体としての適合レベル（A/AA/AAA）の明言は確認できなかった
- **ドキュメント運用**: 各Foundation/Componentページに「概要」「アクセシビリティ」「更新履歴（changelog）」のサブページを一貫して用意する構成。バージョニングされ、更新はRSS配信される
- 出典: https://design.digital.go.jp/dads/foundations/color/, https://design.digital.go.jp/dads/guidance/accessibility/, https://github.com/digital-go-jp/design-tokens

### SmartHR UI / SmartHR Design System

- **トークン体系**: Primitive Tokens（低レイヤーで具体的な値）とSemantic Tokens（特定コンテキストに関連づけた値、Primitiveを参照）の2層構造。命名規則の詳細は非公開ページのみで確認できなかった
- **コンポーネント設計原則**: `createTheme()` + `ThemeProvider` によるテーマ供給パターン。styled-components を peerDependency として要求する（ヘッドレスUIではなくスタイル込みのコンポーネントライブラリ）
- **アクセシビリティ基準**: **JIS X 8341-3:2016 レベルA + いくつかの追加達成基準**、加えて**WCAG 2.1** 準拠を目標として明記している。運用は「アクセシビリティ本部＋有志による既存機能の改修」と「新規プロダクト/機能は開発チーム自身がウェブアクセシビリティ簡易チェックリストを満たす」という役割分担。JIS X 8341-3:2016に基づく試験を定期的に実施している
- **ドキュメント運用**: Storybookで公開（masterマージで自動ビルド、PRごとにNetlifyでプレビュー）。CIはESLint（文法）+ stylelint（スタイル）+ `tsc --noEmit`（型）+ Vitest（単体テスト）+ Chromatic（ビジュアル回帰）+ reg-suit（画像差分）を実施。CONTRIBUTING.mdにコンポーネントdocsのMarkdownテンプレート（props表: Name/Required/Type/DefaultValue/Description）を規定。デザインデータはFigmaで公開。Conventional Commits採用
- 出典: https://smarthr.design/products/design-tokens/, https://github.com/kufu/smarthr-ui/blob/main/README.md, https://github.com/kufu/smarthr-ui/blob/master/CONTRIBUTING.md, https://smarthr.design/accessibility/

### Ameba Spindle

- **トークン体系**: **DTCG（W3C Design Tokens Community Group）フォーマット準拠のJSON**でトークンを管理し、Style Dictionaryで各アプリケーション向け形式（CSS変数等）に変換するパイプライン。`spindle-tokens`パッケージとして配布。SpacingトークンはデバイスサイズごとにCSSファイルを分割。View Transition用のトークン（fade/slide の duration/easing）等、動きに関するトークンも体系化されている
- **コンポーネント設計原則**: 明文化された設計原則ページは今回確認できなかった。新規コンポーネント追加時は「Design Docを作成 → Pull Request → レビュー → マージ → 実装」というプロセスを定めている。スタイルは名前空間付きCSS（`spui`）で配布し、コンポーネント志向・HTML中心どちらの利用にも対応する
- **アクセシビリティ基準**: 「誰もがいつでも、迷わず『書く』『読む』『応える』ができる状態を目指す」という理念のみ確認できた。具体的なWCAG準拠レベルやテスト運用方法は非公開ページのみで不明
- **ドキュメント運用**: Storybookで公開。コンポーネントの開発状況専用の「ステータスページ」を持つ運用が特徴的。従業員向けSlackチャンネルでのフィードバック収集。tokens/icons/ui/hooks/syntax-themes/mcp-serverと機能ごとにパッケージを分割するmonorepo構成
- 出典: https://github.com/openameba/spindle（README, `packages/spindle-tokens/README.md`, `packages/spindle-ui/README.md`）, https://spindle.ameba.design/

## 一般的なデザインシステム理論

- **W3C Design Tokens Community Group (DTCG)**: 2025年10月に仕様の最初の安定版（2025.10）が確定した。トークンは `$value`（実際の値）/ `$type`（型）/ `$description`（任意の説明）の3プロパティを核とするJSON形式。カーリーブレース構文やJSON Pointerでのエイリアス・継承・コンポーネント参照をサポートする。Display P3 / OKLCH等CSS Color Module 4の色空間にも対応。Figma / Penpot / Sketch / Tokens Studio / Style Dictionary / Terrazzo等主要ツールが対応済み。調査した4実装のうちSpindleは明示的にDTCG準拠、Sansan/SmartHR/DADSはStyle Dictionaryベースだが独自のPrimitive/Semantic 2層モデルを採用しておりDTCG完全準拠は明言していない
  - 出典: https://www.designtokens.org/tr/format/, https://www.w3.org/community/design-tokens/2025/10/28/design-tokens-specification-reaches-first-stable-version/
- **WCAG 2.2 適合レベル**: Level A（最低限、致命的な障壁の除去）→ Level AA（A全項目＋コントラスト比・テキストリサイズ・一貫したナビゲーション・エラー識別・フォーカス可視性等）→ Level AAA（AA全項目＋より厳格な基準）の3段階で、上位レベルは下位レベルを包含する。**Level AAが実務上の標準ターゲット**として広く採用されている（効果的なアクセシビリティと実装の現実性のバランスが取れているため）。新基準の多くは開発・テスト工程より「デザイン工程」で対応するのが望ましいとされる
  - 出典: https://www.w3.org/TR/WCAG22/, https://www.levelaccess.com/blog/wcag-2-2-aa-summary-and-checklist-for-website-owners/
- **一般的ベストプラクティス**: トークン命名は「見た目」ではなく「意図」で行う（`color.green` ではなく `color.feedback.success`）のが推奨され、`category.property.variant` のようなスキーマが発見可能性・予測可能性・保守性を高める。Atomic Design（atoms/molecules/organisms/templates/pages）はコンポーネント階層のメンタルモデルとして現役だが、原案には無かった「デザイントークンという基盤層」が現代のデザインシステムでは前提として追加されている。ドキュメントはprops一覧だけでなく「使い方のパターン」を残すことが重視され、Storybookが事実上の標準ツールとなっている
  - 出典: https://www.uxpin.com/studio/blog/what-are-design-tokens/, https://www.designsystemscollective.com/a-comprehensive-guide-to-atomic-design-and-design-tokens-in-modern-ui-ux-development-288a996a483a

## 4観点ごとの横断的な要点整理

- **トークン体系**: 4実装中3つ（Sansan/SmartHR/DADS）が「Primitive → Semantic」の2層モデルを採用し、SpindleのみDTCG形式を明示的に採用している。共通して「具体的な値（Primitive）」と「意味づけられた用途（Semantic）」を分離する設計が業界標準といえる。DADSのカラートークンは「キー→共通→機能→セマンティック」という4層まで細分化しており、より厳密な運用をしている点が特徴的。一般論（DTCG）は「意図ベースの命名」を推奨しており、4実装のSemantic Token層はこの推奨と合致する
- **コンポーネント設計原則**: 明文化された原則を持つのはSansanのみ（難しくしない/一貫性/汎用性）。SansanはArk UI（ヘッドレスUI）を採用してa11y実装コストを下げる方針を取っており、sazare-ui自身の技術選定（[ADR 0001](./adr/0001-headless-ui-and-styling-stack.md)でArk UI + Panda CSSを採用）と方向性が一致する。SmartHR UIはヘッドレスではなくstyled-components前提のスタイル込みライブラリで、対照的なアプローチをとっている
- **アクセシビリティ基準**: DADS・SmartHRはいずれもWCAG（2.1/2.2）を明示的な準拠目標として掲げ、SmartHRはさらに日本の公的基準JIS X 8341-3:2016 レベルAを明記している。一般論では「Level AAが実務上の標準ターゲット」とされており、DADSの「コントラスト比4.5:1以上」はWCAG AA相当の基準と一致する。SansanとSpindleは理念レベルの言及に留まり、具体的な適合レベルの明記は無い（対外公開の成熟度の違いと見られる）
- **ドキュメント運用**: 4実装全てがStorybookでコンポーネントカタログを公開している点は共通しており、sazare-uiの既存方針（[ADR 0008](./adr/0008-docs-structure.md) / [ADR 0009](./adr/0009-storybook-sidebar-organization.md)）と完全に一致する。SmartHR UIはCI（lint/unit test/Chromatic/reg-suit）とドキュメントテンプレート（props表フォーマット）を明文化しており最も体系的。DADSは各要素ページに「概要/アクセシビリティ/更新履歴」の3点セットを一貫して用意する構成が特徴的で、sazare-uiの既存慣習（各コンポーネントmdxに「アクセシビリティ」節を持つ。例: `Heading.mdx`）と方向性が一致する。Spindleは「コンポーネントステータスページ」という開発進捗の可視化の工夫がある
