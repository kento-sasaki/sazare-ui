import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'

import { TextInput } from './TextInput'

const meta = {
  component: TextInput,
  tags: ['draft'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md'],
    },
  },
  args: {
    placeholder: 'Placeholder',
  },
} satisfies Meta<typeof TextInput>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const AllSizes: Story = {
  render: () => (
    <>
      <TextInput size="sm" placeholder='size="sm"' />
      <TextInput size="md" placeholder='size="md"' />
    </>
  ),
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}

export const Invalid: Story = {
  args: {
    'aria-invalid': 'true',
    defaultValue: 'Invalid value',
  },
}

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState('')
    return (
      <TextInput
        placeholder="Type something"
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
    )
  },
}
