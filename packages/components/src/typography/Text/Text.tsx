import type { ComponentPropsWithRef, ElementType } from 'react'

import { text } from '../../../styled-system/recipes'

export type TextElement = 'p' | 'span' | 'div'

// className/styleは公開APIとして受け付けない。見た目の調整は必ずデザイントークンに
// 制約されたprops（size/color/weight等）を通す（ADR 0012）。
// 余白・複数要素の配置等のレイアウト合成はBox/Stackを使う（Textは自身の余白を持たない）。
export interface TextProps extends Omit<ComponentPropsWithRef<'p'>, 'as' | 'className' | 'style'> {
  as?: TextElement
}

// React 19はrefを通常のpropとして受け取れるためforwardRefは不要（peerDependenciesがReact 19専用のため採用）
export const Text = ({ as = 'p', children, ref, ...rest }: TextProps) => {
  const Tag = as as ElementType

  return (
    <Tag ref={ref} className={text()} {...rest}>
      {children}
    </Tag>
  )
}

Text.displayName = 'Text'
