import { render, screen } from '@testing-library/react'
import { createRef } from 'react'
import { describe, expect, it } from 'vitest'

import { Text } from './Text'

// className/styleは公開APIとして受け付けない（レイアウト調整はBox/Stackを使う、ADR 0012）。
// 再びpropsとして受け付け可能になった場合、下記の@ts-expect-errorが
// 「不要な指定」としてtsc（pnpm run typecheck）上のエラーになり回帰を検知できる。
// この関数自体は実行されない（型チェックのみが目的）。
function _typeOnlyGuardAgainstClassNameAndStyle() {
  // @ts-expect-error className is not part of Text's public props
  const withClassName = <Text className="not-allowed">Title</Text>
  // @ts-expect-error style is not part of Text's public props
  const withStyle = <Text style={{ margin: '1px' }}>Title</Text>
  return [withClassName, withStyle]
}
void _typeOnlyGuardAgainstClassNameAndStyle

describe('Text', () => {
  it('renders a p element by default', () => {
    render(<Text>Default text</Text>)
    expect(screen.getByText('Default text').tagName).toBe('P')
  })

  it('renders the tag specified by the as prop', () => {
    render(<Text as="span">Inline text</Text>)
    expect(screen.getByText('Inline text').tagName).toBe('SPAN')
  })

  it('renders a div when as is set to div', () => {
    render(<Text as="div">Container text</Text>)
    expect(screen.getByText('Container text').tagName).toBe('DIV')
  })

  it('renders children as text content', () => {
    render(<Text>Some paragraph content</Text>)
    expect(screen.getByText('Some paragraph content')).toBeInTheDocument()
  })

  it('forwards the ref to the underlying element', () => {
    const ref = createRef<HTMLParagraphElement>()
    render(<Text ref={ref}>Text with ref</Text>)
    expect(ref.current).toBeInstanceOf(HTMLParagraphElement)
    expect(ref.current?.tagName).toBe('P')
  })

  it('defaults to the "md" size when size is omitted', () => {
    render(<Text>Title</Text>)
    expect(screen.getByText('Title')).toHaveAttribute('data-size', 'md')
  })

  it.each(['sm', 'md', 'lg', 'xl', '2xl', '3xl'] as const)('accepts the %s size token', (size) => {
    render(<Text size={size}>Title</Text>)
    expect(screen.getByText('Title')).toHaveAttribute('data-size', size)
  })

  it('defaults to the "default" text color when color is omitted', () => {
    render(<Text>Title</Text>)
    expect(screen.getByText('Title')).toHaveAttribute('data-color', 'default')
  })

  it.each(['default', 'white', 'secondary', 'disabled', 'link', 'inherit'] as const)(
    'accepts the %s color token',
    (color) => {
      render(<Text color={color}>Title</Text>)
      expect(screen.getByText('Title')).toHaveAttribute('data-color', color)
    },
  )

  it('defaults to the "normal" weight when weight is omitted', () => {
    render(<Text>Title</Text>)
    expect(screen.getByText('Title')).toHaveAttribute('data-weight', 'normal')
  })

  it.each(['normal', 'semibold', 'bold'] as const)('accepts the %s weight token', (weight) => {
    render(<Text weight={weight}>Title</Text>)
    expect(screen.getByText('Title')).toHaveAttribute('data-weight', weight)
  })
})
