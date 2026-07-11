import { RadioGroup as ArkRadioGroup } from '@ark-ui/react/radio-group'

import { radioButton } from '../../../styled-system/recipes'

// Ark UIのRadioGroup.Itemは常にRadioGroup.Root（sazare-uiのRadioGroup）の子孫として
// レンダリングされる前提のプリミティブで、単体では動作しない（value共有のためのcontextが必要）。
// Checkboxとは異なりRadioButton単体を独立して使うことは想定しない。
export interface RadioButtonProps {
  label: string
  value: string
  disabled?: boolean
}

export const RadioButton = ({ label, value, disabled }: RadioButtonProps) => {
  const styles = radioButton()

  return (
    <ArkRadioGroup.Item value={value} disabled={disabled} className={styles.item}>
      <ArkRadioGroup.ItemHiddenInput />
      <ArkRadioGroup.ItemControl className={styles.itemControl} />
      <ArkRadioGroup.ItemText className={styles.itemText}>{label}</ArkRadioGroup.ItemText>
    </ArkRadioGroup.Item>
  )
}

RadioButton.displayName = 'RadioButton'
