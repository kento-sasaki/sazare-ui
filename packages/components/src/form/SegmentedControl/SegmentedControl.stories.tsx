import type { Meta, StoryObj } from '@storybook/react-vite'

import { SegmentedControl } from './SegmentedControl'

const options = [
  { label: 'List', value: 'list' },
  { label: 'Board', value: 'board' },
  { label: 'Calendar', value: 'calendar', disabled: true },
]

const meta = {
  component: SegmentedControl,
  tags: ['draft'],
  args: {
    label: 'View',
    options,
  },
} satisfies Meta<typeof SegmentedControl>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithDefaultValue: Story = {
  args: {
    defaultValue: 'board',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}
