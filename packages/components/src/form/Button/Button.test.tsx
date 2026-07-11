import { fireEvent, render, screen } from '@testing-library/react'
import { createRef } from 'react'
import { describe, expect, it, vi } from 'vitest'

import { Button } from './Button'

// className/styleは公開APIとして受け付けない（レイアウト調整はBox/Stackを使う、ADR 0012）。
// 再びpropsとして受け付け可能になった場合、下記の@ts-expect-errorが
// 「不要な指定」としてtsc（pnpm run typecheck）上のエラーになり回帰を検知できる。
// この関数自体は実行されない（型チェックのみが目的）。
function _typeOnlyGuardAgainstClassNameAndStyle() {
  // @ts-expect-error className is not part of Button's public props
  const withClassName = <Button className="not-allowed">Click</Button>
  // @ts-expect-error style is not part of Button's public props
  const withStyle = <Button style={{ margin: '1px' }}>Click</Button>
  return [withClassName, withStyle]
}
void _typeOnlyGuardAgainstClassNameAndStyle

describe('Button', () => {
  it('renders a button element', () => {
    render(<Button>Click</Button>)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('renders children as text content', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('forwards the ref to the underlying element', () => {
    const ref = createRef<HTMLButtonElement>()
    render(<Button ref={ref}>Click</Button>)
    expect(ref.current).toBeInstanceOf(HTMLButtonElement)
  })

  it('defaults to the "solid" variant when variant is omitted', () => {
    render(<Button>Click</Button>)
    expect(screen.getByRole('button')).toHaveAttribute('data-variant', 'solid')
  })

  it.each(['solid', 'outline'] as const)('accepts the %s variant', (variant) => {
    render(<Button variant={variant}>Click</Button>)
    expect(screen.getByRole('button')).toHaveAttribute('data-variant', variant)
  })

  it('defaults to the "md" size when size is omitted', () => {
    render(<Button>Click</Button>)
    expect(screen.getByRole('button')).toHaveAttribute('data-size', 'md')
  })

  it.each(['sm', 'md'] as const)('accepts the %s size', (size) => {
    render(<Button size={size}>Click</Button>)
    expect(screen.getByRole('button')).toHaveAttribute('data-size', size)
  })

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click</Button>)
    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('does not call onClick when disabled', () => {
    const handleClick = vi.fn()
    render(
      <Button disabled onClick={handleClick}>
        Click
      </Button>,
    )
    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).not.toHaveBeenCalled()
  })
})
