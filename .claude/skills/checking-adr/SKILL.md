---
name: checking-adr
description: >
  現在セッションの transcript を判定材料に ADR（Architecture Decision Record）の要否を判定し、
  必要な場合は対話形式で docs/adr/ 配下への ADR 作成を支援する。
  作業のキリのよいタイミングで「ADR が必要か確認して」「ADR チェックして」と言われたとき、
  または /checking-adr で起動する。判定基準は狭く、「複数選択肢を比較検討した設計方針の決定」のみを対象とする。
---

# ADR 要否チェックと対話的 ADR 作成

## スコープ

- 判定対象: 現在セッション（`${CLAUDE_SESSION_ID}`）の transcript のみ。複数セッションにまたがる作業は都度呼び直す
- 判定基準: **狭く（Recall 低め）**。既存 ADR（0011/0012 等）のパターン＝「複数選択肢を比較検討した設計方針の決定」に確実に該当するものだけ提案する。ノイズより見逃しを許容する
- ADR の内容は自動生成しない。「必要」判定後は `AskUserQuestion` で 1 問ずつ確認しながら `docs/adr/_template.md` に沿って埋める

## Workflow Checklist

- [ ] Step 1: 現在セッションの transcript ファイルを特定
- [ ] Step 2: 別コンテキスト（新規エージェント）で ADR 要否を判定
- [ ] Step 3: 判定結果を提示（不要なら理由とともに終了）
- [ ] Step 4: 「必要」の場合、対話形式で ADR 内容を埋める
- [ ] Step 5: 採番して `docs/adr/NNNN-<slug>.md` を作成
