import type { ComponentPropsWithRef } from 'react'

import { textarea } from '../../../styled-system/recipes'

// sizeはfontSize単体ではなくfontSize+paddingを束ねた意味的なスケールのため、
// TextInputと同様に手書きのリテラルユニオンとする
export type TextareaSize = 'sm' | 'md'

// className/styleは公開APIとして受け付けない（ADR 0012）。
// label/helperText/errorTextは持たない。それらの統合はFormControl（Issue #38）が担当する。
export interface TextareaProps extends Omit<
  ComponentPropsWithRef<'textarea'>,
  'className' | 'style'
> {
  size?: TextareaSize
}

// React 19はrefを通常のpropとして受け取れるためforwardRefは不要（peerDependenciesがReact 19専用のため採用）
export const Textarea = ({ size = 'md', ref, ...rest }: TextareaProps) => {
  return <textarea {...rest} ref={ref} data-size={size} className={textarea({ size })} />
}

Textarea.displayName = 'Textarea'
