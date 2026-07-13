import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { Pagination } from './Pagination'

// className/styleは公開APIとして受け付けない（ADR 0012）。
// 再びpropsとして受け付け可能になった場合、下記の@ts-expect-errorが
// 「不要な指定」としてtsc（pnpm run typecheck）上のエラーになり回帰を検知できる。
// この関数自体は実行されない（型チェックのみが目的）。
function _typeOnlyGuardAgainstDisallowedProps() {
  const withClassName = (
    // @ts-expect-error className is not part of Pagination's public props
    <Pagination count={30} pageSize={10} className="not-allowed" />
  )
  const withStyle = (
    // @ts-expect-error style is not part of Pagination's public props
    <Pagination count={30} pageSize={10} style={{ margin: '1px' }} />
  )
  return [withClassName, withStyle]
}
void _typeOnlyGuardAgainstDisallowedProps

describe('Pagination', () => {
  it('renders a navigation landmark with an accessible name', () => {
    render(<Pagination count={30} pageSize={10} />)
    expect(screen.getByRole('navigation', { name: 'Pagination' })).toBeInTheDocument()
  })

  it('renders a page button for every page and marks the current page', () => {
    render(<Pagination count={30} pageSize={10} defaultPage={1} />)
    expect(screen.getByRole('button', { name: '1' })).toHaveAttribute('aria-current', 'page')
    expect(screen.getByRole('button', { name: '2' })).not.toHaveAttribute('aria-current')
    expect(screen.getByRole('button', { name: '3' })).not.toHaveAttribute('aria-current')
  })

  it('disables the prev trigger on the first page', () => {
    render(<Pagination count={30} pageSize={10} defaultPage={1} />)
    expect(screen.getByRole('button', { name: '前へ' })).toBeDisabled()
    expect(screen.getByRole('button', { name: '次へ' })).not.toBeDisabled()
  })

  it('disables the next trigger on the last page', () => {
    render(<Pagination count={30} pageSize={10} defaultPage={3} />)
    expect(screen.getByRole('button', { name: '次へ' })).toBeDisabled()
    expect(screen.getByRole('button', { name: '前へ' })).not.toBeDisabled()
  })

  it('calls onPageChange when a page button is clicked', async () => {
    const handlePageChange = vi.fn()
    render(<Pagination count={30} pageSize={10} defaultPage={1} onPageChange={handlePageChange} />)
    fireEvent.click(screen.getByRole('button', { name: '2' }))
    await waitFor(() => expect(handlePageChange).toHaveBeenCalledWith(2))
  })

  it('calls onPageChange when the next trigger is clicked', async () => {
    const handlePageChange = vi.fn()
    render(<Pagination count={30} pageSize={10} defaultPage={1} onPageChange={handlePageChange} />)
    fireEvent.click(screen.getByRole('button', { name: '次へ' }))
    await waitFor(() => expect(handlePageChange).toHaveBeenCalledWith(2))
  })

  it('supports a fully controlled page', () => {
    const { rerender } = render(<Pagination count={30} pageSize={10} page={1} />)
    expect(screen.getByRole('button', { name: '1' })).toHaveAttribute('aria-current', 'page')

    rerender(<Pagination count={30} pageSize={10} page={2} />)
    expect(screen.getByRole('button', { name: '2' })).toHaveAttribute('aria-current', 'page')
  })
})
