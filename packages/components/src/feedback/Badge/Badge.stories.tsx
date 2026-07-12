import type { Meta, StoryObj } from '@storybook/react-vite'

import { Badge } from './Badge'

const meta = {
  component: Badge,
  tags: ['draft'],
  args: {
    children: 'Badge',
  },
} satisfies Meta<typeof Badge>

export default meta

type Story = StoryObj<typeof meta>

export const Neutral: Story = {}

export const Success: Story = {
  args: {
    tone: 'success',
    children: 'Active',
  },
}

export const Warning: Story = {
  args: {
    tone: 'warning',
    children: 'Pending',
  },
}

export const ErrorTone: Story = {
  args: {
    tone: 'error',
    children: 'Deprecated',
  },
}

export const Info: Story = {
  args: {
    tone: 'info',
    children: 'New',
  },
}
