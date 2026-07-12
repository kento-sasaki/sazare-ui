import type { colors } from '@sazare-ui/tokens'
import type { ReactNode } from 'react'

import { badge } from '../../../styled-system/recipes'

// デザイントークン（@sazare-ui/tokens）のキーから型を導出する（ADR 0011）。
// colors.feedbackのキーがneutral/success/warning/error/infoのtone一覧そのものになる
export type BadgeTone = keyof typeof colors.feedback

export interface BadgeProps {
  tone?: BadgeTone
  children: ReactNode
}

export const Badge = ({ tone = 'neutral', children }: BadgeProps) => {
  return (
    <span data-tone={tone} className={badge({ tone })}>
      {children}
    </span>
  )
}

Badge.displayName = 'Badge'
