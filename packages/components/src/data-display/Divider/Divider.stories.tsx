import type { Meta, StoryObj } from '@storybook/react-vite'

import { Divider } from './Divider'

const meta = {
  component: Divider,
  tags: ['draft'],
} satisfies Meta<typeof Divider>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithLabel: Story = {
  args: {
    label: 'or',
  },
}

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
  },
}
