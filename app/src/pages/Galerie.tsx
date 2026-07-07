import PaginatedList from '../components/PaginatedList'
import { galerie } from '../lib/data'
import { usePageMeta } from '../lib/usePageMeta'

export default function Galerie() {
  usePageMeta(
    "Galerie — JS cuisine",
    "Photos des plats et événements réalisés par JS cuisine : ndolè, poulet DG, buffets de mariage, ateliers…",
  )

  return (
    <main style={{ padding: '18px 0 8px' }}>
      <div className="page-head">
        <h1>Galerie</h1>
        <p>Plats et événements réalisés.</p>
      </div>

      <div style={{ padding: '0 16px' }}>
        <PaginatedList
          items={galerie}
          pageSize={8}
          loadMoreLabel="Charger plus de photos"
          className="grille-2"
          renderItem={(g) => (
            <div key={g.id} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <img
                src={`${import.meta.env.BASE_URL}${g.img}`}
                alt={g.legende}
                style={{ borderRadius: 14, width: '100%', height: 150, objectFit: 'cover', display: 'block' }}
              />
              <div
                style={{ fontSize: 11.5, color: 'var(--texte-3)', lineHeight: 1.35, padding: '0 2px' }}
              >
                {g.legende}
              </div>
            </div>
          )}
        />
      </div>
    </main>
  )
}
