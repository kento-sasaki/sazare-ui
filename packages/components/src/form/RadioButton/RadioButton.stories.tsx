import { RadioGroup as ArkRadioGroup } from '@ark-ui/react/radio-group'
import type { Meta, StoryObj } from '@storybook/react-vite'

import { RadioButton } from './RadioButton'

// RadioButtonはArk UIのRadioGroup.Item相当で、RadioGroup.Root（sazare-uiのRadioGroup）の
// 子孫としてのみ動作する（Checkboxと異なり単体では使えない）ため、Storybook上でも
// RadioGroup.Rootでラップして表示する
const meta = {
  component: RadioButton,
  tags: ['draft'],
  decorators: [
    (Story) => (
      <ArkRadioGroup.Root defaultValue="apple">
        <ArkRadioGroup.Label>Fruit</ArkRadioGroup.Label>
        <Story />
      </ArkRadioGroup.Root>
    ),
  ],
  args: {
    label: 'Apple',
    value: 'apple',
  },
} satisfies Meta<typeof RadioButton>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}
