import type { colors, fontSizes, fontWeights } from '@sazare-ui/tokens'
import type { ComponentPropsWithRef, ElementType } from 'react'

import { text } from '../../../styled-system/recipes'

export type TextElement = 'p' | 'span' | 'div'
// デザイントークン（@sazare-ui/tokens）のキーから型を導出する。トークンと型が常に一致するようにするため、
// ここでリテラルユニオンを手書きしない
export type TextSize = keyof typeof fontSizes
// text系semantic colorのみ許容する（SmartHR UIのText color相当）。任意のCSS色文字列は指定できない
export type TextColor = keyof typeof colors.text | 'inherit'
export type TextWeight = keyof typeof fontWeights

// className/styleは公開APIとして受け付けない。見た目の調整は必ずデザイントークンに
// 制約されたprops（size/color/weight等）を通す（ADR 0012）。
// 余白・複数要素の配置等のレイアウト合成はBox/Stackを使う（Textは自身の余白を持たない）。
// asの3値（p/span/div）はHeadingのh1〜h6と異なりDOMインターフェースがそれぞれ異なる
// （HTMLParagraphElement/HTMLSpanElement/HTMLDivElement）ため、asの値に応じてref/属性の型が
// 動的に解決されるようジェネリクスで定義する（Headingのasはh1〜h6全てHTMLHeadingElementに
// 集約されるためこの問題が発生せず、単純な固定型で足りる）。
export type TextProps<E extends TextElement = 'p'> = Omit<
  ComponentPropsWithRef<E>,
  'as' | 'size' | 'color' | 'className' | 'style'
> & {
  as?: E
  size?: TextSize
  color?: TextColor
  weight?: TextWeight
}

// React 19はrefを通常のpropとして受け取れるためforwardRefは不要（peerDependenciesがReact 19専用のため採用）
export const Text = <E extends TextElement = 'p'>({
  as,
  size = 'md',
  color = 'default',
  weight = 'normal',
  children,
  ref,
  ...rest
}: TextProps<E>) => {
  const Tag = (as ?? 'p') as ElementType

  return (
    <Tag
      ref={ref}
      data-size={size}
      data-color={color}
      data-weight={weight}
      className={text({ size, color, weight })}
      {...rest}
    >
      {children}
    </Tag>
  )
}

Text.displayName = 'Text'
