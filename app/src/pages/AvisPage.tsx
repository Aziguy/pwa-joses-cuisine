import PaginatedList from '../components/PaginatedList'
import Stars from '../components/Stars'
import { avis, trierParDateDesc } from '../lib/data'
import { msgLaisserAvis, openWhatsApp } from '../lib/order'
import { usePageMeta } from '../lib/usePageMeta'

export default function AvisPage() {
  const moyenne = (avis.reduce((s, a) => s + a.note, 0) / avis.length).toFixed(1).replace('.', ',')

  usePageMeta(
    "Avis & témoignages — Jose's cuisine",
    `Note moyenne ${moyenne}/5 : ce que disent les clients de JS cuisine, cuisine camerounaise livrée en Ile-de-France.`,
  )

  const tries = trierParDateDesc(avis)

  return (
    <main style={{ padding: '18px 0 8px' }}>
      <div className="page-head">
        <h1>Avis &amp; témoignages</h1>
        <p>
          Note moyenne : {moyenne} / 5 sur {avis.length} avis
        </p>
      </div>

      <div style={{ padding: '0 16px' }}>
        <PaginatedList
          items={tries}
          pageSize={6}
          loadMoreLabel="Voir plus d'avis"
          className="liste-col-11"
          renderItem={(a) => (
            <div
              key={a.nom + a.date}
              className="carte"
              style={{ borderRadius: 15, padding: '15px 16px' }}
            >
              <div style={{ marginBottom: 7 }}>
                <Stars note={a.note} />
              </div>
              <div style={{ fontSize: 14, lineHeight: 1.55, color: '#3D2E22', marginBottom: 9 }}>
                « {a.commentaire} »
              </div>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--texte-3)' }}>
                {a.nom} · {a.date}
              </div>
            </div>
          )}
        />
      </div>

      <div style={{ padding: '18px 16px 0' }}>
        <button
          className="btn btn-secondaire btn-md btn-block"
          style={{ fontSize: 14 }}
          onClick={() => openWhatsApp(msgLaisserAvis())}
        >
          Laisser un avis sur WhatsApp
        </button>
      </div>
    </main>
  )
}
