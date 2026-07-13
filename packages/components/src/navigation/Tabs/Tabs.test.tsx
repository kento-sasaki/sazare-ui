import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { Tabs } from './Tabs'

const items = [
  { value: 'a', label: 'Tab A', content: 'Content A' },
  { value: 'b', label: 'Tab B', content: 'Content B' },
  { value: 'c', label: 'Tab C', content: 'Content C', disabled: true },
]

// className/styleは公開APIとして受け付けない（ADR 0012）。
// 再びpropsとして受け付け可能になった場合、下記の@ts-expect-errorが
// 「不要な指定」としてtsc（pnpm run typecheck）上のエラーになり回帰を検知できる。
// この関数自体は実行されない（型チェックのみが目的）。
function _typeOnlyGuardAgainstDisallowedProps() {
  const withClassName = (
    // @ts-expect-error className is not part of Tabs's public props
    <Tabs items={items} className="not-allowed" />
  )
  const withStyle = (
    // @ts-expect-error style is not part of Tabs's public props
    <Tabs items={items} style={{ margin: '1px' }} />
  )
  return [withClassName, withStyle]
}
void _typeOnlyGuardAgainstDisallowedProps

describe('Tabs', () => {
  it('renders a tab for each item and shows the first tab content by default', () => {
    render(<Tabs items={items} />)
    expect(screen.getByRole('tab', { name: 'Tab A' })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: 'Tab B' })).toBeInTheDocument()
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Content A')
  })

  it('switches the visible content when another tab is clicked', async () => {
    render(<Tabs items={items} />)
    fireEvent.click(screen.getByRole('tab', { name: 'Tab B' }))
    await waitFor(() => expect(screen.getByRole('tabpanel')).toHaveTextContent('Content B'))
  })

  it('does not switch content when a disabled tab is clicked', async () => {
    render(<Tabs items={items} />)
    fireEvent.click(screen.getByRole('tab', { name: 'Tab C' }))
    await waitFor(() => expect(screen.getByRole('tabpanel')).toHaveTextContent('Content A'))
  })

  it('calls onValueChange when the active tab changes', async () => {
    const handleValueChange = vi.fn()
    render(<Tabs items={items} onValueChange={handleValueChange} />)
    fireEvent.click(screen.getByRole('tab', { name: 'Tab B' }))
    await waitFor(() => expect(handleValueChange).toHaveBeenCalledWith('b'))
  })

  it('supports a fully controlled value', async () => {
    const { rerender } = render(<Tabs items={items} value="a" />)
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Content A')

    rerender(<Tabs items={items} value="b" />)
    await waitFor(() => expect(screen.getByRole('tabpanel')).toHaveTextContent('Content B'))
  })
})
