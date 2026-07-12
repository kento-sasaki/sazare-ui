import type { colors } from '@sazare-ui/tokens'
import type { ReactNode } from 'react'

import { banner } from '../../../styled-system/recipes'
import { IconButton } from '../../form/IconButton/IconButton'

// デザイントークン（@sazare-ui/tokens）のキーから型を導出する（ADR 0011）
export type BannerTone = keyof typeof colors.feedback

export interface BannerProps {
  tone?: BannerTone
  title?: string
  children: ReactNode
  // 指定時のみ閉じるボタンを表示する（Issue #44のErrorScreen相当の用途では
  // 閉じられないエラー表示にしたいケースもあるため、常時表示にはしない）
  onClose?: () => void
}

// widthとheightを明示しないとSVGの既定サイズのままflexアイテムを押し広げるため、
// IconButtonのControl幅（Checkbox.tsxのCheckIconと同じ理由）に合わせて明示する
const CloseIcon = () => (
  <svg
    aria-hidden="true"
    focusable="false"
    width="100%"
    height="100%"
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
  >
    <path d="M4 4l8 8M12 4l-8 8" />
  </svg>
)

export const Banner = ({ tone = 'neutral', title, children, onClose }: BannerProps) => {
  const styles = banner({ tone })

  return (
    <div data-tone={tone} className={styles.root}>
      <div className={styles.content}>
        {title && <p className={styles.title}>{title}</p>}
        <div className={styles.body}>{children}</div>
      </div>
      {onClose && (
        <div className={styles.closeTrigger}>
          <IconButton
            aria-label="閉じる"
            icon={<CloseIcon />}
            variant="outline"
            size="sm"
            onClick={onClose}
          />
        </div>
      )}
    </div>
  )
}

Banner.displayName = 'Banner'
