import { FileUpload as ArkFileUpload } from '@ark-ui/react/file-upload'
import type { Ref } from 'react'

import { fileUpload } from '../../../styled-system/recipes'

const TrashIcon = () => (
  <svg
    aria-hidden="true"
    focusable="false"
    width="100%"
    height="100%"
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M2.5 4h11M6 4V2.5h4V4M5 4v9.5A1.5 1.5 0 006.5 15h3A1.5 1.5 0 0011 13.5V4" />
  </svg>
)

// labelは持たない。FormControl(#38)がlabel/helperText/errorTextの統合を担当する
// （メモリ: file-uploadのLabelはhtmlFor/idの通常HTML関連付けのみで、Select/RadioGroupと違い
// aria-labelledbyの必須参照が無いため、TextInput/Textarea/DatePickerと同じ設計にできる）。
// ただしDatePicker/TextInputと異なり、idはtrigger（実<button>）ではなくroot要素に配線する。
// buttonはlabelable要素のため、FormControlの<label htmlFor>がidで直接参照すると
// accessible nameが「Choose files」からlabelのテキストへ上書きされてしまう
// （label-for関連付けはbutton自身のaccessible nameを乗っ取る）。
// aria-describedby/aria-invalidはaccessible nameに影響しないためtriggerに配線してよい
export interface FileUploadProps {
  accept?: string
  maxFiles?: number
  maxFileSize?: number
  disabled?: boolean
  required?: boolean
  name?: string
  form?: string
  id?: string
  'aria-describedby'?: string
  'aria-invalid'?: boolean
  value?: File[]
  defaultValue?: File[]
  onValueChange?: (files: File[]) => void
  // refは実際のフォーム値を持つ隠しネイティブ<input type="file">へ転送する
  // （react-hook-form等との連携を想定。Selectのref=HiddenSelectと同じ考え方）
  ref?: Ref<HTMLInputElement>
}

export const FileUpload = ({
  accept,
  maxFiles,
  maxFileSize,
  disabled,
  required,
  name,
  form,
  id,
  'aria-describedby': ariaDescribedby,
  'aria-invalid': ariaInvalid,
  value,
  defaultValue,
  onValueChange,
  ref,
}: FileUploadProps) => {
  const styles = fileUpload()
  const invalid = ariaInvalid === true

  return (
    <ArkFileUpload.Root
      className={styles.root}
      ids={id ? { root: id } : undefined}
      accept={accept}
      maxFiles={maxFiles}
      maxFileSize={maxFileSize}
      disabled={disabled}
      invalid={invalid}
      required={required}
      name={name}
      acceptedFiles={value}
      defaultAcceptedFiles={defaultValue}
      onFileChange={onValueChange ? (details) => onValueChange(details.acceptedFiles) : undefined}
    >
      <ArkFileUpload.Dropzone className={styles.dropzone} disableClick>
        <ArkFileUpload.Label className={styles.label}>Drop files here</ArkFileUpload.Label>
        <ArkFileUpload.Trigger
          className={styles.trigger}
          aria-describedby={ariaDescribedby}
          aria-invalid={invalid || undefined}
        >
          Choose files
        </ArkFileUpload.Trigger>
      </ArkFileUpload.Dropzone>
      <ArkFileUpload.ItemGroup className={styles.itemGroup}>
        <ArkFileUpload.Context>
          {(api) =>
            api.acceptedFiles.map((file, index) => (
              <ArkFileUpload.Item key={index} file={file} className={styles.item}>
                <ArkFileUpload.ItemName className={styles.itemName} />
                <ArkFileUpload.ItemSizeText className={styles.itemSizeText} />
                <ArkFileUpload.ItemDeleteTrigger className={styles.itemDeleteTrigger}>
                  <TrashIcon />
                </ArkFileUpload.ItemDeleteTrigger>
              </ArkFileUpload.Item>
            ))
          }
        </ArkFileUpload.Context>
      </ArkFileUpload.ItemGroup>
      <ArkFileUpload.HiddenInput ref={ref} form={form} />
    </ArkFileUpload.Root>
  )
}

FileUpload.displayName = 'FileUpload'
