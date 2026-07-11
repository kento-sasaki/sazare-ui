import type { ComponentPropsWithRef, ReactNode } from 'react'

import { iconButton } from '../../../styled-system/recipes'

export type IconButtonVariant = 'solid' | 'outline'
export type IconButtonSize = 'sm' | 'md'

// className/styleは公開APIとして受け付けない。見た目の調整は必ずデザイントークンに
// 制約されたprops（variant/size等）を通す（ADR 0012）。
// childrenも受け付けない。IconButtonの中身はicon propに一本化する（Buttonのlabelと同じ思想）。
// aria-labelはComponentPropsWithRef<'button'>ではoptionalだが、視覚ラベル（テキスト）を
// 持たないIconButtonでは省略するとアクセシブルネームが無くなるため必須にする。
export interface IconButtonProps extends Omit<
  ComponentPropsWithRef<'button'>,
  'className' | 'style' | 'children' | 'aria-label'
> {
  variant?: IconButtonVariant
  size?: IconButtonSize
  icon: ReactNode
  'aria-label': string
}

// React 19はrefを通常のpropとして受け取れるためforwardRefは不要（peerDependenciesがReact 19専用のため採用）
export const IconButton = ({
  variant = 'solid',
  size = 'md',
  icon,
  ref,
  ...rest
}: IconButtonProps) => {
  return (
    <button
      {...rest}
      ref={ref}
      data-variant={variant}
      data-size={size}
      className={iconButton({ variant, size })}
    >
      {icon}
    </button>
  )
}

IconButton.displayName = 'IconButton'
