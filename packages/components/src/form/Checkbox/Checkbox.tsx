import { Checkbox as ArkCheckbox } from '@ark-ui/react/checkbox'
import type { Ref } from 'react'

import { checkbox } from '../../../styled-system/recipes'

// v0.1ではチェック済み表現に必要な最小限のアイコンのみを内部実装として持つ
// （IconButtonのiconとは異なり、利用側が差し替える対象ではない）
// widthとheightを明示しないとSVGの既定サイズ（ブラウザ既定で約300x150）のままflexアイテムとして
// 親のControlを押し広げてしまうため、常にColorのwidth/height:100%スロットに合わせて明示する
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

const MinusIcon = () => (
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
    <path d="M3 8h10" />
  </svg>
)

// Ark UIのCheckboxはRoot/HiddenInput/Control/Indicator/Labelの複合コンポーネントだが、
// Button/IconButtonと同じ思想（ADR 0012）で単一コンポーネントに完全にラップし、
// className/style/childrenは公開propsに含めない。中身はlabel（string）に一本化する。
export interface CheckboxProps {
  label: string
  checked?: boolean | 'indeterminate'
  defaultChecked?: boolean | 'indeterminate'
  onCheckedChange?: (details: { checked: boolean | 'indeterminate' }) => void
  disabled?: boolean
  required?: boolean
  name?: string
  value?: string
  form?: string
  // refは実際のフォーム値を持つhidden inputへ転送する（react-hook-form等との連携を想定）
  ref?: Ref<HTMLInputElement>
}

export const Checkbox = ({
  label,
  checked,
  defaultChecked,
  onCheckedChange,
  disabled,
  required,
  name,
  value,
  form,
  ref,
}: CheckboxProps) => {
  const styles = checkbox()

  return (
    <ArkCheckbox.Root
      className={styles.root}
      checked={checked}
      defaultChecked={defaultChecked}
      onCheckedChange={onCheckedChange}
      disabled={disabled}
      required={required}
      name={name}
      value={value}
      form={form}
    >
      <ArkCheckbox.HiddenInput ref={ref} />
      <ArkCheckbox.Control className={styles.control}>
        <ArkCheckbox.Indicator className={styles.indicator}>
          <CheckIcon />
        </ArkCheckbox.Indicator>
        <ArkCheckbox.Indicator indeterminate className={styles.indicator}>
          <MinusIcon />
        </ArkCheckbox.Indicator>
      </ArkCheckbox.Control>
      <ArkCheckbox.Label className={styles.label}>{label}</ArkCheckbox.Label>
    </ArkCheckbox.Root>
  )
}

Checkbox.displayName = 'Checkbox'
