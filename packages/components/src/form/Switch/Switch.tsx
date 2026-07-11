import { Switch as ArkSwitch } from '@ark-ui/react/switch'
import type { Ref } from 'react'

import { switchField } from '../../../styled-system/recipes'

// Ark UIのSwitchはRoot/HiddenInput/Control/Thumb/Labelの複合コンポーネントだが、
// Button/Checkboxと同じ思想（ADR 0012）で単一コンポーネントに完全にラップし、
// label（string）に一本化してclassName/style/childrenは公開しない。
export interface SwitchProps {
  label: string
  checked?: boolean
  defaultChecked?: boolean
  onCheckedChange?: (details: { checked: boolean }) => void
  disabled?: boolean
  required?: boolean
  name?: string
  value?: string
  form?: string
  // refは実際のフォーム値を持つhidden inputへ転送する（react-hook-form等との連携を想定）
  ref?: Ref<HTMLInputElement>
}

export const Switch = ({
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
}: SwitchProps) => {
  const styles = switchField()

  return (
    <ArkSwitch.Root
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
      <ArkSwitch.HiddenInput ref={ref} />
      <ArkSwitch.Control className={styles.control}>
        <ArkSwitch.Thumb className={styles.thumb} />
      </ArkSwitch.Control>
      <ArkSwitch.Label className={styles.label}>{label}</ArkSwitch.Label>
    </ArkSwitch.Root>
  )
}

Switch.displayName = 'Switch'
