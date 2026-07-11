import type { Meta, StoryObj } from '@storybook/react-vite'

import { CheckboxGroup } from './CheckboxGroup'

const options = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Cherry', value: 'cherry', disabled: true },
]

const meta = {
  component: CheckboxGroup,
  tags: ['draft'],
  args: {
    options,
  },
} satisfies Meta<typeof CheckboxGroup>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithDefaultValue: Story = {
  args: {
    defaultValue: ['banana'],
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}
