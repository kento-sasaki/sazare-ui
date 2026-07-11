import { render, screen } from '@testing-library/react'
import { createRef } from 'react'
import { describe, expect, it } from 'vitest'

import { Heading } from './Heading'

// className/styleは公開APIとして受け付けない（レイアウト調整はBox/Stackを使う、ADR 0012）。
// 再びpropsとして受け付け可能になった場合、下記の@ts-expect-errorが
// 「不要な指定」としてtsc（pnpm run typecheck）上のエラーになり回帰を検知できる。
// この関数自体は実行されない（型チェックのみが目的）。
function _typeOnlyGuardAgainstClassNameAndStyle() {
  // @ts-expect-error className is not part of Heading's public props
  const withClassName = <Heading className="not-allowed">Title</Heading>
  // @ts-expect-error style is not part of Heading's public props
  const withStyle = <Heading style={{ margin: '1px' }}>Title</Heading>
  return [withClassName, withStyle]
}
void _typeOnlyGuardAgainstClassNameAndStyle

describe('Heading', () => {
  it('renders an h2 element by default', () => {
    render(<Heading>Default heading</Heading>)
    expect(screen.getByRole('heading', { level: 2 }).tagName).toBe('H2')
  })

  it('renders the tag specified by the as prop', () => {
    render(<Heading as="h1">Title</Heading>)
    expect(screen.getByRole('heading', { level: 1 }).tagName).toBe('H1')
  })

  it('maps size automatically from the as prop when size is omitted', () => {
    render(<Heading as="h1">Title</Heading>)
    expect(screen.getByRole('heading', { level: 1 })).toHaveAttribute('data-size', '3xl')
  })

  it('uses the h2-based default size when neither as nor size is given', () => {
    render(<Heading>Default heading</Heading>)
    expect(screen.getByRole('heading', { level: 2 })).toHaveAttribute('data-size', '2xl')
  })

  it('lets an explicit size override the as-based mapping', () => {
    render(
      <Heading as="h1" size="sm">
        Title
      </Heading>,
    )
    expect(screen.getByRole('heading', { level: 1 })).toHaveAttribute('data-size', 'sm')
  })

  it('renders children as text content', () => {
    render(<Heading as="h3">Section title</Heading>)
    expect(screen.getByText('Section title')).toBeInTheDocument()
  })

  it('forwards the ref to the underlying element', () => {
    const ref = createRef<HTMLHeadingElement>()
    render(
      <Heading as="h4" ref={ref}>
        Title
      </Heading>,
    )
    expect(ref.current).toBeInstanceOf(HTMLHeadingElement)
    expect(ref.current?.tagName).toBe('H4')
  })

  it('defaults to the "default" text color when color is omitted', () => {
    render(<Heading>Title</Heading>)
    expect(screen.getByRole('heading', { level: 2 })).toHaveAttribute('data-color', 'default')
  })

  it('applies the color specified by the color prop', () => {
    render(<Heading color="secondary">Title</Heading>)
    expect(screen.getByRole('heading', { level: 2 })).toHaveAttribute('data-color', 'secondary')
  })

  it.each(['default', 'white', 'secondary', 'disabled', 'link', 'inherit'] as const)(
    'accepts the %s color token',
    (color) => {
      render(<Heading color={color}>Title</Heading>)
      expect(screen.getByRole('heading', { level: 2 })).toHaveAttribute('data-color', color)
    },
  )

  it('defaults to no bottom margin when marginBottom is omitted', () => {
    render(<Heading>Title</Heading>)
    expect(screen.getByRole('heading', { level: 2 })).toHaveAttribute('data-margin-bottom', 'none')
  })

  it('applies the spacing token specified by the marginBottom prop', () => {
    render(<Heading marginBottom="lg">Title</Heading>)
    expect(screen.getByRole('heading', { level: 2 })).toHaveAttribute('data-margin-bottom', 'lg')
  })

  it.each(['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const)(
    'accepts the %s spacing token for marginBottom',
    (marginBottom) => {
      render(<Heading marginBottom={marginBottom}>Title</Heading>)
      expect(screen.getByRole('heading', { level: 2 })).toHaveAttribute(
        'data-margin-bottom',
        marginBottom,
      )
    },
  )
})
