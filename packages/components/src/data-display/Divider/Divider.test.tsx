import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Divider } from './Divider'

// className/styleは公開APIとして受け付けない（ADR 0012）。
// 再びpropsとして受け付け可能になった場合、下記の@ts-expect-errorが
// 「不要な指定」としてtsc（pnpm run typecheck）上のエラーになり回帰を検知できる。
// この関数自体は実行されない（型チェックのみが目的）。
function _typeOnlyGuardAgainstDisallowedProps() {
  // @ts-expect-error className is not part of Divider's public props
  const withClassName = <Divider className="not-allowed" />
  // @ts-expect-error style is not part of Divider's public props
  const withStyle = <Divider style={{ margin: '1px' }} />
  return [withClassName, withStyle]
}
void _typeOnlyGuardAgainstDisallowedProps

describe('Divider', () => {
  it('renders as a horizontal separator by default', () => {
    render(<Divider />)
    const separator = screen.getByRole('separator')
    expect(separator).toHaveAttribute('aria-orientation', 'horizontal')
  })

  it('renders as a vertical separator when orientation is vertical', () => {
    render(<Divider orientation="vertical" />)
    expect(screen.getByRole('separator')).toHaveAttribute('aria-orientation', 'vertical')
  })

  it('renders the label text when provided', () => {
    render(<Divider label="or" />)
    expect(screen.getByText('or')).toBeInTheDocument()
  })

  it('does not render label text when not provided', () => {
    render(<Divider />)
    expect(screen.queryByText('or')).not.toBeInTheDocument()
  })
})
