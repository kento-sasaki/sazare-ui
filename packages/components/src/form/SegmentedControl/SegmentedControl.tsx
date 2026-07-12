import { SegmentGroup as ArkSegmentGroup } from '@ark-ui/react/segment-group'

import { segmentedControl } from '../../../styled-system/recipes'

export interface SegmentedControlOption {
  label: string
  value: string
  disabled?: boolean
}

// Ark UIのSegmentGroupは`@zag-js/radio-group`を基盤としており、RadioGroupと同型で
// Rootが常にaria-labelledbyでLabel要素のIDを参照する。省略するとID参照先が存在しない
// a11y違反（aria-valid-attr-value）になるため必須にする（Select/RadioGroupと同じ理由）。
// RadioGroup/Checkboxのような対応する個別コンポーネント（Issue）が存在しないため、
// 単一コンポーネントとして自己完結させる（メモリ: ark-ui-single-component-wrap）
export interface SegmentedControlProps {
  label: string
  options: SegmentedControlOption[]
  value?: string | null
  defaultValue?: string | null
  onValueChange?: (value: string | null) => void
  name?: string
  disabled?: boolean
}

export const SegmentedControl = ({
  label,
  options,
  value,
  defaultValue,
  onValueChange,
  name,
  disabled,
}: SegmentedControlProps) => {
  const styles = segmentedControl()

  return (
    <ArkSegmentGroup.Root
      className={styles.root}
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange ? (details) => onValueChange(details.value) : undefined}
      name={name}
      disabled={disabled}
    >
      <ArkSegmentGroup.Label className={styles.groupLabel}>{label}</ArkSegmentGroup.Label>
      <div className={styles.track}>
        {options.map((option) => (
          <ArkSegmentGroup.Item
            key={option.value}
            value={option.value}
            disabled={option.disabled}
            className={styles.item}
          >
            <ArkSegmentGroup.ItemText className={styles.itemText}>
              {option.label}
            </ArkSegmentGroup.ItemText>
            <ArkSegmentGroup.ItemControl className={styles.itemControl} />
            <ArkSegmentGroup.ItemHiddenInput />
          </ArkSegmentGroup.Item>
        ))}
        <ArkSegmentGroup.Indicator className={styles.indicator} />
      </div>
    </ArkSegmentGroup.Root>
  )
}

SegmentedControl.displayName = 'SegmentedControl'
