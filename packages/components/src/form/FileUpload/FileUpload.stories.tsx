import type { Meta, StoryObj } from '@storybook/react-vite'

import { FileUpload } from './FileUpload'

const meta = {
  component: FileUpload,
  tags: ['draft'],
  args: {},
} satisfies Meta<typeof FileUpload>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const MultipleFiles: Story = {
  args: {
    maxFiles: 5,
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
