import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import PaginatedList from '../components/PaginatedList'
import PhotoPlaceholder from '../components/PhotoPlaceholder'
import { recettes, type Recette } from '../lib/data'
import { fmt, msgPlat, openWhatsApp } from '../lib/order'
import { usePageMeta } from '../lib/usePageMeta'

const CATEGORIES = ['Tous', 'Entrées', 'Plats', 'Desserts', 'Boissons', 'Sauces & Marinades', 'Gâteaux']
const TAGS = [
  { id: 'bio', label: 'Bio' },
  { id: 'petit-budget', label: 'Petit budget' },
  { id: 'vegetarien', label: 'Végétarien' },
  { id: 'epice', label: 'Épicé' },
]
const PAGE_SIZE = 8

function CarteRecette({ recette }: { recette: Recette }) {
  const navigate = useNavigate()
  return (
    <div className="carte" style={{ overflow: 'hidden' }}>
      <Link
        to={`/recettes/${recette.id}`}
        style={{ display: 'flex', gap: 14, padding: 13, textDecoration: 'none' }}
      >
        <PhotoPlaceholder
          label={recette.nom}
          height={88}
          radius={12}
          style={{ flexShrink: 0, width: 88 }}
        />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: 8,
              alignItems: 'baseline',
            }}
          >
            <div style={{ fontWeight: 700, fontSize: 15, lineHeight: 1.2 }}>{recette.nom}</div>
            <div style={{ fontWeight: 800, fontSize: 14, color: 'var(--terracotta)', flexShrink: 0 }}>
              {fmt(recette.prix)}
            </div>
          </div>
          <div style={{ fontSize: 12, color: 'var(--texte-3)', margin: '4px 0 6px' }}>
            {recette.categorie} · {recette.temps} · {recette.difficulte}
          </div>
          <div
            style={{
              fontSize: 12.5,
              color: 'var(--texte-2)',
              lineHeight: 1.4,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {recette.description}
          </div>
        </div>
      </Link>
      <div style={{ display: 'flex', gap: 8, padding: '0 13px 13px' }}>
        <button
          className="btn btn-secondaire btn-sm"
          style={{ flex: 1 }}
          onClick={() => navigate(`/recettes/${recette.id}`)}
        >
          Voir la recette
        </button>
        <button
          className="btn btn-wa btn-sm"
          style={{ flex: 1 }}
          onClick={() => openWhatsApp(msgPlat(recette.nom, recette.prix))}
        >
          Commander
        </button>
      </div>
    </div>
  )
}

export default function Recettes() {
  usePageMeta(
    "Recettes — JS cuisine",
    'Nos recettes camerounaises et africaines : entrées, plats, desserts, boissons, sauces et marinades. À commander ou à refaire chez vous.',
  )
  const [cat, setCat] = useState('Tous')
  const [tags, setTags] = useState<string[]>([])

  const filtrees = useMemo(
    () =>
      recettes.filter(
        (r) =>
          (cat === 'Tous' || r.categorie === cat) && tags.every((t) => r.tags.includes(t)),
      ),
    [cat, tags],
  )

  const toggleTag = (id: string) =>
    setTags((prev) => (prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]))

  return (
    <main style={{ padding: '18px 0 8px' }}>
      <div className="page-head" style={{ paddingBottom: 12 }}>
        <h1>Recettes</h1>
        <p>Nos plats, à commander ou à refaire chez vous.</p>
      </div>

      <div className="chips-scroll" style={{ padding: '4px 20px 10px' }}>
        {CATEGORIES.map((c) => (
          <button key={c} className={`chip ${cat === c ? 'actif' : ''}`} onClick={() => setCat(c)}>
            {c}
          </button>
        ))}
      </div>

      <div className="chips-scroll" style={{ padding: '0 20px 14px' }}>
        {TAGS.map((t) => (
          <button
            key={t.id}
            className={`chip-tag ${tags.includes(t.id) ? 'actif' : ''}`}
            onClick={() => toggleTag(t.id)}
            aria-pressed={tags.includes(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        <PaginatedList
          items={filtrees}
          pageSize={PAGE_SIZE}
          resetKey={`${cat}|${tags.join(',')}`}
          className="liste-col"
          emptyMessage="Aucune recette ne correspond à ces filtres."
          loadMoreLabel="Voir plus de recettes"
          renderItem={(r) => <CarteRecette key={r.id} recette={r} />}
        />
      </div>
    </main>
  )
}
