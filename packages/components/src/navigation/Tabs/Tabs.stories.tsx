import type { Meta, StoryObj } from '@storybook/react-vite'

import { Tabs } from './Tabs'

const meta = {
  component: Tabs,
  tags: ['draft'],
  args: {
    items: [
      { value: 'account', label: 'アカウント', content: 'アカウント設定の内容です。' },
      { value: 'notifications', label: '通知', content: '通知設定の内容です。' },
      { value: 'billing', label: '請求', content: '請求設定の内容です。', disabled: true },
    ],
  },
} satisfies Meta<typeof Tabs>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
