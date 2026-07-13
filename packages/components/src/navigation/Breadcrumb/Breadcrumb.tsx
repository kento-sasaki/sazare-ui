import { breadcrumb } from '../../../styled-system/recipes'

export interface BreadcrumbItem {
  label: string
  href?: string
}

// className/styleは公開APIとして受け付けない（ADR 0012）。
export interface BreadcrumbProps {
  items: BreadcrumbItem[]
  'aria-label'?: string
}

// 最後の項目は常にcurrent page（aria-current="page"）として扱い、
// hrefを持っていてもリンクにしない（WAI-ARIA APGのBreadcrumb Patternに準拠）
export const Breadcrumb = ({ items, 'aria-label': ariaLabel = 'Breadcrumb' }: BreadcrumbProps) => {
  const styles = breadcrumb()

  return (
    <nav aria-label={ariaLabel} className={styles.nav}>
      <ol className={styles.list}>
        {items.map((item, index) => {
          const isLast = index === items.length - 1

          return (
            <li key={`${item.label}-${index}`} className={styles.item}>
              {isLast ? (
                <span aria-current="page" className={styles.current}>
                  {item.label}
                </span>
              ) : item.href ? (
                <a href={item.href} className={styles.link}>
                  {item.label}
                </a>
              ) : (
                <span className={styles.text}>{item.label}</span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

Breadcrumb.displayName = 'Breadcrumb'
