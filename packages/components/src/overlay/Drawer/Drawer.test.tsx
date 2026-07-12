import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { Drawer } from './Drawer'

// className/styleは公開APIとして受け付けない（ADR 0012）。
// 再びpropsとして受け付け可能になった場合、下記の@ts-expect-errorが
// 「不要な指定」としてtsc（pnpm run typecheck）上のエラーになり回帰を検知できる。
// この関数自体は実行されない（型チェックのみが目的）。
function _typeOnlyGuardAgainstDisallowedProps() {
  const withClassName = (
    // @ts-expect-error className is not part of Drawer's public props
    <Drawer trigger="開く" title="タイトル" className="not-allowed">
      本文
    </Drawer>
  )
  const withStyle = (
    // @ts-expect-error style is not part of Drawer's public props
    <Drawer trigger="開く" title="タイトル" style={{ margin: '1px' }}>
      本文
    </Drawer>
  )
  return [withClassName, withStyle]
}
void _typeOnlyGuardAgainstDisallowedProps

const flushEscapeListenerRegistration = async () => {
  // Ark UIのdismissable-layerはEscapeキーのリスナーをrequestAnimationFrameで
  // 遅延登録するため、開いた直後にfireEventすると取りこぼす。1フレーム分待ってから発火する
  await act(async () => {
    await new Promise((resolve) => requestAnimationFrame(resolve))
  })
}

describe('Drawer', () => {
  it('opens a drawer with an accessible name matching title when the trigger is clicked', async () => {
    render(
      <Drawer trigger="開く" title="設定">
        本文
      </Drawer>,
    )
    fireEvent.click(screen.getByRole('button', { name: '開く' }))
    await waitFor(() => expect(screen.getByRole('dialog', { name: '設定' })).toBeInTheDocument())
  })

  it('renders the description when provided', async () => {
    render(
      <Drawer trigger="開く" title="設定" description="詳細説明">
        本文
      </Drawer>,
    )
    fireEvent.click(screen.getByRole('button', { name: '開く' }))
    await waitFor(() => expect(screen.getByText('詳細説明')).toBeInTheDocument())
  })

  it('renders the children as drawer body content', async () => {
    render(
      <Drawer trigger="開く" title="設定">
        本文コンテンツ
      </Drawer>,
    )
    fireEvent.click(screen.getByRole('button', { name: '開く' }))
    await waitFor(() => expect(screen.getByText('本文コンテンツ')).toBeInTheDocument())
  })

  it('closes the drawer when the close trigger is clicked', async () => {
    render(
      <Drawer trigger="開く" title="設定">
        本文
      </Drawer>,
    )
    fireEvent.click(screen.getByRole('button', { name: '開く' }))
    await waitFor(() => expect(screen.getByRole('dialog', { name: '設定' })).toBeInTheDocument())

    fireEvent.click(screen.getByRole('button', { name: '閉じる' }))
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument())
  })

  it('closes the drawer when the escape key is pressed', async () => {
    render(
      <Drawer trigger="開く" title="設定">
        本文
      </Drawer>,
    )
    fireEvent.click(screen.getByRole('button', { name: '開く' }))
    await waitFor(() => expect(screen.getByRole('dialog', { name: '設定' })).toBeInTheDocument())

    await flushEscapeListenerRegistration()
    fireEvent.keyDown(screen.getByRole('dialog'), { key: 'Escape' })
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument())
  })

  it('supports a fully controlled open state without a trigger', async () => {
    const handleOpenChange = vi.fn()
    const { rerender } = render(
      <Drawer title="設定" open={false} onOpenChange={handleOpenChange}>
        本文
      </Drawer>,
    )
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()

    rerender(
      <Drawer title="設定" open onOpenChange={handleOpenChange}>
        本文
      </Drawer>,
    )
    await waitFor(() => expect(screen.getByRole('dialog', { name: '設定' })).toBeInTheDocument())
  })

  it('defaults to the end placement (right edge in LTR)', async () => {
    render(
      <Drawer trigger="開く" title="設定">
        本文
      </Drawer>,
    )
    fireEvent.click(screen.getByRole('button', { name: '開く' }))
    // "end"はdirコンテキスト（既定はltr）に基づき物理方向("right")に解決される
    await waitFor(() =>
      expect(screen.getByRole('dialog')).toHaveAttribute('data-swipe-direction', 'right'),
    )
  })

  it('reflects the placement prop on the content element', async () => {
    render(
      <Drawer trigger="開く" title="設定" placement="up">
        本文
      </Drawer>,
    )
    fireEvent.click(screen.getByRole('button', { name: '開く' }))
    await waitFor(() =>
      expect(screen.getByRole('dialog')).toHaveAttribute('data-swipe-direction', 'up'),
    )
  })
})
