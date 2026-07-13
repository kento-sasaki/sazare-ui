import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Breadcrumb } from './Breadcrumb'

// className/styleは公開APIとして受け付けない（ADR 0012）。
// 再びpropsとして受け付け可能になった場合、下記の@ts-expect-errorが
// 「不要な指定」としてtsc（pnpm run typecheck）上のエラーになり回帰を検知できる。
// この関数自体は実行されない（型チェックのみが目的）。
function _typeOnlyGuardAgainstDisallowedProps() {
  const withClassName = (
    // @ts-expect-error className is not part of Breadcrumb's public props
    <Breadcrumb items={[{ label: 'Home', href: '/' }]} className="not-allowed" />
  )
  const withStyle = (
    // @ts-expect-error style is not part of Breadcrumb's public props
    <Breadcrumb items={[{ label: 'Home', href: '/' }]} style={{ margin: '1px' }} />
  )
  return [withClassName, withStyle]
}
void _typeOnlyGuardAgainstDisallowedProps

describe('Breadcrumb', () => {
  const items = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Detail' },
  ]

  it('renders a navigation landmark with an accessible name', () => {
    render(<Breadcrumb items={items} />)
    expect(screen.getByRole('navigation', { name: 'Breadcrumb' })).toBeInTheDocument()
  })

  it('renders non-last items with an href as links', () => {
    render(<Breadcrumb items={items} />)
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/')
    expect(screen.getByRole('link', { name: 'Products' })).toHaveAttribute('href', '/products')
  })

  it('renders the last item as the current page and not as a link', () => {
    render(<Breadcrumb items={items} />)
    const current = screen.getByText('Detail')
    expect(current).toHaveAttribute('aria-current', 'page')
    expect(screen.queryByRole('link', { name: 'Detail' })).not.toBeInTheDocument()
  })

  it('supports overriding the accessible name via aria-label', () => {
    render(<Breadcrumb items={items} aria-label="パンくずリスト" />)
    expect(screen.getByRole('navigation', { name: 'パンくずリスト' })).toBeInTheDocument()
  })
})
