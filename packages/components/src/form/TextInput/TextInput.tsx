import type { ComponentPropsWithRef } from 'react'

import { textInput } from '../../../styled-system/recipes'

// sizeはfontSize単体ではなくfontSize+paddingを束ねた意味的なスケールのため、
// Buttonと同様に手書きのリテラルユニオンとする
export type TextInputSize = 'sm' | 'md'

// className/styleは公開APIとして受け付けない（ADR 0012）。typeも公開しない。
// TextInputはtypeの切り替え（email/password等）を持たず常に"text"に固定するため
// （それらは将来必要になった時点で別コンポーネントとして追加する）。
// HTML標準のsize属性（表示文字数のnumber型）はvariant用のsize props（'sm' | 'md'）と
// 名前が衝突するため除外し、こちらのTextInputSizeで上書きする。
// label/helperText/errorTextは持たない。それらの統合はFormControl（Issue #38）が担当する。
export interface TextInputProps extends Omit<
  ComponentPropsWithRef<'input'>,
  'className' | 'style' | 'type' | 'size'
> {
  size?: TextInputSize
}

// React 19はrefを通常のpropとして受け取れるためforwardRefは不要（peerDependenciesがReact 19専用のため採用）
export const TextInput = ({ size = 'md', ref, ...rest }: TextInputProps) => {
  return <input {...rest} type="text" ref={ref} data-size={size} className={textInput({ size })} />
}

TextInput.displayName = 'TextInput'
