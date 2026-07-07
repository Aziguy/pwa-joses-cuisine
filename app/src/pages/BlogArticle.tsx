import { Link, useNavigate, useParams } from 'react-router-dom'
import { blog } from '../lib/data'
import { usePageMeta } from '../lib/usePageMeta'

export default function BlogArticle() {
  const { id } = useParams()
  const navigate = useNavigate()
  const article = blog.find((b) => b.id === id)

  usePageMeta(
    article ? `${article.titre} — JS cuisine` : "Article introuvable — JS cuisine",
    article?.extrait,
  )

  if (!article) {
    return (
      <main style={{ padding: '40px 20px', textAlign: 'center' }}>
        <p style={{ color: 'var(--texte-3)', fontSize: 14 }}>Cet article n'existe pas (ou plus).</p>
        <Link to="/blog" style={{ color: 'var(--terracotta)', fontWeight: 700, fontSize: 14 }}>
          ← Tous les articles
        </Link>
      </main>
    )
  }

  return (
    <main style={{ padding: '14px 0 8px' }}>
      <div style={{ padding: '0 16px 8px' }}>
        <Link
          to="/blog"
          style={{
            color: 'var(--terracotta)',
            fontSize: 14,
            fontWeight: 700,
            textDecoration: 'none',
            padding: '6px 4px',
            display: 'inline-block',
          }}
        >
          ← Tous les articles
        </Link>
      </div>

      <article style={{ padding: '0 22px' }}>
        <div
          style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--emeraude)',
            marginBottom: 8,
          }}
        >
          {article.date}
        </div>
        <h1
          style={{
            fontFamily: 'var(--font-titre)',
            fontWeight: 800,
            fontSize: 24,
            lineHeight: 1.15,
            margin: '0 0 16px',
          }}
        >
          {article.titre}
        </h1>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {article.contenu.map((p) => (
            <p key={p.slice(0, 30)} style={{ fontSize: 14.5, lineHeight: 1.65, color: '#3D2E22', margin: 0 }}>
              {p}
            </p>
          ))}
        </div>
        <div style={{ marginTop: 22 }}>
          <button
            className="btn btn-primary btn-md btn-block"
            style={{ fontSize: 14 }}
            onClick={() => navigate('/composer')}
          >
            Une petite faim ? Compose ton repas →
          </button>
        </div>
      </article>
    </main>
  )
}
