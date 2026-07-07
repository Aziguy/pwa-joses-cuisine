import { useState } from 'react'
import { infos, menuSemaine } from '../lib/data'
import { copyAndOpenMessenger, fmt, msgJour, msgPlat, openWhatsApp } from '../lib/order'
import { useToast } from '../lib/toast'
import { usePageMeta } from '../lib/usePageMeta'

export default function MenuSemaine() {
  usePageMeta(
    "Menu de la semaine — JS cuisine",
    `Le menu de la semaine de JS cuisine, du lundi au dimanche. ${infos.delaiCommande}. Commande par WhatsApp ou Messenger.`,
  )
  const toast = useToast()
  // Jour courant sélectionné par défaut (lundi = 0).
  const [jourIdx, setJourIdx] = useState(() => (new Date().getDay() + 6) % 7)

  const jour = menuSemaine[jourIdx] ?? menuSemaine[0]
  const total = jour.plats.reduce((s, p) => s + p.prix, 0)
  const messageJour = msgJour(jour)

  return (
    <main style={{ padding: '18px 0 8px' }}>
      <div className="page-head" style={{ paddingBottom: 12 }}>
        <h1>Menu de la semaine</h1>
        <p>
          {infos.delaiCommande}. Livraison : {infos.fraisLivraison}.
        </p>
      </div>

      <div className="chips-scroll" style={{ padding: '4px 20px 14px' }}>
        {menuSemaine.map((j, i) => {
          const actif = i === jourIdx
          return (
            <button
              key={j.jour}
              onClick={() => setJourIdx(i)}
              style={{
                flexShrink: 0,
                border: `1px solid ${actif ? 'var(--marron)' : 'var(--bordure)'}`,
                background: actif ? 'var(--marron)' : '#fff',
                color: actif ? 'var(--creme)' : 'var(--texte-2)',
                borderRadius: 12,
                padding: '9px 14px',
                fontSize: 13,
                fontWeight: 700,
                cursor: 'pointer',
                minHeight: 40,
              }}
            >
              {j.jour}
            </button>
          )
        })}
      </div>

      <div style={{ padding: '0 16px' }}>
        <div className="carte" style={{ borderRadius: 18, overflow: 'hidden' }}>
          <div
            style={{
              background: 'var(--marron)',
              color: 'var(--creme)',
              padding: '14px 18px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span style={{ fontFamily: 'var(--font-titre)', fontWeight: 700, fontSize: 17 }}>
              {jour.jour}
            </span>
            <span style={{ fontSize: 12, color: 'var(--ocre)', fontWeight: 700 }}>
              Menu complet : {fmt(total)}
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {jour.plats.map((p) => (
              <div
                key={p.type + p.nom}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '13px 16px',
                  borderBottom: '1px solid #F3E9D8',
                }}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: 10.5,
                      fontWeight: 700,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: 'var(--terracotta)',
                    }}
                  >
                    {p.type}
                  </div>
                  <div style={{ fontWeight: 600, fontSize: 14.5, marginTop: 2 }}>{p.nom}</div>
                </div>
                <div style={{ fontWeight: 800, fontSize: 14 }}>{fmt(p.prix)}</div>
                <button
                  className="btn-mini"
                  onClick={() => openWhatsApp(msgPlat(p.nom, p.prix, jour.jour))}
                >
                  Commander
                </button>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 9, padding: '14px 16px' }}>
            <button className="btn btn-wa btn-md" onClick={() => openWhatsApp(messageJour)}>
              Commander le menu du jour — WhatsApp
            </button>
            <button
              className="btn btn-me btn-md"
              onClick={() =>
                copyAndOpenMessenger(messageJour, () =>
                  toast('Récapitulatif copié ! Colle-le dans la conversation Messenger.'),
                )
              }
            >
              Commander via Messenger
            </button>
          </div>
        </div>

        <p
          style={{
            fontSize: 12,
            color: 'var(--texte-4)',
            textAlign: 'center',
            margin: '14px 20px 0',
            lineHeight: 1.5,
          }}
        >
          Minimum de commande {infos.minimumCommande}. Le message se prépare tout seul, il ne reste
          qu'à l'envoyer.
        </p>
      </div>
    </main>
  )
}
