import { fireEvent, render, screen } from '@testing-library/react'
import { createRef } from 'react'
import { describe, expect, it, vi } from 'vitest'

import { Button } from './Button'

// className/style/childrenは公開APIとして受け付けない（ADR 0012。childrenは任意のReactNodeを
// 許容してしまいデザインシステムが定義したスタイル・構造を逸脱できるため、labelに一本化する）。
// 再びpropsとして受け付け可能になった場合、下記の@ts-expect-errorが
// 「不要な指定」としてtsc（pnpm run typecheck）上のエラーになり回帰を検知できる。
// この関数自体は実行されない（型チェックのみが目的）。
function _typeOnlyGuardAgainstDisallowedProps() {
  // @ts-expect-error className is not part of Button's public props
  const withClassName = <Button label="Click" className="not-allowed" />
  // @ts-expect-error style is not part of Button's public props
  const withStyle = <Button label="Click" style={{ margin: '1px' }} />
  // @ts-expect-error children is not part of Button's public props
  const withChildren = <Button label="Click">Not allowed</Button>
  return [withClassName, withStyle, withChildren]
}
void _typeOnlyGuardAgainstDisallowedProps

describe('Button', () => {
  it('renders a button element', () => {
    render(<Button label="Click" />)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('renders label as text content', () => {
    render(<Button label="Click me" />)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('forwards the ref to the underlying element', () => {
    const ref = createRef<HTMLButtonElement>()
    render(<Button label="Click" ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLButtonElement)
  })

  it('defaults to the "solid" variant when variant is omitted', () => {
    render(<Button label="Click" />)
    expect(screen.getByRole('button')).toHaveAttribute('data-variant', 'solid')
  })

  it.each(['solid', 'outline'] as const)('accepts the %s variant', (variant) => {
    render(<Button label="Click" variant={variant} />)
    expect(screen.getByRole('button')).toHaveAttribute('data-variant', variant)
  })

  it('defaults to the "md" size when size is omitted', () => {
    render(<Button label="Click" />)
    expect(screen.getByRole('button')).toHaveAttribute('data-size', 'md')
  })

  it.each(['sm', 'md'] as const)('accepts the %s size', (size) => {
    render(<Button label="Click" size={size} />)
    expect(screen.getByRole('button')).toHaveAttribute('data-size', size)
  })

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn()
    render(<Button label="Click" onClick={handleClick} />)
    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('does not call onClick when disabled', () => {
    const handleClick = vi.fn()
    render(<Button label="Click" disabled onClick={handleClick} />)
    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).not.toHaveBeenCalled()
  })
})
