import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { createRef } from 'react'
import { describe, expect, it, vi } from 'vitest'

import { DatePicker } from './DatePicker'

// className/styleは公開APIとして受け付けない（ADR 0012）。
// 再びpropsとして受け付け可能になった場合、下記の@ts-expect-errorが
// 「不要な指定」としてtsc（pnpm run typecheck）上のエラーになり回帰を検知できる。
// この関数自体は実行されない（型チェックのみが目的）。
function _typeOnlyGuardAgainstDisallowedProps() {
  // @ts-expect-error className is not part of DatePicker's public props
  const withClassName = <DatePicker className="not-allowed" />
  // @ts-expect-error style is not part of DatePicker's public props
  const withStyle = <DatePicker style={{ margin: '1px' }} />
  return [withClassName, withStyle]
}
void _typeOnlyGuardAgainstDisallowedProps

describe('DatePicker', () => {
  it('renders a text input for typing a date', () => {
    render(<DatePicker />)
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('opens the calendar and shows day cells when the trigger is clicked', async () => {
    render(<DatePicker defaultValue={new Date(2026, 0, 15)} />)
    fireEvent.click(screen.getByRole('button', { name: 'Open calendar' }))
    await waitFor(() =>
      expect(
        document.querySelector('[role="button"][data-value="2026-01-15"]'),
      ).toBeInTheDocument(),
    )
  })

  it('shows a non-empty formatted date in the input when defaultValue is set', () => {
    render(<DatePicker defaultValue={new Date(2026, 0, 15)} />)
    const input = screen.getByRole('textbox') as HTMLInputElement
    expect(input.value).toContain('2026')
  })

  it('leaves the input empty when no value is set', () => {
    render(<DatePicker />)
    expect(screen.getByRole('textbox')).toHaveValue('')
  })

  it('calls onValueChange with a Date when a day cell is clicked', async () => {
    const handleValueChange = vi.fn()
    render(<DatePicker defaultValue={new Date(2026, 0, 15)} onValueChange={handleValueChange} />)
    fireEvent.click(screen.getByRole('button', { name: 'Open calendar' }))
    await waitFor(() => document.querySelector('[role="button"][data-value="2026-01-20"]'))
    fireEvent.click(document.querySelector('[role="button"][data-value="2026-01-20"]') as Element)
    await waitFor(() => expect(handleValueChange).toHaveBeenCalledWith(new Date(2026, 0, 20)))
  })

  it('supports null as a controlled value to represent no selection', () => {
    render(<DatePicker value={null} onValueChange={() => {}} />)
    expect(screen.getByRole('textbox')).toHaveValue('')
  })

  it('disables the input and trigger when disabled', () => {
    render(<DatePicker disabled />)
    expect(screen.getByRole('textbox')).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Open calendar' })).toBeDisabled()
  })

  it('sets name and form for form submission', () => {
    render(<DatePicker name="birthday" form="my-form" />)
    const input = screen.getByRole('textbox')
    expect(input).toHaveAttribute('name', 'birthday')
    expect(input).toHaveAttribute('form', 'my-form')
  })

  it('reflects aria-invalid on the input when invalid', () => {
    render(<DatePicker aria-invalid />)
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true')
  })

  it('reflects an explicit id and aria-describedby on the input', () => {
    render(<DatePicker id="birthday-field" aria-describedby="birthday-help" />)
    const input = screen.getByRole('textbox')
    expect(input).toHaveAttribute('id', 'birthday-field')
    expect(input).toHaveAttribute('aria-describedby', 'birthday-help')
  })

  it('forwards the ref to the underlying input element', () => {
    const ref = createRef<HTMLInputElement>()
    render(<DatePicker ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLInputElement)
  })
})
