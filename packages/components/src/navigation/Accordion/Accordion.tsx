import { Accordion as ArkAccordion } from '@ark-ui/react/accordion'
import type { ReactNode } from 'react'

import { accordion } from '../../../styled-system/recipes'

export interface AccordionItem {
  value: string
  label: string
  content: ReactNode
  disabled?: boolean
}

// className/styleは公開APIとして受け付けない（ADR 0012）。
export interface AccordionProps {
  items: AccordionItem[]
  value?: string[]
  defaultValue?: string[]
  onValueChange?: (value: string[]) => void
  multiple?: boolean
  collapsible?: boolean
}

export const Accordion = ({
  items,
  value,
  defaultValue,
  onValueChange,
  multiple,
  collapsible,
}: AccordionProps) => {
  const styles = accordion()

  return (
    <ArkAccordion.Root
      className={styles.root}
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange ? (details) => onValueChange(details.value) : undefined}
      multiple={multiple}
      collapsible={collapsible}
    >
      {items.map((item) => (
        <ArkAccordion.Item
          key={item.value}
          value={item.value}
          disabled={item.disabled}
          className={styles.item}
        >
          <ArkAccordion.ItemTrigger className={styles.itemTrigger}>
            {item.label}
            <ArkAccordion.ItemIndicator className={styles.itemIndicator}>
              ▾
            </ArkAccordion.ItemIndicator>
          </ArkAccordion.ItemTrigger>
          <ArkAccordion.ItemContent className={styles.itemContent}>
            {item.content}
          </ArkAccordion.ItemContent>
        </ArkAccordion.Item>
      ))}
    </ArkAccordion.Root>
  )
}

Accordion.displayName = 'Accordion'
