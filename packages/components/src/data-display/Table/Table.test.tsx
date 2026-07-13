import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Table } from './Table'

// className/styleは公開APIとして受け付けない（ADR 0012）。
// 再びpropsとして受け付け可能になった場合、下記の@ts-expect-errorが
// 「不要な指定」としてtsc（pnpm run typecheck）上のエラーになり回帰を検知できる。
// この関数自体は実行されない（型チェックのみが目的）。
function _typeOnlyGuardAgainstDisallowedProps() {
  const withClassName = (
    // @ts-expect-error className is not part of Table.Root's public props
    <Table.Root className="not-allowed">
      <Table.Body>
        <Table.Row>
          <Table.Cell>value</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table.Root>
  )
  const withStyle = (
    // @ts-expect-error style is not part of Table.Root's public props
    <Table.Root style={{ margin: '1px' }}>
      <Table.Body>
        <Table.Row>
          <Table.Cell>value</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table.Root>
  )
  return [withClassName, withStyle]
}
void _typeOnlyGuardAgainstDisallowedProps

const renderTable = () =>
  render(
    <Table.Root aria-label="Users">
      <Table.Head>
        <Table.Row>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>Age</Table.HeaderCell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        <Table.Row>
          <Table.Cell>Alice</Table.Cell>
          <Table.Cell>30</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table.Root>,
  )

describe('Table', () => {
  it('renders a table with an accessible name', () => {
    renderTable()
    expect(screen.getByRole('table', { name: 'Users' })).toBeInTheDocument()
  })

  it('renders header cells as columnheader with the default col scope', () => {
    renderTable()
    const nameHeader = screen.getByRole('columnheader', { name: 'Name' })
    expect(nameHeader).toHaveAttribute('scope', 'col')
  })

  it('renders body rows and cells', () => {
    renderTable()
    expect(screen.getAllByRole('row')).toHaveLength(2)
    expect(screen.getByRole('cell', { name: 'Alice' })).toBeInTheDocument()
    expect(screen.getByRole('cell', { name: '30' })).toBeInTheDocument()
  })

  it('supports overriding HeaderCell scope to row', () => {
    render(
      <Table.Root aria-label="Row headers">
        <Table.Body>
          <Table.Row>
            <Table.HeaderCell scope="row">Total</Table.HeaderCell>
            <Table.Cell>100</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Root>,
    )
    expect(screen.getByRole('rowheader', { name: 'Total' })).toBeInTheDocument()
  })
})
