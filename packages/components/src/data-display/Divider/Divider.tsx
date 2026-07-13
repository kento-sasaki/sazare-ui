import { separator } from '../../../styled-system/recipes'

export type DividerOrientation = 'horizontal' | 'vertical'

// className/styleは公開APIとして受け付けない（ADR 0012）。
export interface DividerProps {
  orientation?: DividerOrientation
  label?: string
}

export const Divider = ({ orientation = 'horizontal', label }: DividerProps) => {
  const styles = separator({ orientation })

  return (
    <div role="separator" aria-orientation={orientation} aria-label={label} className={styles.root}>
      {label && (
        <span aria-hidden="true" className={styles.label}>
          {label}
        </span>
      )}
    </div>
  )
}

Divider.displayName = 'Divider'
