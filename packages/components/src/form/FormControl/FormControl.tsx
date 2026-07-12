import { useField } from '@ark-ui/react/field'
import type { ReactElement } from 'react'
import { cloneElement } from 'react'

import { formControl } from '../../../styled-system/recipes'

// FormControlの子として渡すコンポーネント（TextInput/Textarea/DatePicker/FileUpload等）が
// 満たすべき最小契約。sazare-uiの他のArk UI複合ラップコンポーネント（Select/RadioGroup等）は
// 自前でlabelを持つため、この契約の対象外（FormControlと組み合わせない）
export interface FormControlChildProps {
  id?: string
  'aria-describedby'?: string
  'aria-invalid'?: boolean
  disabled?: boolean
  required?: boolean
}

// className/style/childrenは公開APIとして受け付けない、というsazare-uiの原則（ADR 0012、
// メモリ: Ark UI複合コンポーネントの単一ラップ方針）に対し、FormControlはただ一つの意図的な例外として
// childrenを受け取る。FormControlの責務自体が「単一のフィールドコンポーネントとlabel/helperText/
// errorTextを合成すること」であり、Park UI公式リファレンス実装のField Closed Componentパターンと同じ
// 考え方（https://park-ui.com/docs/components/field）。Ark UIのField.Root/Field.Label等のJSX複合パーツは
// 一切公開せず、headlessな`useField`フックの戻り値のみを使って子要素へprops注入する
export interface FormControlProps {
  label: string
  helperText?: string
  errorText?: string
  invalid?: boolean
  required?: boolean
  disabled?: boolean
  id?: string
  children: ReactElement<FormControlChildProps>
}

export const FormControl = ({
  label,
  helperText,
  errorText,
  invalid,
  required,
  disabled,
  id,
  children,
}: FormControlProps) => {
  const styles = formControl()
  const field = useField({ id, invalid, required, disabled })

  const child = cloneElement(children, {
    id: field.ids.control,
    'aria-describedby': field.ariaDescribedby,
    'aria-invalid': field.invalid ? true : undefined,
    disabled: field.disabled,
    required: field.required,
  })

  return (
    <div {...field.getRootProps()} className={styles.root}>
      <label {...field.getLabelProps()} className={styles.label}>
        {label}
      </label>
      {child}
      {field.invalid && errorText ? (
        <span {...field.getErrorTextProps()} className={styles.errorText}>
          {errorText}
        </span>
      ) : helperText ? (
        <span {...field.getHelperTextProps()} className={styles.helperText}>
          {helperText}
        </span>
      ) : null}
    </div>
  )
}

FormControl.displayName = 'FormControl'
