import type { Meta, StoryObj } from '@storybook/react-vite'

import { IconButton } from './IconButton'

// Storybookでのdraft表示用のサンプルアイコン（sazare-uiにはまだアイコンセットが無いため、
// 利用側が持ち込む想定のインラインSVGを最小限自作する）
const PlusIcon = () => (
  <svg
    aria-hidden="true"
    focusable="false"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
  >
    <path d="M8 2v12M2 8h12" />
  </svg>
)

const meta = {
  component: IconButton,
  tags: ['draft'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['solid', 'outline'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md'],
    },
    icon: {
      control: false,
    },
  },
  args: {
    icon: <PlusIcon />,
    'aria-label': 'Add',
  },
} satisfies Meta<typeof IconButton>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const AllVariants: Story = {
  render: () => (
    <>
      <IconButton variant="solid" icon={<PlusIcon />} aria-label="Add (solid)" />
      <IconButton variant="outline" icon={<PlusIcon />} aria-label="Add (outline)" />
    </>
  ),
}

export const AllSizes: Story = {
  render: () => (
    <>
      <IconButton size="sm" icon={<PlusIcon />} aria-label="Add (sm)" />
      <IconButton size="md" icon={<PlusIcon />} aria-label="Add (md)" />
    </>
  ),
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}
