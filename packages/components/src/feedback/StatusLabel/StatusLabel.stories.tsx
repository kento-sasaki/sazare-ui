import type { Meta, StoryObj } from '@storybook/react-vite'

import { StatusLabel } from './StatusLabel'

const meta = {
  component: StatusLabel,
  tags: ['draft'],
  args: {
    children: '未対応',
  },
} satisfies Meta<typeof StatusLabel>

export default meta

type Story = StoryObj<typeof meta>

export const Neutral: Story = {}

export const InProgress: Story = {
  args: {
    tone: 'info',
    children: '対応中',
  },
}

export const Done: Story = {
  args: {
    tone: 'success',
    children: '対応済み',
  },
}

export const OnHold: Story = {
  args: {
    tone: 'warning',
    children: '保留',
  },
}

export const ErrorTone: Story = {
  args: {
    tone: 'error',
    children: '対応不可',
  },
}
