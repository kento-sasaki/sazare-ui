import type { Meta, StoryObj } from '@storybook/react-vite'

import { Drawer } from './Drawer'

const meta = {
  component: Drawer,
  tags: ['draft'],
  args: {
    trigger: '開く',
    title: 'ドロワーのタイトル',
    children: 'ドロワーの本文コンテンツです。',
  },
} satisfies Meta<typeof Drawer>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Start: Story = {
  args: {
    placement: 'start',
  },
}

export const Up: Story = {
  args: {
    placement: 'up',
  },
}

export const Down: Story = {
  args: {
    placement: 'down',
  },
}
