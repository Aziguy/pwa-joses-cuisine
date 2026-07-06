import { Link, useSearchParams } from 'react-router-dom'
import PaginatedList from '../components/PaginatedList'
import { blog, trierParDateDesc } from '../lib/data'
import { usePageMeta } from '../lib/usePageMeta'

// Pagination par 6, avec route partageable /blog?page=n.
const PAGE_SIZE = 6

export default function BlogListe() {
  usePageMeta(
    "Conseils cuisine — Jose's cuisine",
    'Astuces cuisine africaine : conserver ses marinades, bienfaits du bissap, cuisiner à petit budget, réussir son poisson braisé.',
  )
  const [searchParams, setSearchParams] = useSearchParams()
  const page = Math.max(1, Number(searchParams.get('page')) || 1)

  const articles = trierParDateDesc(blog)

  return (
    <main style={{ padding: '18px 0 8px' }}>
      <div className="page-head">
        <h1>Conseils cuisine</h1>
        <p>Astuces, bienfaits des ingrédients, cuisine à petit budget.</p>
      </div>

      <div style={{ padding: '0 16px' }}>
        <PaginatedList
          items={articles}
          pageSize={PAGE_SIZE}
          className="liste-col"
          page={page}
          onPageChange={(p) => setSearchParams(p > 1 ? { page: String(p) } : {})}
          prevLabel="← Articles précédents"
          nextLabel="Articles suivants →"
          renderItem={(b) => (
            <Link
              key={b.id}
              to={`/blog/${b.id}`}
              className="carte"
              style={{ padding: 16, textDecoration: 'none', display: 'block' }}
            >
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--emeraude)',
                  marginBottom: 7,
                }}
              >
                {b.date}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-titre)',
                  fontWeight: 700,
                  fontSize: 17,
                  lineHeight: 1.25,
                  marginBottom: 7,
                }}
              >
                {b.titre}
              </div>
              <div
                style={{ fontSize: 13.5, color: 'var(--texte-2)', lineHeight: 1.5, marginBottom: 10 }}
              >
                {b.extrait}
              </div>
              <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--terracotta)' }}>
                Lire l'article →
              </span>
            </Link>
          )}
        />
      </div>
    </main>
  )
}
