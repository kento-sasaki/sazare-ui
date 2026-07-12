import type { Meta, StoryObj } from '@storybook/react-vite'

import { DropdownMenu } from './DropdownMenu'

const meta = {
  component: DropdownMenu,
  tags: ['draft'],
  args: {
    trigger: '操作',
    items: [
      { label: '編集', value: 'edit' },
      { label: '複製', value: 'duplicate' },
      { label: '削除', value: 'delete', disabled: true },
    ],
  },
} satisfies Meta<typeof DropdownMenu>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
