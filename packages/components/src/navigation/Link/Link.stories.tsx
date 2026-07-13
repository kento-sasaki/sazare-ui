import type { Meta, StoryObj } from '@storybook/react-vite'

import { Link } from './Link'

const meta = {
  component: Link,
  tags: ['draft'],
  args: {
    href: '/about',
    children: 'About us',
  },
} satisfies Meta<typeof Link>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
