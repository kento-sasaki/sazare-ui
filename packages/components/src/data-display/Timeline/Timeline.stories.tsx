import type { Meta, StoryObj } from '@storybook/react-vite'

import { Timeline } from './Timeline'

const meta = {
  component: Timeline,
  tags: ['draft'],
  args: {
    items: [
      { title: '登録', timestamp: '2026-01-01', description: 'アカウントを作成した' },
      { title: '承認', timestamp: '2026-01-05' },
      { title: '完了', timestamp: '2026-01-10' },
    ],
  },
} satisfies Meta<typeof Timeline>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
