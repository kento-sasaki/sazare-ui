import { fireEvent, render, screen } from '@testing-library/react'
import { createRef } from 'react'
import { describe, expect, it, vi } from 'vitest'

import { IconButton } from './IconButton'

const Icon = () => <svg data-testid="icon" />

// className/style/childrenは公開APIとして受け付けない（ADR 0012）。aria-labelは
// アクセシブルネームの担保のため必須にしている。再びpropsとして受け付け可能になった場合、
// 下記の@ts-expect-errorが「不要な指定」としてtsc（pnpm run typecheck）上のエラーになり回帰を検知できる。
// この関数自体は実行されない（型チェックのみが目的）。
function _typeOnlyGuardAgainstDisallowedProps() {
  // @ts-expect-error className is not part of IconButton's public props
  const withClassName = <IconButton icon={<Icon />} aria-label="Add" className="not-allowed" />
  // @ts-expect-error style is not part of IconButton's public props
  const withStyle = <IconButton icon={<Icon />} aria-label="Add" style={{ margin: '1px' }} />
  const withChildren = (
    // @ts-expect-error children is not part of IconButton's public props
    <IconButton icon={<Icon />} aria-label="Add">
      Not allowed
    </IconButton>
  )
  // @ts-expect-error aria-label is required
  const withoutAriaLabel = <IconButton icon={<Icon />} />
  return [withClassName, withStyle, withChildren, withoutAriaLabel]
}
void _typeOnlyGuardAgainstDisallowedProps

describe('IconButton', () => {
  it('renders a button element with the accessible name from aria-label', () => {
    render(<IconButton icon={<Icon />} aria-label="Add" />)
    expect(screen.getByRole('button', { name: 'Add' })).toBeInTheDocument()
  })

  it('renders the icon as content', () => {
    render(<IconButton icon={<Icon />} aria-label="Add" />)
    expect(screen.getByTestId('icon')).toBeInTheDocument()
  })

  it('forwards the ref to the underlying element', () => {
    const ref = createRef<HTMLButtonElement>()
    render(<IconButton icon={<Icon />} aria-label="Add" ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLButtonElement)
  })

  it('defaults to the "solid" variant when variant is omitted', () => {
    render(<IconButton icon={<Icon />} aria-label="Add" />)
    expect(screen.getByRole('button')).toHaveAttribute('data-variant', 'solid')
  })

  it.each(['solid', 'outline'] as const)('accepts the %s variant', (variant) => {
    render(<IconButton icon={<Icon />} aria-label="Add" variant={variant} />)
    expect(screen.getByRole('button')).toHaveAttribute('data-variant', variant)
  })

  it('defaults to the "md" size when size is omitted', () => {
    render(<IconButton icon={<Icon />} aria-label="Add" />)
    expect(screen.getByRole('button')).toHaveAttribute('data-size', 'md')
  })

  it.each(['sm', 'md'] as const)('accepts the %s size', (size) => {
    render(<IconButton icon={<Icon />} aria-label="Add" size={size} />)
    expect(screen.getByRole('button')).toHaveAttribute('data-size', size)
  })

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn()
    render(<IconButton icon={<Icon />} aria-label="Add" onClick={handleClick} />)
    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('does not call onClick when disabled', () => {
    const handleClick = vi.fn()
    render(<IconButton icon={<Icon />} aria-label="Add" disabled onClick={handleClick} />)
    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).not.toHaveBeenCalled()
  })
})
