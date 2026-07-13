import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Timeline } from './Timeline'

// className/styleは公開APIとして受け付けない（ADR 0012）。
// 再びpropsとして受け付け可能になった場合、下記の@ts-expect-errorが
// 「不要な指定」としてtsc（pnpm run typecheck）上のエラーになり回帰を検知できる。
// この関数自体は実行されない（型チェックのみが目的）。
function _typeOnlyGuardAgainstDisallowedProps() {
  const withClassName = (
    // @ts-expect-error className is not part of Timeline's public props
    <Timeline items={[{ title: '登録' }]} className="not-allowed" />
  )
  const withStyle = (
    // @ts-expect-error style is not part of Timeline's public props
    <Timeline items={[{ title: '登録' }]} style={{ margin: '1px' }} />
  )
  return [withClassName, withStyle]
}
void _typeOnlyGuardAgainstDisallowedProps

describe('Timeline', () => {
  const items = [
    { title: '登録', timestamp: '2026-01-01', description: 'アカウントを作成した' },
    { title: '承認', timestamp: '2026-01-05' },
    { title: '完了' },
  ]

  it('renders an ordered list with one item per entry', () => {
    render(<Timeline items={items} />)
    const list = screen.getByRole('list')
    expect(list.tagName).toBe('OL')
    expect(screen.getAllByRole('listitem')).toHaveLength(3)
  })

  it('renders each item title, timestamp, and description when provided', () => {
    render(<Timeline items={items} />)
    expect(screen.getByText('登録')).toBeInTheDocument()
    expect(screen.getByText('2026-01-01')).toBeInTheDocument()
    expect(screen.getByText('アカウントを作成した')).toBeInTheDocument()
  })

  it('omits timestamp and description text when not provided', () => {
    render(<Timeline items={items} />)
    expect(screen.getByText('完了')).toBeInTheDocument()
    expect(screen.queryByText('2026-01-09')).not.toBeInTheDocument()
  })
})
