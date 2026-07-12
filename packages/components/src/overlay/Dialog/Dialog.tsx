import { Dialog as ArkDialog } from '@ark-ui/react/dialog'
import { Portal } from '@ark-ui/react/portal'
import type { ReactNode } from 'react'

import { dialog } from '../../../styled-system/recipes'

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

// Dialogは本文が自由形式のJSXになるため、Checkbox/Select等で確立した「単一コンポーネント
// 完全ラップ・childrenなし」の原則を適用できない。FormControl/Toastに続く3件目の
// 意図的例外として、trigger（Ark UIのTrigger内に描画するボタンの中身）とchildren（本文）
// のみ穴を開ける。className/styleは引き続き非公開（ADR 0012）
export interface DialogProps {
  trigger?: ReactNode
  title: string
  description?: string
  children: ReactNode
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

export const Dialog = ({
  trigger,
  title,
  description,
  children,
  open,
  defaultOpen,
  onOpenChange,
}: DialogProps) => {
  const styles = dialog()

  return (
    <ArkDialog.Root
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange ? (details) => onOpenChange(details.open) : undefined}
    >
      {trigger !== undefined && (
        <ArkDialog.Trigger className={styles.trigger}>{trigger}</ArkDialog.Trigger>
      )}
      <Portal>
        <ArkDialog.Backdrop className={styles.backdrop} />
        <ArkDialog.Positioner className={styles.positioner}>
          <ArkDialog.Content className={styles.content}>
            <ArkDialog.Title className={styles.title}>{title}</ArkDialog.Title>
            {description && (
              <ArkDialog.Description className={styles.description}>
                {description}
              </ArkDialog.Description>
            )}
            {children}
            <ArkDialog.CloseTrigger aria-label="閉じる" className={styles.closeTrigger}>
              <CloseIcon />
            </ArkDialog.CloseTrigger>
          </ArkDialog.Content>
        </ArkDialog.Positioner>
      </Portal>
    </ArkDialog.Root>
  )
}

Dialog.displayName = 'Dialog'
