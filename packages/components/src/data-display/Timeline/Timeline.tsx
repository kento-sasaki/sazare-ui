import { timeline } from '../../../styled-system/recipes'

export interface TimelineItem {
  title: string
  description?: string
  timestamp?: string
}

// className/styleは公開APIとして受け付けない（ADR 0012）。
export interface TimelineProps {
  items: TimelineItem[]
}

export const Timeline = ({ items }: TimelineProps) => {
  const styles = timeline()

  return (
    <ol className={styles.root}>
      {items.map((item, index) => (
        <li key={`${item.title}-${index}`} className={styles.item}>
          <div className={styles.marker}>
            <span className={styles.indicator} />
            {index < items.length - 1 && <span className={styles.separator} />}
          </div>
          <div className={styles.content}>
            <p className={styles.title}>{item.title}</p>
            {item.timestamp && <time className={styles.meta}>{item.timestamp}</time>}
            {item.description && <p className={styles.description}>{item.description}</p>}
          </div>
        </li>
      ))}
    </ol>
  )
}

Timeline.displayName = 'Timeline'
