import PaginatedList from '../components/PaginatedList'
import PhotoPlaceholder from '../components/PhotoPlaceholder'
import { epicerie } from '../lib/data'
import { fmt, msgPlat, openWhatsApp } from '../lib/order'
import { usePageMeta } from '../lib/usePageMeta'

export default function Epicerie() {
  usePageMeta(
    "Épicerie maison — JS cuisine",
    'Marinades, sauces et épices maison en pots : marinade braisé, sauce arachide, piment, sirop de bissap. À emporter ou en livraison en Ile-de-France.',
  )

  return (
    <main style={{ padding: '18px 0 8px' }}>
      <div className="page-head">
        <h1>Épicerie maison</h1>
        <p>Marinades, sauces et épices en pots, à emporter ou en livraison.</p>
      </div>

      <div style={{ padding: '0 16px' }}>
        <PaginatedList
          items={epicerie}
          pageSize={8}
          loadMoreLabel="Voir plus de produits"
          className="liste-col-11"
          renderItem={(p) => (
            <div
              key={p.nom}
              className="carte"
              style={{
                borderRadius: 15,
                padding: '14px 15px',
                display: 'flex',
                gap: 13,
                alignItems: 'center',
              }}
            >
              <PhotoPlaceholder
                label={p.nom}
                height={54}
                radius={12}
                style={{ flexShrink: 0, width: 54 }}
              />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 700, fontSize: 14.5 }}>{p.nom}</div>
                <div style={{ fontSize: 12, color: 'var(--texte-3)', marginTop: 2 }}>
                  {p.format} · {p.desc}
                </div>
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  gap: 7,
                  flexShrink: 0,
                }}
              >
                <span style={{ fontWeight: 800, fontSize: 15, color: 'var(--terracotta)' }}>
                  {fmt(p.prix)}
                </span>
                <button
                  className="btn-mini"
                  onClick={() => openWhatsApp(msgPlat(`${p.nom} (${p.format})`, p.prix))}
                >
                  Commander
                </button>
              </div>
            </div>
          )}
        />
      </div>
    </main>
  )
}
