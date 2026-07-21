# sazare-ui 要求事項

## 概要

- sazare-ui は React の UI ライブラリであり、デザインシステムである
- [mabiki](https://github.com/kento-sasaki/mabiki) という個人開発のアプリでこのデザインシステムを使う
- デザインシステムとしての価値観・原則、および主要な技術的結論は Storybook の `Design Principles`（[DesignPrinciples.mdx](./DesignPrinciples.mdx)）にまとめている

## 技術スタック

- ヘッドレスUI + ゼロランタイムのスタイリングで構成したい → [ADR 0001](./adr/0001-headless-ui-and-styling-stack.md)
- 採用するライブラリは可能な限り最新のバージョンを使いたい → [ADR 0001](./adr/0001-headless-ui-and-styling-stack.md), [ADR 0006](./adr/0006-node-version.md)
- どんな技術スタックを採用するか、最初に候補を調査して決定したい → [ADR 0001](./adr/0001-headless-ui-and-styling-stack.md)
- パッケージマネージャーは pnpm を採用したい → [ADR 0002](./adr/0002-package-distribution-model.md), [ADR 0003](./adr/0003-release-and-versioning.md), [ADR 0004](./adr/0004-package-structure.md)
- node のバージョン管理は mise を採用したい → [ADR 0006](./adr/0006-node-version.md)

## ドキュメント・カタログ運用

- まず公開されているデザインシステムをいくつか調査し、参考にしたい → [docs/design-system-research.md](./design-system-research.md)
- Storybook でUIのカタログとドキュメントを作成したい → [ADR 0008](./adr/0008-docs-structure.md), [ADR 0009](./adr/0009-storybook-sidebar-organization.md)
- 参考となるデザインシステム
  - https://ui.one-design-system.sansan.com/
  - https://design.digital.go.jp/dads/introduction/
  - https://github.com/kufu/smarthr-ui
  - https://github.com/openameba/spindle

## 開発プロセス・品質

- Chromatic を採用したい → [ADR 0005](./adr/0005-ci-scope.md)
- ESLint と Prettier を採用したい
- cSpell を採用したい
- commit 前に ESLint, Prettier, cSpell を実行してコードの品質を保ちたい → [ADR 0005](./adr/0005-ci-scope.md)
- このデザインシステムを実装する際の意思決定は ADR を作成してドキュメントを残したい → [ADR 0008](./adr/0008-docs-structure.md)
  - `docs/adr/` に保存したい

## スコープ方針

- まず最初のバージョンでは、必要なコンポーネントとデザイントークンを一通り実装して、後から少しずつ調整するようにしたい → [ADR 0003](./adr/0003-release-and-versioning.md), [ADR 0007](./adr/0007-testing-strategy.md)
  - 最初は Storybook の tags に `draft` というタグを設定しておいて、後から少しずつ調整したい
