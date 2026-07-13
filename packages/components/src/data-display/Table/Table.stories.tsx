import type { Meta, StoryObj } from '@storybook/react-vite'

import { Table } from './Table'

const meta = {
  component: Table.Root,
  tags: ['draft'],
} satisfies Meta<typeof Table.Root>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    'aria-label': 'Users',
    children: (
      <>
        <Table.Head>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Email</Table.HeaderCell>
            <Table.HeaderCell>Role</Table.HeaderCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Alice</Table.Cell>
            <Table.Cell>alice@example.com</Table.Cell>
            <Table.Cell>Admin</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Bob</Table.Cell>
            <Table.Cell>bob@example.com</Table.Cell>
            <Table.Cell>Member</Table.Cell>
          </Table.Row>
        </Table.Body>
      </>
    ),
  },
}
