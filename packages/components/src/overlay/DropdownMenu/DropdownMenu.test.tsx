import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { DropdownMenu } from './DropdownMenu'

const items = [
  { label: '編集', value: 'edit' },
  { label: '削除', value: 'delete' },
  { label: '無効', value: 'disabled', disabled: true },
]

// className/styleは公開APIとして受け付けない（ADR 0012）。
// 再びpropsとして受け付け可能になった場合、下記の@ts-expect-errorが
// 「不要な指定」としてtsc（pnpm run typecheck）上のエラーになり回帰を検知できる。
// この関数自体は実行されない（型チェックのみが目的）。
function _typeOnlyGuardAgainstDisallowedProps() {
  const withClassName = (
    // @ts-expect-error className is not part of DropdownMenu's public props
    <DropdownMenu trigger="操作" items={items} className="not-allowed" />
  )
  // @ts-expect-error style is not part of DropdownMenu's public props
  const withStyle = <DropdownMenu trigger="操作" items={items} style={{ margin: '1px' }} />
  return [withClassName, withStyle]
}
void _typeOnlyGuardAgainstDisallowedProps

describe('DropdownMenu', () => {
  it('renders the trigger', () => {
    render(<DropdownMenu trigger="操作" items={items} />)
    expect(screen.getByRole('button', { name: '操作' })).toBeInTheDocument()
  })

  it('opens the menu and shows items when the trigger is clicked', async () => {
    render(<DropdownMenu trigger="操作" items={items} />)
    fireEvent.click(screen.getByRole('button', { name: '操作' }))
    await waitFor(() => expect(screen.getByRole('menuitem', { name: '編集' })).toBeInTheDocument())
    expect(screen.getByRole('menuitem', { name: '削除' })).toBeInTheDocument()
  })

  it('calls onSelect for the selected item and closes the menu', async () => {
    const handleSelect = vi.fn()
    const itemsWithHandler = [
      { label: '編集', value: 'edit', onSelect: handleSelect },
      { label: '削除', value: 'delete' },
    ]
    render(<DropdownMenu trigger="操作" items={itemsWithHandler} />)
    fireEvent.click(screen.getByRole('button', { name: '操作' }))
    await waitFor(() => screen.getByRole('menuitem', { name: '編集' }))

    // Ark UIのMenuは選択操作の判定にhighlightedValue（ハイライト状態）を参照する。
    // クリックのみではハイライトされないため（実ブラウザのhover操作に相当する
    // イベントがjsdomのfireEvent.clickだけでは発生しない）、キーボード操作
    // （ArrowDownでハイライト→Enterで選択）で検証する
    const menu = screen.getByRole('menu')
    fireEvent.keyDown(menu, { key: 'ArrowDown' })
    await waitFor(() =>
      expect(screen.getByRole('menuitem', { name: '編集' })).toHaveAttribute('data-highlighted'),
    )

    fireEvent.keyDown(menu, { key: 'Enter' })
    await waitFor(() => expect(handleSelect).toHaveBeenCalledTimes(1))
    await waitFor(() => expect(screen.queryByRole('menu')).not.toBeInTheDocument())
  })

  it('does not call onSelect for a disabled item', async () => {
    const handleSelect = vi.fn()
    const itemsWithHandler = [
      { label: '無効', value: 'disabled', disabled: true, onSelect: handleSelect },
    ]
    render(<DropdownMenu trigger="操作" items={itemsWithHandler} />)
    fireEvent.click(screen.getByRole('button', { name: '操作' }))
    await waitFor(() => screen.getByRole('menuitem', { name: '無効' }))

    fireEvent.click(screen.getByRole('menuitem', { name: '無効' }))
    expect(handleSelect).not.toHaveBeenCalled()
  })
})
