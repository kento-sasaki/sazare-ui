import { Portal } from '@ark-ui/react/portal'
import { Tooltip as ArkTooltip } from '@ark-ui/react/tooltip'
import type { ReactNode } from 'react'

import { tooltip } from '../../../styled-system/recipes'

// Tooltipはtrigger要素とcontent（短い説明文）が用途上必須で、Checkbox/Select等で確立した
// 「単一コンポーネント完全ラップ・childrenなし」の原則をそのまま適用できない。
// FormControl/Toast/Dialog/Drawerに続く5件目の意図的例外として、trigger（Ark UIのTrigger内に
// 描画するボタンの中身）とcontent（吹き出しの中身）のみ穴を開ける
export interface TooltipProps {
  trigger: ReactNode
  content: ReactNode
}

export const Tooltip = ({ trigger, content }: TooltipProps) => {
  const styles = tooltip()

  return (
    <ArkTooltip.Root>
      <ArkTooltip.Trigger className={styles.trigger}>{trigger}</ArkTooltip.Trigger>
      <Portal>
        <ArkTooltip.Positioner className={styles.positioner}>
          <ArkTooltip.Content className={styles.content}>{content}</ArkTooltip.Content>
        </ArkTooltip.Positioner>
      </Portal>
    </ArkTooltip.Root>
  )
}

Tooltip.displayName = 'Tooltip'
