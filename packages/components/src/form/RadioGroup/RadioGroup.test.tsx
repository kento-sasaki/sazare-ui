import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { RadioGroup } from './RadioGroup'

const options = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Cherry', value: 'cherry', disabled: true },
]

describe('RadioGroup', () => {
  it('renders a radio for each option', () => {
    render(<RadioGroup label="Fruit" options={options} />)
    expect(screen.getByRole('radio', { name: 'Apple' })).toBeInTheDocument()
    expect(screen.getByRole('radio', { name: 'Banana' })).toBeInTheDocument()
    expect(screen.getByRole('radio', { name: 'Cherry' })).toBeInTheDocument()
  })

  it('checks the option listed in defaultValue', () => {
    render(<RadioGroup label="Fruit" options={options} defaultValue="banana" />)
    expect(screen.getByRole('radio', { name: 'Apple' })).not.toBeChecked()
    expect(screen.getByRole('radio', { name: 'Banana' })).toBeChecked()
  })

  it('calls onValueChange with the selected value when an option is clicked', async () => {
    const handleValueChange = vi.fn()
    render(<RadioGroup label="Fruit" options={options} onValueChange={handleValueChange} />)
    fireEvent.click(screen.getByRole('radio', { name: 'Apple' }))
    await waitFor(() => expect(handleValueChange).toHaveBeenCalledWith('apple'))
  })

  it('supports a controlled value', () => {
    render(<RadioGroup label="Fruit" options={options} value="apple" onValueChange={() => {}} />)
    expect(screen.getByRole('radio', { name: 'Apple' })).toBeChecked()
    expect(screen.getByRole('radio', { name: 'Banana' })).not.toBeChecked()
  })

  it('disables an individual option via the option-level disabled flag', () => {
    render(<RadioGroup label="Fruit" options={options} />)
    expect(screen.getByRole('radio', { name: 'Cherry' })).toBeDisabled()
    expect(screen.getByRole('radio', { name: 'Apple' })).not.toBeDisabled()
  })

  it('disables all options when the group is disabled', () => {
    render(<RadioGroup label="Fruit" options={options} disabled />)
    expect(screen.getByRole('radio', { name: 'Apple' })).toBeDisabled()
    expect(screen.getByRole('radio', { name: 'Banana' })).toBeDisabled()
  })

  it('applies the same name to every option for form submission', () => {
    render(<RadioGroup label="Fruit" options={options} name="fruit" />)
    expect(screen.getByRole('radio', { name: 'Apple' })).toHaveAttribute('name', 'fruit')
    expect(screen.getByRole('radio', { name: 'Banana' })).toHaveAttribute('name', 'fruit')
  })
})
