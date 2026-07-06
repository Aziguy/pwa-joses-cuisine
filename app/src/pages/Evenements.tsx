import { useState } from 'react'
import { evenementTypes } from '../lib/data'
import { copyAndOpenMessenger, msgDevis, openWhatsApp } from '../lib/order'
import { useToast } from '../lib/toast'
import { usePageMeta } from '../lib/usePageMeta'

export default function Evenements() {
  usePageMeta(
    "Événements & traiteur — Jose's cuisine",
    'Traiteur camerounais pour anniversaires, mariages, baptêmes et entreprises dans les Yvelines. Demande de devis simple par WhatsApp.',
  )
  const toast = useToast()
  const [type, setType] = useState(evenementTypes[0]?.nom ?? '')
  const [date, setDate] = useState('')
  const [invites, setInvites] = useState('')
  const [budget, setBudget] = useState('')
  const [message, setMessage] = useState('')

  const devis = () => msgDevis({ type, date, invites, budget, message })

  return (
    <main style={{ padding: '18px 0 8px' }}>
      <div className="page-head">
        <h1>Événements &amp; traiteur</h1>
        <p>De 10 à 150 personnes, dans tout le 78.</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: '0 16px 18px' }}>
        {evenementTypes.map((t) => (
          <div
            key={t.nom}
            className="carte"
            style={{
              borderRadius: 14,
              padding: '13px 15px',
              display: 'flex',
              justifyContent: 'space-between',
              gap: 12,
              alignItems: 'center',
            }}
          >
            <div>
              <div style={{ fontWeight: 700, fontSize: 14.5 }}>{t.nom}</div>
              <div style={{ fontSize: 12.5, color: 'var(--texte-3)', marginTop: 2 }}>{t.desc}</div>
            </div>
            <div
              style={{
                flexShrink: 0,
                fontSize: 12,
                fontWeight: 700,
                color: 'var(--emeraude)',
                textAlign: 'right',
                maxWidth: 90,
              }}
            >
              {t.tarif}
            </div>
          </div>
        ))}
      </div>

      <div className="carte" style={{ margin: '0 16px', borderRadius: 18, padding: '18px 16px' }}>
        <h2 style={{ fontFamily: 'var(--font-titre)', fontWeight: 700, fontSize: 18, margin: '0 0 14px' }}>
          Demande de devis
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
          <label className="champ">
            Type d'événement
            <select value={type} onChange={(e) => setType(e.target.value)}>
              {evenementTypes.map((t) => (
                <option key={t.nom} value={t.nom}>
                  {t.nom}
                </option>
              ))}
            </select>
          </label>

          <label className="champ">
            Date souhaitée
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </label>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <label className="champ">
              Nombre d'invités
              <input
                type="number"
                min={1}
                placeholder="ex : 25"
                value={invites}
                onChange={(e) => setInvites(e.target.value)}
              />
            </label>
            <label className="champ">
              Budget indicatif
              <input
                type="text"
                placeholder="ex : 500 €"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
              />
            </label>
          </div>

          <label className="champ">
            Votre message
            <textarea
              placeholder="Contexte, envies, contraintes…"
              style={{ minHeight: 70 }}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </label>

          <button
            className="btn btn-wa btn-md"
            style={{ marginTop: 4 }}
            onClick={() => openWhatsApp(devis())}
          >
            Recevoir mon devis sur WhatsApp
          </button>
          <button
            className="btn btn-me btn-md"
            onClick={() =>
              copyAndOpenMessenger(devis(), () =>
                toast('Récapitulatif copié ! Colle-le dans la conversation Messenger.'),
              )
            }
          >
            Envoyer via Messenger
          </button>
        </div>
      </div>
    </main>
  )
}
