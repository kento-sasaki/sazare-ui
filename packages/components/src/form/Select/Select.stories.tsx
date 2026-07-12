import type { Meta, StoryObj } from '@storybook/react-vite'

import { Select } from './Select'

const options = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Cherry', value: 'cherry', disabled: true },
]

const meta = {
  component: Select,
  tags: ['draft'],
  args: {
    label: 'Fruit',
    options,
    placeholder: 'Select a fruit',
  },
} satisfies Meta<typeof Select>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithDefaultValue: Story = {
  args: {
    defaultValue: 'banana',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}

export const Invalid: Story = {
  args: {
    invalid: true,
  },
}
