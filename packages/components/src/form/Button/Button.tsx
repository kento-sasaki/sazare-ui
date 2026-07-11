import type { ComponentPropsWithRef } from 'react'

import { button } from '../../../styled-system/recipes'

// className/styleは公開APIとして受け付けない。見た目の調整は必ずデザイントークンに
// 制約されたprops（variant/size等）を通す（ADR 0012）。
// 余白・複数要素の配置等のレイアウト合成はBox/Stackを使う（Buttonは自身の余白を持たない）。
export type ButtonProps = Omit<ComponentPropsWithRef<'button'>, 'className' | 'style'>

// React 19はrefを通常のpropとして受け取れるためforwardRefは不要（peerDependenciesがReact 19専用のため採用）
export const Button = ({ children, ref, ...rest }: ButtonProps) => {
  return (
    <button ref={ref} className={button()} {...rest}>
      {children}
    </button>
  )
}

Button.displayName = 'Button'
