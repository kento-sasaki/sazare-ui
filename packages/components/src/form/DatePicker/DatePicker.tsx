import { DatePicker as ArkDatePicker } from '@ark-ui/react/date-picker'
import { Portal } from '@ark-ui/react/portal'
import { CalendarDate, type DateValue } from '@internationalized/date'
import type { Ref } from 'react'

import { datePicker } from '../../../styled-system/recipes'

const toCalendarDate = (date: Date): CalendarDate =>
  new CalendarDate(date.getFullYear(), date.getMonth() + 1, date.getDate())

const toJsDate = (value: DateValue | undefined): Date | null =>
  value ? new Date(value.year, value.month - 1, value.day) : null

const CalendarIcon = () => (
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
    <rect x="2" y="3" width="12" height="11" rx="1" />
    <path d="M2 6.5h12M5 1.5v3M11 1.5v3" />
  </svg>
)

const ChevronLeftIcon = () => (
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
    <path d="M10 3L6 8l4 5" />
  </svg>
)

const ChevronRightIcon = () => (
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
    <path d="M6 3l4 5-4 5" />
  </svg>
)

// labelは持たない。FormControl(#38)がlabel/helperText/errorTextの統合を担当する
// （メモリ: date-pickerのLabelはhtmlFor/idの通常HTML関連付けのみで、Select/RadioGroupと違い
// aria-labelledbyの必須参照が無いため、TextInput/Textareaと同じ設計にできる）。
// id/aria-describedby/aria-invalidはFormControlのcloneElement注入契約に合わせた生のHTML/ARIA属性
export interface DatePickerProps {
  value?: Date | null
  defaultValue?: Date | null
  onValueChange?: (value: Date | null) => void
  min?: Date
  max?: Date
  disabled?: boolean
  required?: boolean
  name?: string
  form?: string
  id?: string
  'aria-describedby'?: string
  'aria-invalid'?: boolean
  // refは実際のフォーム値を持つ可視のテキスト入力へ転送する（react-hook-form等との連携を想定）
  ref?: Ref<HTMLInputElement>
}

export const DatePicker = ({
  value,
  defaultValue,
  onValueChange,
  min,
  max,
  disabled,
  required,
  name,
  form,
  id,
  'aria-describedby': ariaDescribedby,
  'aria-invalid': ariaInvalid,
  ref,
}: DatePickerProps) => {
  const styles = datePicker()
  const invalid = ariaInvalid === true

  return (
    <ArkDatePicker.Root
      className={styles.root}
      selectionMode="single"
      value={value === undefined ? undefined : value === null ? [] : [toCalendarDate(value)]}
      defaultValue={
        defaultValue === undefined
          ? undefined
          : defaultValue === null
            ? []
            : [toCalendarDate(defaultValue)]
      }
      onValueChange={
        onValueChange ? (details) => onValueChange(toJsDate(details.value[0])) : undefined
      }
      min={min ? toCalendarDate(min) : undefined}
      max={max ? toCalendarDate(max) : undefined}
      disabled={disabled}
      invalid={invalid}
      required={required}
      name={name}
    >
      <ArkDatePicker.Control className={styles.control}>
        <ArkDatePicker.Input
          className={styles.input}
          ref={ref}
          id={id}
          form={form}
          aria-describedby={ariaDescribedby}
        />
        <ArkDatePicker.Trigger className={styles.trigger}>
          <CalendarIcon />
        </ArkDatePicker.Trigger>
      </ArkDatePicker.Control>
      <Portal>
        <ArkDatePicker.Positioner className={styles.positioner}>
          <ArkDatePicker.Content className={styles.content}>
            <ArkDatePicker.View view="day">
              <ArkDatePicker.Context>
                {(api) => (
                  <>
                    <ArkDatePicker.ViewControl className={styles.viewControl}>
                      <ArkDatePicker.PrevTrigger className={styles.navTrigger}>
                        <ChevronLeftIcon />
                      </ArkDatePicker.PrevTrigger>
                      <ArkDatePicker.RangeText className={styles.rangeText} />
                      <ArkDatePicker.NextTrigger className={styles.navTrigger}>
                        <ChevronRightIcon />
                      </ArkDatePicker.NextTrigger>
                    </ArkDatePicker.ViewControl>
                    <ArkDatePicker.Table className={styles.table}>
                      <ArkDatePicker.TableHead>
                        <ArkDatePicker.TableRow>
                          {api.weekDays.map((weekDay, index) => (
                            <ArkDatePicker.TableHeader key={index} className={styles.tableHeader}>
                              {weekDay.narrow}
                            </ArkDatePicker.TableHeader>
                          ))}
                        </ArkDatePicker.TableRow>
                      </ArkDatePicker.TableHead>
                      <ArkDatePicker.TableBody>
                        {api.weeks.map((week, weekIndex) => (
                          <ArkDatePicker.TableRow key={weekIndex}>
                            {week.map((day, dayIndex) => (
                              <ArkDatePicker.TableCell
                                key={dayIndex}
                                value={day}
                                className={styles.tableCell}
                              >
                                <ArkDatePicker.TableCellTrigger className={styles.tableCellTrigger}>
                                  {day.day}
                                </ArkDatePicker.TableCellTrigger>
                              </ArkDatePicker.TableCell>
                            ))}
                          </ArkDatePicker.TableRow>
                        ))}
                      </ArkDatePicker.TableBody>
                    </ArkDatePicker.Table>
                  </>
                )}
              </ArkDatePicker.Context>
            </ArkDatePicker.View>
          </ArkDatePicker.Content>
        </ArkDatePicker.Positioner>
      </Portal>
    </ArkDatePicker.Root>
  )
}

DatePicker.displayName = 'DatePicker'
