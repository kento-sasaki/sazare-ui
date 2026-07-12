import { spinner } from '../../../styled-system/recipes'

export type SpinnerSize = 'sm' | 'md' | 'lg'

export interface SpinnerProps {
  size?: SpinnerSize
  label?: string
}

// role="status"はARIA仕様上nameFromがauthorのみで、子要素のテキストコンテンツからは
// accessible nameが自動計算されない。そのためaria-labelで明示的に付与する
export const Spinner = ({ size = 'md', label = '読み込み中' }: SpinnerProps) => {
  return <div role="status" aria-label={label} className={spinner({ size })} />
}

Spinner.displayName = 'Spinner'
