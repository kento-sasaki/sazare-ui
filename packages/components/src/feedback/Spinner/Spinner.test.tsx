import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Spinner } from './Spinner'

describe('Spinner', () => {
  it('renders with role status', () => {
    render(<Spinner />)
    expect(screen.getByRole('status')).toBeInTheDocument()
  })

  it('has the default accessible name', () => {
    render(<Spinner />)
    expect(screen.getByRole('status')).toHaveAccessibleName('読み込み中')
  })

  it('respects a custom label', () => {
    render(<Spinner label="送信中" />)
    expect(screen.getByRole('status')).toHaveAccessibleName('送信中')
  })
})
