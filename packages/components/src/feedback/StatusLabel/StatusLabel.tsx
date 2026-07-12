import type { colors } from '@sazare-ui/tokens'
import type { ReactNode } from 'react'

import { statusLabel } from '../../../styled-system/recipes'

// デザイントークン（@sazare-ui/tokens）のキーから型を導出する（ADR 0011）
export type StatusLabelTone = keyof typeof colors.feedback

export interface StatusLabelProps {
  tone?: StatusLabelTone
  children: ReactNode
}

export const StatusLabel = ({ tone = 'neutral', children }: StatusLabelProps) => {
  return (
    <span data-tone={tone} className={statusLabel({ tone })}>
      {children}
    </span>
  )
}

StatusLabel.displayName = 'StatusLabel'
