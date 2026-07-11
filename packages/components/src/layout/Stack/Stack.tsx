// PandaCSSが自動生成するレイアウトプリミティブをそのまま公開する。
// Heading等の見た目を持つコンポーネントはclassName/styleを受け付けないため（ADR 0012）、
// 複数要素の配置・余白調整はBox/Stackを介して行う。
export { Stack } from '../../../styled-system/jsx'
export type { StackProps } from '../../../styled-system/jsx'
