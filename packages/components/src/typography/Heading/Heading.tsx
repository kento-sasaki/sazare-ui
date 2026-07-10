import clsx from 'clsx'
import type { ComponentPropsWithRef, ElementType } from 'react'

import { heading } from '../../../styled-system/recipes'

export type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
export type HeadingSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'
// text系semantic colorのみ許容する（SmartHR UIのText color相当）。任意のCSS色文字列は指定できない
export type HeadingColor = 'default' | 'white' | 'secondary' | 'disabled' | 'link' | 'inherit'

const SIZE_BY_LEVEL: Record<HeadingLevel, HeadingSize> = {
  h1: '3xl',
  h2: '2xl',
  h3: 'xl',
  h4: 'lg',
  h5: 'md',
  h6: 'sm',
}

export interface HeadingProps extends Omit<ComponentPropsWithRef<'h2'>, 'as' | 'size' | 'color'> {
  as?: HeadingLevel
  size?: HeadingSize
  color?: HeadingColor
}

// React 19はrefを通常のpropとして受け取れるためforwardRefは不要（peerDependenciesがReact 19専用のため採用）
export const Heading = ({
  as = 'h2',
  size,
  color = 'default',
  className,
  children,
  ref,
  ...rest
}: HeadingProps) => {
  const Tag = as as ElementType
  const resolvedSize = size ?? SIZE_BY_LEVEL[as]

  return (
    <Tag
      ref={ref}
      data-size={resolvedSize}
      data-color={color}
      className={clsx(heading({ size: resolvedSize, color }), className)}
      {...rest}
    >
      {children}
    </Tag>
  )
}

Heading.displayName = 'Heading'
