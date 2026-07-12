import type { Meta, StoryObj } from '@storybook/react-vite'

import { Tooltip } from './Tooltip'

const meta = {
  component: Tooltip,
  tags: ['draft'],
  args: {
    trigger: '対象要素',
    content: '補足の説明テキスト',
  },
} satisfies Meta<typeof Tooltip>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
