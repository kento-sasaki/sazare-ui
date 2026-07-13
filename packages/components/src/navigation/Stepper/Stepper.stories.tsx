import type { Meta, StoryObj } from '@storybook/react-vite'

import { Stepper } from './Stepper'

const meta = {
  component: Stepper,
  tags: ['draft'],
  args: {
    steps: [{ label: 'お届け先' }, { label: 'お支払い方法' }, { label: '確認' }],
    defaultStep: 1,
  },
} satisfies Meta<typeof Stepper>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
