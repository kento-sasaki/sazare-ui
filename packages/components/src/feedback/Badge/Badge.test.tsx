import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Badge } from './Badge'

describe('Badge', () => {
  it('renders the children text', () => {
    render(<Badge>42</Badge>)
    expect(screen.getByText('42')).toBeInTheDocument()
  })

  it('defaults to the neutral tone', () => {
    render(<Badge>Default</Badge>)
    expect(screen.getByText('Default')).toHaveAttribute('data-tone', 'neutral')
  })

  it('reflects the tone prop as a data attribute', () => {
    render(<Badge tone="success">Active</Badge>)
    expect(screen.getByText('Active')).toHaveAttribute('data-tone', 'success')
  })
})
