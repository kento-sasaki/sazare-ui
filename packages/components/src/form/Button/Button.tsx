import type { ComponentPropsWithRef } from 'react'

import { button } from '../../../styled-system/recipes'

// variantは対応するデザイントークンのカテゴリが存在せず（recipeが定義する見た目のバリエーション名のため）、
// ADR 0011のHeadingLevel例外と同様に手書きのリテラルユニオンとする
export type ButtonVariant = 'solid' | 'outline'
// sizeはfontSize単体ではなくfontSize+paddingを束ねた意味的なスケール（Headingの
// HeadingLevel→SIZE_BY_LEVELと同型の構造）のため、こちらも手書きのリテラルユニオンとする
export type ButtonSize = 'sm' | 'md'

// className/styleは公開APIとして受け付けない。見た目の調整は必ずデザイントークンに
// 制約されたprops（variant/size等）を通す（ADR 0012）。
// 余白・複数要素の配置等のレイアウト合成はBox/Stackを使う（Buttonは自身の余白を持たない）。
export interface ButtonProps extends Omit<ComponentPropsWithRef<'button'>, 'className' | 'style'> {
  variant?: ButtonVariant
  size?: ButtonSize
}

// React 19はrefを通常のpropとして受け取れるためforwardRefは不要（peerDependenciesがReact 19専用のため採用）
export const Button = ({ variant = 'solid', size = 'md', children, ref, ...rest }: ButtonProps) => {
  return (
    <button
      ref={ref}
      data-variant={variant}
      data-size={size}
      className={button({ variant, size })}
      {...rest}
    >
      {children}
    </button>
  )
}

Button.displayName = 'Button'
