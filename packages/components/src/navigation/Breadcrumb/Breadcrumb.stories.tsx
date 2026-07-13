import type { Meta, StoryObj } from '@storybook/react-vite'

import { Breadcrumb } from './Breadcrumb'

const meta = {
  component: Breadcrumb,
  tags: ['draft'],
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Products', href: '/products' },
      { label: 'Detail' },
    ],
  },
} satisfies Meta<typeof Breadcrumb>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
