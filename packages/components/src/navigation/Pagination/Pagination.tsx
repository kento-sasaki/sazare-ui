import { Pagination as ArkPagination } from '@ark-ui/react/pagination'

import { pagination } from '../../../styled-system/recipes'

// className/styleは公開APIとして受け付けない（ADR 0012）。
// First/Lastトリガーはv0.1スコープ外（YAGNI）
export interface PaginationProps {
  count: number
  page?: number
  defaultPage?: number
  pageSize?: number
  defaultPageSize?: number
  siblingCount?: number
  onPageChange?: (page: number) => void
  'aria-label'?: string
}

export const Pagination = ({
  count,
  page,
  defaultPage,
  pageSize,
  defaultPageSize,
  siblingCount,
  onPageChange,
  'aria-label': ariaLabel = 'Pagination',
}: PaginationProps) => {
  const styles = pagination()

  return (
    <ArkPagination.Root
      aria-label={ariaLabel}
      className={styles.root}
      count={count}
      page={page}
      defaultPage={defaultPage}
      pageSize={pageSize}
      defaultPageSize={defaultPageSize}
      siblingCount={siblingCount}
      onPageChange={onPageChange ? (details) => onPageChange(details.page) : undefined}
      // Ark UI既定の英語ラベル（"page N"等）は可視テキストと一致せずWCAG 2.5.3
      // （Label in Name）に抵触するため、可視テキストと同じ文言に上書きする
      translations={{
        prevTriggerLabel: '前へ',
        nextTriggerLabel: '次へ',
        itemLabel: ({ page: itemPage }) => `${itemPage}`,
      }}
    >
      <ArkPagination.PrevTrigger className={styles.prevTrigger}>前へ</ArkPagination.PrevTrigger>
      <ArkPagination.Context>
        {(api) =>
          api.pages.map((entry, index) =>
            entry.type === 'page' ? (
              <ArkPagination.Item
                key={entry.value}
                type="page"
                value={entry.value}
                className={styles.item}
              >
                {entry.value}
              </ArkPagination.Item>
            ) : (
              <ArkPagination.Ellipsis
                key={`ellipsis-${index}`}
                index={index}
                className={styles.ellipsis}
              >
                …
              </ArkPagination.Ellipsis>
            ),
          )
        }
      </ArkPagination.Context>
      <ArkPagination.NextTrigger className={styles.nextTrigger}>次へ</ArkPagination.NextTrigger>
    </ArkPagination.Root>
  )
}

Pagination.displayName = 'Pagination'
