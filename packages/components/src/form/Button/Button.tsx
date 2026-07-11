import type { ComponentPropsWithRef } from 'react'

import { button } from '../../../styled-system/recipes'

// variantは対応するデザイントークンのカテゴリが存在せず（recipeが定義する見た目のバリエーション名のため）、
// ADR 0011のHeadingLevel例外と同様に手書きのリテラルユニオンとする
export type ButtonVariant = 'solid' | 'outline'

// className/styleは公開APIとして受け付けない。見た目の調整は必ずデザイントークンに
// 制約されたprops（variant/size等）を通す（ADR 0012）。
// 余白・複数要素の配置等のレイアウト合成はBox/Stackを使う（Buttonは自身の余白を持たない）。
export interface ButtonProps extends Omit<ComponentPropsWithRef<'button'>, 'className' | 'style'> {
  variant?: ButtonVariant
}

// React 19はrefを通常のpropとして受け取れるためforwardRefは不要（peerDependenciesがReact 19専用のため採用）
export const Button = ({ variant = 'solid', children, ref, ...rest }: ButtonProps) => {
  return (
    <button ref={ref} data-variant={variant} className={button({ variant })} {...rest}>
      {children}
    </button>
  )
}

Button.displayName = 'Button'
