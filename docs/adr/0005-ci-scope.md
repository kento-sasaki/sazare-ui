---
status: accepted
date: 2026-07-11
---

# ADR 0005: CI パイプラインのスコープ

## コンテキスト

要件11番でコミット前に ESLint / Prettier / cSpell を実行する方針（pre-commit hook）は決まっているが、CI（GitHub Actions）でどこまで担保するかは未定だった。現時点で `.github/` にワークフローは存在しない。要件8番で Chromatic の採用、[0003](./0003-release-and-versioning.md) で Changesets によるリリース自動化も決まっている。

## 決定ドライバー(評価軸)

1. pre-commit（husky + lint-staged 相当）との役割分担
2. 他人の環境・push漏れ・hooksバイパスに対する最終防波堤としての必要性
3. 初期構築コスト

## 検討した選択肢

| 選択肢 | 強み | 弱み |
|---|---|---|
| Lint/Typecheck/Test/Build + Chromaticアップロード + Changesets publish | pre-commitが実行されない環境やバイパス時の保険になる。Chromaticでのビジュアル差分レビューとnpm publishまで一気通貫 | 初期構築コストがやや高い |
| まずLint/Test/Buildのみ、Chromatic/publishは後回し | 初期構築コストが低い | ビジュアル回帰・自動publishの恩恵を後回しにする |

## 決定

PRごとに **ESLint / Prettier / cSpell / typecheck / Vitest / Storybook build を実行し、Chromatic へ publish** する。npm publish は [0003](./0003-release-and-versioning.md) の Changesets により main マージ後の別ワークフローで自動化する。

pre-commit（husky + lint-staged）と重複するように見えるが、CI は「他人の環境・push漏れ・hooksバイパス」を防ぐ最後の砦として必須と判断した。

## 影響・懸念（未解決事項）

- 具体的な GitHub Actions ワークフローファイル（`.github/workflows/*.yml`）はこのADRでは作成しない。実装フェーズで作成する。
- Chromatic の project token 等のシークレット管理方法は実装時に決める。

## 参考

- [0003: リリース・バージョニング戦略](./0003-release-and-versioning.md)
