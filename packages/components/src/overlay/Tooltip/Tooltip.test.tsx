import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { Tooltip } from './Tooltip'

// className/styleは公開APIとして受け付けない（ADR 0012）。
// 再びpropsとして受け付け可能になった場合、下記の@ts-expect-errorが
// 「不要な指定」としてtsc（pnpm run typecheck）上のエラーになり回帰を検知できる。
// この関数自体は実行されない（型チェックのみが目的）。
function _typeOnlyGuardAgainstDisallowedProps() {
  const withClassName = (
    // @ts-expect-error className is not part of Tooltip's public props
    <Tooltip trigger="対象" content="説明" className="not-allowed" />
  )
  // @ts-expect-error style is not part of Tooltip's public props
  const withStyle = <Tooltip trigger="対象" content="説明" style={{ margin: '1px' }} />
  return [withClassName, withStyle]
}
void _typeOnlyGuardAgainstDisallowedProps

// Ark UIのTooltipはonFocusハンドラ内で@zag-js/focus-visibleのisFocusVisible()を参照し、
// キーボード操作由来のフォーカスでなければ無視する（マウスクリック等でのフォーカスでは
// 表示しない設計）。isFocusVisible()はTab等のkeydownイベントを検知して初めて
// modality="keyboard"になるため、テストではfocusの前に実際のTabキー押下を発火させる
const focusViaKeyboard = (element: HTMLElement) => {
  fireEvent.keyDown(document.body, { key: 'Tab' })
  fireEvent.focus(element)
}

describe('Tooltip', () => {
  it('renders the trigger', () => {
    render(<Tooltip trigger="対象" content="説明テキスト" />)
    expect(screen.getByRole('button', { name: '対象' })).toBeInTheDocument()
  })

  it('does not show the content before the trigger is focused', () => {
    render(<Tooltip trigger="対象" content="説明テキスト" />)
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
  })

  it('shows the content when the trigger receives keyboard focus', async () => {
    render(<Tooltip trigger="対象" content="説明テキスト" />)
    focusViaKeyboard(screen.getByRole('button', { name: '対象' }))
    await waitFor(() => expect(screen.getByRole('tooltip')).toHaveTextContent('説明テキスト'))
  })

  it('hides the content when the trigger loses focus', async () => {
    render(<Tooltip trigger="対象" content="説明テキスト" />)
    const trigger = screen.getByRole('button', { name: '対象' })
    focusViaKeyboard(trigger)
    await waitFor(() => expect(screen.getByRole('tooltip')).toHaveTextContent('説明テキスト'))

    fireEvent.blur(trigger)
    await waitFor(() => expect(screen.queryByRole('tooltip')).not.toBeInTheDocument())
  })

  it('supports a fully controlled open state', async () => {
    const handleOpenChange = vi.fn()
    const { rerender } = render(
      <Tooltip
        trigger="対象"
        content="説明テキスト"
        open={false}
        onOpenChange={handleOpenChange}
      />,
    )
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()

    rerender(<Tooltip trigger="対象" content="説明テキスト" open onOpenChange={handleOpenChange} />)
    await waitFor(() => expect(screen.getByRole('tooltip')).toHaveTextContent('説明テキスト'))
  })
})
