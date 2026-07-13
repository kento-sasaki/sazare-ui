import type { Meta, StoryObj } from '@storybook/react-vite'

import { Pagination } from './Pagination'

const meta = {
  component: Pagination,
  tags: ['draft'],
  args: {
    count: 100,
    pageSize: 10,
    defaultPage: 3,
  },
} satisfies Meta<typeof Pagination>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
