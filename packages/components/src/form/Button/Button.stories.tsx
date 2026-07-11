import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from './Button'

const meta = {
  component: Button,
  tags: ['draft'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['solid', 'outline'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md'],
    },
  },
  args: {
    children: 'Button',
  },
} satisfies Meta<typeof Button>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const AllVariants: Story = {
  render: () => (
    <>
      <Button variant="solid">variant="solid"</Button>
      <Button variant="outline">variant="outline"</Button>
    </>
  ),
}

export const AllSizes: Story = {
  render: () => (
    <>
      <Button size="sm">size="sm"</Button>
      <Button size="md">size="md"</Button>
    </>
  ),
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}
