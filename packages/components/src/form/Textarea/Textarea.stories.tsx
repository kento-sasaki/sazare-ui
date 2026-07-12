import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'

import { Textarea } from './Textarea'

const meta = {
  component: Textarea,
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
} satisfies Meta<typeof Textarea>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const AllSizes: Story = {
  render: () => (
    <>
      <Textarea size="sm" placeholder='size="sm"' />
      <Textarea size="md" placeholder='size="md"' />
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
      <Textarea
        placeholder="Type something"
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
    )
  },
}
