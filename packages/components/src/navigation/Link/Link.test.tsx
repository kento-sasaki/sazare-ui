import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Link } from './Link'

// className/styleは公開APIとして受け付けない（ADR 0012）。
// 再びpropsとして受け付け可能になった場合、下記の@ts-expect-errorが
// 「不要な指定」としてtsc（pnpm run typecheck）上のエラーになり回帰を検知できる。
// この関数自体は実行されない（型チェックのみが目的）。
function _typeOnlyGuardAgainstDisallowedProps() {
  const withClassName = (
    // @ts-expect-error className is not part of Link's public props
    <Link href="/" className="not-allowed">
      Home
    </Link>
  )
  const withStyle = (
    // @ts-expect-error style is not part of Link's public props
    <Link href="/" style={{ margin: '1px' }}>
      Home
    </Link>
  )
  return [withClassName, withStyle]
}
void _typeOnlyGuardAgainstDisallowedProps

describe('Link', () => {
  it('renders an anchor with the given href and content', () => {
    render(<Link href="/about">About us</Link>)
    const link = screen.getByRole('link', { name: 'About us' })
    expect(link).toHaveAttribute('href', '/about')
  })

  it('passes through native anchor attributes', () => {
    render(
      <Link href="https://example.com" target="_blank" rel="noreferrer">
        External
      </Link>,
    )
    const link = screen.getByRole('link', { name: 'External' })
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noreferrer')
  })
})
