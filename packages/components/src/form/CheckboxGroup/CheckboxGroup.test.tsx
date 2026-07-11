import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { CheckboxGroup } from './CheckboxGroup'

const options = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Cherry', value: 'cherry', disabled: true },
]

describe('CheckboxGroup', () => {
  it('renders a checkbox for each option', () => {
    render(<CheckboxGroup options={options} />)
    expect(screen.getByRole('checkbox', { name: 'Apple' })).toBeInTheDocument()
    expect(screen.getByRole('checkbox', { name: 'Banana' })).toBeInTheDocument()
    expect(screen.getByRole('checkbox', { name: 'Cherry' })).toBeInTheDocument()
  })

  it('checks the options listed in defaultValue', () => {
    render(<CheckboxGroup options={options} defaultValue={['banana']} />)
    expect(screen.getByRole('checkbox', { name: 'Apple' })).not.toBeChecked()
    expect(screen.getByRole('checkbox', { name: 'Banana' })).toBeChecked()
  })

  it('calls onValueChange with the updated selection when an option is clicked', async () => {
    const handleValueChange = vi.fn()
    render(
      <CheckboxGroup
        options={options}
        defaultValue={['banana']}
        onValueChange={handleValueChange}
      />,
    )
    fireEvent.click(screen.getByRole('checkbox', { name: 'Apple' }))
    await waitFor(() => expect(handleValueChange).toHaveBeenCalledWith(['banana', 'apple']))
  })

  it('supports a controlled value', () => {
    render(<CheckboxGroup options={options} value={['apple']} onValueChange={() => {}} />)
    expect(screen.getByRole('checkbox', { name: 'Apple' })).toBeChecked()
    expect(screen.getByRole('checkbox', { name: 'Banana' })).not.toBeChecked()
  })

  it('disables an individual option via the option-level disabled flag', () => {
    render(<CheckboxGroup options={options} />)
    expect(screen.getByRole('checkbox', { name: 'Cherry' })).toBeDisabled()
    expect(screen.getByRole('checkbox', { name: 'Apple' })).not.toBeDisabled()
  })

  it('disables all options when the group is disabled', () => {
    render(<CheckboxGroup options={options} disabled />)
    expect(screen.getByRole('checkbox', { name: 'Apple' })).toBeDisabled()
    expect(screen.getByRole('checkbox', { name: 'Banana' })).toBeDisabled()
  })

  it('applies the same name to every option for form submission', () => {
    render(<CheckboxGroup options={options} name="fruits" />)
    expect(screen.getByRole('checkbox', { name: 'Apple' })).toHaveAttribute('name', 'fruits')
    expect(screen.getByRole('checkbox', { name: 'Banana' })).toHaveAttribute('name', 'fruits')
  })
})
