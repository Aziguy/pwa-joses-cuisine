import { Link, useNavigate } from 'react-router-dom'
import PhotoPlaceholder from '../components/PhotoPlaceholder'
import Stars from '../components/Stars'
import { avis, infos, recettes, trierParDateDesc } from '../lib/data'
import { fmt, msgCommandeDirecte, openWhatsApp } from '../lib/order'
import { usePageMeta } from '../lib/usePageMeta'

const PILIER_COULEURS = ['#BE4E24', '#E8A93A', '#1C6B52']
const PHARES_IDS = ['ndole', 'poulet-dg', 'poisson-braise', 'puff-puff']

export default function Accueil() {
  usePageMeta(
    "JS cuisine — Cuisine camerounaise faite maison, livrée dans toute l'Ile-de-France",
    'La cuisine camerounaise, faite maison, livrée chez vous. Menu de la semaine, recettes, traiteur événements — commande par WhatsApp ou Messenger dans toute l\'Ile-de-France.',
  )
  const navigate = useNavigate()

  const phares = PHARES_IDS.map((id) => recettes.find((r) => r.id === id)).filter(
    (r) => r !== undefined,
  )
  // Les 2 avis les plus récents et les mieux notés en avant sur l'accueil.
  const avisExtrait = trierParDateDesc(avis)
    .sort((a, b) => b.note - a.note)
    .slice(0, 2)

  return (
    <main>
      <section style={{ padding: '16px 16px 0' }}>
        <img src="/images/plats/cover.jpg" alt="Photo du plat signature" height={230} style={{ borderRadius: 18 }} />
      </section>

      <section style={{ padding: '20px 20px 8px' }}>
        <div className="eyebrow">Fait maison · Ile-de-France</div>
        <h1
          style={{
            fontFamily: 'var(--font-titre)',
            fontWeight: 800,
            fontSize: 30,
            lineHeight: 1.08,
            margin: '0 0 10px',
            textWrap: 'balance',
          }}
        >
          La cuisine camerounaise, faite maison, livrée chez vous.
        </h1>
        <p style={{ fontSize: 15, lineHeight: 1.55, color: 'var(--texte-2)', margin: '0 0 18px' }}>
          Josée cuisine chez elle avec des produits frais et bio autant que possible, livre aux frais du client dans toute l’île de France ou retrait à l’adresse indiquée lors de la commande. Marinades maison, recettes de familles, prix doux.
        </p>
        <div className="btn-pile">
          <button className="btn btn-primary" onClick={() => navigate('/menu')}>
            Voir le menu de la semaine
          </button>
          <button className="btn btn-wa" onClick={() => openWhatsApp(msgCommandeDirecte())}>
            Commander sur WhatsApp
          </button>
        </div>
      </section>

      <div className="wax-divider" />

      <section style={{ padding: '4px 20px 8px' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            background: 'var(--emeraude)',
            color: '#F2EBDD',
            borderRadius: 14,
            padding: '13px 16px',
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: 'var(--ocre)',
              flexShrink: 0,
            }}
          />
          <div style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.4 }}>
            {infos.zone} —{' '}
            <Link to="/zone" style={{ color: 'var(--ocre)' }}>
              voir les communes
            </Link>
          </div>
        </div>
      </section>

      <section style={{ padding: '20px 20px 4px' }}>
        <h2 className="section-title">Ce qu'on fait pour vous</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {infos.piliers.map((p, i) => (
            <div
              key={p.nom}
              style={{
                background: '#fff',
                border: '1px solid var(--bordure)',
                borderRadius: 14,
                padding: '14px 13px',
                display: 'flex',
                flexDirection: 'column',
                gap: 6,
              }}
            >
              <div
                style={{
                  width: 10,
                  height: 10,
                  background: PILIER_COULEURS[i % 3],
                  transform: 'rotate(45deg)',
                  margin: '2px 0 4px',
                }}
              />
              <div style={{ fontWeight: 700, fontSize: 13.5, lineHeight: 1.25 }}>{p.nom}</div>
              <div style={{ fontSize: 12, color: 'var(--texte-3)', lineHeight: 1.4 }}>{p.desc}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: '24px 20px 4px' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            marginBottom: 14,
          }}
        >
          <h2 className="section-title" style={{ margin: 0 }}>
            Nos plats phares
          </h2>
          <Link
            to="/recettes"
            style={{ fontSize: 13, fontWeight: 700, color: 'var(--terracotta)', textDecoration: 'none' }}
          >
            Toutes les recettes →
          </Link>
        </div>
        <div
          style={{
            display: 'flex',
            gap: 12,
            overflowX: 'auto',
            paddingBottom: 8,
            margin: '0 -20px',
            paddingLeft: 20,
            paddingRight: 20,
          }}
        >
          {phares.map((r) => (
            <Link
              key={r.id}
              to={`/recettes/${r.id}`}
              style={{
                flex: '0 0 200px',
                background: '#fff',
                border: '1px solid var(--bordure)',
                borderRadius: 16,
                overflow: 'hidden',
                textDecoration: 'none',
              }}
            >
              <PhotoPlaceholder label={r.nom} height={110} radius={0} />
              <div style={{ padding: '12px 13px' }}>
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{r.nom}</div>
                <div
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                >
                  <span style={{ fontSize: 12, color: 'var(--texte-3)' }}>{r.temps}</span>
                  <span style={{ fontWeight: 800, fontSize: 14, color: 'var(--terracotta)' }}>
                    {fmt(r.prix)}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section style={{ padding: '20px 20px 4px' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            marginBottom: 14,
          }}
        >
          <h2 className="section-title" style={{ margin: 0 }}>
            Ils ont goûté
          </h2>
          <Link
            to="/avis"
            style={{ fontSize: 13, fontWeight: 700, color: 'var(--terracotta)', textDecoration: 'none' }}
          >
            Tous les avis →
          </Link>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {avisExtrait.map((a) => (
            <div
              key={a.nom + a.date}
              style={{
                background: '#fff',
                border: '1px solid var(--bordure)',
                borderRadius: 14,
                padding: '14px 16px',
              }}
            >
              <div style={{ marginBottom: 6 }}>
                <Stars note={a.note} size={14} />
              </div>
              <div
                style={{ fontSize: 13.5, lineHeight: 1.5, color: '#3D2E22', marginBottom: 8 }}
              >
                « {a.commentaire} »
              </div>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--texte-3)' }}>
                {a.nom} · {a.date}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: '24px 20px 8px' }}>
        <Link
          to="/evenements"
          style={{
            display: 'block',
            background: 'var(--marron)',
            borderRadius: 18,
            padding: 20,
            textDecoration: 'none',
            backgroundImage:
              'radial-gradient(circle at 12px 12px, rgba(232,169,58,0.16) 3px, transparent 3.5px)',
            backgroundSize: '28px 28px',
          }}
        >
          <div
            className="eyebrow"
            style={{ color: 'var(--ocre)' }}
          >
            Traiteur &amp; événements
          </div>
          <div
            style={{
              fontFamily: 'var(--font-titre)',
              fontWeight: 700,
              fontSize: 19,
              color: 'var(--creme)',
              lineHeight: 1.25,
              marginBottom: 10,
            }}
          >
            Anniversaire, mariage, baptême ou repas d'équipe ?
          </div>
          <div style={{ fontSize: 13.5, color: '#C9B8A4', marginBottom: 14 }}>
            Devis simple et rapide, directement sur WhatsApp.
          </div>
          <span
            style={{
              display: 'inline-block',
              background: 'var(--ocre)',
              color: 'var(--marron)',
              fontWeight: 700,
              fontSize: 13,
              padding: '10px 16px',
              borderRadius: 999,
            }}
          >
            Demander un devis →
          </span>
        </Link>
      </section>
    </main>
  )
}
