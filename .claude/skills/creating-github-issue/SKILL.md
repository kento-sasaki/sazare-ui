---
name: creating-github-issue
description: >
  sazare-ui リポジトリに GitHub Issue を作成する。
  ユーザーの概要説明と docs/（designPrinciple.md / implementationPlan.md）の文脈から
  task.yml テンプレート形式で Issue 本文を自動生成し、`gh issue create` で作成する。
  「Issue を作りたい」「タスクを登録して」「GitHub Issue を作成して」と言われたときに使う。
---

# sazare-ui の GitHub Issue 作成

## スコープ

- 対象リポジトリ: `kento-sasaki/sazare-ui`
- 本文テンプレート: `.github/ISSUE_TEMPLATE/task.yml` に準拠
- ラベルは付与しない（標準ラベルしか存在しないため）
- プロジェクトへの紐付けは Skill では行わない（手動運用）

## Workflow Checklist

- [ ] Step 1: 概要をヒアリング
- [ ] Step 2: docs/ から文脈を収集
- [ ] Step 3: Issue 内容を自動生成
- [ ] Step 4: 情報の充足性チェック & 追加ヒアリング
- [ ] Step 5: Issue を作成して事後報告

## Step 1: 概要をヒアリング

`AskUserQuestionTool` で「何をしたいか」を自由記述で聞く。
ユーザーが既に概要を伝えている場合はスキップする。

## Step 2: docs/ から文脈を収集

以下を読み込んで Issue に反映する。

| ファイル                     | 反映先セクション                                       |
| ---------------------------- | ------------------------------------------------------ |
| `docs/designPrinciple.md`    | 背景・目的、参考情報（デザイン原則・技術スタック）     |
| `docs/implementationPlan.md` | 背景・目的、関連ファイル・コンポーネント、参考パターン |

該当する記述がない場合は無理に紐付けず、`_No response_` または該当項目を空にする。

## Step 3: Issue 内容を自動生成

Step 1 の概要 + Step 2 の文脈から以下を生成する。

- **タイトル**: 簡潔に（50 文字以内目安）
- **ラベル**: 付与しない
- **本文**: 後述の task.yml 準拠テンプレートで全セクションを生成

各セクションは task.yml の `placeholder` の粒度を目安にする。
推測できない**推奨項目**は `_No response_` とする（必須項目は Step 4 でヒアリングして埋めるため `_No response_` を使わない）。

## Step 4: 情報の充足性チェック & 追加ヒアリング

最終確認ステップは存在しない。よってこの段階で「Issue として成立する情報」を必ず揃える。

### 必須項目

以下が埋まっていない場合は **必ず** `AskUserQuestionTool` でヒアリングする。`_No response_` は使わない。
（`summary` と `tasks` は task.yml で `required: true`。他は本 Skill で独自に必須化している）

- **概要 (`summary`)**: タスクで何をするかが 1〜2 文で明確
- **作業内容 (`tasks`)**: チェックボックス付きの具体タスクが最低 1 件
- **背景・目的 (`background`)**: なぜ必要か。`docs/` や Step 1 の概要から要約・参照できる
- **完了条件 (`acceptance_criteria`)**: 「完了」とみなされる客観的条件が明示されている
- **検証方法 (`verification`)**: 動作確認の具体的な手順が記載されている

### 推奨項目（可能な限り埋める）

以下は `_No response_` を許容するが、**docs/ や Step 1 の概要から推測できる場合は積極的に埋める**。
推測の根拠が薄い・複数解釈が可能で重要度が高い場合は `AskUserQuestionTool` で確認する。
明らかに不要・無関係な場合のみ `_No response_` を使う。

- 関連ファイル・コンポーネント
- 参考パターン
- 参考情報

### 進行ルール

- 必須項目が満たされていない、または推奨項目で重要な不明点が残っている場合 → ヒアリングして Step 3 に戻り再生成
- すべて満たされている場合 → そのまま Step 5 へ進む（ユーザーへの最終確認・承認は行わない）

**充足性チェックを通らない情報で `gh issue create` を実行しない。**

## Step 5: Issue を作成して事後報告

```bash
gh issue create \
  --repo kento-sasaki/sazare-ui \
  --title "{title}" \
  --body "$(cat <<'EOF'
{body}
EOF
)"
```

実行後、以下の最小構成でユーザーに事後報告する。

- 作成したタイトル
- Issue URL
- 修正方法の案内: 「内容を修正したい場合は `gh issue edit <number> --repo kento-sasaki/sazare-ui` または GitHub UI から編集してください」

## Issue 本文テンプレート（task.yml 準拠）

以下の形式を厳密に守る。セクションの順序・見出しは変更しない。

```markdown
### 📝 概要

{summary}

### 🎯 背景・目的

{background}

### 📁 関連ファイル・コンポーネント

{related_files}

### ✅ 作業内容

- [ ] {task1}
- [ ] {task2}

### 🏁 完了条件

{acceptance_criteria}

### 🔍 検証方法

{verification}

### 🧩 参考パターン

{reference_patterns}

### 🔗 参考情報

{references}
```

各セクションのガイドライン：

- **概要**: このタスクで何をするかを 1〜2 文で簡潔に。task.yml で `required`。
- **背景・目的**: なぜ必要か。`docs/designPrinciple.md` の原則・技術スタック、`docs/implementationPlan.md` の該当フェーズや優先度の記述を要約・参照する。
- **関連ファイル・コンポーネント**: 変更・参照が予想されるファイルを箇条書き。`implementationPlan.md` のディレクトリ構造（`src/components/` / `src/hooks/` / `src/tokens/` など）や該当フェーズの記述から拾う。実装初期のため未作成ファイルを挙げる場合は「（新規作成）」と明示する。
- **作業内容**: チェックボックス付きの具体タスク。task.yml で `required`。
- **完了条件**: 「完了」とみなされる客観的条件。Storybook での文書化・型定義の整備など、`implementationPlan.md` の品質基準を踏まえる。
- **検証方法**: 動作確認の手順を必ず記載する（Step 4 で必須項目）。sazare-ui は実装初期で `package.json` の検証コマンドが未整備の段階のため、整備状況に応じて以下を使い分ける。
  - 検証ゲートが整備済み: 該当コマンド（型チェック・ビルド・Storybook 起動など）を記載
  - 未整備の段階: Storybook での視覚確認手順、ビルド成果物の目視確認、または手動操作手順を記載
- **参考パターン**: 既存の実装パターンやデザイン原則への参照（例: `docs/designPrinciple.md` のミニマルデザイン原則、`src/components/Button/` の構成）。
- **参考情報**: 関連 Issue / PR / ドキュメントへのリンク。

推測できない**推奨項目**は `_No response_` とする（必須項目は Step 4 でヒアリングして埋めるため `_No response_` を使わない）。
