import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { SegmentedControl } from './SegmentedControl'

const options = [
  { label: 'List', value: 'list' },
  { label: 'Board', value: 'board' },
  { label: 'Calendar', value: 'calendar', disabled: true },
]

// className/styleは公開APIとして受け付けない（ADR 0012）。
// 再びpropsとして受け付け可能になった場合、下記の@ts-expect-errorが
// 「不要な指定」としてtsc（pnpm run typecheck）上のエラーになり回帰を検知できる。
// この関数自体は実行されない（型チェックのみが目的）。
function _typeOnlyGuardAgainstDisallowedProps() {
  const withClassName = (
    // @ts-expect-error className is not part of SegmentedControl's public props
    <SegmentedControl label="View" options={options} className="not-allowed" />
  )
  // @ts-expect-error style is not part of SegmentedControl's public props
  const withStyle = <SegmentedControl label="View" options={options} style={{ margin: '1px' }} />
  return [withClassName, withStyle]
}
void _typeOnlyGuardAgainstDisallowedProps

describe('SegmentedControl', () => {
  it('renders a radio for each option', () => {
    render(<SegmentedControl label="View" options={options} />)
    expect(screen.getByRole('radio', { name: 'List' })).toBeInTheDocument()
    expect(screen.getByRole('radio', { name: 'Board' })).toBeInTheDocument()
    expect(screen.getByRole('radio', { name: 'Calendar' })).toBeInTheDocument()
  })

  it('exposes the group via an accessible name matching label', () => {
    render(<SegmentedControl label="View" options={options} />)
    expect(screen.getByRole('radiogroup', { name: 'View' })).toBeInTheDocument()
  })

  it('checks the option listed in defaultValue', () => {
    render(<SegmentedControl label="View" options={options} defaultValue="board" />)
    expect(screen.getByRole('radio', { name: 'List' })).not.toBeChecked()
    expect(screen.getByRole('radio', { name: 'Board' })).toBeChecked()
  })

  it('calls onValueChange with the selected value when an option is clicked', async () => {
    const handleValueChange = vi.fn()
    render(<SegmentedControl label="View" options={options} onValueChange={handleValueChange} />)
    fireEvent.click(screen.getByRole('radio', { name: 'List' }))
    await waitFor(() => expect(handleValueChange).toHaveBeenCalledWith('list'))
  })

  it('supports a controlled value', () => {
    render(
      <SegmentedControl label="View" options={options} value="list" onValueChange={() => {}} />,
    )
    expect(screen.getByRole('radio', { name: 'List' })).toBeChecked()
    expect(screen.getByRole('radio', { name: 'Board' })).not.toBeChecked()
  })

  it('disables an individual option via the option-level disabled flag', () => {
    render(<SegmentedControl label="View" options={options} />)
    expect(screen.getByRole('radio', { name: 'Calendar' })).toBeDisabled()
    expect(screen.getByRole('radio', { name: 'List' })).not.toBeDisabled()
  })

  it('disables all options when the group is disabled', () => {
    render(<SegmentedControl label="View" options={options} disabled />)
    expect(screen.getByRole('radio', { name: 'List' })).toBeDisabled()
    expect(screen.getByRole('radio', { name: 'Board' })).toBeDisabled()
  })

  it('applies the same name to every option for form submission', () => {
    render(<SegmentedControl label="View" options={options} name="view" />)
    expect(screen.getByRole('radio', { name: 'List' })).toHaveAttribute('name', 'view')
    expect(screen.getByRole('radio', { name: 'Board' })).toHaveAttribute('name', 'view')
  })
})
