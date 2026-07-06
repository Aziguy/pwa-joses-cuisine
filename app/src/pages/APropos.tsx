import { Link } from 'react-router-dom'
import PhotoPlaceholder from '../components/PhotoPlaceholder'
import { equipe } from '../lib/data'
import { usePageMeta } from '../lib/usePageMeta'

export default function APropos() {
  usePageMeta(
    "Qui sommes-nous — Jose's cuisine",
    "L'histoire de José, cheffe et fondatrice de Jose's cuisine : du Cameroun aux Yvelines, une cuisine sincère faite avec amour.",
  )

  return (
    <main style={{ padding: '18px 0 8px' }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '8px 20px 4px',
          textAlign: 'center',
        }}
      >
        <PhotoPlaceholder label="Photo de José en cuisine" height={150} circle style={{ width: 150 }} />
        <h1
          style={{ fontFamily: 'var(--font-titre)', fontWeight: 800, fontSize: 26, margin: '16px 0 2px' }}
        >
          {equipe.prenom}
        </h1>
        <div
          style={{
            fontSize: 13,
            fontWeight: 700,
            color: 'var(--terracotta)',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
          }}
        >
          {equipe.titre}
        </div>
      </div>

      <div
        style={{
          padding: '18px 22px 4px',
          display: 'flex',
          flexDirection: 'column',
          gap: 14,
        }}
      >
        {equipe.histoire.map((p) => (
          <p key={p.slice(0, 30)} style={{ fontSize: 14.5, lineHeight: 1.65, color: '#3D2E22', margin: 0 }}>
            {p}
          </p>
        ))}
      </div>

      <div className="encart-jaune" style={{ margin: '18px 16px 8px', borderRadius: 16, padding: '17px 18px' }}>
        <div className="encart-titre">Notre philosophie</div>
        <div className="encart-texte" style={{ fontSize: 14.5, lineHeight: 1.6 }}>
          « {equipe.philosophie} »
        </div>
      </div>

      <div style={{ padding: '8px 16px 0' }}>
        <Link to="/galerie" className="btn btn-secondaire btn-md btn-block" style={{ fontSize: 14 }}>
          Voir la galerie photos →
        </Link>
      </div>
    </main>
  )
}
