import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'

import { Checkbox } from './Checkbox'

const meta = {
  component: Checkbox,
  tags: ['draft'],
  args: {
    label: 'Checkbox',
  },
} satisfies Meta<typeof Checkbox>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Checked: Story = {
  args: {
    defaultChecked: true,
  },
}

export const Indeterminate: Story = {
  args: {
    defaultChecked: 'indeterminate',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}

export const DisabledChecked: Story = {
  args: {
    disabled: true,
    defaultChecked: true,
  },
}

export const Controlled: Story = {
  render: () => {
    const [checked, setChecked] = useState<boolean | 'indeterminate'>(false)
    return (
      <Checkbox
        label={`Checked: ${checked}`}
        checked={checked}
        onCheckedChange={(details) => setChecked(details.checked)}
      />
    )
  },
}
