import { useState } from 'react'
import { composeCategories } from '../lib/data'
import { copyAndOpenMessenger, fmt, msgCompose, openWhatsApp } from '../lib/order'
import { useToast } from '../lib/toast'
import { usePageMeta } from '../lib/usePageMeta'

// Catégories à choix unique (entrée/plat/dessert/boisson) + extras multiples.
type Selection = Record<string, string | null> & { extra?: never }

export default function Composer() {
  usePageMeta(
    "Compose ton repas — Jose's cuisine",
    'Compose ton repas camerounais sur mesure : entrée, plat, dessert, boisson et extras. Total estimé en direct, commande par WhatsApp ou Messenger.',
  )
  const toast = useToast()
  const [simples, setSimples] = useState<Selection>({})
  const [extras, setExtras] = useState<string[]>([])
  const [precisions, setPrecisions] = useState('')

  const isMulti = (catId: string) => catId === 'extra'

  const isSelected = (catId: string, nom: string) =>
    isMulti(catId) ? extras.includes(nom) : simples[catId] === nom

  const toggle = (catId: string, nom: string) => {
    if (isMulti(catId)) {
      setExtras((prev) => (prev.includes(nom) ? prev.filter((x) => x !== nom) : [...prev, nom]))
    } else {
      setSimples((prev) => ({ ...prev, [catId]: prev[catId] === nom ? null : nom }))
    }
  }

  const lignes = composeCategories.flatMap((cat) =>
    cat.options
      .filter((o) => isSelected(cat.id, o.nom))
      .map((o) => ({ categorie: cat.nom, nom: o.nom, prix: o.prix })),
  )
  const total = lignes.reduce((s, l) => s + l.prix, 0)

  const envoyer = (via: 'wa' | 'me') => {
    if (lignes.length === 0) {
      toast("Choisis au moins un élément avant d'envoyer.")
      return
    }
    const message = msgCompose(lignes, precisions.trim())
    if (via === 'wa') {
      openWhatsApp(message)
    } else {
      copyAndOpenMessenger(message, () =>
        toast('Récapitulatif copié ! Colle-le dans la conversation Messenger.'),
      )
    }
  }

  return (
    <main style={{ padding: '18px 0 8px' }}>
      <div className="page-head">
        <h1>Compose ton repas</h1>
        <p>Choisis dans chaque catégorie, on s'occupe du reste.</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, padding: '0 16px' }}>
        {composeCategories.map((cat) => (
          <fieldset
            key={cat.id}
            className="carte"
            style={{ padding: '14px 15px', border: '1px solid var(--bordure)', margin: 0 }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                marginBottom: 10,
              }}
            >
              <legend
                style={{
                  fontFamily: 'var(--font-titre)',
                  fontWeight: 700,
                  fontSize: 16,
                  padding: 0,
                  float: 'left',
                }}
              >
                {cat.nom}
              </legend>
              <span style={{ fontSize: 11, color: 'var(--texte-4)', fontWeight: 600 }}>
                {isMulti(cat.id) ? 'Plusieurs choix possibles' : 'Un choix'}
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, clear: 'both' }}>
              {cat.options.map((o) => {
                const selected = isSelected(cat.id, o.nom)
                return (
                  <button
                    key={o.nom}
                    type="button"
                    onClick={() => toggle(cat.id, o.nom)}
                    role={isMulti(cat.id) ? 'checkbox' : 'radio'}
                    aria-checked={selected}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 11,
                      padding: '11px 12px',
                      borderRadius: 12,
                      border: `1.5px solid ${selected ? 'var(--ocre)' : 'var(--bordure)'}`,
                      background: selected ? 'var(--jaune-fond)' : 'var(--creme)',
                      cursor: 'pointer',
                      width: '100%',
                      textAlign: 'left',
                      minHeight: 44,
                    }}
                  >
                    <span
                      style={{
                        width: 19,
                        height: 19,
                        borderRadius: '50%',
                        border: `2px solid ${selected ? 'var(--terracotta)' : '#C9B8A4'}`,
                        background: selected ? 'var(--terracotta)' : 'transparent',
                        flexShrink: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {selected && (
                        <span
                          style={{ width: 8, height: 8, borderRadius: '50%', background: '#fff' }}
                        />
                      )}
                    </span>
                    <span style={{ flex: 1, fontSize: 14, fontWeight: 600 }}>{o.nom}</span>
                    <span
                      style={{
                        fontSize: 13.5,
                        fontWeight: 700,
                        color: 'var(--terracotta)',
                        flexShrink: 0,
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {fmt(o.prix)}
                    </span>
                  </button>
                )
              })}
            </div>
          </fieldset>
        ))}

        <div className="carte" style={{ padding: '14px 15px' }}>
          <label
            htmlFor="precisions"
            style={{
              fontFamily: 'var(--font-titre)',
              fontWeight: 700,
              fontSize: 16,
              marginBottom: 10,
              display: 'block',
            }}
          >
            Précisions
          </label>
          <textarea
            id="precisions"
            value={precisions}
            onChange={(e) => setPrecisions(e.target.value)}
            placeholder="Allergies, niveau de piment, sans porc, heure de livraison souhaitée…"
            style={{
              width: '100%',
              minHeight: 80,
              border: '1px solid var(--bordure)',
              borderRadius: 12,
              padding: 12,
              fontSize: 14,
              resize: 'vertical',
              background: 'var(--creme)',
              color: 'var(--marron)',
            }}
          />
        </div>

        <div style={{ background: 'var(--marron)', borderRadius: 18, padding: 16 }}>
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--ocre)',
              marginBottom: 10,
            }}
          >
            Ton repas
          </div>

          {lignes.length === 0 && (
            <div style={{ fontSize: 13.5, color: '#C9B8A4', marginBottom: 12 }}>
              Rien de sélectionné pour l'instant — choisis au moins un plat ci-dessus.
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 12 }}>
            {lignes.map((l) => (
              <div
                key={l.categorie + l.nom}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: 13.5,
                  color: 'var(--creme)',
                }}
              >
                <span>{l.nom}</span>
                <span style={{ fontWeight: 700 }}>{fmt(l.prix)}</span>
              </div>
            ))}
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              borderTop: '1px solid rgba(251,246,236,0.2)',
              paddingTop: 10,
              marginBottom: 14,
            }}
          >
            <span style={{ fontWeight: 700, fontSize: 15, color: 'var(--creme)' }}>Total estimé</span>
            <span style={{ fontWeight: 800, fontSize: 17, color: 'var(--ocre)' }}>{fmt(total)}</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
            <button className="btn btn-wa btn-md" onClick={() => envoyer('wa')}>
              Envoyer ma commande sur WhatsApp
            </button>
            <button className="btn btn-me btn-md" onClick={() => envoyer('me')}>
              Envoyer via Messenger
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
