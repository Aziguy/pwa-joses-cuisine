import { useEffect, useState, type ReactNode } from 'react'

// Composant générique de liste paginée, réutilisé par Recettes, Avis, Galerie,
// Blog (et activable sur Épicerie/Ateliers si le catalogue grossit).
//
// Deux modes :
// - « Charger plus » (défaut) : bouton en bas de liste, sans rechargement.
// - « pages » : boutons précédent/suivant contrôlés (page + onPageChange),
//   utilisé par le blog pour la route partageable ?page=n.
type Props<T> = {
  items: T[]
  pageSize: number
  renderItem: (item: T, index: number) => ReactNode
  className?: string
  loadMoreLabel?: string
  emptyMessage?: string
  /** Réinitialise la pagination quand cette valeur change (ex : filtres). */
  resetKey?: unknown
  /** Mode pages : numéro de page courant (1-indexé). */
  page?: number
  onPageChange?: (page: number) => void
  prevLabel?: string
  nextLabel?: string
}

export default function PaginatedList<T>({
  items,
  pageSize,
  renderItem,
  className,
  loadMoreLabel = 'Voir plus',
  emptyMessage,
  resetKey,
  page,
  onPageChange,
  prevLabel = '← Précédents',
  nextLabel = 'Suivants →',
}: Props<T>) {
  const paged = page !== undefined && onPageChange !== undefined
  const [visible, setVisible] = useState(pageSize)

  useEffect(() => {
    setVisible(pageSize)
  }, [resetKey, pageSize])

  if (items.length === 0 && emptyMessage) {
    return (
      <div style={{ padding: '30px 20px', textAlign: 'center', color: '#7A6A5C', fontSize: 14 }}>
        {emptyMessage}
      </div>
    )
  }

  if (paged) {
    const totalPages = Math.max(1, Math.ceil(items.length / pageSize))
    const current = Math.min(Math.max(1, page), totalPages)
    const slice = items.slice((current - 1) * pageSize, current * pageSize)
    return (
      <>
        <div className={className}>{slice.map(renderItem)}</div>
        {totalPages > 1 && (
          <div className="pagination-nav">
            <button onClick={() => onPageChange(current - 1)} disabled={current <= 1}>
              {prevLabel}
            </button>
            <span className="pagination-info">
              Page {current} / {totalPages}
            </span>
            <button onClick={() => onPageChange(current + 1)} disabled={current >= totalPages}>
              {nextLabel}
            </button>
          </div>
        )}
      </>
    )
  }

  const slice = items.slice(0, visible)
  const rest = items.length - visible
  return (
    <>
      <div className={className}>{slice.map(renderItem)}</div>
      {rest > 0 && (
        <button className="btn-voir-plus" onClick={() => setVisible(visible + pageSize)}>
          {loadMoreLabel} ({rest})
        </button>
      )}
    </>
  )
}
