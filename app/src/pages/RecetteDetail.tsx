import { Link, useParams } from 'react-router-dom'
import PhotoPlaceholder from '../components/PhotoPlaceholder'
import { recettes } from '../lib/data'
import { copyAndOpenMessenger, fmt, msgPlat, openWhatsApp } from '../lib/order'
import { useToast } from '../lib/toast'
import { usePageMeta } from '../lib/usePageMeta'

export default function RecetteDetail() {
  const { id } = useParams()
  const toast = useToast()
  const recette = recettes.find((r) => r.id === id)

  usePageMeta(
    recette ? `${recette.nom} — Jose's cuisine` : "Recette introuvable — Jose's cuisine",
    recette?.description,
  )

  if (!recette) {
    return (
      <main style={{ padding: '40px 20px', textAlign: 'center' }}>
        <p style={{ color: 'var(--texte-3)', fontSize: 14 }}>Cette recette n'existe pas (ou plus).</p>
        <Link to="/recettes" style={{ color: 'var(--terracotta)', fontWeight: 700, fontSize: 14 }}>
          ← Retour aux recettes
        </Link>
      </main>
    )
  }

  const message = msgPlat(recette.nom, recette.prix)

  return (
    <main style={{ padding: '14px 0 8px' }}>
      <div style={{ padding: '0 16px 12px' }}>
        <Link
          to="/recettes"
          style={{
            color: 'var(--terracotta)',
            fontSize: 14,
            fontWeight: 700,
            textDecoration: 'none',
            padding: '6px 4px',
            display: 'inline-block',
          }}
        >
          ← Retour aux recettes
        </Link>
      </div>

      <div style={{ margin: '0 16px' }}>
        <PhotoPlaceholder label={recette.nom} height={200} radius={18} />
      </div>

      <div style={{ padding: '18px 20px 0' }}>
        <h1
          style={{ fontFamily: 'var(--font-titre)', fontWeight: 800, fontSize: 25, margin: '0 0 8px' }}
        >
          {recette.nom}
        </h1>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
          <span
            style={{
              background: 'var(--carte-claire)',
              border: '1px solid var(--bordure)',
              borderRadius: 999,
              padding: '5px 12px',
              fontSize: 12,
              fontWeight: 600,
            }}
          >
            {recette.temps}
          </span>
          <span
            style={{
              background: 'var(--carte-claire)',
              border: '1px solid var(--bordure)',
              borderRadius: 999,
              padding: '5px 12px',
              fontSize: 12,
              fontWeight: 600,
            }}
          >
            {recette.difficulte}
          </span>
          <span
            style={{
              background: 'var(--terracotta)',
              color: '#fff',
              borderRadius: 999,
              padding: '5px 12px',
              fontSize: 12,
              fontWeight: 700,
            }}
          >
            {fmt(recette.prix)}
          </span>
        </div>
        <p style={{ fontSize: 14.5, lineHeight: 1.55, color: 'var(--texte-2)', margin: '0 0 18px' }}>
          {recette.description}
        </p>

        <h2 style={{ fontFamily: 'var(--font-titre)', fontWeight: 700, fontSize: 17, margin: '0 0 10px' }}>
          Ingrédients
        </h2>
        <ul
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 7,
            marginBottom: 20,
            listStyle: 'none',
            margin: '0 0 20px',
            padding: 0,
          }}
        >
          {recette.ingredients.map((ing) => (
            <li
              key={ing}
              style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: '#3D2E22' }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  background: 'var(--ocre)',
                  transform: 'rotate(45deg)',
                  flexShrink: 0,
                }}
              />
              {ing}
            </li>
          ))}
        </ul>

        <h2 style={{ fontFamily: 'var(--font-titre)', fontWeight: 700, fontSize: 17, margin: '0 0 10px' }}>
          Étapes
        </h2>
        <ol
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
            listStyle: 'none',
            margin: '0 0 20px',
            padding: 0,
          }}
        >
          {recette.etapes.map((etape, i) => (
            <li key={etape} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <span
                style={{
                  flexShrink: 0,
                  width: 26,
                  height: 26,
                  borderRadius: '50%',
                  background: 'var(--emeraude)',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 12.5,
                  fontWeight: 700,
                }}
              >
                {i + 1}
              </span>
              <span style={{ fontSize: 14, lineHeight: 1.5, color: '#3D2E22', paddingTop: 3 }}>
                {etape}
              </span>
            </li>
          ))}
        </ol>

        <div className="encart-jaune" style={{ marginBottom: 20 }}>
          <div className="encart-titre">Astuce de la chef</div>
          <div className="encart-texte">{recette.astuce}</div>
        </div>

        <div className="btn-pile" style={{ marginBottom: 8 }}>
          <button className="btn btn-wa" onClick={() => openWhatsApp(message)}>
            Commander ce plat sur WhatsApp
          </button>
          <button
            className="btn btn-me"
            onClick={() =>
              copyAndOpenMessenger(message, () =>
                toast('Récapitulatif copié ! Colle-le dans la conversation Messenger.'),
              )
            }
          >
            Commander via Messenger
          </button>
        </div>
      </div>
    </main>
  )
}
