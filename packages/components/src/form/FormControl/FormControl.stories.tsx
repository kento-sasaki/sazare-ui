import type { Meta, StoryObj } from '@storybook/react-vite'

import { TextInput } from '../TextInput/TextInput'

import { FormControl } from './FormControl'

const meta = {
  component: FormControl,
  tags: ['draft'],
  args: {
    label: 'Username',
    helperText: '3-20 characters',
    children: <TextInput placeholder="your-name" />,
  },
} satisfies Meta<typeof FormControl>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Invalid: Story = {
  args: {
    invalid: true,
    errorText: 'Username is required',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}

export const Required: Story = {
  args: {
    required: true,
  },
}
