import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { createToaster, Toaster } from './Toast'

describe('Toast', () => {
  it('renders a toast title created via the toaster', async () => {
    const toaster = createToaster({ placement: 'bottom-end' })
    render(<Toaster toaster={toaster} />)

    act(() => {
      toaster.create({ title: '保存しました', type: 'success', duration: Infinity })
    })

    await waitFor(() => expect(screen.getByText('保存しました')).toBeInTheDocument())
  })

  it('renders a toast description', async () => {
    const toaster = createToaster({})
    render(<Toaster toaster={toaster} />)

    act(() => {
      toaster.create({ description: '詳細メッセージ', duration: Infinity })
    })

    await waitFor(() => expect(screen.getByText('詳細メッセージ')).toBeInTheDocument())
  })

  it('dismisses the toast when the close trigger is clicked', async () => {
    const toaster = createToaster({})
    render(<Toaster toaster={toaster} />)

    act(() => {
      // removeDelay: 0でdismissアニメーション待ちを無くす
      toaster.create({ title: 'お知らせ', duration: Infinity, removeDelay: 0 })
    })
    await waitFor(() => expect(screen.getByText('お知らせ')).toBeInTheDocument())

    fireEvent.click(screen.getByRole('button', { name: '閉じる' }))

    // vitestの複数テストファイル並列実行下ではCPU競合でzag-jsの内部タイマーが遅延することがあるため、
    // デフォルトの1000msでは不安定。余裕を持たせて5000msにする
    await waitFor(() => expect(screen.queryByText('お知らせ')).not.toBeInTheDocument(), {
      timeout: 5000,
    })
  })
})
