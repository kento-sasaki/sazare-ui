import { Portal } from '@ark-ui/react/portal'
import { createListCollection, Select as ArkSelect } from '@ark-ui/react/select'
import type { Ref } from 'react'
import { useMemo } from 'react'

import { select } from '../../../styled-system/recipes'

const ChevronDownIcon = () => (
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
    strokeLinejoin="round"
  >
    <path d="M4 6l4 4 4-4" />
  </svg>
)

const CheckIcon = () => (
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
    strokeLinejoin="round"
  >
    <path d="M3 8.5l3.5 3.5L13 4.5" />
  </svg>
)

export interface SelectOption {
  label: string
  value: string
  disabled?: boolean
}

// Ark UIのSelectはRoot/Control/Trigger/ValueText/Indicator/Positioner/Content/Item等の
// 複合コンポーネントだが、Checkbox/RadioGroupと同じ思想（メモリ: ark-ui-single-component-wrap）で
// 単一コンポーネントに完全にラップし、className/style/childrenは公開propsに含めない。
// Ark UI内部の値モデルは複数選択(string[])だが、v0.1は単一選択のみをスコープとし
// 公開APIはstring | nullで境界変換する（他の全form componentとの一貫性のため）
export interface SelectProps {
  // Ark UIのSelect.Rootは常にaria-labelledbyでこのLabel要素のIDを参照するため、
  // 省略するとID参照先が存在しないa11y違反（aria-valid-attr-value）になる。そのため必須にする
  label: string
  options: SelectOption[]
  placeholder?: string
  value?: string
  defaultValue?: string
  onValueChange?: (value: string | null) => void
  disabled?: boolean
  invalid?: boolean
  required?: boolean
  name?: string
  form?: string
  // refは実際のフォーム値を持つhidden selectへ転送する（react-hook-form等との連携を想定）
  ref?: Ref<HTMLSelectElement>
}

export const Select = ({
  label,
  options,
  placeholder,
  value,
  defaultValue,
  onValueChange,
  disabled,
  invalid,
  required,
  name,
  form,
  ref,
}: SelectProps) => {
  const styles = select()

  const collection = useMemo(
    () =>
      createListCollection({
        items: options,
        itemToValue: (item) => item.value,
        itemToString: (item) => item.label,
        isItemDisabled: (item) => Boolean(item.disabled),
      }),
    [options],
  )

  return (
    <ArkSelect.Root
      className={styles.root}
      collection={collection}
      value={value !== undefined ? [value] : undefined}
      defaultValue={defaultValue !== undefined ? [defaultValue] : undefined}
      onValueChange={
        onValueChange ? (details) => onValueChange(details.value[0] ?? null) : undefined
      }
      disabled={disabled}
      invalid={invalid}
      required={required}
      name={name}
      form={form}
    >
      <ArkSelect.HiddenSelect ref={ref} />
      <ArkSelect.Label className={styles.label}>{label}</ArkSelect.Label>
      <ArkSelect.Control className={styles.control}>
        <ArkSelect.Trigger className={styles.trigger}>
          <ArkSelect.ValueText className={styles.valueText} placeholder={placeholder} />
          <ArkSelect.Indicator className={styles.indicator}>
            <ChevronDownIcon />
          </ArkSelect.Indicator>
        </ArkSelect.Trigger>
      </ArkSelect.Control>
      <Portal>
        <ArkSelect.Positioner className={styles.positioner}>
          <ArkSelect.Content className={styles.content}>
            {options.map((option) => (
              <ArkSelect.Item key={option.value} item={option} className={styles.item}>
                <ArkSelect.ItemText className={styles.itemText}>{option.label}</ArkSelect.ItemText>
                <ArkSelect.ItemIndicator className={styles.itemIndicator}>
                  <CheckIcon />
                </ArkSelect.ItemIndicator>
              </ArkSelect.Item>
            ))}
          </ArkSelect.Content>
        </ArkSelect.Positioner>
      </Portal>
    </ArkSelect.Root>
  )
}

Select.displayName = 'Select'
