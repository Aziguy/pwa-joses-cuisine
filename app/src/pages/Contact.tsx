import { useState } from 'react'
import { infos } from '../lib/data'
import { copyAndOpenMessenger, msgContact, openWhatsApp } from '../lib/order'
import { usePageMeta } from '../lib/usePageMeta'

export default function Contact() {
  usePageMeta(
    "Contact — JS cuisine",
    `Contactez JS cuisine par WhatsApp, Messenger ou téléphone. ${infos.zone}.`,
  )
  const [nom, setNom] = useState('')
  const [tel, setTel] = useState('')
  const [message, setMessage] = useState('')

  const telHref = 'tel:' + infos.telephone.replace(/\s/g, '')

  return (
    <main style={{ padding: '18px 0 8px' }}>
      <div className="page-head">
        <h1>Contact</h1>
        <p>Une question, une envie particulière ? Écrivez-nous.</p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: 10,
          padding: '0 16px 16px',
        }}
      >
        <button
          className="btn btn-wa btn-md"
          style={{ padding: '14px 8px', fontSize: 13 }}
          onClick={() => openWhatsApp("Bonjour JS cuisine ! Je voudrais passer une commande.")}
        >
          WhatsApp
        </button>
        <button
          className="btn btn-me btn-md"
          style={{ padding: '14px 8px', fontSize: 13 }}
          onClick={() => copyAndOpenMessenger('')}
        >
          Messenger
        </button>
        <a className="btn btn-dark btn-md" style={{ padding: '14px 8px', fontSize: 13 }} href={telHref}>
          Appeler
        </a>
      </div>

      <div className="carte" style={{ margin: '0 16px', borderRadius: 18, padding: '18px 16px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
          <label className="champ">
            Votre nom
            <input
              type="text"
              placeholder="Prénom et nom"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
            />
          </label>
          <label className="champ">
            Téléphone
            <input
              type="tel"
              placeholder="06 …"
              value={tel}
              onChange={(e) => setTel(e.target.value)}
            />
          </label>
          <label className="champ">
            Votre message
            <textarea
              placeholder="Demande spéciale, plat hors menu, quantité inhabituelle…"
              style={{ minHeight: 80 }}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </label>
          <button
            className="btn btn-wa btn-md"
            style={{ marginTop: 4 }}
            onClick={() => openWhatsApp(msgContact({ nom, tel, message }))}
          >
            Envoyer sur WhatsApp
          </button>
        </div>
      </div>

      <div
        style={{
          margin: '16px 16px 0',
          background: 'var(--emeraude)',
          color: '#F2EBDD',
          borderRadius: 16,
          padding: '15px 17px',
          fontSize: 13.5,
          lineHeight: 1.5,
        }}
      >
        <strong>{infos.zone}</strong>
        <br />
        {infos.horaires}
      </div>
    </main>
  )
}
