import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Textarea } from './Textarea'

describe('Textarea', () => {
  it('renders a textbox', () => {
    render(<Textarea />)
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('renders the placeholder', () => {
    render(<Textarea placeholder="Enter your comment" />)
    expect(screen.getByPlaceholderText('Enter your comment')).toBeInTheDocument()
  })
})
