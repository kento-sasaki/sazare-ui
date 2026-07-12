import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { createRef } from 'react'
import { describe, expect, it, vi } from 'vitest'

import { Select } from './Select'

const options = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Cherry', value: 'cherry', disabled: true },
]

// className/styleは公開APIとして受け付けない（ADR 0012）。
// 再びpropsとして受け付け可能になった場合、下記の@ts-expect-errorが
// 「不要な指定」としてtsc（pnpm run typecheck）上のエラーになり回帰を検知できる。
// この関数自体は実行されない（型チェックのみが目的）。
function _typeOnlyGuardAgainstDisallowedProps() {
  // @ts-expect-error className is not part of Select's public props
  const withClassName = <Select label="Fruit" options={options} className="not-allowed" />
  // @ts-expect-error style is not part of Select's public props
  const withStyle = <Select label="Fruit" options={options} style={{ margin: '1px' }} />
  return [withClassName, withStyle]
}
void _typeOnlyGuardAgainstDisallowedProps

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

  it('shows the option listed in defaultValue as the initial trigger text', () => {
    render(<Select label="Fruit" options={options} defaultValue="banana" />)
    expect(screen.getByRole('combobox', { name: 'Fruit' })).toHaveTextContent('Banana')
  })

  it('supports a controlled value', async () => {
    render(<Select label="Fruit" options={options} value="apple" onValueChange={() => {}} />)
    expect(screen.getByRole('combobox', { name: 'Fruit' })).toHaveTextContent('Apple')
    fireEvent.click(screen.getByRole('combobox', { name: 'Fruit' }))
    await waitFor(() =>
      expect(screen.getByRole('option', { name: 'Apple' })).toHaveAttribute(
        'aria-selected',
        'true',
      ),
    )
    expect(screen.getByRole('option', { name: 'Banana' })).toHaveAttribute('aria-selected', 'false')
  })

  it('disables an individual option via the option-level disabled flag', async () => {
    render(<Select label="Fruit" options={options} />)
    fireEvent.click(screen.getByRole('combobox', { name: 'Fruit' }))
    await waitFor(() =>
      expect(screen.getByRole('option', { name: 'Cherry' })).toHaveAttribute(
        'aria-disabled',
        'true',
      ),
    )
  })

  it('disables the trigger when the select is disabled', () => {
    render(<Select label="Fruit" options={options} disabled />)
    expect(screen.getByRole('combobox', { name: 'Fruit' })).toBeDisabled()
  })

  it('reflects required on the trigger', () => {
    render(<Select label="Fruit" options={options} required />)
    expect(screen.getByRole('combobox', { name: 'Fruit' })).toHaveAttribute('aria-required', 'true')
  })

  it('reflects aria-invalid on the trigger when invalid', () => {
    render(<Select label="Fruit" options={options} invalid />)
    expect(screen.getByRole('combobox', { name: 'Fruit' })).toHaveAttribute('aria-invalid', 'true')
  })

  it('applies the name to the underlying hidden select for form submission', () => {
    const { container } = render(<Select label="Fruit" options={options} name="fruit" />)
    expect(container.querySelector('select[name="fruit"]')).toBeInTheDocument()
  })

  it('forwards the ref to the underlying hidden select element', () => {
    const ref = createRef<HTMLSelectElement>()
    render(<Select label="Fruit" options={options} ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLSelectElement)
  })
})
