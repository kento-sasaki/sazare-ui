import type { Meta, StoryObj } from '@storybook/react-vite'

import { Banner } from './Banner'

const meta = {
  component: Banner,
  tags: ['draft'],
  args: {
    title: 'お知らせ',
    children: 'これはお知らせの本文です。',
  },
} satisfies Meta<typeof Banner>

export default meta

type Story = StoryObj<typeof meta>

export const Neutral: Story = {}

export const Success: Story = {
  args: {
    tone: 'success',
    title: '保存しました',
    children: '変更内容が正常に保存されました。',
  },
}

export const Warning: Story = {
  args: {
    tone: 'warning',
    title: '注意',
    children: 'この操作は取り消せません。',
  },
}

// Issue #44のErrorScreen相当。閉じるボタンを付けず常時表示のエラー通知として使う想定
export const ErrorScreen: Story = {
  args: {
    tone: 'error',
    title: 'エラーが発生しました',
    children: 'データの取得に失敗しました。時間をおいて再度お試しください。',
  },
}

export const Closable: Story = {
  args: {
    tone: 'info',
    title: '新機能のお知らせ',
    children: '新しい機能が追加されました。',
    onClose: () => {},
  },
}
