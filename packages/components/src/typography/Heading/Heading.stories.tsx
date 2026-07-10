import type { Meta, StoryObj } from '@storybook/react-vite'

import { Heading } from './Heading'

const meta = {
  component: Heading,
  tags: ['draft'],
  argTypes: {
    as: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', '2xl', '3xl'],
    },
  },
  args: {
    children: 'The quick brown fox jumps over the lazy dog',
  },
} satisfies Meta<typeof Heading>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    as: 'h1',
  },
}

export const AllLevels: Story = {
  render: () => (
    <>
      <Heading as="h1">Heading level 1</Heading>
      <Heading as="h2">Heading level 2</Heading>
      <Heading as="h3">Heading level 3</Heading>
      <Heading as="h4">Heading level 4</Heading>
      <Heading as="h5">Heading level 5</Heading>
      <Heading as="h6">Heading level 6</Heading>
    </>
  ),
}
