import type { ReactNode } from 'react'

import { card } from '../../../styled-system/recipes'

// className/styleは公開APIとして受け付けない（ADR 0012）。
export interface CardProps {
  children: ReactNode
}

export const Card = ({ children }: CardProps) => {
  return <div className={card()}>{children}</div>
}

Card.displayName = 'Card'
