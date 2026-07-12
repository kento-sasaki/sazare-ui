import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { Dialog } from './Dialog'

// className/styleは公開APIとして受け付けない（ADR 0012）。
// 再びpropsとして受け付け可能になった場合、下記の@ts-expect-errorが
// 「不要な指定」としてtsc（pnpm run typecheck）上のエラーになり回帰を検知できる。
// この関数自体は実行されない（型チェックのみが目的）。
function _typeOnlyGuardAgainstDisallowedProps() {
  const withClassName = (
    // @ts-expect-error className is not part of Dialog's public props
    <Dialog trigger="開く" title="タイトル" className="not-allowed">
      本文
    </Dialog>
  )
  const withStyle = (
    // @ts-expect-error style is not part of Dialog's public props
    <Dialog trigger="開く" title="タイトル" style={{ margin: '1px' }}>
      本文
    </Dialog>
  )
  return [withClassName, withStyle]
}
void _typeOnlyGuardAgainstDisallowedProps

describe('Dialog', () => {
  it('opens a dialog with an accessible name matching title when the trigger is clicked', async () => {
    render(
      <Dialog trigger="開く" title="設定">
        本文
      </Dialog>,
    )
    fireEvent.click(screen.getByRole('button', { name: '開く' }))
    await waitFor(() => expect(screen.getByRole('dialog', { name: '設定' })).toBeInTheDocument())
  })

  it('renders the description when provided', async () => {
    render(
      <Dialog trigger="開く" title="設定" description="詳細説明">
        本文
      </Dialog>,
    )
    fireEvent.click(screen.getByRole('button', { name: '開く' }))
    await waitFor(() => expect(screen.getByText('詳細説明')).toBeInTheDocument())
  })

  it('renders the children as dialog body content', async () => {
    render(
      <Dialog trigger="開く" title="設定">
        本文コンテンツ
      </Dialog>,
    )
    fireEvent.click(screen.getByRole('button', { name: '開く' }))
    await waitFor(() => expect(screen.getByText('本文コンテンツ')).toBeInTheDocument())
  })

  it('closes the dialog when the close trigger is clicked', async () => {
    render(
      <Dialog trigger="開く" title="設定">
        本文
      </Dialog>,
    )
    fireEvent.click(screen.getByRole('button', { name: '開く' }))
    await waitFor(() => expect(screen.getByRole('dialog', { name: '設定' })).toBeInTheDocument())

    fireEvent.click(screen.getByRole('button', { name: '閉じる' }))
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument())
  })

  it('closes the dialog when the escape key is pressed', async () => {
    render(
      <Dialog trigger="開く" title="設定">
        本文
      </Dialog>,
    )
    fireEvent.click(screen.getByRole('button', { name: '開く' }))
    await waitFor(() => expect(screen.getByRole('dialog', { name: '設定' })).toBeInTheDocument())

    // Ark UIのdismissable-layerはEscapeキーのリスナーをrequestAnimationFrameで
    // 遅延登録するため、開いた直後にfireEventすると取りこぼす。1フレーム分待ってから発火する
    await act(async () => {
      await new Promise((resolve) => requestAnimationFrame(resolve))
    })
    fireEvent.keyDown(screen.getByRole('dialog'), { key: 'Escape' })
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument())
  })

  it('supports a fully controlled open state without a trigger', async () => {
    const handleOpenChange = vi.fn()
    const { rerender } = render(
      <Dialog title="設定" open={false} onOpenChange={handleOpenChange}>
        本文
      </Dialog>,
    )
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()

    rerender(
      <Dialog title="設定" open onOpenChange={handleOpenChange}>
        本文
      </Dialog>,
    )
    await waitFor(() => expect(screen.getByRole('dialog', { name: '設定' })).toBeInTheDocument())
  })
})
