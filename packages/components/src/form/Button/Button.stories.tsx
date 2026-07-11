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
    label: 'Button',
  },
} satisfies Meta<typeof Button>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const AllVariants: Story = {
  render: () => (
    <>
      <Button variant="solid" label='variant="solid"' />
      <Button variant="outline" label='variant="outline"' />
    </>
  ),
}

export const AllSizes: Story = {
  render: () => (
    <>
      <Button size="sm" label='size="sm"' />
      <Button size="md" label='size="md"' />
    </>
  ),
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}
