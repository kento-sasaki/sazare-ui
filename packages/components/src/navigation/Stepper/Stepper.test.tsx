import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { Stepper } from './Stepper'

const steps = [{ label: 'Step 1' }, { label: 'Step 2' }, { label: 'Step 3' }]

// className/styleは公開APIとして受け付けない（ADR 0012）。
// 再びpropsとして受け付け可能になった場合、下記の@ts-expect-errorが
// 「不要な指定」としてtsc（pnpm run typecheck）上のエラーになり回帰を検知できる。
// この関数自体は実行されない（型チェックのみが目的）。
function _typeOnlyGuardAgainstDisallowedProps() {
  const withClassName = (
    // @ts-expect-error className is not part of Stepper's public props
    <Stepper steps={steps} className="not-allowed" />
  )
  const withStyle = (
    // @ts-expect-error style is not part of Stepper's public props
    <Stepper steps={steps} style={{ margin: '1px' }} />
  )
  return [withClassName, withStyle]
}
void _typeOnlyGuardAgainstDisallowedProps

describe('Stepper', () => {
  it('renders a tab for each step and marks the first step current by default', () => {
    render(<Stepper steps={steps} />)
    expect(screen.getByRole('tab', { name: 'Step 1' })).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByRole('tab', { name: 'Step 2' })).toHaveAttribute('aria-selected', 'false')
  })

  it('disables the prev trigger on the first step', () => {
    render(<Stepper steps={steps} />)
    expect(screen.getByRole('button', { name: '前へ' })).toBeDisabled()
    expect(screen.getByRole('button', { name: '次へ' })).not.toBeDisabled()
  })

  it('calls onStepChange when the next trigger is clicked', async () => {
    const handleStepChange = vi.fn()
    render(<Stepper steps={steps} onStepChange={handleStepChange} />)
    fireEvent.click(screen.getByRole('button', { name: '次へ' }))
    await waitFor(() => expect(handleStepChange).toHaveBeenCalledWith(1))
  })

  it('advances to the clicked step when not linear', async () => {
    render(<Stepper steps={steps} />)
    fireEvent.click(screen.getByRole('tab', { name: 'Step 3' }))
    await waitFor(() =>
      expect(screen.getByRole('tab', { name: 'Step 3' })).toHaveAttribute('aria-selected', 'true'),
    )
  })

  it('ignores clicking a non-adjacent step when linear', () => {
    render(<Stepper steps={steps} linear />)
    fireEvent.click(screen.getByRole('tab', { name: 'Step 3' }))
    expect(screen.getByRole('tab', { name: 'Step 1' })).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByRole('tab', { name: 'Step 3' })).toHaveAttribute('aria-selected', 'false')
  })

  it('supports a fully controlled step', async () => {
    const { rerender } = render(<Stepper steps={steps} step={0} />)
    expect(screen.getByRole('tab', { name: 'Step 1' })).toHaveAttribute('aria-selected', 'true')

    rerender(<Stepper steps={steps} step={1} />)
    await waitFor(() =>
      expect(screen.getByRole('tab', { name: 'Step 2' })).toHaveAttribute('aria-selected', 'true'),
    )
  })
})
