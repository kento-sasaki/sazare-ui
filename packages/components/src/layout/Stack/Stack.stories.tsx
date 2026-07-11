import type { Meta, StoryObj } from '@storybook/react-vite'

import { Heading } from '../../typography/Heading/Heading'
import { Box } from '../Box/Box'

import { Stack } from './Stack'

const meta = {
  component: Stack,
  tags: ['draft'],
} satisfies Meta<typeof Stack>

export default meta

type Story = StoryObj<typeof meta>

// Heading（typographyカテゴリ）はclassName/styleを受け付けないため（ADR 0012）、
// 複数要素の配置・余白調整はBox/Stackを介して行う。この組み合わせが唯一のレイアウト合成手段。
export const LayoutComposition: Story = {
  render: () => (
    <Stack direction="column" gap="md">
      <Box padding="md">
        <Heading as="h2">セクション見出し</Heading>
      </Box>
      <Box padding="md">
        <Heading as="h3">サブセクション見出し</Heading>
      </Box>
    </Stack>
  ),
}
