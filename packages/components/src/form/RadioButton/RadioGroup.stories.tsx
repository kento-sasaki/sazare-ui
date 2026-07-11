import type { Meta, StoryObj } from '@storybook/react-vite'

import { RadioGroup } from './RadioGroup'

const options = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Cherry', value: 'cherry', disabled: true },
]

const meta = {
  component: RadioGroup,
  tags: ['draft'],
  args: {
    label: 'Fruit',
    options,
  },
} satisfies Meta<typeof RadioGroup>

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
