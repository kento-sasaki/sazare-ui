import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from '../../form/Button/Button'

import { createToaster, Toaster } from './Toast'

const toaster = createToaster({ placement: 'top', duration: 5000 })

const meta = {
  component: Toaster,
  tags: ['draft'],
  args: {
    toaster,
  },
} satisfies Meta<typeof Toaster>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <>
      <Button
        label="成功トーストを表示"
        onClick={() => toaster.create({ title: '保存しました', type: 'success' })}
      />
      <Toaster {...args} />
    </>
  ),
}

export const WithDescription: Story = {
  render: (args) => (
    <>
      <Button
        label="エラートーストを表示"
        onClick={() =>
          toaster.create({
            title: 'エラーが発生しました',
            description: 'ネットワーク接続を確認してください。',
            type: 'error',
          })
        }
      />
      <Toaster {...args} />
    </>
  ),
}
