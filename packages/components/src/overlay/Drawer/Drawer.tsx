import { Drawer as ArkDrawer } from '@ark-ui/react/drawer'
import { Portal } from '@ark-ui/react/portal'
import type { ReactNode } from 'react'

import { drawer } from '../../../styled-system/recipes'

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

// Ark UIのswipeDirection（"up" | "down" | "start" | "end"）をそのままplacementとして公開する。
// トップ/ボトム置換の追加マッピングは行わず、Ark UI自体の語彙をそのまま使う（YAGNI）
export type DrawerPlacement = 'up' | 'down' | 'start' | 'end'

// Drawerも本文が自由形式のJSXになるため、Dialogと同じ理由で「単一コンポーネント完全ラップ・
// childrenなし」の原則を適用できない。FormControl/Toast/Dialogに続く4件目の意図的例外として、
// trigger（Ark UIのTrigger内に描画するボタンの中身）とchildren（本文）のみ穴を開ける。
// Grabber/SwipeArea（タッチスワイプで閉じる機能）はv0.1スコープ外
export interface DrawerProps {
  trigger?: ReactNode
  title: string
  description?: string
  children: ReactNode
  placement?: DrawerPlacement
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

export const Drawer = ({
  trigger,
  title,
  description,
  children,
  placement = 'end',
  open,
  defaultOpen,
  onOpenChange,
}: DrawerProps) => {
  const styles = drawer()

  return (
    <ArkDrawer.Root
      open={open}
      defaultOpen={defaultOpen}
      swipeDirection={placement}
      onOpenChange={onOpenChange ? (details) => onOpenChange(details.open) : undefined}
    >
      {trigger !== undefined && (
        <ArkDrawer.Trigger className={styles.trigger}>{trigger}</ArkDrawer.Trigger>
      )}
      <Portal>
        <ArkDrawer.Backdrop className={styles.backdrop} />
        <ArkDrawer.Positioner className={styles.positioner}>
          <ArkDrawer.Content className={styles.content}>
            <ArkDrawer.Title className={styles.title}>{title}</ArkDrawer.Title>
            {description && (
              <ArkDrawer.Description className={styles.description}>
                {description}
              </ArkDrawer.Description>
            )}
            {children}
            <ArkDrawer.CloseTrigger aria-label="閉じる" className={styles.closeTrigger}>
              <CloseIcon />
            </ArkDrawer.CloseTrigger>
          </ArkDrawer.Content>
        </ArkDrawer.Positioner>
      </Portal>
    </ArkDrawer.Root>
  )
}

Drawer.displayName = 'Drawer'
