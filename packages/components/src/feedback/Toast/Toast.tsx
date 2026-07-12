import { Toast as ArkToast, Toaster as ArkToaster, createToaster } from '@ark-ui/react/toast'
import type {
  CreateToasterProps,
  CreateToasterReturn,
  ToastOptions,
  ToastType,
} from '@ark-ui/react/toast'
import type { colors } from '@sazare-ui/tokens'

import { toast } from '../../../styled-system/recipes'

// createToasterはDOMを持たないファクトリ関数（storeを生成するのみ）のため、
// ADR 0012（className/styleを公開しない）の制約対象外としてArk UIのものをそのままre-exportする
export { createToaster }
export type { CreateToasterProps, CreateToasterReturn, ToastOptions }

type ToastTone = keyof typeof colors.feedback

// toast.typeはzag-js側で(string & {})を含み任意の文字列を許容するため、'success'等との等価比較では
// 型が絞り込めない（TypeScriptの既知の制限）。ルックアップテーブルで解決する。
// tone variantに存在しない値（loadingや独自文字列）はneutralにフォールバックする
const toneByType: Partial<Record<string, ToastTone>> = {
  success: 'success',
  warning: 'warning',
  error: 'error',
  info: 'info',
}

const resolveTone = (type: ToastType | undefined): ToastTone => {
  if (type === undefined) return 'neutral'
  return toneByType[type] ?? 'neutral'
}

// widthとheightを明示しないとSVGの既定サイズのままflexアイテムを押し広げるため、
// Checkbox.tsxのCheckIconと同じ理由でCloseTriggerの幅に合わせて明示する
const CloseIcon = () => (
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
  >
    <path d="M4 4l8 8M12 4l-8 8" />
  </svg>
)

export interface ToasterProps {
  toaster: CreateToasterReturn
}

// Ark UIのToastはグローバルなToaster（createToasterのstore）+ 個別のtoast.Root/Title/Description/
// CloseTriggerという2層構造で、Checkbox/Switch等の「単一コンポーネント完全ラップ」の原則がそのまま
// 当てはまらない。sazare-uiではcreateToasterをそのまま公開し、Toasterコンポーネント側で
// 個別トーストの見た目（Root/Title/Description/CloseTrigger）をラップする
export const Toaster = ({ toaster }: ToasterProps) => {
  return (
    <ArkToaster toaster={toaster}>
      {(item) => {
        const styles = toast({ tone: resolveTone(item.type) })
        return (
          <ArkToast.Root className={styles.root}>
            {item.title && <ArkToast.Title className={styles.title}>{item.title}</ArkToast.Title>}
            {item.description && (
              <ArkToast.Description className={styles.description}>
                {item.description}
              </ArkToast.Description>
            )}
            <ArkToast.CloseTrigger aria-label="閉じる" className={styles.closeTrigger}>
              <CloseIcon />
            </ArkToast.CloseTrigger>
          </ArkToast.Root>
        )
      }}
    </ArkToaster>
  )
}

Toaster.displayName = 'Toaster'
