import { useState } from 'react'
import { faq } from '../lib/data'
import { usePageMeta } from '../lib/usePageMeta'

export default function Faq() {
  usePageMeta(
    "FAQ — Jose's cuisine",
    'Questions fréquentes : comment commander, communes livrées, frais de livraison, allergènes, niveau de piment, moyens de paiement, annulation.',
  )
  const [ouverte, setOuverte] = useState(-1)

  return (
    <main style={{ padding: '18px 0 8px' }}>
      <div className="page-head">
        <h1>Questions fréquentes</h1>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 9, padding: '0 16px' }}>
        {faq.map((f, i) => {
          const open = ouverte === i
          return (
            <div key={f.q} className="carte" style={{ borderRadius: 14, overflow: 'hidden' }}>
              <button
                onClick={() => setOuverte(open ? -1 : i)}
                aria-expanded={open}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: 12,
                  padding: '14px 16px',
                  cursor: 'pointer',
                  background: 'none',
                  border: 'none',
                  width: '100%',
                  textAlign: 'left',
                  minHeight: 48,
                }}
              >
                <span style={{ fontWeight: 700, fontSize: 14, lineHeight: 1.35 }}>{f.q}</span>
                <span
                  style={{
                    flexShrink: 0,
                    fontSize: 18,
                    color: 'var(--terracotta)',
                    fontWeight: 700,
                  }}
                  aria-hidden="true"
                >
                  {open ? '−' : '+'}
                </span>
              </button>
              {open && (
                <div
                  style={{
                    padding: '0 16px 15px',
                    fontSize: 13.5,
                    lineHeight: 1.55,
                    color: 'var(--texte-2)',
                  }}
                >
                  {f.r}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </main>
  )
}
