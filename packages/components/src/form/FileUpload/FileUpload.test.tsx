import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { createRef } from 'react'
import { describe, expect, it, vi } from 'vitest'

import { FileUpload } from './FileUpload'

const createFile = (name: string, size: number, type = 'text/plain') => {
  const file = new File(['a'.repeat(size)], name, { type })
  return file
}

// className/styleは公開APIとして受け付けない（ADR 0012）。
// 再びpropsとして受け付け可能になった場合、下記の@ts-expect-errorが
// 「不要な指定」としてtsc（pnpm run typecheck）上のエラーになり回帰を検知できる。
// この関数自体は実行されない（型チェックのみが目的）。
function _typeOnlyGuardAgainstDisallowedProps() {
  // @ts-expect-error className is not part of FileUpload's public props
  const withClassName = <FileUpload className="not-allowed" />
  // @ts-expect-error style is not part of FileUpload's public props
  const withStyle = <FileUpload style={{ margin: '1px' }} />
  return [withClassName, withStyle]
}
void _typeOnlyGuardAgainstDisallowedProps

describe('FileUpload', () => {
  it('renders a trigger button for choosing files', () => {
    render(<FileUpload />)
    expect(screen.getByRole('button', { name: 'Choose files' })).toBeInTheDocument()
  })

  it('calls onValueChange with the selected files', async () => {
    const handleValueChange = vi.fn()
    const { container } = render(<FileUpload onValueChange={handleValueChange} />)
    const input = container.querySelector('input[type="file"]') as HTMLInputElement
    const file = createFile('report.txt', 10)
    fireEvent.input(input, { target: { files: [file] } })
    await waitFor(() => expect(handleValueChange).toHaveBeenCalledWith([file]))
  })

  it('shows the selected file name in the item list', async () => {
    const { container } = render(<FileUpload />)
    const input = container.querySelector('input[type="file"]') as HTMLInputElement
    const file = createFile('report.txt', 10)
    fireEvent.input(input, { target: { files: [file] } })
    await waitFor(() => expect(screen.getByText('report.txt')).toBeInTheDocument())
  })

  it('shows the files listed in defaultValue as the initial items', () => {
    const file = createFile('report.txt', 10)
    render(<FileUpload defaultValue={[file]} />)
    expect(screen.getByText('report.txt')).toBeInTheDocument()
  })

  it('removes a file when its delete trigger is clicked', async () => {
    const file = createFile('report.txt', 10)
    render(<FileUpload defaultValue={[file]} />)
    expect(screen.getByText('report.txt')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: /delete file/i }))
    await waitFor(() => expect(screen.queryByText('report.txt')).not.toBeInTheDocument())
  })

  it('disables the trigger when disabled', () => {
    render(<FileUpload disabled />)
    expect(screen.getByRole('button', { name: 'Choose files' })).toBeDisabled()
  })

  it('sets name and form on the hidden input for form submission', () => {
    const { container } = render(<FileUpload name="attachments" form="my-form" />)
    const input = container.querySelector('input[type="file"]')
    expect(input).toHaveAttribute('name', 'attachments')
    expect(input).toHaveAttribute('form', 'my-form')
  })

  it('reflects aria-invalid on the trigger when invalid', () => {
    render(<FileUpload aria-invalid />)
    expect(screen.getByRole('button', { name: 'Choose files' })).toHaveAttribute(
      'aria-invalid',
      'true',
    )
  })

  it('reflects an explicit id on the hidden input so a native label can activate it', () => {
    const { container } = render(<FileUpload id="attachments-field" />)
    const hiddenInput = container.querySelector('input[type="file"]')
    expect(hiddenInput).toHaveAttribute('id', 'attachments-field')
  })

  it('reflects an explicit aria-describedby on the trigger', () => {
    render(<FileUpload aria-describedby="attachments-help" />)
    const trigger = screen.getByRole('button', { name: 'Choose files' })
    expect(trigger).toHaveAttribute('aria-describedby', 'attachments-help')
  })

  it('forwards the ref to the underlying hidden input element', () => {
    const ref = createRef<HTMLInputElement>()
    render(<FileUpload ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLInputElement)
    expect(ref.current).toHaveAttribute('type', 'file')
  })
})
