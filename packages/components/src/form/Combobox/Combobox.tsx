import { Combobox as ArkCombobox, useListCollection } from '@ark-ui/react/combobox'
import { Portal } from '@ark-ui/react/portal'
import type { Ref } from 'react'
import { useEffect, useRef } from 'react'

import { combobox } from '../../../styled-system/recipes'

const ChevronsUpDownIcon = () => (
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
    <path d="M4 6l4-4 4 4M4 10l4 4 4-4" />
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

export interface ComboboxOption {
  label: string
  value: string
  disabled?: boolean
}

// Ark UIのComboboxはRoot/Control/Input/Trigger/Positioner/Content/Item等の複合コンポーネントだが、
// Checkbox/RadioGroup/Selectと同じ思想（メモリ: ark-ui-single-component-wrap）で単一コンポーネントに
// 完全にラップし、className/style/childrenは公開propsに含めない。
// Ark UIのCombobox.Rootは常にaria-labelledbyでこのLabel要素のIDを参照するため、
// 省略するとID参照先が存在しないa11y違反（aria-valid-attr-value）になる。そのため必須にする
// （Selectと同じ理由。詳しくは[[ark-ui-single-component-wrap]]）
// freeSoloは不許容（選択肢からのみ選択）。Ark UIの`allowCustomValue`は既定でfalseのため、
// 明示的に指定せずデフォルト挙動に任せている（一致しない入力はblur/close時に選択済みラベルへ
// 自動的に戻る）
export interface ComboboxProps {
  label: string
  options: ComboboxOption[]
  placeholder?: string
  value?: string | null
  defaultValue?: string | null
  onValueChange?: (value: string | null) => void
  disabled?: boolean
  invalid?: boolean
  required?: boolean
  name?: string
  form?: string
  ref?: Ref<HTMLInputElement>
}

export const Combobox = ({
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
}: ComboboxProps) => {
  const styles = combobox()

  const { collection, filter, reset, set } = useListCollection<ComboboxOption>({
    initialItems: options,
    itemToValue: (item) => item.value,
    itemToString: (item) => item.label,
    filter: (itemText, filterText) => itemText.toLowerCase().includes(filterText.toLowerCase()),
  })

  // 直近のoptionsをrefで保持する。set()側のuseEffectの依存はコンテンツキー
  // （optionsKey）のみにし、optionsの「参照」が変わっただけでは発火させない。
  // refの更新自体はレンダー中に行わずuseEffectで行う（react-hooks/refs対応）
  const optionsRef = useRef(options)
  useEffect(() => {
    optionsRef.current = options
  })

  // optionsの中身（value/label/disabledの並び）を表す安定キー。呼び出し側がインライン配列
  // 等でoptionsを参照不安定に渡しても、内容が同じならこのキーは変わらず後続のset()を
  // 呼ばない。set()は絞り込み中のフィルタ文字列をリセットしてしまう
  // （useListCollectionのsetがフィルタ状態を消去するため）ので、参照が変わっただけで
  // 発火すると絞り込み中の表示とinputValueの状態が食い違ってしまう
  const optionsKey = options
    .map((option) => `${option.value}:${option.label}:${option.disabled ?? ''}`)
    .join('|')

  // optionsが実際に差し替えられた場合（例: 非同期取得後の更新）に、
  // useListCollectionが初回マウント時のinitialItemsしか保持しないため手動で反映する
  useEffect(() => {
    set(optionsRef.current)
  }, [optionsKey, set])

  return (
    <ArkCombobox.Root
      className={styles.root}
      // Ark UIの既定はopenOnClick=falseだが、Selectのトリガークリックとの一貫性のため
      // input クリックでも開くようにする
      openOnClick
      collection={collection}
      value={value === undefined ? undefined : value === null ? [] : [value]}
      defaultValue={
        defaultValue === undefined ? undefined : defaultValue === null ? [] : [defaultValue]
      }
      onValueChange={
        onValueChange ? (details) => onValueChange(details.value[0] ?? null) : undefined
      }
      onInputValueChange={(details) => filter(details.inputValue)}
      onOpenChange={(details) => {
        if (details.open) reset()
      }}
      disabled={disabled}
      invalid={invalid}
      required={required}
      name={name}
      form={form}
    >
      <ArkCombobox.Label className={styles.label}>{label}</ArkCombobox.Label>
      <ArkCombobox.Control className={styles.control}>
        <ArkCombobox.Input className={styles.input} ref={ref} placeholder={placeholder} />
        <ArkCombobox.Trigger className={styles.trigger}>
          <ChevronsUpDownIcon />
        </ArkCombobox.Trigger>
      </ArkCombobox.Control>
      <Portal>
        <ArkCombobox.Positioner className={styles.positioner}>
          <ArkCombobox.Content className={styles.content}>
            {collection.items.map((item) => (
              <ArkCombobox.Item key={item.value} item={item} className={styles.item}>
                <ArkCombobox.ItemText className={styles.itemText}>
                  {item.label}
                </ArkCombobox.ItemText>
                <ArkCombobox.ItemIndicator className={styles.itemIndicator}>
                  <CheckIcon />
                </ArkCombobox.ItemIndicator>
              </ArkCombobox.Item>
            ))}
          </ArkCombobox.Content>
        </ArkCombobox.Positioner>
      </Portal>
    </ArkCombobox.Root>
  )
}

Combobox.displayName = 'Combobox'
