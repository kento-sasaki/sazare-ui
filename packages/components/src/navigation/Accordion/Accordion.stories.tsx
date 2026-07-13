import type { Meta, StoryObj } from '@storybook/react-vite'

import { Accordion } from './Accordion'

const meta = {
  component: Accordion,
  tags: ['draft'],
  args: {
    items: [
      { value: 'shipping', label: '配送について', content: '通常3〜5営業日でお届けします。' },
      {
        value: 'returns',
        label: '返品について',
        content: '商品到着から14日以内であれば返品できます。',
      },
      { value: 'contact', label: 'お問い合わせ', content: 'サポート窓口までご連絡ください。' },
    ],
  },
} satisfies Meta<typeof Accordion>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
