import type { Meta, StoryObj } from '@storybook/react-vite'

import { DatePicker } from './DatePicker'

const meta = {
  component: DatePicker,
  tags: ['draft'],
  args: {},
} satisfies Meta<typeof DatePicker>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithDefaultValue: Story = {
  args: {
    defaultValue: new Date(2026, 0, 15),
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}

export const Invalid: Story = {
  args: {
    'aria-invalid': true,
  },
}
