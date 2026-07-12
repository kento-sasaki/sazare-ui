import type { Meta, StoryObj } from '@storybook/react-vite'

import { Dialog } from './Dialog'

const meta = {
  component: Dialog,
  tags: ['draft'],
  args: {
    trigger: '開く',
    title: 'ダイアログのタイトル',
    children: 'ダイアログの本文コンテンツです。',
  },
} satisfies Meta<typeof Dialog>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithDescription: Story = {
  args: {
    description: '補足の説明文をここに表示します。',
  },
}
