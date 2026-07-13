import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { Accordion } from './Accordion'

const items = [
  { value: 'a', label: 'Item A', content: 'Content A' },
  { value: 'b', label: 'Item B', content: 'Content B' },
  { value: 'c', label: 'Item C', content: 'Content C', disabled: true },
]

// className/styleは公開APIとして受け付けない（ADR 0012）。
// 再びpropsとして受け付け可能になった場合、下記の@ts-expect-errorが
// 「不要な指定」としてtsc（pnpm run typecheck）上のエラーになり回帰を検知できる。
// この関数自体は実行されない（型チェックのみが目的）。
function _typeOnlyGuardAgainstDisallowedProps() {
  const withClassName = (
    // @ts-expect-error className is not part of Accordion's public props
    <Accordion items={items} className="not-allowed" />
  )
  const withStyle = (
    // @ts-expect-error style is not part of Accordion's public props
    <Accordion items={items} style={{ margin: '1px' }} />
  )
  return [withClassName, withStyle]
}
void _typeOnlyGuardAgainstDisallowedProps

describe('Accordion', () => {
  it('renders a trigger for each item with content collapsed by default', () => {
    render(<Accordion items={items} />)
    expect(screen.getByRole('button', { name: 'Item A' })).toBeInTheDocument()
    expect(screen.getByText('Content A')).not.toBeVisible()
  })

  it('expands an item content when its trigger is clicked', async () => {
    render(<Accordion items={items} />)
    const trigger = screen.getByRole('button', { name: 'Item A' })
    // Ark UIのAccordionはTRIGGER.CLICKを「focused」状態でのみ処理するため、
    // フォーカスを伴わないfireEvent.clickだけでは展開されない
    fireEvent.focus(trigger)
    fireEvent.click(trigger)
    await waitFor(() => expect(screen.getByText('Content A')).toBeVisible())
  })

  it('does not expand a disabled item when its trigger is clicked', async () => {
    render(<Accordion items={items} />)
    fireEvent.click(screen.getByRole('button', { name: 'Item C' }))
    await waitFor(() => expect(screen.getByText('Content C')).not.toBeVisible())
  })

  it('calls onValueChange when an item is expanded', async () => {
    const handleValueChange = vi.fn()
    render(<Accordion items={items} onValueChange={handleValueChange} />)
    const trigger = screen.getByRole('button', { name: 'Item A' })
    fireEvent.focus(trigger)
    fireEvent.click(trigger)
    await waitFor(() => expect(handleValueChange).toHaveBeenCalledWith(['a']))
  })

  it('supports expanding multiple items when multiple is true', async () => {
    render(<Accordion items={items} multiple />)
    const triggerA = screen.getByRole('button', { name: 'Item A' })
    const triggerB = screen.getByRole('button', { name: 'Item B' })
    fireEvent.focus(triggerA)
    fireEvent.click(triggerA)
    await waitFor(() => expect(screen.getByText('Content A')).toBeVisible())

    fireEvent.focus(triggerB)
    fireEvent.click(triggerB)
    await waitFor(() => {
      expect(screen.getByText('Content A')).toBeVisible()
      expect(screen.getByText('Content B')).toBeVisible()
    })
  })
})
