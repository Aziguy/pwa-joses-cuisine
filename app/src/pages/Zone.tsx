import { infos } from '../lib/data'
import { usePageMeta } from '../lib/usePageMeta'

export default function Zone() {
  usePageMeta(
    "Zone de livraison & infos pratiques — Jose's cuisine",
    `Livraison à domicile dans les Yvelines (78) : ${infos.communes.slice(0, 5).join(', ')}… Horaires, délais, frais et minimum de commande.`,
  )

  const infosPratiques = [
    { label: 'Horaires de commande', valeur: infos.horaires },
    { label: 'Délai', valeur: infos.delaiCommande },
    { label: 'Frais de livraison', valeur: infos.fraisLivraison },
    { label: 'Minimum de commande', valeur: infos.minimumCommande },
    { label: 'Paiement', valeur: 'Espèces, virement, Lydia/PayPal' },
  ]

  return (
    <main style={{ padding: '18px 0 8px' }}>
      <div className="page-head">
        <h1>Zone &amp; infos pratiques</h1>
        <p>Livraison à domicile dans les Yvelines (78).</p>
      </div>

      <div style={{ padding: '0 20px 16px' }}>
        <div
          style={{
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--terracotta)',
            marginBottom: 10,
          }}
        >
          Communes livrées
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {infos.communes.map((c) => (
            <span
              key={c}
              style={{
                background: '#fff',
                border: '1px solid var(--bordure)',
                borderRadius: 999,
                padding: '7px 14px',
                fontSize: 13,
                fontWeight: 600,
              }}
            >
              {c}
            </span>
          ))}
        </div>
        <p style={{ fontSize: 12.5, color: 'var(--texte-3)', margin: '12px 0 0' }}>
          Votre commune n'y est pas ? Demandez-nous sur WhatsApp, on trouve souvent une solution.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: '0 16px' }}>
        {infosPratiques.map((i) => (
          <div
            key={i.label}
            className="carte"
            style={{
              borderRadius: 14,
              padding: '13px 16px',
              display: 'flex',
              justifyContent: 'space-between',
              gap: 14,
              alignItems: 'center',
            }}
          >
            <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--texte-3)' }}>{i.label}</span>
            <span style={{ fontSize: 13.5, fontWeight: 700, textAlign: 'right' }}>{i.valeur}</span>
          </div>
        ))}
      </div>
    </main>
  )
}
