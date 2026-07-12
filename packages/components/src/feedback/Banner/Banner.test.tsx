import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { Banner } from './Banner'

describe('Banner', () => {
  it('renders the title and children', () => {
    render(<Banner title="エラーが発生しました">詳細な説明文</Banner>)
    expect(screen.getByText('エラーが発生しました')).toBeInTheDocument()
    expect(screen.getByText('詳細な説明文')).toBeInTheDocument()
  })

  it('reflects the tone prop as a data attribute', () => {
    const { container } = render(<Banner tone="error">エラー内容</Banner>)
    expect(container.firstChild).toHaveAttribute('data-tone', 'error')
  })

  it('defaults to the neutral tone', () => {
    const { container } = render(<Banner>お知らせ</Banner>)
    expect(container.firstChild).toHaveAttribute('data-tone', 'neutral')
  })

  it('does not render a close button when onClose is not provided', () => {
    render(<Banner>お知らせ</Banner>)
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  it('renders a close button and calls onClose when clicked', () => {
    const handleClose = vi.fn()
    render(<Banner onClose={handleClose}>お知らせ</Banner>)
    fireEvent.click(screen.getByRole('button', { name: '閉じる' }))
    expect(handleClose).toHaveBeenCalledOnce()
  })
})
