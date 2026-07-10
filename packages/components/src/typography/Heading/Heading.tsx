import clsx from 'clsx'
import type { ComponentPropsWithRef, ElementType } from 'react'

import { heading } from '../../../styled-system/recipes'

export type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
export type HeadingSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'

const SIZE_BY_LEVEL: Record<HeadingLevel, HeadingSize> = {
  h1: '3xl',
  h2: '2xl',
  h3: 'xl',
  h4: 'lg',
  h5: 'md',
  h6: 'sm',
}

export interface HeadingProps extends Omit<ComponentPropsWithRef<'h2'>, 'as' | 'size'> {
  as?: HeadingLevel
  size?: HeadingSize
}

// React 19はrefを通常のpropとして受け取れるためforwardRefは不要（peerDependenciesがReact 19専用のため採用）
export const Heading = ({ as = 'h2', size, className, children, ref, ...rest }: HeadingProps) => {
  const Tag = as as ElementType
  const resolvedSize = size ?? SIZE_BY_LEVEL[as]

  return (
    <Tag
      ref={ref}
      data-size={resolvedSize}
      className={clsx(heading({ size: resolvedSize }), className)}
      {...rest}
    >
      {children}
    </Tag>
  )
}

Heading.displayName = 'Heading'
