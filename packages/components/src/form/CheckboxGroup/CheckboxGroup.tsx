import { Checkbox as ArkCheckbox } from '@ark-ui/react/checkbox'

import { checkboxGroup } from '../../../styled-system/recipes'
import { Checkbox } from '../Checkbox/Checkbox'

export interface CheckboxGroupOption {
  label: string
  value: string
  disabled?: boolean
}

// Ark UIのCheckbox.Groupは子孫のCheckbox.Root(=sazare-uiのCheckbox)に対して、
// valueを介して自動的にchecked状態・name・disabledを注入する（useCheckboxGroupContext経由）。
// そのためCheckboxGroupはCheckboxをそのまま再利用でき、個別のCheckboxコンポーネントを
// 別実装する必要が無い。
export interface CheckboxGroupProps {
  options: CheckboxGroupOption[]
  value?: string[]
  defaultValue?: string[]
  onValueChange?: (value: string[]) => void
  name?: string
  disabled?: boolean
}

export const CheckboxGroup = ({
  options,
  value,
  defaultValue,
  onValueChange,
  name,
  disabled,
}: CheckboxGroupProps) => {
  const styles = checkboxGroup()

  return (
    <ArkCheckbox.Group
      className={styles.group}
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      name={name}
      disabled={disabled}
    >
      {options.map((option) => (
        <Checkbox
          key={option.value}
          value={option.value}
          label={option.label}
          disabled={option.disabled}
        />
      ))}
    </ArkCheckbox.Group>
  )
}

CheckboxGroup.displayName = 'CheckboxGroup'
