import { Link } from 'react-router-dom'
import { usePageMeta } from '../lib/usePageMeta'

export default function NotFound() {
  usePageMeta("Page introuvable — JS cuisine")

  return (
    <main style={{ padding: '60px 20px', textAlign: 'center' }}>
      <h1 style={{ fontFamily: 'var(--font-titre)', fontWeight: 800, fontSize: 26, margin: '0 0 8px' }}>
        Page introuvable
      </h1>
      <p style={{ color: 'var(--texte-3)', fontSize: 14, margin: '0 0 20px' }}>
        Cette page n'existe pas — mais la cuisine, elle, est bien là.
      </p>
      <Link to="/" className="btn btn-primary" style={{ display: 'inline-flex' }}>
        Retour à l'accueil
      </Link>
    </main>
  )
}
