import type { Meta, StoryObj } from '@storybook/react-vite'

import { Combobox } from './Combobox'

const options = [
  { label: 'React', value: 'react' },
  { label: 'Solid', value: 'solid' },
  { label: 'Vue', value: 'vue' },
  { label: 'Svelte', value: 'svelte', disabled: true },
]

const meta = {
  component: Combobox,
  tags: ['draft'],
  args: {
    label: 'Framework',
    options,
    placeholder: 'Select a framework',
  },
} satisfies Meta<typeof Combobox>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithDefaultValue: Story = {
  args: {
    defaultValue: 'vue',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}

export const Invalid: Story = {
  args: {
    invalid: true,
  },
}
