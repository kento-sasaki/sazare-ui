import { RadioGroup as ArkRadioGroup } from '@ark-ui/react/radio-group'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { RadioButton } from './RadioButton'

// RadioButtonはRadioGroup.Root（sazare-uiのRadioGroup）の子孫としてのみ動作するため、
// テストでも常にArkRadioGroup.Rootでラップしてレンダリングする
describe('RadioButton', () => {
  it('renders a radio input with the accessible name from label', () => {
    render(
      <ArkRadioGroup.Root>
        <RadioButton label="Apple" value="apple" />
      </ArkRadioGroup.Root>,
    )
    expect(screen.getByRole('radio', { name: 'Apple' })).toBeInTheDocument()
  })

  it('renders the label text', () => {
    render(
      <ArkRadioGroup.Root>
        <RadioButton label="Apple" value="apple" />
      </ArkRadioGroup.Root>,
    )
    expect(screen.getByText('Apple')).toBeInTheDocument()
  })

  it('is checked when its value matches the group defaultValue', () => {
    render(
      <ArkRadioGroup.Root defaultValue="apple">
        <RadioButton label="Apple" value="apple" />
        <RadioButton label="Banana" value="banana" />
      </ArkRadioGroup.Root>,
    )
    expect(screen.getByRole('radio', { name: 'Apple' })).toBeChecked()
    expect(screen.getByRole('radio', { name: 'Banana' })).not.toBeChecked()
  })

  it('is disabled when the disabled prop is set', () => {
    render(
      <ArkRadioGroup.Root>
        <RadioButton label="Apple" value="apple" disabled />
      </ArkRadioGroup.Root>,
    )
    expect(screen.getByRole('radio', { name: 'Apple' })).toBeDisabled()
  })
})
