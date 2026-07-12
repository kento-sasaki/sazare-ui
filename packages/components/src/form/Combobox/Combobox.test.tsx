import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { createRef } from 'react'
import { describe, expect, it, vi } from 'vitest'

import { Combobox } from './Combobox'

const options = [
  { label: 'React', value: 'react' },
  { label: 'Solid', value: 'solid' },
  { label: 'Vue', value: 'vue' },
  { label: 'Svelte', value: 'svelte', disabled: true },
]

// className/styleは公開APIとして受け付けない（ADR 0012）。
// 再びpropsとして受け付け可能になった場合、下記の@ts-expect-errorが
// 「不要な指定」としてtsc（pnpm run typecheck）上のエラーになり回帰を検知できる。
// この関数自体は実行されない（型チェックのみが目的）。
function _typeOnlyGuardAgainstDisallowedProps() {
  // @ts-expect-error className is not part of Combobox's public props
  const withClassName = <Combobox label="Framework" options={options} className="not-allowed" />
  // @ts-expect-error style is not part of Combobox's public props
  const withStyle = <Combobox label="Framework" options={options} style={{ margin: '1px' }} />
  return [withClassName, withStyle]
}
void _typeOnlyGuardAgainstDisallowedProps

describe('Combobox', () => {
  it('renders an input with an accessible name matching label', () => {
    render(<Combobox label="Framework" options={options} />)
    expect(screen.getByRole('combobox', { name: 'Framework' })).toBeInTheDocument()
  })

  it('shows the placeholder text when no value is selected', () => {
    render(<Combobox label="Framework" options={options} placeholder="Choose a framework" />)
    expect(screen.getByPlaceholderText('Choose a framework')).toBeInTheDocument()
  })

  it('opens the listbox and shows options when the input is clicked', async () => {
    render(<Combobox label="Framework" options={options} />)
    fireEvent.click(screen.getByRole('combobox', { name: 'Framework' }))
    await waitFor(() => expect(screen.getByRole('option', { name: 'React' })).toBeInTheDocument())
  })

  it('filters the options as the input value changes', async () => {
    render(<Combobox label="Framework" options={options} />)
    const input = screen.getByRole('combobox', { name: 'Framework' })
    fireEvent.click(input)
    await waitFor(() => screen.getByRole('option', { name: 'React' }))
    fireEvent.change(input, { target: { value: 'vu' } })
    await waitFor(() => {
      expect(screen.getByRole('option', { name: 'Vue' })).toBeInTheDocument()
      expect(screen.queryByRole('option', { name: 'React' })).not.toBeInTheDocument()
    })
  })

  it('does not reset the filter when a content-equal but referentially new options array is passed', async () => {
    const { rerender } = render(<Combobox label="Framework" options={options} />)
    const input = screen.getByRole('combobox', { name: 'Framework' })
    fireEvent.click(input)
    await waitFor(() => screen.getByRole('option', { name: 'React' }))
    fireEvent.change(input, { target: { value: 'vu' } })
    await waitFor(() => {
      expect(screen.getByRole('option', { name: 'Vue' })).toBeInTheDocument()
      expect(screen.queryByRole('option', { name: 'React' })).not.toBeInTheDocument()
    })
    // 呼び出し側がoptionsを新しい配列参照（内容は同一）で渡して再レンダーしても、
    // 絞り込み結果はリセットされない（インライン配列を渡すような呼び出し方を想定）
    rerender(<Combobox label="Framework" options={[...options]} />)
    expect(screen.getByRole('option', { name: 'Vue' })).toBeInTheDocument()
    expect(screen.queryByRole('option', { name: 'React' })).not.toBeInTheDocument()
  })

  it('calls onValueChange with the selected value when an option is clicked', async () => {
    const handleValueChange = vi.fn()
    render(<Combobox label="Framework" options={options} onValueChange={handleValueChange} />)
    fireEvent.click(screen.getByRole('combobox', { name: 'Framework' }))
    await waitFor(() => screen.getByRole('option', { name: 'React' }))
    fireEvent.click(screen.getByRole('option', { name: 'React' }))
    await waitFor(() => expect(handleValueChange).toHaveBeenCalledWith('react'))
  })

  it('shows the option listed in defaultValue as the initial input value', () => {
    render(<Combobox label="Framework" options={options} defaultValue="vue" />)
    expect(screen.getByRole('combobox', { name: 'Framework' })).toHaveValue('Vue')
  })

  it('reverts the input to the selected label when a non-matching value is typed (no freeSolo)', async () => {
    render(<Combobox label="Framework" options={options} defaultValue="vue" />)
    const input = screen.getByRole('combobox', { name: 'Framework' })
    fireEvent.click(input)
    await waitFor(() => screen.getByRole('option', { name: 'Vue' }))
    fireEvent.change(input, { target: { value: 'not-a-real-framework' } })
    // zag-jsの挙動: 開いている状態でハイライト項目が無く自由入力値のときEnterを押すと、
    // INPUT.ENTERハンドラがselectHighlightedItemではなくrevertInputValueを発火し、
    // 選択済みラベルへ戻る（onValueChangeは自由入力値では呼ばれない）
    fireEvent.keyDown(input, { key: 'Enter' })
    await waitFor(() => expect(input).toHaveValue('Vue'))
  })

  it('disables an individual option via the option-level disabled flag', async () => {
    render(<Combobox label="Framework" options={options} />)
    fireEvent.click(screen.getByRole('combobox', { name: 'Framework' }))
    await waitFor(() =>
      expect(screen.getByRole('option', { name: 'Svelte' })).toHaveAttribute(
        'aria-disabled',
        'true',
      ),
    )
  })

  it('disables the input when the combobox is disabled', () => {
    render(<Combobox label="Framework" options={options} disabled />)
    expect(screen.getByRole('combobox', { name: 'Framework' })).toBeDisabled()
  })

  it('reflects required on the input', () => {
    render(<Combobox label="Framework" options={options} required />)
    expect(screen.getByRole('combobox', { name: 'Framework' })).toBeRequired()
  })

  it('reflects aria-invalid on the input when invalid', () => {
    render(<Combobox label="Framework" options={options} invalid />)
    expect(screen.getByRole('combobox', { name: 'Framework' })).toHaveAttribute(
      'aria-invalid',
      'true',
    )
  })

  it('applies the name to the input for form submission', () => {
    render(<Combobox label="Framework" options={options} name="framework" />)
    expect(screen.getByRole('combobox', { name: 'Framework' })).toHaveAttribute('name', 'framework')
  })

  it('forwards the ref to the underlying input element', () => {
    const ref = createRef<HTMLInputElement>()
    render(<Combobox label="Framework" options={options} ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLInputElement)
  })
})
