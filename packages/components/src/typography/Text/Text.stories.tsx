import type { Meta, StoryObj } from '@storybook/react-vite'

import { Text } from './Text'

const meta = {
  component: Text,
  tags: ['draft'],
  argTypes: {
    as: {
      control: 'select',
      options: ['p', 'span', 'div'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', '2xl', '3xl'],
    },
    color: {
      control: 'select',
      options: ['default', 'white', 'secondary', 'disabled', 'link', 'inherit'],
    },
    weight: {
      control: 'select',
      options: ['normal', 'semibold', 'bold'],
    },
  },
  args: {
    children: 'The quick brown fox jumps over the lazy dog',
  },
} satisfies Meta<typeof Text>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const AllElements: Story = {
  render: () => (
    <>
      <Text as="p">as="p"（デフォルト、本文段落）</Text>
      <Text as="span">as="span"（インライン強調）</Text>
      <Text as="div">as="div"（汎用コンテナ）</Text>
    </>
  ),
}

export const AllSizes: Story = {
  render: () => (
    <>
      <Text size="sm">size="sm"</Text>
      <Text size="md">size="md"</Text>
      <Text size="lg">size="lg"</Text>
      <Text size="xl">size="xl"</Text>
      <Text size="2xl">size="2xl"</Text>
      <Text size="3xl">size="3xl"</Text>
    </>
  ),
}

export const AllColors: Story = {
  render: () => (
    <>
      <Text color="default">default</Text>
      <Text color="secondary">secondary</Text>
      <Text color="disabled">disabled</Text>
      <Text color="link">link</Text>
      <div style={{ background: '#1F2937', padding: '8px' }}>
        <Text color="white">white</Text>
      </div>
      <span style={{ color: '#2563EB' }}>
        <Text color="inherit">inherit（親要素の色を継承）</Text>
      </span>
    </>
  ),
}

export const AllWeights: Story = {
  render: () => (
    <>
      <Text weight="normal">weight="normal"</Text>
      <Text weight="semibold">weight="semibold"</Text>
      <Text weight="bold">weight="bold"</Text>
    </>
  ),
}
