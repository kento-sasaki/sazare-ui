import type { ReactNode } from 'react'

import { table } from '../../../styled-system/recipes'

// className/styleは公開APIとして受け付けない（ADR 0012）。
export interface TableRootProps {
  children: ReactNode
  'aria-label'?: string
}

export interface TableSectionProps {
  children: ReactNode
}

export interface TableHeaderCellProps {
  children: ReactNode
  scope?: 'col' | 'row'
}

const styles = table()

const Root = ({ children, 'aria-label': ariaLabel }: TableRootProps) => (
  <table aria-label={ariaLabel} className={styles.root}>
    {children}
  </table>
)

const Head = ({ children }: TableSectionProps) => <thead className={styles.head}>{children}</thead>

const Body = ({ children }: TableSectionProps) => <tbody className={styles.body}>{children}</tbody>

const Row = ({ children }: TableSectionProps) => <tr className={styles.row}>{children}</tr>

const HeaderCell = ({ children, scope = 'col' }: TableHeaderCellProps) => (
  <th scope={scope} className={styles.headerCell}>
    {children}
  </th>
)

const Cell = ({ children }: TableSectionProps) => <td className={styles.cell}>{children}</td>

export const Table = { Root, Head, Body, Row, HeaderCell, Cell }
