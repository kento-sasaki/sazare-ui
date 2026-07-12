import { render, screen } from '@testing-library/react'
import { createRef } from 'react'
import { describe, expect, it } from 'vitest'

import { TextInput } from '../TextInput/TextInput'

import { FormControl } from './FormControl'

// className/styleは公開APIとして受け付けない（ADR 0012）。
// 再びpropsとして受け付け可能になった場合、下記の@ts-expect-errorが
// 「不要な指定」としてtsc（pnpm run typecheck）上のエラーになり回帰を検知できる。
// この関数自体は実行されない（型チェックのみが目的）。
function _typeOnlyGuardAgainstDisallowedProps() {
  const withClassName = (
    // @ts-expect-error className is not part of FormControl's public props
    <FormControl label="Username" className="not-allowed">
      <TextInput />
    </FormControl>
  )
  const withStyle = (
    // @ts-expect-error style is not part of FormControl's public props
    <FormControl label="Username" style={{ margin: '1px' }}>
      <TextInput />
    </FormControl>
  )
  return [withClassName, withStyle]
}
void _typeOnlyGuardAgainstDisallowedProps

describe('FormControl', () => {
  it('associates the label with the child field via htmlFor/id', () => {
    render(
      <FormControl label="Username">
        <TextInput />
      </FormControl>,
    )
    expect(screen.getByRole('textbox', { name: 'Username' })).toBeInTheDocument()
  })

  it('shows the helper text when not invalid', () => {
    render(
      <FormControl label="Username" helperText="3-20 characters">
        <TextInput />
      </FormControl>,
    )
    expect(screen.getByText('3-20 characters')).toBeInTheDocument()
  })

  it('shows the error text instead of the helper text when invalid', () => {
    render(
      <FormControl label="Username" helperText="3-20 characters" errorText="Required" invalid>
        <TextInput />
      </FormControl>,
    )
    expect(screen.getByText('Required')).toBeInTheDocument()
    expect(screen.queryByText('3-20 characters')).not.toBeInTheDocument()
  })

  it('propagates aria-invalid to the child field when invalid', () => {
    render(
      <FormControl label="Username" errorText="Required" invalid>
        <TextInput />
      </FormControl>,
    )
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true')
  })

  it('associates the error text with the child field via aria-describedby', () => {
    render(
      <FormControl label="Username" errorText="Required" invalid>
        <TextInput />
      </FormControl>,
    )
    const input = screen.getByRole('textbox')
    const describedbyId = input.getAttribute('aria-describedby')
    expect(describedbyId).toBeTruthy()
    expect(document.getElementById(describedbyId as string)).toHaveTextContent('Required')
  })

  it('propagates disabled to the child field', () => {
    render(
      <FormControl label="Username" disabled>
        <TextInput />
      </FormControl>,
    )
    expect(screen.getByRole('textbox')).toBeDisabled()
  })

  it('propagates required to the child field', () => {
    render(
      <FormControl label="Username" required>
        <TextInput />
      </FormControl>,
    )
    expect(screen.getByRole('textbox')).toBeRequired()
  })

  it('generates an id for the child field when none is specified', () => {
    render(
      <FormControl label="Username">
        <TextInput />
      </FormControl>,
    )
    expect(screen.getByRole('textbox')).toHaveAttribute('id')
  })

  it('preserves existing props on the child field', () => {
    render(
      <FormControl label="Username">
        <TextInput placeholder="your-name" />
      </FormControl>,
    )
    expect(screen.getByPlaceholderText('your-name')).toBeInTheDocument()
  })

  it('forwards the ref through to the underlying child element', () => {
    const ref = createRef<HTMLInputElement>()
    render(
      <FormControl label="Username">
        <TextInput ref={ref} />
      </FormControl>,
    )
    expect(ref.current).toBeInstanceOf(HTMLInputElement)
  })
})
