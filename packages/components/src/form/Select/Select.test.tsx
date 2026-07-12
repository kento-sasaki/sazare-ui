import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { Select } from './Select'

const options = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Cherry', value: 'cherry', disabled: true },
]

describe('Select', () => {
  it('renders a trigger with an accessible name matching label', () => {
    render(<Select label="Fruit" options={options} />)
    expect(screen.getByRole('combobox', { name: 'Fruit' })).toBeInTheDocument()
  })

  it('shows the placeholder text when no value is selected', () => {
    render(<Select label="Fruit" options={options} placeholder="Choose a fruit" />)
    expect(screen.getByText('Choose a fruit')).toBeInTheDocument()
  })

  it('opens the listbox and shows options when the trigger is clicked', async () => {
    render(<Select label="Fruit" options={options} />)
    fireEvent.click(screen.getByRole('combobox', { name: 'Fruit' }))
    await waitFor(() => expect(screen.getByRole('option', { name: 'Apple' })).toBeInTheDocument())
  })

  it('calls onValueChange with the selected value when an option is clicked', async () => {
    const handleValueChange = vi.fn()
    render(<Select label="Fruit" options={options} onValueChange={handleValueChange} />)
    fireEvent.click(screen.getByRole('combobox', { name: 'Fruit' }))
    await waitFor(() => screen.getByRole('option', { name: 'Apple' }))
    fireEvent.click(screen.getByRole('option', { name: 'Apple' }))
    await waitFor(() => expect(handleValueChange).toHaveBeenCalledWith('apple'))
  })

  it('updates the trigger text after selecting an option', async () => {
    render(<Select label="Fruit" options={options} />)
    fireEvent.click(screen.getByRole('combobox', { name: 'Fruit' }))
    await waitFor(() => screen.getByRole('option', { name: 'Apple' }))
    fireEvent.click(screen.getByRole('option', { name: 'Apple' }))
    await waitFor(() =>
      expect(screen.getByRole('combobox', { name: 'Fruit' })).toHaveTextContent('Apple'),
    )
  })
})
