import { fireEvent, render, screen } from '@testing-library/react'
import { createRef } from 'react'
import { describe, expect, it, vi } from 'vitest'

import { Textarea } from './Textarea'

// className/styleは公開APIとして受け付けない（ADR 0012）。
// 再びpropsとして受け付け可能になった場合、下記の@ts-expect-errorが
// 「不要な指定」としてtsc（pnpm run typecheck）上のエラーになり回帰を検知できる。
// この関数自体は実行されない（型チェックのみが目的）。
function _typeOnlyGuardAgainstDisallowedProps() {
  // @ts-expect-error className is not part of Textarea's public props
  const withClassName = <Textarea className="not-allowed" />
  // @ts-expect-error style is not part of Textarea's public props
  const withStyle = <Textarea style={{ margin: '1px' }} />
  return [withClassName, withStyle]
}
void _typeOnlyGuardAgainstDisallowedProps

describe('Textarea', () => {
  it('renders a textbox', () => {
    render(<Textarea />)
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('renders the placeholder', () => {
    render(<Textarea placeholder="Enter your comment" />)
    expect(screen.getByPlaceholderText('Enter your comment')).toBeInTheDocument()
  })

  it('forwards the ref to the underlying element', () => {
    const ref = createRef<HTMLTextAreaElement>()
    render(<Textarea ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLTextAreaElement)
  })

  it('supports an uncontrolled defaultValue', () => {
    render(<Textarea defaultValue="initial" />)
    expect(screen.getByRole('textbox')).toHaveValue('initial')
  })

  it('supports a controlled value with onChange', () => {
    const handleChange = vi.fn()
    render(<Textarea value="controlled" onChange={handleChange} />)
    const textarea = screen.getByRole('textbox')
    expect(textarea).toHaveValue('controlled')
    fireEvent.change(textarea, { target: { value: 'next' } })
    expect(handleChange).toHaveBeenCalledTimes(1)
  })

  it('does not accept input when disabled', () => {
    render(<Textarea disabled defaultValue="" />)
    const textarea = screen.getByRole('textbox')
    expect(textarea).toBeDisabled()
  })

  it('sets name and form for form submission', () => {
    render(<Textarea name="comment" form="my-form" />)
    const textarea = screen.getByRole('textbox')
    expect(textarea).toHaveAttribute('name', 'comment')
    expect(textarea).toHaveAttribute('form', 'my-form')
  })

  it('passes through native rows and cols attributes without overriding them', () => {
    render(<Textarea rows={10} cols={40} />)
    const textarea = screen.getByRole('textbox')
    expect(textarea).toHaveAttribute('rows', '10')
    expect(textarea).toHaveAttribute('cols', '40')
  })

  it('reflects aria-invalid on the element', () => {
    render(<Textarea aria-invalid="true" />)
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true')
  })

  it('defaults to the "md" size when size is omitted', () => {
    render(<Textarea />)
    expect(screen.getByRole('textbox')).toHaveAttribute('data-size', 'md')
  })

  it.each(['sm', 'md'] as const)('accepts the %s size', (size) => {
    render(<Textarea size={size} />)
    expect(screen.getByRole('textbox')).toHaveAttribute('data-size', size)
  })
})
