import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { createRef } from 'react'
import { describe, expect, it, vi } from 'vitest'

import { Checkbox } from './Checkbox'

describe('Checkbox', () => {
  it('renders a checkbox input with the accessible name from label', () => {
    render(<Checkbox label="Agree" />)
    expect(screen.getByRole('checkbox', { name: 'Agree' })).toBeInTheDocument()
  })

  it('renders the label text', () => {
    render(<Checkbox label="Agree to terms" />)
    expect(screen.getByText('Agree to terms')).toBeInTheDocument()
  })

  it('forwards the ref to the hidden input element', () => {
    const ref = createRef<HTMLInputElement>()
    render(<Checkbox label="Agree" ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLInputElement)
  })

  it('is unchecked by default', () => {
    render(<Checkbox label="Agree" />)
    expect(screen.getByRole('checkbox')).not.toBeChecked()
  })

  it('respects defaultChecked', () => {
    render(<Checkbox label="Agree" defaultChecked />)
    expect(screen.getByRole('checkbox')).toBeChecked()
  })

  it('calls onCheckedChange with the next checked state when clicked', async () => {
    const handleChange = vi.fn()
    render(<Checkbox label="Agree" onCheckedChange={handleChange} />)
    fireEvent.click(screen.getByRole('checkbox'))
    await waitFor(() => expect(handleChange).toHaveBeenCalledWith({ checked: true }))
  })

  it('supports a controlled checked state', () => {
    render(<Checkbox label="Agree" checked onCheckedChange={() => {}} />)
    expect(screen.getByRole('checkbox')).toBeChecked()
  })

  it('renders the indeterminate state', () => {
    render(<Checkbox label="Agree" checked="indeterminate" onCheckedChange={() => {}} />)
    const input = screen.getByRole('checkbox')
    expect(input.closest('label')).toHaveAttribute('data-state', 'indeterminate')
    expect(input).not.toBeChecked()
  })

  it('does not respond to clicks when disabled', () => {
    const handleChange = vi.fn()
    render(<Checkbox label="Agree" disabled onCheckedChange={handleChange} />)
    fireEvent.click(screen.getByRole('checkbox'))
    expect(handleChange).not.toHaveBeenCalled()
  })

  it('sets name and value on the hidden input for form submission', () => {
    render(<Checkbox label="Agree" name="terms" value="agreed" />)
    const input = screen.getByRole('checkbox')
    expect(input).toHaveAttribute('name', 'terms')
    expect(input).toHaveAttribute('value', 'agreed')
  })
})
