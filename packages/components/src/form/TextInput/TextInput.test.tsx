import { fireEvent, render, screen } from '@testing-library/react'
import { createRef } from 'react'
import { describe, expect, it, vi } from 'vitest'

import { TextInput } from './TextInput'

// className/style/typeは公開APIとして受け付けない（ADR 0012。typeは常に"text"固定にするため）。
// 再びpropsとして受け付け可能になった場合、下記の@ts-expect-errorが
// 「不要な指定」としてtsc（pnpm run typecheck）上のエラーになり回帰を検知できる。
// この関数自体は実行されない（型チェックのみが目的）。
function _typeOnlyGuardAgainstDisallowedProps() {
  // @ts-expect-error className is not part of TextInput's public props
  const withClassName = <TextInput className="not-allowed" />
  // @ts-expect-error style is not part of TextInput's public props
  const withStyle = <TextInput style={{ margin: '1px' }} />
  // @ts-expect-error type is not part of TextInput's public props
  const withType = <TextInput type="password" />
  return [withClassName, withStyle, withType]
}
void _typeOnlyGuardAgainstDisallowedProps

describe('TextInput', () => {
  it('renders a textbox input', () => {
    render(<TextInput />)
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('always renders with type="text"', () => {
    render(<TextInput />)
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'text')
  })

  it('renders the placeholder', () => {
    render(<TextInput placeholder="Enter your name" />)
    expect(screen.getByPlaceholderText('Enter your name')).toBeInTheDocument()
  })

  it('forwards the ref to the underlying element', () => {
    const ref = createRef<HTMLInputElement>()
    render(<TextInput ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLInputElement)
  })

  it('supports an uncontrolled defaultValue', () => {
    render(<TextInput defaultValue="initial" />)
    expect(screen.getByRole('textbox')).toHaveValue('initial')
  })

  it('supports a controlled value with onChange', () => {
    const handleChange = vi.fn()
    render(<TextInput value="controlled" onChange={handleChange} />)
    const input = screen.getByRole('textbox')
    expect(input).toHaveValue('controlled')
    fireEvent.change(input, { target: { value: 'next' } })
    expect(handleChange).toHaveBeenCalledTimes(1)
  })

  it('does not accept input when disabled', () => {
    render(<TextInput disabled defaultValue="" />)
    const input = screen.getByRole('textbox')
    expect(input).toBeDisabled()
  })

  it('sets name and form for form submission', () => {
    render(<TextInput name="username" form="my-form" />)
    const input = screen.getByRole('textbox')
    expect(input).toHaveAttribute('name', 'username')
    expect(input).toHaveAttribute('form', 'my-form')
  })

  it('reflects aria-invalid on the element', () => {
    render(<TextInput aria-invalid="true" />)
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true')
  })

  it('defaults to the "md" size when size is omitted', () => {
    render(<TextInput />)
    expect(screen.getByRole('textbox')).toHaveAttribute('data-size', 'md')
  })

  it.each(['sm', 'md'] as const)('accepts the %s size', (size) => {
    render(<TextInput size={size} />)
    expect(screen.getByRole('textbox')).toHaveAttribute('data-size', size)
  })
})
