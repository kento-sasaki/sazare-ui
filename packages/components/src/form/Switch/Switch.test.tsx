import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { createRef } from 'react'
import { describe, expect, it, vi } from 'vitest'

import { Switch } from './Switch'

describe('Switch', () => {
  it('renders a checkbox input with the accessible name from label', () => {
    render(<Switch label="Enable" />)
    expect(screen.getByRole('checkbox', { name: 'Enable' })).toBeInTheDocument()
  })

  it('renders the label text', () => {
    render(<Switch label="Enable notifications" />)
    expect(screen.getByText('Enable notifications')).toBeInTheDocument()
  })

  it('forwards the ref to the hidden input element', () => {
    const ref = createRef<HTMLInputElement>()
    render(<Switch label="Enable" ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLInputElement)
  })

  it('is unchecked by default', () => {
    render(<Switch label="Enable" />)
    expect(screen.getByRole('checkbox')).not.toBeChecked()
  })

  it('respects defaultChecked', () => {
    render(<Switch label="Enable" defaultChecked />)
    expect(screen.getByRole('checkbox')).toBeChecked()
  })

  it('calls onCheckedChange with the next checked state when clicked', async () => {
    const handleChange = vi.fn()
    render(<Switch label="Enable" onCheckedChange={handleChange} />)
    fireEvent.click(screen.getByRole('checkbox'))
    await waitFor(() => expect(handleChange).toHaveBeenCalledWith({ checked: true }))
  })

  it('supports a controlled checked state', () => {
    render(<Switch label="Enable" checked onCheckedChange={() => {}} />)
    expect(screen.getByRole('checkbox')).toBeChecked()
  })

  it('does not respond to clicks when disabled', () => {
    const handleChange = vi.fn()
    render(<Switch label="Enable" disabled onCheckedChange={handleChange} />)
    fireEvent.click(screen.getByRole('checkbox'))
    expect(handleChange).not.toHaveBeenCalled()
  })

  it('sets name and value on the hidden input for form submission', () => {
    render(<Switch label="Enable" name="notifications" value="on" />)
    const input = screen.getByRole('checkbox')
    expect(input).toHaveAttribute('name', 'notifications')
    expect(input).toHaveAttribute('value', 'on')
  })
})
