import type { colors, fontSizes } from '@sazare-ui/tokens'
import type { ComponentPropsWithRef, ElementType } from 'react'

import { heading } from '../../../styled-system/recipes'

export type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
// デザイントークン（@sazare-ui/tokens）のキーから型を導出する。トークンと型が常に一致するようにするため、
// ここでリテラルユニオンを手書きしない
export type HeadingSize = keyof typeof fontSizes
// text系semantic colorのみ許容する（SmartHR UIのText color相当）。任意のCSS色文字列は指定できない
export type HeadingColor = keyof typeof colors.text | 'inherit'

const SIZE_BY_LEVEL: Record<HeadingLevel, HeadingSize> = {
  h1: '3xl',
  h2: '2xl',
  h3: 'xl',
  h4: 'lg',
  h5: 'md',
  h6: 'sm',
}

// className/styleは公開APIとして受け付けない。見た目の調整は必ずデザイントークンに
// 制約されたprops（size/color等）を通す（ADR 0012）。
// 余白・複数要素の配置等のレイアウト合成はBox/Stackを使う（Headingは自身の余白を持たない）。
export interface HeadingProps extends Omit<
  ComponentPropsWithRef<'h2'>,
  'as' | 'size' | 'color' | 'className' | 'style'
> {
  as?: HeadingLevel
  size?: HeadingSize
  color?: HeadingColor
}

// React 19はrefを通常のpropとして受け取れるためforwardRefは不要（peerDependenciesがReact 19専用のため採用）
export const Heading = ({
  as = 'h2',
  size,
  color = 'default',
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
      className={heading({ size: resolvedSize, color })}
      {...rest}
    >
      {children}
    </Tag>
  )
}

Heading.displayName = 'Heading'
