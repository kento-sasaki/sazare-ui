import { Tabs as ArkTabs } from '@ark-ui/react/tabs'
import type { ReactNode } from 'react'

import { tabs } from '../../../styled-system/recipes'

export interface TabItem {
  value: string
  label: string
  content: ReactNode
  disabled?: boolean
}

// className/styleは公開APIとして受け付けない（ADR 0012）。
// v0.1は水平方向のみをスコープとする（orientation propは公開しない、YAGNI）
export interface TabsProps {
  items: TabItem[]
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
}

export const Tabs = ({ items, value, defaultValue, onValueChange }: TabsProps) => {
  const styles = tabs()

  return (
    <ArkTabs.Root
      className={styles.root}
      value={value}
      // Ark UIはvalue/defaultValueを共に省略すると最初のタブを自動選択しないため、
      // 非制御時は明示的に先頭のitemを既定選択にする
      defaultValue={defaultValue ?? items[0]?.value}
      onValueChange={onValueChange ? (details) => onValueChange(details.value) : undefined}
    >
      <ArkTabs.List className={styles.list}>
        {items.map((item) => (
          <ArkTabs.Trigger
            key={item.value}
            value={item.value}
            disabled={item.disabled}
            className={styles.trigger}
          >
            {item.label}
          </ArkTabs.Trigger>
        ))}
        <ArkTabs.Indicator className={styles.indicator} />
      </ArkTabs.List>
      {items.map((item) => (
        <ArkTabs.Content key={item.value} value={item.value} className={styles.content}>
          {item.content}
        </ArkTabs.Content>
      ))}
    </ArkTabs.Root>
  )
}

Tabs.displayName = 'Tabs'
