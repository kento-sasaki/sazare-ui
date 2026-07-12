import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { StatusLabel } from './StatusLabel'

describe('StatusLabel', () => {
  it('renders the children text', () => {
    render(<StatusLabel>対応中</StatusLabel>)
    expect(screen.getByText('対応中')).toBeInTheDocument()
  })

  it('defaults to the neutral tone', () => {
    render(<StatusLabel>未対応</StatusLabel>)
    expect(screen.getByText('未対応')).toHaveAttribute('data-tone', 'neutral')
  })

  it('reflects the tone prop as a data attribute', () => {
    render(<StatusLabel tone="success">対応済み</StatusLabel>)
    expect(screen.getByText('対応済み')).toHaveAttribute('data-tone', 'success')
  })
})
