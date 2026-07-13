import type { ComponentPropsWithRef, ReactNode } from 'react'

import { link } from '../../../styled-system/recipes'

// className/styleは公開APIとして受け付けない（ADR 0012）。
// v0.1はプレーンな<a>のラップのみとし、Next.js Link等のルーティングライブラリとの
// 統合（asChild/render prop）は対応しない（YAGNI）。必要になった時点で追加する
export interface LinkProps extends Omit<ComponentPropsWithRef<'a'>, 'className' | 'style'> {
  children: ReactNode
}

// React 19はrefを通常のpropとして受け取れるためforwardRefは不要（peerDependenciesがReact 19専用のため採用）
export const Link = ({ children, ref, ...rest }: LinkProps) => {
  return (
    <a {...rest} ref={ref} className={link()}>
      {children}
    </a>
  )
}

Link.displayName = 'Link'
