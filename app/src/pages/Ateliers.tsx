import PaginatedList from '../components/PaginatedList'
import { ateliers } from '../lib/data'
import { msgAtelier, openWhatsApp } from '../lib/order'
import { usePageMeta } from '../lib/usePageMeta'

export default function Ateliers() {
  usePageMeta(
    "Ateliers cuisine — Jose's cuisine",
    'Cours de cuisine africaine à domicile ou en petit groupe en Ile-de-France : ndolè, poisson braisé, pâtisserie africaine. Réservation sur WhatsApp.',
  )

  return (
    <main style={{ padding: '18px 0 8px' }}>
      <div className="page-head">
        <h1>Ateliers cuisine</h1>
        <p>Cours de cuisine africaine à domicile ou en petit groupe (max 6 personnes).</p>
      </div>

      <div style={{ padding: '0 16px' }}>
        <PaginatedList
          items={ateliers}
          pageSize={6}
          loadMoreLabel="Voir plus d'ateliers"
          className="liste-col"
          renderItem={(a) => (
            <div key={a.nom} className="carte" style={{ padding: 16 }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  gap: 10,
                  marginBottom: 6,
                }}
              >
                <div style={{ fontFamily: 'var(--font-titre)', fontWeight: 700, fontSize: 16.5 }}>
                  {a.nom}
                </div>
                <div
                  style={{ fontWeight: 800, fontSize: 14, color: 'var(--terracotta)', flexShrink: 0 }}
                >
                  {a.prix}
                </div>
              </div>
              <div style={{ fontSize: 12.5, color: 'var(--texte-3)', marginBottom: 8 }}>
                Durée : {a.duree}
              </div>
              <div style={{ fontSize: 13.5, color: '#3D2E22', lineHeight: 1.5, marginBottom: 13 }}>
                {a.desc}
              </div>
              <button
                className="btn btn-wa btn-block"
                style={{ borderRadius: 12, padding: 12, fontSize: 13.5 }}
                onClick={() => openWhatsApp(msgAtelier(a.nom, a.prix))}
              >
                Réserver sur WhatsApp
              </button>
            </div>
          )}
        />
      </div>
    </main>
  )
}
