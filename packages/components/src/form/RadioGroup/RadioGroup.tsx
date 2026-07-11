import { RadioGroup as ArkRadioGroup } from '@ark-ui/react/radio-group'

import { radioGroup } from '../../../styled-system/recipes'
import { RadioButton } from '../RadioButton/RadioButton'

export interface RadioGroupOption {
  label: string
  value: string
  disabled?: boolean
}

export interface RadioGroupProps {
  // Ark UIのRadioGroup.Rootは常にaria-labelledbyでこのLabel要素のIDを参照するため、
  // 省略するとID参照先が存在しないa11y違反（aria-valid-attr-value）になる。そのため必須にする
  label: string
  options: RadioGroupOption[]
  value?: string
  defaultValue?: string
  onValueChange?: (value: string | null) => void
  name?: string
  disabled?: boolean
}

export const RadioGroup = ({
  label,
  options,
  value,
  defaultValue,
  onValueChange,
  name,
  disabled,
}: RadioGroupProps) => {
  const styles = radioGroup()

  return (
    <ArkRadioGroup.Root
      className={styles.root}
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange ? (details) => onValueChange(details.value) : undefined}
      name={name}
      disabled={disabled}
    >
      <ArkRadioGroup.Label className={styles.groupLabel}>{label}</ArkRadioGroup.Label>
      {options.map((option) => (
        <RadioButton
          key={option.value}
          value={option.value}
          label={option.label}
          disabled={option.disabled}
        />
      ))}
    </ArkRadioGroup.Root>
  )
}

RadioGroup.displayName = 'RadioGroup'
