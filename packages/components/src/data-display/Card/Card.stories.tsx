import type { Meta, StoryObj } from '@storybook/react-vite'

import { Card } from './Card'

const meta = {
  component: Card,
  tags: ['draft'],
  args: {
    children: 'Card content',
  },
} satisfies Meta<typeof Card>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
