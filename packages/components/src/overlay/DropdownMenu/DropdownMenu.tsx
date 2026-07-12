import { Menu as ArkMenu } from '@ark-ui/react/menu'
import { Portal } from '@ark-ui/react/portal'
import type { ReactNode } from 'react'

import { dropdownMenu } from '../../../styled-system/recipes'

export interface DropdownMenuItem {
  label: string
  value: string
  onSelect?: () => void
  disabled?: boolean
}

// DropdownMenuはtrigger要素と項目リストが用途上必須で、Checkbox/Select等で確立した
// 「単一コンポーネント完全ラップ・childrenなし」の原則をそのまま適用できない。
// FormControl/Toast/Dialog/Drawer/Tooltipに続く6件目の意図的例外として、trigger（Ark UIの
// Trigger内に描画するボタンの中身）を穴として開ける。ただし本文はSelectのoptionsと同型の
// items配列（closed API）で表現し、childrenは公開しない。v0.1はフラットなアクションリストのみ
// スコープとし、checkbox item・radio item group・submenu・separatorは対象外
export interface DropdownMenuProps {
  trigger: ReactNode
  items: DropdownMenuItem[]
}

export const DropdownMenu = ({ trigger, items }: DropdownMenuProps) => {
  const styles = dropdownMenu()

  return (
    <ArkMenu.Root
      onSelect={(details) => items.find((item) => item.value === details.value)?.onSelect?.()}
    >
      <ArkMenu.Trigger className={styles.trigger}>{trigger}</ArkMenu.Trigger>
      <Portal>
        <ArkMenu.Positioner className={styles.positioner}>
          <ArkMenu.Content className={styles.content}>
            {items.map((item) => (
              <ArkMenu.Item
                key={item.value}
                value={item.value}
                disabled={item.disabled}
                className={styles.item}
              >
                <ArkMenu.ItemText className={styles.itemText}>{item.label}</ArkMenu.ItemText>
              </ArkMenu.Item>
            ))}
          </ArkMenu.Content>
        </ArkMenu.Positioner>
      </Portal>
    </ArkMenu.Root>
  )
}

DropdownMenu.displayName = 'DropdownMenu'
